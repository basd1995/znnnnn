<template>
  <div class="home">
    <transition name="slide-fade">
      <div v-if="show" class="left">
        <div class="c-name">
          <img src="../../assets/imgs/logo.png" alt="">
          <p>城市智慧交通综合信息平台</p>
        </div>
        <b-map title="指挥调度" :img-url="zhihuidiaodugif" :button="buttonList"></b-map>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="show" class="mid">
        <b-describe title="数据智能" :img-url="shujuzhinenggif"></b-describe>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="show" class="right">
        <b-card class="mr mb" title="智能网联" :img-url="zhinenglianwang"></b-card>
        <b-date class="mr"></b-date>
        <b-card class="mr" title="信号优化" :img-url="xinhaoyouhuagif"></b-card>
        <b-card class="mr mb" title="路测宝" :img-url="yunwei" url="http://192.168.1.53:8090"></b-card>
        <b-card title="信息服务" :img-url="xinxifuwu" :lang-info="false" url="http://www.jtcx.sh.cn/"></b-card>
      </div>
    </transition>
    <div class="c-info">
      <p>上海智能交通有限公司 Shanghai Intelligent Transportation Co., Ltd.</p>
    </div>
  </div>
</template>

<script>
  import Card from './card'
  import Date from './Date'
  import Describe from './describe-card'
  import Mapc from './map-crad'
  import yunwei from '../../assets/imgs/yunwei.png'
  import zhinenglianwang from '../../assets/imgs/zhinenglianwang.png'
  import xinhaoyouhuagif from '../../assets/imgs/xinhaoyouhua.gif'
  import xinhaoyouhua from '../../assets/imgs/xinhaoyouhua.png'
  import xinxifuwu from '../../assets/imgs/xinxifuwu.png'
  import shujuzhinenggif from '../../assets/imgs/bigdata.gif'
  import shujuzhineng from '../../assets/imgs/bigdata.png'
  import zhihuidiaodugif from '../../assets/imgs/zhihuidiaodu.gif'
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
        shujuzhinenggif: shujuzhinenggif,
        zhihuidiaodu: zhihuidiaodu,
        zhihuidiaodugif: zhihuidiaodugif,
        xinhaoyouhuagif: xinhaoyouhuagif,
        buttonList:[
          {
            name:"长三角",
            path:'http://192.168.2.86:8091'
          },
          {
            name:"上海",
            path:''
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
    /*padding: 5vh 0;*/
    position: relative;
    min-width: 1920px;
    height: 100%;
    background: url("../../assets/imgs/background.png");
    background-size:100% 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .c-name{
    width: 100%;
    align-items: center;
  }
  .c-name >p{
    /*cursor: pointer;*/
    margin-left: -3%;
    color: #fff;
    letter-spacing: 3px;
    font-size: 5vh;
    font-style: italic;
    text-shadow: 1px 1px 1px #666;
    margin-bottom: 7vh;

  }
  .c-name >img{
    height: 6vh;
    margin-top: 14vh;
  }
  .mr {
    margin-right: 1vh;
  }

  .mb {
    margin-bottom: 1.1vh;
  }

  .left {
    /*display: inline-block;*/
  }

  .mid{
    margin-left: 2vh;
  }
  .right {
    align-items: center;
    /*display: inline-block;*/
    width: 107vh;
    font-size: 0;
    /*height: 51vh;*/
    margin-top: 4vh;
    margin-left: 2vh;
  }
  .c-info{
    position: absolute;
    text-align: center;
    font-size: 2vh;
    letter-spacing: 0.5px;
    font-weight: 200;
    color: #ccc;
    bottom: 10vh;
    right: 15%;
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
