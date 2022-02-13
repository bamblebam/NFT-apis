import { Fragment } from "react";
import { useState } from "react";
import { Moralis } from "moralis";
// const sdk = require("api")("@opensea/v1.0#1j3wv35kyd6wqwc");

export default function Listing() {
  //   const url =
  //     "https://api.opensea.io/api/v1/events?asset_contract_address=0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e&only_opensea=false";

  async function getEvents() {
    const owner = "0x213178de4cc876a18a9cb6f3ed6ea71d0856601a";
    const option = { address: owner };
    const nfts = await Moralis.Web3API.account.getNFTs(option);
    console.log(nfts);
  }
  return (
    <Fragment>
      <h1>Listing</h1>
      <button onClick={getEvents}>nft</button>
    </Fragment>
  );
}
