<template>
  <div class="centering_parent">
    <h1>ERC20トークンの発行</h1>
    <transition mode="out-in">
      <div v-if="!this.show" key="1">
        <div class="box">
          <h2>設定</h2>
          <div class="innerBox">
            <ui-textbox v-model="tokenName" label="トークンの名称"></ui-textbox>
            <ui-textbox v-model="tokenSymbol" label="トークンの単位表記"></ui-textbox>
            <ui-textbox v-model="tokenDecimals" label="小数点の桁数"></ui-textbox>
            <ui-textbox v-model="tokenValue" label="発行枚数"></ui-textbox>
            <ui-textbox v-model="privateKey" label="自分の秘密鍵"></ui-textbox>
            <ui-button @click="generate">Generate</ui-button>
          </div>
        </div>
      </div>
      <div v-if="this.show" key="2">
        <p>{{contractAddress}}</p>
        <p>{{transactionHash}}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import Erc20Token from "./web3.js";
const erc20Token = new Erc20Token();
export default {
  data() {
    return {
      show: false,
      tokenName: "",
      tokenSymbol: "",
      tokenDecimals: "",
      tokenValue: "",
      privateKey: "",
      contractAddress: "",
      transactionHash: ""
    };
  },
  methods: {
    async generate() {
      let re = await erc20Token.deployContract(
        this.tokenName,
        this.tokenSymbol,
        this.tokenDecimals,
        this.tokenValue,
        this.privateKey
      );
      this.contractAddress = re.contractAddress;
      this.transactionHash = re.transactionHash;
      this.show = true;
    }
  }
};
</script>
