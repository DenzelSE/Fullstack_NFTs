const {ethers} = require("hardhat");

async function main() {
  const baseURI = "ipfs://QmTYWKogeU2MALmVaAUFFM8LjNdJs8PULQpiRsSyoCkag9/";

  const AvengersNFT = await ethers.getContractFactory("AvengersNFTContract");

  const avengersNFTDeployed = await AvengersNFT.deploy(baseURI);

  await avengersNFTDeployed.waitForDeployment();

  console.log("AvengersNFT deployed to:", avengersNFTDeployed.target);
}

main()
    .catch((error) => {console.error(error);
        process.exit(1);
});
