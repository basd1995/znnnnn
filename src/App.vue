<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    window.onresize = () => {
      window.eventHub.$emit('resize');
    };
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
}
html,body{
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
#tcBtn{
  display: none;
}
</style>
