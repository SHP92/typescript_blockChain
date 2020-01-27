"use strict";
exports.__esModule = true;
var CryptoJS = require("crypto-js"); // to calculate hash
var Block = /** @class */ (function () {
    function Block(index, hash, prevHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    /*
        const block = new Block();
        block.calculateHash();
        처럼 보통은 먼저 생성하고 사용해야 하지만
        new Block();으로 선언되기 전에도
        Block.calculateHash()로 클래스로부터 바로 사용 가능
    */
    Block.calculateHash = function (index, prevHash, date, timestamp) {
        var cryptoHash = CryptoJS.SHA256(index + prevHash + timestamp + date);
        return cryptoHash.toString();
    };
    Block.checkStructure = function (block) { return (typeof block.index === "number"
        && typeof block.hash === "string"
        && typeof block.prevHash === "string"
        && typeof block.data === "string"
        && typeof block.timestamp === "number"); };
    return Block;
}());
var firstBlock = new Block(0, "#12345", "", "first block", 12345);
var blockChain = [firstBlock];
var getLastBlock = function () { return blockChain[blockChain.length - 1]; };
var getNewTimestamp = function () { return Math.round(new Date().getTime() / 1000); };
var getHash = function (block) { return (Block.calculateHash(block.index, block.prevHash, block.data, block.timestamp)); };
var createNewBlock = function (data) {
    var prevBlock = getLastBlock();
    var newTimestamp = getNewTimestamp();
    var newIndex = prevBlock.index + 1;
    var prevHash = prevBlock.hash;
    var newHash = Block.calculateHash(newIndex, prevHash, data, newTimestamp);
    var newBlock = new Block(newIndex, newHash, prevHash, data, newTimestamp);
    if (checkValidation(newBlock, prevBlock)) {
        blockChain.push(newBlock);
        return newBlock;
    }
};
var checkValidation = function (newBlock, prevBlock) {
    if (!Block.checkStructure(newBlock)) {
        return false;
    }
    else if (newBlock.index !== prevBlock.index + 1) {
        return false;
    }
    else if (newBlock.prevHash !== prevBlock.hash) {
        return false;
    }
    else if (newBlock.hash !== getHash(newBlock)) {
        return false;
    }
    return true;
};
createNewBlock('hello');
createNewBlock('bye');
console.log(blockChain);
