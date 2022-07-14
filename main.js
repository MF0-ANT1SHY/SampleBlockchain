const SHA256 = require("crypto-js/sha256")

class Block{
    constructor(index,timestamp,data,previousHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculatieHash()
    }
    calculatieHash(){
        return SHA256(
            this.index+
            this.timestamp+
            JSON.stringify(this.data)+
            this.previousHash
        ).toString()
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()]
    }
    createGenesisBlock(){
        return new Block(0, "2022/01/01", "Genesis block", '0')
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculatieHash()
        this.chain.push(newBlock)
    }
    isChainValid(){
        for(let i = 1; i< this.chain.length;i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]
            if (currentBlock.previousHash !== previousBlock.calculatieHash()){
                return false
            }
            if (currentBlock.hash !== currentBlock.calculatieHash()){
                return false
            }
            if(previousBlock.hash !== previousBlock.calculatieHash()){
                return false
            }
            return true
        }
    }
}

let savjeeCoin = new Blockchain()
savjeeCoin.addBlock(new Block(1,"2022/01/02", {amount:4}))
savjeeCoin.addBlock(new Block(2,"2022/01/02", {amount:4}))
console.log(savjeeCoin)
console.log(savjeeCoin.isChainValid())