import { Fragment } from "react";
import { useState, useEffect } from "react";
import { Moralis } from "moralis";
// import * as Web3 from "web3";
// import { OpenSeaPort, Network } from "opensea-js";
// import { OrderSide } from "opensea-js/lib/types";

export default function OpenListing() {
  const [nfts, setnfts] = useState([]);
  const address = "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e";
  // This example provider won't let you make transactions, only read-only calls:
  //   const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");

  //   const seaport = new OpenSeaPort(provider, {
  //     networkName: Network.Main,
  //     apiKey: "5bec8ae0372044cab1bef0d866c98618",
  //   });
  const getListing = async () => {
    const options = { address: address };
    nfts = await Moralis.Web3API.token.getNFTTrades(options);
    const response = nfts.result;
    setnfts(response);
    console.log(response);

    // const { orders, count } = await seaport.api.getOrders({
    //   asset_contract_address: address,
    //   side: OrderSide.Buy,
    // });
    // console.log(orders);
    // console.log(count);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getListing();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <h1>Bamble</h1>
      <button onClick={getListing}>nfts</button>
      {nfts.length > 0 && <h2>nfts</h2>}
      {nfts.map((nft, index) => {
        return (
          <div key={index}>
            <p>token address - {nft.token_address}</p>
            <p>transaction hash - {nft.transaction_hash}</p>
            <hr />
          </div>
        );
      })}
    </Fragment>
  );
}
