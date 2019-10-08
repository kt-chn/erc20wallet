<template>
  <div>
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