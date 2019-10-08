pragma solidity ^0.5.10;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract ERC20Token is ERC20, ERC20Detailed{
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _value) ERC20Detailed( _name, _symbol, _decimals) public {
        _mint( msg.sender, _value);
    }
}