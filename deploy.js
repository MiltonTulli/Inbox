require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { MNEMONIC, INFURA_PROJECT_ID, OWNER_ADDRESS } = process.env;

const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  MNEMONIC,
  `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`
);

const web3 = new Web3(provider);

(async function () {
  console.log("Attempting to deploy from account", OWNER_ADDRESS);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: OWNER_ADDRESS });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
})();
