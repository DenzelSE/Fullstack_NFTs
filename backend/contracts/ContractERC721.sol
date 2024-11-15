
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ContractERC721 is ERC721 {
    uint256 public tokenCounter;
    
    constructor() 
    ERC721("Protocol", "PTC"){
        tokenCounter = 0;

    }    
    
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs/QmcYcaJA87KrGwzXAWvHLkgrNNzjhnGs4xvq3S2xbMNp3Q/";
    }

    function _Mint(address recipient) public {
        _safeMint(recipient, tokenCounter);
        tokenCounter++;
    }

}