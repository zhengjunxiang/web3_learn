const VendingMachine = artifacts.require('VendingMachine');

contract("VendingMachine", (accounts) => {
  before(async () => {
    instance = await VendingMachine.deployed()
  })

  it('ensure that the starting balance of the vending machine is 100', async () => {
    let balance = await instance.getVendingMachineBalance()
    assert.equal(balance, 100, 'The inital balance shoule be 100 dounts.')
  })

  it('ensure the balance of the vending machine can be update.', async () => {
    await instance.restock(100)
    let balance = await instance.getVendingMachineBalance()
    assert.equal(balance, 200, 'The inital balance shoule be 200 dounts.')
  })

  it('allows dounts to be purchased', async () => {
    await instance.purchase(1, { from: accounts[0], value: web3.utils.toWei('3', 'ether')})
    let balance = await instance.getVendingMachineBalance()
    assert.equal(balance, 199, 'The inital balance shoule be 199 dounts.')
  })
})