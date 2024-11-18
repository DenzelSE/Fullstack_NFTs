// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract AvengersNFT is ERC721Enumerable{

    uint256 public constant MAX_SUPPLY = 10;
    uint256 public constant PRICE = 0.001 ether;
    uint256 public constant MAX_PER_WALLET = 5;

    string private _baseTokenURI;

    mapping(address => uint256) public walletMints;

    constructor() ERC721("AvengersNFT", "AVN") {
        _baseTokenURI = "ipfs://QmTYWKogeU2MALmVaAUFFM8LjNdJs8PULQpiRsSyoCkag9/";
    }

    function mint(uint256 _amount) external payable {
        require(totalSupply() + _amount <= MAX_SUPPLY, "Exceeds max supply");
        require(walletMints[msg.sender] + _amount <= MAX_PER_WALLET, "Exceeds wallet limit");
        require(msg.value >= PRICE * _amount, "Ether sent is not correct");

        walletMints[msg.sender] += _amount;

        for (uint256 i = 0; i < _amount; i++) {
            uint256 tokenId = totalSupply() + 1;
            _safeMint(msg.sender, tokenId);
        }
    }

    function setBaseURI(string memory baseURI) public {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
