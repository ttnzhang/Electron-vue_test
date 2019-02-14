<template>
  <div id="app">
  <Menu theme="dark" style='height: 100vh;display: inline-block;'>
      <Submenu name="1">
          <template slot="title">
              <Icon type="ios-paper" />
              计算器
          </template>
      </Submenu>
      <Submenu name="2">
          <template slot="title">
              <Icon type="ios-people" />
              工资计算器
          </template>
      </Submenu>
  </Menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vue-electron'
  }
</script>

<style>
  /* CSS */
  #app{
    display:flex;
  }
</style>
