<template>
    <div class="centering_parent">
        <h1>ERC20トークンの発行</h1>
        <ui-alert @dismiss="showAlert1 = false" type="error" v-show="showAlert1"
            >Something is wrong!!</ui-alert
        >
        <ui-progress-linear
            color="black"
            v-show="isLoading"
        ></ui-progress-linear>
        <transition mode="out-in">
            <div v-if="!this.show" key="1">
                <div class="box">
                    <h2>設定</h2>
                    <div class="innerBox" v-if="!isLoading">
                        <ui-textbox
                            v-model="tokenName"
                            label="トークンの名称"
                        ></ui-textbox>
                        <ui-textbox
                            v-model="tokenSymbol"
                            label="トークンの単位表記"
                        ></ui-textbox>
                        <ui-textbox
                            v-model="tokenDecimals"
                            label="小数点の桁数"
                        ></ui-textbox>
                        <ui-textbox
                            v-model="tokenValue"
                            label="発行枚数"
                        ></ui-textbox>
                        <ui-textbox
                            v-model="privateKey"
                            label="自分の秘密鍵"
                        ></ui-textbox>
                        <ui-button @click="generate">Generate</ui-button>
                    </div>
                    <lottie
                        v-if="isLoading"
                        :options="defaultOptions"
                        :height="300"
                        :width="300"
                    />
                </div>
            </div>
            <div v-if="this.show" key="2">
                <div class="box">
                    <h2>情報</h2>
                    <div class="innerBox">
                        <p>
                            {{ tokenValue }}{{ tokenSymbol }}({{ tokenName }})
                            の発行に成功しました
                            <br />
                            <br />ERC20トークンのアドレス
                            <br />
                            {{ contractAddress }}
                            <br />
                            <br />Etherscanでトランザクションを
                            <a
                                :href="
                                    'https://rinkeby.etherscan.io/tx/' +
                                        transactionHash
                                "
                                target="_blank"
                                >確認</a
                            >
                        </p>
                    </div>
                </div>
            </div>
        </transition>
        <router-link tag="h3" to="/">
            <a>ERC20トークンの残高表示と送金</a>
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
            tokenName: "",
            tokenSymbol: "",
            tokenDecimals: "",
            tokenValue: "",
            privateKey: "",
            contractAddress: "",
            transactionHash: "",
            showAlert1: false,
            isLoading: false,
            defaultOptions: { animationData: animationData, loop: true }
        };
    },
    methods: {
        async generate() {
            try {
                this.isLoading = true;
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
                this.isLoading = false;
            } catch (e) {
                this.showAlert1 = true;
                this.isLoading = false;
            }
        }
    }
};
</script>
