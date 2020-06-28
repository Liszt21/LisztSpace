<template>
  <div class="train-react">
    <p>Reaction Rate</p>
    <el-button @click="doSwitch">{{ action }}</el-button>
    <el-button @click="doClick">{{ message }}</el-button>
    <p>Average: {{ average }}, Tested: {{ tested }}</p>
    <p v-for="(item, i) in histary" :key="i">{{ item }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      started: false,
      time: {
        change: 0,
        click: 0,
      },
      timer: "",
      histary: [],
      clickable: false,
    };
  },
  computed: {
    time_span: function() {
      return this.time.click - this.time.change;
    },
    action: function() {
      return this.started ? "Stop" : "Start";
    },
    message: function() {
      if (this.started) {
        return this.clickable ? "Click now!" : "Please wait";
      } else {
        return "Click start when you ready";
      }
    },
    tested: function() {
      return this.histary.length;
    },
    average: function() {
      var sum = 0.0;
      for (var i of this.histary) {
        sum += i;
      }
      sum = sum / this.histary.length
      return sum.toFixed(3);
    },
  },
  methods: {
    doSwitch: function() {
      this.started = !this.started;
      if (this.started) {
        this.histary = [];
        this.tick();
      }
    },
    doClick: function() {
      if (!this.started) {
        return;
      }
      if (this.clickable) {
        this.time.click = new Date().getTime();
        this.histary.unshift((this.time.click - this.time.change) / 1000);
        this.tick();
      } else {
        this.histary.unshift(1.0);
      }
    },
    tick: function() {
      var wait_time = Math.random();
      this.clickable = false;
      var that = this;
      setTimeout(function() {
        that.time.change = new Date().getTime();
        that.clickable = true;
      }, wait_time * 2100 + 621);
    },
    beforeDestroy() {
      clearTimeout(this.waiter);
    },
  },
};
</script>
