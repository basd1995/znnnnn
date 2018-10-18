<template>
  <div id="card" @click="toDiect">
    <img :src=imgUrl alt="">
    <p class="title">{{title}}</p>
    <div class="button-group">
      <div class="inner-button" v-for="item of button" @click.stop="toPath(item.path)">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'card',
    props: {
      title: {
        type: String
      },
      imgUrl: {
        type: String
      },
      button: {
        type: Array
      }
    },
    data(){
      return {

      }
    },
    methods:{
      toDiect(){
        this.$router.push('/Direct');
      },
      toPath(p){
        if (p) {
          window.location.href = p;
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  #card {
    position: relative;
    display: inline-block;
    width: 85vh;
    transition: all 0.1s linear;
    background: #fff;
  }

  #card > img {
    width: 100%;
  }

  .title {
    position: absolute;
    margin-left: 2vh;
    font-size: 4vh;
    color: var(--color-title);
    font-weight: 500;
    bottom: 10vh;
  }
  .button-group{
    position: absolute;
    text-align: center;
    margin-left: 2vh;
    bottom: -2vh;
  }
  .inner-button{
    cursor: pointer;
    font-size: 2.5vh;
    display: inline-block;
    width: 10vh;
    height: 10vh;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: top;
    color: #fff;
    &:not(:last-child){
      margin-right: 15px;
    }
  }
  .inner-button:nth-child(odd){
   background: rgb(24,39,57);
  }
  .inner-button:nth-child(even){
    background: rgb(151,111,54);
  }
  #card:hover {
    transform: scale(1.1);
    /*transition: all 0.3s linear;*/
    -webkit-box-shadow: 0 5px 20px #666;
    box-shadow: 0 5px 20px #666;
    z-index: 10;
  }
  .inner-button:hover {
    transform: scale(1.1);
    /*transition: all 0.3s linear;*/
    -webkit-box-shadow: 0 5px 20px #666;
    box-shadow: 0 5px 20px #666;
    z-index: 10;
  }
</style>
