<template>
  <div class="home">
    <p>{{this.$store.state.ping}}</p>
    <div class="client-size">
      <p>Width:{{this.$store.state.client.width}}</p>
      <p>Weight:{{this.$store.state.client.height}}</p>
    </div>
    <train-react></train-react>
  </div>
</template>

<style lang="stylus" scoped>
.client-size
  max-width 100%
  background-color #999
</style>