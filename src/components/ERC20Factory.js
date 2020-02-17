import ERC20Artifact from '../artifacts/erc20.json';


class ERC20Factory {
  constructor(web3) {
    this.wallet = web3.currentProvider.selectedAddress;
    this.contract = new web3.eth.Contract(ERC20Artifact.abi);
    this.contract.contractName = ERC20Artifact.contractName;
    this.contract.compiler = ERC20Artifact.compiler;
    this.contract.bytecode = ERC20Artifact.bytecode;
    this.contract.devdoc = ERC20Artifact.devdoc;
    this.contract.stringifiedAbi = JSON.stringify(ERC20Artifact.abi);
  }

  async create(name, symbol, decimals, initialSupply) {
    // TODO: initialSupply needs to be converted based on decimals
    return this.contract.deploy({
      data: ERC20Artifact.bytecode,
      arguments: [name, symbol, decimals, initialSupply]
    })
    .send({
      from: this.wallet,
      gasPrice: '3000000000', // 3 Gwei
      gas: 3000000
    })
    .on('error', (error) => {
      console.log(error);
    })
    .on('transactionHash', (transactionHash) => {
      console.log(transactionHash);
    })
    .on('receipt', (receipt) => {
      console.log(receipt);
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log(receipt);
    })
    .then(function(newContractInstance){
      console.log(newContractInstance);
    });
  }
}

export default ERC20Factory;
