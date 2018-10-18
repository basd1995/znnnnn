<template>
  <div id="card" @click="toBigData">
    <img :src=imgUrl alt="">
    <p class="title">{{title}}</p>
    <p class="info">{{info}}</p>
    <div class="inner-button">VIP</div>
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
      info: {
        type: String
      }
    },
    methods:{
      toBigData(){
        this.$router.push('/BigData');
      },
    }
  }
</script>
<style scoped lang="scss">
  #card {
    position: relative;
    display: inline-block;
    width: 60vh;
    height: 75vh;
    transition: all 0.1s linear;
    background: #fff;
  }

  #card > img {
    width: 100%;
    height: 75%;
  }
  .title, .info{
    margin-left: 2vh;
  }

  .title {
    font-size: 4vh;
    color: var(--color-title);
    font-weight: 500;
    display: inline-block;
    vertical-align: top;
  }
  .info{
    display: inline-block;
    font-size: 2.2vh;
    color: var(--color-info);
    top: 22em;
    right: .5em;
    width: 13em;
  }
  #card:hover {
    transform: scale(1.1);
    /*transition: all 0.3s linear;*/
    -webkit-box-shadow: 0 5px 20px #666;
    box-shadow: 0 5px 20px #666;
    z-index: 10;
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
    background: rgb(24,39,57);
    position: absolute;
    left: 2vh;
    bottom: -2vh;
    &:hover {
      transform: scale(1.1);
      /*transition: all 0.3s linear;*/
      -webkit-box-shadow: 0 5px 20px #666;
      box-shadow: 0 5px 20px #666;
      z-index: 10;
    }
  }
</style>
