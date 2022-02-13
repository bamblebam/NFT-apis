// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract BambleNFTs is ERC721URIStorage, Ownable {
    string _baseTokenURI;
    uint256 public price = 0.1 ether;
    uint256 public tokenIds;

    constructor(string memory baseURI) ERC721("BamblebamNFTs","BAMB"){
        _baseTokenURI = baseURI;
    }

    function mint() public payable {
        require(msg.value>=price);
        tokenIds+=1;
        _safeMint(msg.sender,tokenIds);
        _setTokenURI(tokenIds,_baseTokenURI);
    }

    function withdraw() public onlyOwner{
        address _owner=owner();
        uint256 amount=address(this).balance;
        (bool sent,)=_owner.call{value:amount}("");
        require(sent,"Failed");
    }

    recieve() external payable{}
    fallback() external payable{}
}
