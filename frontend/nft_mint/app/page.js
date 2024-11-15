import Image from "next/image";
import {ContractABI} from "./contract/ContractERC721.json";


export default function Home() {
  console.log(ContractABI);
  
  const { ethers } = require("ethers");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const abi = ContractABI.abi;

  const contract = new ethers.Contract(contractAddress, abi, provider);
  console.log(contract);

    // async function getContractData() {
    //   const data = await contract.someFunction();  // Replace with actual contract method
    //   console.log("Contract Data: ", data);
    // }

    getContractData();


  return (

    <p>Mint your favorite protocol</p>

  );
}
