<template>
  <div id="menu" :class="{active}" @click="$emit('click')">
    <img :src=imgUrl alt="">
    <p>{{name}}</p>
  </div>
</template>
<script>
  export default {
    props:{
      name: {
        type: String
      },
      imgUrl: {
        type: String
      },
      active:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
      }
    }
  }
</script>
<style lang="scss">
  #menu{
    position: relative;
    width: 15vh;
    height: 15vh;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255,255,255,0.8);
    box-shadow: 0 0 5px #7a7a7a;
    border-radius: 6px;
    cursor: pointer;
    &.active{
      /*box-shadow: 0 0 10px 2px #bbb inset;*/
      background: linear-gradient(180deg, #A5AEC6 0%, #fff 100%);
    }
    >img {
      display: inline-block;
      width: 7vh;
      height: 7vh;
      margin-top: 3vh;
      user-select:none;
    }
    >p{
      margin-top: 1vh;
      font-size: 2vh;
      user-select:none;
    }
  }
</style>
