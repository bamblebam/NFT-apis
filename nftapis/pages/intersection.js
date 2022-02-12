import { Fragment } from "react";
import { Moralis } from "moralis";

export default function Intersection() {
  // const nfts1 = props.nfts1;
  // console.log("nfts1", nfts1);
  const getnfts = async () => {
    const collection1 = "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e";
    const collection2 = "0xED5AF388653567Af2F388E6224dC7C4b3241C544";
    const option1 = { address: collection1 };
    const nfts1 = await Moralis.Web3API.token.getNFTOwners(option1);
    console.log("nfts1", nfts1);
  };

  return (
    <Fragment>
      <h1>Intersection</h1>
      <button onClick={getnfts}>Get NFTs</button>
    </Fragment>
  );
}
