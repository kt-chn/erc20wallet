<template>
  <div class="centering_parent">
    <h1>ERC20トークンの残高表示と送金</h1>
    <ui-alert @dismiss="showAlert1 = false" type="error" v-show="showAlert1">Something is wrong!!</ui-alert>
    <ui-alert @dismiss="showAlert2 = false" type="warning" v-show="showAlert2">
      マイナーへの手数料としてETHが少額必要です
      <br />テスト用のETHは
      <a href="https://faucet.rinkeby.io/">Faucet</a>で取得できます。
    </ui-alert>
    <ui-progress-linear color="black" v-show="isLoading"></ui-progress-linear>
    <transition>
      <div v-if="!this.show" key="1">
        <ui-textbox
          v-model="tokenAddress"
          floating-label
          label="ERC20トークンのアドレス"
          @change="checkBalance"
        ></ui-textbox>
        <ui-textbox v-model="privateKey" floating-label label="自分の秘密鍵" @change="checkBalance"></ui-textbox>
      </div>
      <div v-if="this.show" key="2">
        <ui-collapsible :title="tokenBalance + ' ' + tokenName" open ref="collapsible">
          <ui-textbox v-model="toAddress" label="送金先アドレス"></ui-textbox>
          <ui-textbox v-model="transferValue" label="送金額"></ui-textbox>
          <ui-textbox v-model="address" label="送金元アドレス" readonly></ui-textbox>
          <ui-button @click="transfer">Transfer</ui-button>
        </ui-collapsible>
        <ui-collapsible :title="etherBalance + ' ETH (Ether)'">
          <p>ETHの残高確認用</p>
        </ui-collapsible>
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
      tokenAddress: "0x0abcd3ee0378b6bb406cfa8ea4521e7b03b89713",
      privateKey: "",
      address: "",
      tokenName: "",
      tokenDecimals: 0,
      tokenBalance: 0,
      etherBalance: 0,
      toAddress: "",
      transferValue: "",
      // UI-Alert
      showAlert1: false,
      showAlert2: false,
      // UI-Progress-Linear
      isLoading: false
    };
  },
  methods: {
    async checkBalance() {
      try {
        if (this.tokenAddress !== "" && this.privateKey !== "") {
          this.address = erc20Token.privateKeyToAddress(event.target.value);
          await erc20Token.setTokenAddress(this.tokenAddress);
          let tokenInfo = await erc20Token.getTokenInfo();
          this.tokenName = tokenInfo.symbol + " (" + tokenInfo.name + ")";
          this.tokenDecimals = tokenInfo.decimals;
          await this.getBalance();
          this.show = true;
          this.showAlert1 = false;
        }
      } catch (e) {
        this.showAlert1 = true;
      }
    },
    async getBalance() {
          this.tokenBalance = await erc20Token.tokenBalanceOf(this.address);
          this.tokenBalance = this.tokenBalance / 10 ** this.tokenDecimals;
          this.etherBalance = await erc20Token.etherBalancOf(this.address);
          this.etherBalance = Math.floor(this.etherBalance * 10 ** 4) / 10 ** 4;
    },
    async transfer() {
      // ETHが足らなかった時の表示
      if (this.etherBalance === 0) {
        this.showAlert2 = true;
        return;
      } else {
        this.showAlert2 = false;
      }
      try {
        this.isLoading = true;
        await erc20Token.transferERC20Token(this.toAddress, this.transferValue);
        await this.getBalance();
        this.showAlert1 = false;
        this.isLoading = false;
      } catch (e) {
        this.showAlert1 = true;
      }
    }
  }
};
</script>

<style>
.v-enter-active {
  transition: all 1s ease 0s;
}
.v-leave-active {
  transition: all 0.3s ease 0s;
}
.v-leave-active {
  position: absolute;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter {
  transform: translateX(-60px);
}
.v-enter-to,
.v-leave {
  transform: translateX(0);
}
.v-leave-to {
  transform: translateX(60px);
}
</style>