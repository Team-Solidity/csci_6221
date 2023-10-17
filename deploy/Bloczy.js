const {network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const name = "Test Bloczy NFT"
    const symbol = "BloNFT"

    const ourToken = await deploy("BloczyNFT", {
      from: deployer,
      args: [name, symbol],
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`Token deployed at ${ourToken.address}`)

    if (process.env.ETHERSCAN_API_KEY) 
    {
      await verify(ourToken.address, [name, symbol])
    }
  }
  
module.exports.tags = ["all", "token", "bloczy"]