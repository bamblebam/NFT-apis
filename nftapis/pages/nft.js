import { Contract, providers, utils } from "ethers";
import { useEffect, useState, useRef, Fragment } from "react";
import Web3Moddal from "web3modal";

const ABI = require("../artifacts/contracts/Nft.sol/BambleNFTs.json").abi;
const CONTRACT_ADDRESS = "0x4Dc082F0c8cC156684b612dA9ff9Fe6021f8F048";

export default function Nfts() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const Web3ModalRef = useRef();

  //Get the provider or signer
  const getProviderOrSigner = async (isSigner = false) => {
    const provider = await Web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    //Check if user is connected to the desired network
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      console.log("Change to Rinkeby");
      window.alert("Please connect to Rinkeby network");
      throw new Error("Please connect to Rinkeby network");
    }

    //signer
    if (isSigner) {
      const signer = await web3Provider.getSigner();
      return signer;
    }

    return web3Provider;
  };

  //connect wallet
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  //   Function to mint the nft
  const mint = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(CONTRACT_ADDRESS, ABI, signer);
      //mint the nft
      const tx = await nftContract.mint({ value: utils.parseEther("0.1") });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("NFT minted successfully");
    } catch (error) {
      console.log("error");
    }
  };

  //useEffect for wallet connection
  useEffect(() => {
    if (!walletConnected) {
      Web3ModalRef.current = new Web3Moddal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }),
    [walletConnected];

  const renderContent = () => {
    if (!walletConnected) {
      return <button onClick={connectWallet}>Connect Wallet</button>;
    }
    if (walletConnected && !loading) {
      return <button onClick={mint}>Mint NFT</button>;
    }
  };

  return (
    <Fragment>
      <h1>Nfts</h1>
      {renderContent()}
      {loading && <h1>Loading...</h1>}
    </Fragment>
  );
}
