<template>
  <div class="home">
    <div class="c-name">
      <img src="../../assets/imgs/logo.png" alt="">
      <p>城市智慧交通综合信息平台</p>
    </div>
    <transition name="slide-fade">
      <div v-if="show" class="left">
        <b-map title="指挥调度" :img-url="zhihuidiaodu" :button="buttonList"></b-map>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="show" class="mid">
        <b-describe title="数据智能" :img-url="shujuzhineng"></b-describe>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="show" class="right">
        <b-card class="mr mb" title="运维" info="V 3.0 系统" :img-url="yunwei"></b-card>
        <b-date class="mr"></b-date>
        <b-card class="mr mb" title="智能网联" :img-url="zhinenglianwang"></b-card>
        <b-card class="mr" title="信号优化" :img-url="xinhaoyouhua"></b-card>
        <b-card title="信息服务" :img-url="xinxifuwu" :lang-info="true"></b-card>
      </div>
    </transition>
  </div>
</template>

<script>
  import Card from './card'
  import Date from './Date'
  import Describe from './describe-card'
  import Mapc from './map-crad'
  import yunwei from '../../assets/imgs/yunwei.png'
  import zhinenglianwang from '../../assets/imgs/zhinenglianwang.png'
  import xinhaoyouhua from '../../assets/imgs/xinhaoyouhua.png'
  import xinxifuwu from '../../assets/imgs/xinxifuwu.png'
  import shujuzhineng from '../../assets/imgs/bigdata.png'
  import zhihuidiaodu from '../../assets/imgs/zhihuidiaodu.png'

  export default {
    name: 'HelloWorld',
    components: {
      'b-card': Card,
      'b-date': Date,
      'b-describe': Describe,
      'b-map': Mapc
    },
    data() {
      return {
        show: false,
        yunwei: yunwei,
        zhinenglianwang: zhinenglianwang,
        xinhaoyouhua: xinhaoyouhua,
        xinxifuwu: xinxifuwu,
        shujuzhineng: shujuzhineng,
        zhihuidiaodu: zhihuidiaodu,
        buttonList:[
          {
            name:"长三角",
            path:'Direct'
          },
          {
            name:"上海",
            path:'http://www.baidu.com'
          },
          {
            name:"VIP",
            path:''
          }
        ]
      }
    },
    mounted() {
      this.startAn();
    },
    methods: {
      startAn() {
        this.show = true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../../assets/imgs/background.png");
    background-size:100% 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
  }
  .c-name{
    position: absolute;
    display: inline-flex;
    top: 0;
    padding-top: 4vh;
    padding-left: 4vh;
    width: 100%;
    align-items: center;
  }
  .c-name >p{
    /*cursor: pointer;*/
    color: #fff;
    letter-spacing: 10px;
    font-size: 20px;
    font-style: italic;
    margin-left: 5%;
    text-shadow: 1px 1px 1px #333;
  }
  .c-name >img{
    height: 7vh;
  }
  .mr {
    margin-right: 1vh;
  }

  .mb {
    margin-bottom: 1.1vh;
  }

  .left {
    display: inline-block;
  }

  .mid{
    display: inline-block;
  }
  .right {
    display: inline-block;
    height: 50vh;
    width: 77vh;
    font-size: 0;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-2000px);
    opacity: 0;
  }
</style>
