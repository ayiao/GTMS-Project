<template>
  <div id="app">
  	<!--页面显示位置(标签)-->
  	<router-view></router-view>
	</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*padding-top: 2%;*/
}
</style>
