<template>
  <div>
    <router-link to="/">ERC20トークンの残高表示と送金</router-link>
    <router-link to="/generate">ERC20トークンの発行</router-link>
    <transition mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>