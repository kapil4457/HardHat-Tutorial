/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY ="WeN82nvojMffBjVseKY-n3ucKJQe8h_s";
const RINKEY_PRIVATE_KEY="d40712e5757c34405bf241750e89d3831be2b7ae2136eaeb86d647247d7f727f";

module.exports = {
  solidity: "0.8.9",
  networks:{
    rinkeyby:{
      url :`https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts : [`0x${RINKEY_PRIVATE_KEY}`]
    }
  }
};
