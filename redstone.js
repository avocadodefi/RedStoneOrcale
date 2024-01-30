const Web3 = require('web3');
const web3 = new Web3('https://api.avax.network/ext/bc/C/rpc');

const contractABI = [
  [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_contractOwner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_diamondCutFacet",
        "type": "address"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipProposalAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "proposed",
        "type": "address"
      }
    ],
    "name": "OwnershipProposalCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "newPauseAdmin",
        "type": "address"
      }
    ],
    "name": "PauseAdminOwnershipProposalAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "pauseAdmin",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "proposed",
        "type": "address"
      }
    ],
    "name": "PauseAdminOwnershipProposalCreated",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "acceptBeaconOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "acceptBeaconPauseAdminOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "methodSig",
        "type": "bytes4"
      }
    ],
    "name": "canBeExecutedWhenPaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "funcSignature",
        "type": "bytes4"
      }
    ],
    "name": "implementation",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "implementation",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "proposeBeaconOwnershipTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newPauseAdmin",
        "type": "address"
      }
    ],
    "name": "proposeBeaconPauseAdminOwnershipTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4[]",
        "name": "methodSigs",
        "type": "bytes4[]"
      },
      {
        "internalType": "bool[]",
        "name": "values",
        "type": "bool[]"
      }
    ],
    "name": "setPausedMethodExemptions",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
];
const contractAddress = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'; // Contract address

const contract = new web3.eth.Contract(contractABI, contractAddress);

const data = contract.methods.deposit().encodeABI();

const tx = {
    to: contractAddress,
    data: data,
    value: web3.utils.toWei('0.01', 'ether'), // 0.01 AVAX
    gas: 21000,
};

for (let i = 0; i < 1000; i++) {
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction ${i} submitted with ID ${receipt.transactionHash}`);
}
