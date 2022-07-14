const SHA256 = require("crypto-js/sha256")

class Block{
    constructor(index,timestamp,data,previousHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculatieHash()
        this.nonce = 0
    }
    calculatieHash(){
        return SHA256(
            this.index+
            this.timestamp+
            JSON.stringify(this.data)+
            this.previousHash +
            this.nonce
        ).toString()
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty)!==Array(difficulty+1).join('0')){
            this.hash = this.calculatieHash()
            this.nonce++
        }
        console.log('Block mined:' + this.hash)
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 4
    }
    createGenesisBlock(){
        return new Block(0, "2022/01/01", "Genesis block", '0')
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        // newBlock.hash = newBlock.calculatieHash()
        newBlock.mineBlock(this.difficulty)
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
console.log('mining block 1...')
savjeeCoin.addBlock(new Block(1,"2022/01/02", {amount:4}))
console.log('mining block 2...')
savjeeCoin.addBlock(new Block(2,"2022/01/02", {amount:4}))