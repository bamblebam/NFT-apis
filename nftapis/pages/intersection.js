import { Fragment } from "react";
import { useState } from "react";
import { Moralis } from "moralis";

export default function Intersection() {
  const [nfts, setnfts] = useState([]);
  const [collection1, setcollection1] = useState("");
  const [collection2, setcollection2] = useState("");
  const getnfts = async (e) => {
    console.log("getnfts");
    e.preventDefault();
    //addresses of the 2 collections doodle and azuki
    // const collection1 = "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e";
    // const collection2 = "0xED5AF388653567Af2F388E6224dC7C4b3241C544";

    //get the first collection
    const option1 = { address: collection1 };
    const nfts1 = await Moralis.Web3API.token.getNFTOwners(option1);
    const response1 = nfts1.result;
    //get the second collection
    const option2 = { address: collection2 };
    const nfts2 = await Moralis.Web3API.token.getNFTOwners(option2);
    const response2 = nfts2.result;
    //merge the 2 lists
    const ids = new Set();
    response1.forEach((element) => {
      ids.add(element.owner_of);
    });
    const nfts = [];
    response2.forEach((element) => {
      if (ids.has(element.owner_of)) {
        nfts.push(element);
      }
    });
    setnfts(nfts);
    console.log(nfts);
  };

  return (
    <Fragment>
      <h1>Intersection</h1>
      <form onSubmit={getnfts}>
        <label for="collection1">Collection1</label>
        <input
          type="text"
          name="collection1"
          id="collection1"
          onChange={(e) => setcollection1(e.target.value)}
        />
        <label for="collection2">Collection2</label>
        <input
          type="text"
          name="collection2"
          id="collection2"
          onChange={(e) => setcollection2(e.target.value)}
        />
        <button type="submit">Get NFTs</button>
      </form>
      {nfts.map((nft, index) => {
        return (
          <div key={index}>
            <p>{nft.owner_of}</p>
            <p>{nft.token_id}</p>
          </div>
        );
      })}
    </Fragment>
  );
}
