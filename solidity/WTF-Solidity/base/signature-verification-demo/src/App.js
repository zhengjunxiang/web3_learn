import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import ContentComponent from './ContentComponent'
import ERC20Component from './ERC20Component'

function App() {
  const getLibrary = (provider) => {
    return new Web3Provider(provider);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ContentComponent />
      <ERC20Component />
    </Web3ReactProvider>
  )
}

export default App
