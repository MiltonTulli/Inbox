const fs = require("fs");
const path = require("path");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts/Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

// var output = JSON.parse(solc.compile(JSON.stringify(input)));

// module.exports = {
//   inbox: output.contracts["Inbox.sol"].Inbox.evm.bytecode.object,
// };
const output = JSON.parse(solc.compile(JSON.stringify(input)));
module.exports = output.contracts["Inbox.sol"].Inbox;
