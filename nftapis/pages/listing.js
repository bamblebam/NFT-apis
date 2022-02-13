import { Fragment } from "react";
import { useState } from "react";
import { Moralis } from "moralis";
const axios = require("axios");
// import { Web3 } from "web3";
const Web3 = require("web3");

export default function Listing() {
  const [buys, setbuys] = useState([]);
  const [mints, setmints] = useState([]);
  const [owner, setOwner] = useState("");
  const [balance, setBalance] = useState(0);
  const etherscanKey = process.env.NEXT_PUBLIC_ETHERSCAN_KEY;

  async function getEvents(e) {
    e.preventDefault();
    //Get balance of the account
    const tempbalance = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${owner}&tag=latest&apikey=${etherscanKey}`
    );
    const ethVal = Web3.utils.fromWei(tempbalance.data.result, "ether");
    setBalance(ethVal);
    //get all the erc-721 transactions for the particular address
    // const owner = "0x213178de4cc876a18a9cb6f3ed6ea71d0856601a";
    const nfts = await axios.get(
      `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${owner}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${etherscanKey}`
    );
    const response = nfts.data.result;
    console.log(response);
    //get only the nfts that are buys and less than 120 days old
    const validNfts = [];
    response.forEach((element) => {
      if (
        element.to === owner &&
        Date.now() - 60 * 60 * 24 * 120 * 1000 <= element.timeStamp * 1000
      ) {
        validNfts.push(element);
      }
    });
    //sort the nfts to mint and buys. If from address is token address it is a mint
    let tempbuys = [];
    let tempmints = [];
    validNfts.forEach((element) => {
      if (element.from === element.contractAddress) {
        tempmints.push(element);
      } else {
        tempbuys.push(element);
      }
    });

    setbuys(tempbuys);
    setmints(tempmints);
    console.log(tempbuys);
    console.log(tempmints);
  }
  return (
    <Fragment>
      <h1>Listing</h1>
      <form onSubmit={getEvents}>
        <input
          type="text"
          name="owner"
          id="owner"
          onChange={(e) => setOwner(e.target.value)}
        />
        <button type="submit">nft</button>
      </form>
      <h2>Balance - {balance}</h2>
      {buys.length > 0 && <h2>Buys</h2>}
      {buys.map((nft, index) => {
        return (
          <div key={index}>
            <p>From - {nft.from}</p>
            <p>To - {nft.to}</p>
            <p>Contract Address - {nft.contractAddress}</p>
            <p>Token Name - {nft.tokenName}</p>
            <p>TimeStamp - {nft.timeStamp}</p>
            <hr />
          </div>
        );
      })}
      {mints.length > 0 && <h2>Mints</h2>}
      {mints.map((nft, index) => {
        return (
          <div key={index}>
            <p>From - {nft.from}</p>
            <p>To - {nft.to}</p>
            <p>Contract Address - {nft.contractAddress}</p>
            <p>Token Name - {nft.tokenName}</p>
            <p>TimeStamp - {nft.timeStamp}</p>
            <hr />
          </div>
        );
      })}
    </Fragment>
  );
}
