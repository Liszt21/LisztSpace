<template>
  <header class="header">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="4" class="hidden-sm-and-down">
        <div class="logo">
          LisztSpace
        </div>
      </el-col>
      <el-col :span="4" class="hidden-md-and-up">
        <el-button type="primary" icon="el-icon-s-unfold" circle></el-button>
      </el-col>
      <el-col :span="8">
        <div class="search">
          <el-input 
            placeholder="请输入内容" 
            prefix-icon="el-icon-search" 
            v-model="input" 
            clearable>
            <el-select slot="append" v-model="target" placeholder="请选择">
              <el-option label="百度" value="1"></el-option>
              <el-option label="谷歌" value="2"></el-option>
            </el-select>
          </el-input>
        </div>
      </el-col>
      <el-col :span="8" class="hidden-sm-and-down">
        <div class="navigate">
          Navigate
        </div>
      </el-col>
      <el-col :span="4">
        <div class="user">
          User
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  data () {
    return {
      toggle: true,
      input: "",
      target: '1'
    }
  }
}
</script>

<style scoped lang="stylus">

.header
  width 100%
  height 4rem
  background-color #fff
</style>