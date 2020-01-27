import * as CryptoJS from 'crypto-js'; // to calculate hash

class Block {
    public index :number;
    public hash :string;
    public prevHash :string;
    public data :string;
    public timestamp :number;

    /*
        const block = new Block();
        block.calculateHash();
        처럼 보통은 먼저 생성하고 사용해야 하지만
        new Block();으로 선언되기 전에도
        Block.calculateHash()로 클래스로부터 바로 사용 가능
    */
    static calculateHash = (
        index :number
        , prevHash :string
        , date :string
        , timestamp :number
    ) :string => {
        const cryptoHash = CryptoJS.SHA256(index + prevHash + timestamp + date);
        return cryptoHash.toString();
    }

    static checkStructure = (block :Block) : boolean => (
        typeof block.index === "number"
        && typeof block.hash === "string"
        && typeof block.prevHash === "string"
        && typeof block.data === "string"
        && typeof block.timestamp === "number"
    )

    constructor(
        index :number
        , hash :string
        , prevHash :string
        , data :string
        , timestamp :number
    ){
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const firstBlock :Block = new Block(0, "#12345", "", "first block", 12345);
let blockChain :Block[] = [firstBlock];

const getLastBlock = () :Block => blockChain[blockChain.length - 1];
const getNewTimestamp = () :number => Math.round(new Date().getTime() / 1000);
const getHash = (block :Block) :string => (
    Block.calculateHash(
        block.index, block.prevHash, block.data, block.timestamp
    )
)

const createNewBlock = (data :string) :Block => {
    const prevBlock :Block = getLastBlock();
    const newTimestamp :number = getNewTimestamp();
    const newIndex :number = prevBlock.index + 1;
    const prevHash :string = prevBlock.hash;
    const newHash :string = Block.calculateHash(
        newIndex, prevHash, data, newTimestamp
    );

    const newBlock :Block = new Block(
        newIndex, newHash, prevHash, data, newTimestamp
    );

    if (checkValidation(newBlock, prevBlock)) {
        blockChain.push(newBlock);
        return newBlock;
    }
}

const checkValidation = (newBlock :Block, prevBlock :Block) :boolean => {
    if (!Block.checkStructure(newBlock)) {
        return false;
    } else if (newBlock.index !== prevBlock.index + 1) {
        return false;
    } else if (newBlock.prevHash !== prevBlock.hash) {
        return false;
    } else if (newBlock.hash !== getHash(newBlock)) {
        return false;
    }

    return true;
}

createNewBlock('hello'); createNewBlock('bye');
console.log(blockChain);
export {};