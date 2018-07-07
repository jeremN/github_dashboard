<template>
  <main class="content">
    <router-view></router-view>
  </main>
</template>

<script>

export default {

}
</script>

<style lang="scss">
  :root {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
  }
</style>
