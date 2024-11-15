import Image from "next/image";
import {ContractABI} from "./contract/ContractERC721.json";
import MyConnectButton from "./components/ConnectButton";
import { useAddress, useMetamask, useContract } from "thirdweb/react";


export default function Home() {
  // const connectWithMetamask = useMetamask();
  const address = useAddress(); 
  const { contract } = useContract("0xebdc164abd90c6a4100b909d5addbcad", "nft-drop");
  const [isMinting, setIsMinting] = useState(false);


  const mintNFT = async () => {
    if (!contract) {
      alert("Contract not found!");
      return;
    }

    try {
      setIsMinting(true);
      const tx = await contract.claim(1); 
      console.log("Minted:", tx);
      alert("NFT Minted Successfully!");
    } catch (error) {
      console.error("Minting failed", error);
      alert("Minting failed. See console for details.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <><p>Mint your favorite protocol</p>
      {!address ? (
        <MyConnectButton />
      ) : (
        <div>
          <p>Connected: {address}</p>
          <button onClick={mintNFT} style={buttonStyle} disabled={isMinting}>
            {isMinting ? "Minting..." : "Mint NFT"}
          </button>
        </div>
      )}
      </>
    </div>
  );

}
