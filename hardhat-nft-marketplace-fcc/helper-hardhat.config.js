const networkConfig = {
    31337: {
        name: "localhost",
        ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        mintFee: "10000000000000000", // 0.01 ETH
        callbackGasLimit: "500000", // 500,000 gas
        subscriptionId: "885", // add your ID here!
        mintFee: "100000000000000",//0.0001ETH
    },
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one is ETH/USD contract on Kovan

    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        callbackGasLimit: "500000", // 500,000 gas
        mintFee: "100000000000000", // 0.0001 ETH
        subscriptionId: "885", // add your ID here!
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"
    },
}


const DECIMALS = "18"
const INITIAL_PRICE = "100000000000000"
//ethers.utils.parseUnits("2000", ethers)
const developmentChains = ["hardhat", "localhost"]
const frontEndContractsFile = "../hardhat-nft-marketplace-thegraph-fcc/constants/networkMapping.json"
const frontEndAbiLocation = "../hardhat-nft-marketplace-thegraph-fcc/constants"

module.exports = {
    networkConfig,
    developmentChains,
    frontEndContractsFile,
    frontEndAbiLocation,
    DECIMALS,
    INITIAL_PRICE,
}