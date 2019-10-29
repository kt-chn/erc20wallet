<template>
    <div class="centering_parent">
        <h1>ERC20トークンの残高表示と送金</h1>
        <ui-alert @dismiss="showAlert1 = false" type="error" v-show="showAlert1"
            >Something is wrong!!</ui-alert
        >
        <ui-alert
            @dismiss="showAlert2 = false"
            type="warning"
            v-show="showAlert2"
        >
            マイナーへの手数料としてETHが少額必要です
            <br />テスト用のETHは
            <a href="https://faucet.rinkeby.io/">Faucet</a>で取得できます。
        </ui-alert>
        <ui-progress-linear
            color="black"
            v-show="isLoading"
        ></ui-progress-linear>
        <transition mode="out-in">
            <div v-if="!this.show" key="1">
                <div class="box">
                    <h2>ログイン</h2>
                    <div class="innerBox">
                        <ui-textbox
                            v-model="tokenAddress"
                            floating-label
                            label="ERC20トークンのアドレス"
                        ></ui-textbox>
                        <ui-textbox
                            v-model="privateKey"
                            floating-label
                            label="自分の秘密鍵"
                        ></ui-textbox>
                        <ui-button @click="login">Login</ui-button>
                    </div>
                </div>
            </div>
            <div v-if="this.show" key="2">
                <div class="box">
                    <h2>{{ tokenBalance + " " + tokenName }}</h2>
                    <div class="innerBox" v-if="!isLoading">
                        <ui-textbox
                            v-model="toAddress"
                            label="送金先アドレス"
                        ></ui-textbox>
                        <ui-textbox
                            v-model="transferValue"
                            label="送金額"
                        ></ui-textbox>
                        <ui-textbox
                            v-model="address"
                            label="送金元アドレス"
                            readonly
                        ></ui-textbox>
                        <ui-button @click="transfer">Transfer</ui-button>
                    </div>
                    <lottie
                        v-if="isLoading"
                        :options="defaultOptions"
                        :height="300"
                        :width="300"
                    />
                </div>

                <div class="box">
                    <h2>{{ etherBalance + " ETH (Ether)" }}</h2>
                </div>
            </div>
        </transition>
        <router-link to="/generate" tag="h3">
            <a>ERC20トークンの発行</a>
        </router-link>
    </div>
</template>

<script>
import Erc20Token from "./web3.js";
const erc20Token = new Erc20Token();

import Lottie from "./lottie.vue";
import * as animationData from "./assets/check.json";

export default {
    components: {
        Lottie
    },
    data() {
        return {
            show: false,
            tokenAddress: "",
            privateKey: "",
            address: "",
            tokenName: "",
            tokenDecimals: 0,
            tokenBalance: 0,
            etherBalance: 0,
            toAddress: "",
            transferValue: "",
            showAlert1: false,
            showAlert2: false,
            isLoading: false,
            defaultOptions: { animationData: animationData, loop: true }
        };
    },
    methods: {
        async login() {
            try {
                if (this.tokenAddress !== "" && this.privateKey !== "") {
                    this.address = erc20Token.privateKeyToAddress(
                        this.privateKey
                    );
                    await erc20Token.setTokenAddress(this.tokenAddress);
                    let tokenInfo = await erc20Token.getTokenInfo();
                    this.tokenName =
                        tokenInfo.symbol + " (" + tokenInfo.name + ")";
                    this.tokenDecimals = tokenInfo.decimals;
                    await this.getBalance();
                    this.show = true;
                    this.showAlert1 = false;
                }
            } catch (e) {
                console.log(e);
                this.showAlert1 = true;
            }
        },
        async getBalance() {
            this.tokenBalance = await erc20Token.tokenBalanceOf(this.address);
            this.tokenBalance = this.tokenBalance / 10 ** this.tokenDecimals;
            this.etherBalance = await erc20Token.etherBalancOf(this.address);
            this.etherBalance =
                Math.floor(this.etherBalance * 10 ** 4) / 10 ** 4;
        },
        async transfer() {
            if (this.etherBalance === 0) {
                this.showAlert2 = true;
                return;
            } else {
                this.showAlert2 = false;
            }
            try {
                this.isLoading = true;
                await erc20Token.transferERC20Token(
                    this.toAddress,
                    this.transferValue
                );
                await this.getBalance();
                this.toAddress = "";
                this.transferValue = "";
                this.isLoading = false;
            } catch (e) {
                this.showAlert1 = true;
                this.isLoading = false;
            }
        }
    }
};
</script>

<style></style>
