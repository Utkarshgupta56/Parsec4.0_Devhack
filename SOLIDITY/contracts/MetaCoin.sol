// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	struct Event {
        address owner;
        string title;
        string description;
        uint256[] candidates;
    }
     struct Certificate {
        address owner;
        string certificateData; // Assuming the certificate is represented as a string
    }
    mapping(uint256 => Event) public events;
    uint256 numberOfEvents = 0;
    function createEvent(
        address _owner,
        string memory _title,
        string memory _description
    ) public returns (uint256) {
        Event storage ent = events[numberOfEvents];
        ent.owner = _owner;
        ent.title = _title;
        ent.description = _description;
        numberOfEvents++;
        return numberOfEvents - 1;
    }
    function getEvents() public view returns (Event[] memory) {
        Event[] memory allEvents = new Event[](numberOfEvents);
        for (uint256 i = 0; i < numberOfEvents; i++) {
            allEvents[i] = events[i];
        }
        return allEvents;
    }
}
