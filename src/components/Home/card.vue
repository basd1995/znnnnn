<template>
  <div id="card" @click="toPath(url)">
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
<style scoped>
  #card {
    position: relative;
    display: inline-block;
    width: 24.5vh;
    height: 24.5vh;
    transition: all 0.1s linear;
  }

  #card > img {
    height: 24.5vh;
  }

  .title, .info, .lang-info {
    position: absolute;
    margin-left: 1vh;
  }

  .title {
    font-size: 24px;
    color: var(--color-title);
    top: 1vh;
    font-weight: 900;
  }

  .info, .lang-info {
    font-size: 14px;
    left: 0;
    color: var(--color-info);
    bottom: 1vh;
  }

  #card:hover {
    transform: scale(1.05);
    /*transition: all 0.3s linear;*/
    z-index: 10;
  }
</style>
