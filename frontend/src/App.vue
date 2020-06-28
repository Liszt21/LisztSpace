<template>
  <div id="app">
    <core-header></core-header>
    <core-main></core-main>
    <core-footer></core-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.$store.state.client.width = document.body.clientWidth;
    this.$store.state.client.height = document.body.clientHeight;
    window.onresize = () => {
      return (() => {
        this.$store.state.client.width = document.body.clientWidth;
        this.$store.state.client.weight = document.body.clientHeight;
      })();
    };
  },
  computed: {
    client() {
      return {
        width: this.$store.state.client.width,
        height: this.$store.state.client.height
      }
    }
  }
}
</script>

<style lang="stylus">
primary = #409EFF

html, body
  margin 0
  padding 0
  background-color #efefef
  height 100%

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  height 100%
</style>
