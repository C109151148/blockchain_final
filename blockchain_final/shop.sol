// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MyToken {
    address public minter;
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) private  sentRecords; // 存儲每個地址的發送記錄
    mapping(address => mapping(address => uint)) private  receivedRecords; // 存儲每個地址的收款記錄
    mapping(address => uint[]) private  userSentRecords; // 存儲每個地址的發送記錄索引
    mapping(address => uint[]) private  userReceivedRecords; // 存儲每個地址的收款記錄索引
    SentRecord[] private allSentRecords; // 存儲所有發送記錄
    ReceivedRecord[] private allReceivedRecords; // 存儲所有收款記錄

    event TokenSent(address from, address to, uint amount);
    event TokenReceived(address from, address to, uint amount);

    struct SentRecord {
        address sender;
        address receiver;
        uint amount;
        uint timestamp;
    }

    struct ReceivedRecord {
        address sender;
        address receiver;
        uint amount;
        uint timestamp;
    }

    constructor() {
        minter = msg.sender;
    }

    function mint(address receiver, uint amount) public payable {
        require(msg.sender == minter, "Only minter can call this function");
        balances[receiver] += amount;
    }

    error TransferError(uint requested, uint available);

    function send(address receiver, uint amount) public {
        if (amount > balances[msg.sender]) {
            revert TransferError({
                requested: amount,
                available: balances[msg.sender]
            });
        }
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // 將發送記錄存儲到數組和映射中
        SentRecord memory sentRecord = SentRecord(msg.sender, receiver, amount, block.timestamp);
        allSentRecords.push(sentRecord);
        sentRecords[msg.sender][receiver] += amount;
        userSentRecords[msg.sender].push(allSentRecords.length - 1);

        // 將收款記錄存儲到數組和映射中
        ReceivedRecord memory receivedRecord = ReceivedRecord(msg.sender, receiver, amount, block.timestamp);
        allReceivedRecords.push(receivedRecord);
        receivedRecords[receiver][msg.sender] += amount;
        userReceivedRecords[receiver].push(allReceivedRecords.length - 1);

        emit TokenSent(msg.sender, receiver, amount);
        emit TokenReceived(msg.sender, receiver, amount);
    }

    function getSentRecordCount(address user) public view returns (uint) {
        return userSentRecords[user].length;
    }

    function getReceivedRecordCount(address user) public view returns (uint) {
        return userReceivedRecords[user].length;
    }

    function getSentRecord(address user, uint index) public view returns (address sender, address receiver, uint amount, uint timestamp) {
        require(index < userSentRecords[user].length, "Invalid index");
        uint recordIndex = userSentRecords[user][index];
        SentRecord memory record = allSentRecords[recordIndex];
        return (record.sender, record.receiver, record.amount, record.timestamp);
    }

    function getReceivedRecord(address user, uint index) public view returns (address sender, address receiver, uint amount, uint timestamp) {
        require(index < userReceivedRecords[user].length, "Invalid index");
        uint recordIndex = userReceivedRecords[user][index];
        ReceivedRecord memory record = allReceivedRecords[recordIndex];
        return (record.sender, record.receiver, record.amount, record.timestamp);
    }
}