"use client"
import { useState } from "react";
import { ethers } from "ethers";
import AvengersNftABI from "../contract/AvengersNFT.json";
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [minting, setMinting] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    }
  };

  const mintNFT = async () => {
    try {
      setMinting(true);
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, AvengersNftABI.abi, signer);

        const tx = await contract.mint(1, { value: ethers.utils.parseEther("0.0002") });
        await tx.wait();
        alert("NFT Minted!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black-900 text-white flex flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Avengers Assamble</h1>
      {account ? (
        <>
          <p className="mb-4">Connected Wallet: {account}</p>
          <button
            onClick={mintNFT}
            className={`px-4 py-2 bg-blue-500 rounded ${
              minting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={minting}
          >
            {minting ? "Minting..." : "Mint NFT"}
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-green-500 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
