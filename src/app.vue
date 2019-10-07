<template>
  <div>
    <router-link to="/">ERC20トークンの残高表示と送金</router-link>
    <router-link to="/generate">ERC20トークンの発行</router-link>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {};
</script>
