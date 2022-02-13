import { Fragment } from "react";
import { useState } from "react";
import { Moralis } from "moralis";
const axios = require("axios");
// const sdk = require("api")("@opensea/v1.0#1j3wv35kyd6wqwc");

export default function Listing() {
  //   const url =
  //     "https://api.opensea.io/api/v1/events?asset_contract_address=0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e&only_opensea=false";

  async function getEvents() {
    const owner = "0x213178de4cc876a18a9cb6f3ed6ea71d0856601a";
    // const option = { address: owner };
    // const nfts = await Moralis.Web3API.account.getNFTs(option);
    const nfts = await axios.get(
      `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${owner}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=YourApiKeyToken`
    );
    console.log("nfts");
    console.log(nfts);
  }
  return (
    <Fragment>
      <h1>Listing</h1>
      <button onClick={getEvents}>nft</button>
    </Fragment>
  );
}
