import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useState } from 'react'

const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol_",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
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
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const ERC20Component = () => {
  const [amount, setAmount] = useState()
  const [balanceAmount, setBalanceAmount] = useState()
  const [transferAmount, setTransferAmount] = useState()
  const [transferAddress, setTransferAddress] = useState()
  const [balanceAddress, setBalanceAddress] = useState()
  const { account } = useWeb3React()

  const contractAddress = '0xd7FbF7bE5b0876C252be14fDAaD39Bb00D6569b9'

  const onMint = async () => {
    // 获得provider
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner(account)
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      await contract.mint(amount)
    } catch(err) {
      console.log('err', err)
    }
  }

  const onTransfer = async () => {
    // 获得provider
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner(account)
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      await contract.transfer(transferAddress, transferAmount)
    } catch(err) {
      console.log('err', err)
    }
  }

  const onBalanceOf = async () => {
    // 获得provider
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner(account)
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const balanceAmount = await contract.balanceOf(balanceAddress)
      setBalanceAmount(ethers.formatUnits(balanceAmount, 0));
    } catch(err) {
      console.log('err', err)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center pt-10 space-y-3">
        <div className="flex flex-row space-x-3">
          <div>
            Amount: <input value={amount} onChange={(e) => {
              setAmount(e.target.value)
            }} />
            <button

              onClick={onMint}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Mint
            </button>
          </div>

          <div>
            Amount:
            <input value={transferAmount} onChange={(e) => {
              setTransferAmount(e.target.value)
            }} />
            Transfer:
            <input value={transferAddress} onChange={(e) => {
              setTransferAddress(e.target.value)
            }} />
            <button
              onClick={onTransfer}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Transfer
            </button>
          </div>
        </div>

        <div className="flex flex-row space-x-3">
          <div className="flex flex-row space-x-3">
            <div>
              <input value={balanceAddress} onChange={(e) => {
                console.log('e.target.value', e.target.value)
                setBalanceAddress(e.target.value)
              }} />
              <button
                onClick={onBalanceOf}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                BalanceOf
              </button>
              <div>{balanceAmount}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ERC20Component
