<template>
  <div class="client-info">
    <p>ClientWidth {{clientWidth}}</p>
    <p>ClientHeight {{client.height}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      client: {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    }
  },
  computed:{
    clientWidth() {
        return document.body.clientWidth
    }
  }
}
</script>