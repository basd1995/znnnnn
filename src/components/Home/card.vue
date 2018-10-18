<template>
  <div id="card" @click="toPath(url)">
    <div class="trs">
      <p class="title">{{title}}</p>
      <img :src=imgUrl alt="">
      <span class="info">{{info}}</span>
      <div class="lang-info" v-if="langInfo">
        <p>V3.0系统</p>
        <p>综合集成 专与业务</p>
        <p>智能辅助</p>
        <p>简化流程</p>
      </div>
    </div>
  </div>
</template>
<script>
  //信息服务http://www.jtcx.sh.cn/
  //运维 闪测
  export default {
    name: 'card',
    props: {
      title: {
        type: String
      },
      imgUrl: {
        type: String
      },
      url:{
        type: String
      },
      info: {
        type: String
      },
      langInfo: {
        type: Boolean,
        default: false
      },
      describe: {
        type: Boolean,
        default: false
      }
    },
    methods:{
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
    width: 35vh;
    height: 35vh;
    transition: all 1s linear;
    > .trs{
      position: relative;
      width: 100%;
      height: 100%;
      > img {
        height: 100%;
      }
    }
  }

  .title, .info, .lang-info {
    position: absolute;
  }

  .title {
    font-size: 4vh;
    color: var(--color-title);
    padding: 2vh;
    color: #000;
    font-weight: 500;
  }

  .info, .lang-info {
    font-size: 3vh;
    left: 0;
    color: var(--color-info);
    bottom: 1vh;
    padding-left: 2vh;
  }

  #card:hover {
    /*transform: scale(1.05);*/
    > .trs{
      transform: rotateY(360deg);
      transition: all 1s linear;
    }
    z-index: 10;
  }
</style>
