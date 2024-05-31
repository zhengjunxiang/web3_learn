import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'
import { useState } from 'react'

const ContentComponent = () => {
  const [signature, setSignature] = useState()
  const [valid, setValid] = useState()
  const { activate, deactivate, library, account } = useWeb3React()
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 11155111],
  })

  const contractAddress = '0x19db6381432ef466751f4303526d3b35873b3027'

  const onConnectClicked = async () => {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  const onDisconnectClicked = () => {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  const onMetamaskSignClicked = async () => {
    // Note: messageHash is a string, that is 66-bytes long, to sign the
    //       binary value, we must convert it to the 32 byte Array that
    //       the string represents
    //
    // i.e.
    //   // 66-byte string
    //   "0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba"
    //
    //   ... vs ...
    //
    //  // 32 entry Uint8Array
    //  [ 89, 47, 167, 67, 136, 159, 199, 249, 42, 194, 163,
    //    123, 177, 245, 186, 29, 175, 42, 92, 132, 116, 28,
    //    160, 224, 6, 29, 36, 58, 46, 103, 7, 186]
    // contract address, wallet address
    const message = ethers.solidityPackedKeccak256(
      ['address', 'address'],
      [
        contractAddress,
        account,
      ],
    )
    console.log('message', message)
    const arrayifyMessage = ethers.getBytes(message)
    console.log('arrayifyMessage', arrayifyMessage)
    const flatSignature = await library.getSigner().signMessage(arrayifyMessage)
    setSignature(flatSignature)
    console.log('flatSignature', flatSignature)
  }

  const onPrivateKeySignClicked = async () => {
    const message = ethers.solidityPackedKeccak256(
      ['address', 'address'],
      [
        contractAddress,
        account,
      ],
    )
    console.log(message)
    const arrayifyMessage = ethers.getBytes(message)
    console.log(arrayifyMessage)
    const flatSignature = await new ethers.Wallet(
      process.env.REACT_APP_PRIVATE_KEY,
    ).signMessage(arrayifyMessage)
    console.log(flatSignature)
  }

  const onCallValid = async () => {
    const abi = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "ECDSAInvalidSignature",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "length",
            "type": "uint256"
          }
        ],
        "name": "ECDSAInvalidSignatureLength",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          }
        ],
        "name": "ECDSAInvalidSignatureS",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "isMessageValid",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]

    // 获得provider
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner(account)
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const vaild = await contract.isMessageValid(signature)
    console.log('vaild', vaild)
    console.log('vaild[1]', vaild[1])
    setValid(vaild[1])
  }

  return (
    <div className="flex flex-col items-center pt-10 space-y-3">
      <div className="flex flex-row space-x-3">
        <button
          onClick={onConnectClicked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
        <button
          onClick={onDisconnectClicked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Disconnect Wallet
        </button>
      </div>
      <div>Account: {account || 'NOT CONNECTED'}</div>
      <div className="flex flex-row space-x-3">
        <button
          onClick={onMetamaskSignClicked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign with metamask
        </button>

        <button
          onClick={onPrivateKeySignClicked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign with private key
        </button>
      </div>
      <div>{<div>{signature}</div>}</div>
      <div>
      <button
          onClick={onCallValid}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Valid
        </button>
      </div>
      <div>{valid ? 'true' : 'false'}</div>
    </div>
  )
}
export default ContentComponent
