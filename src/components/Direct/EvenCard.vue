<template>
  <div id="card">
    <div class="top">
      <p>{{title}} <span>(Ⅱ级)</span></p>
      <div class="inner">
        <div :id=echartId class="mychart"></div>
        <div class="info">
          <p>管辖单位：高速公路管理处，<span>联系路网中心</span></p>
          <p>处置单位：高速公路管理处，<span>联系路网中心</span></p>
          <p>接警单位：高速集团二分公司，<span>联系监控中心</span></p>
          <p>前期处置：高速集团二分公司，<span>联系监控中心</span></p>
        </div>
      </div>
      <div class="more">
        <span @click="showInfo" :class="{ isActive: isShowInfo}">显示详情</span>
        <span @click="isShowAbout = !isShowAbout" :class="{ isActive :isShowAbout }">相关资源</span>
      </div>
    </div>

    <div class="bottom" v-show="isShowAbout">
      <div class="item" v-for="n in 4">
        <img :src="video"  alt="">
        <p>管辖管辖</p>
      </div>
    </div>

  </div>
</template>
<script>
  import relation from './relation'
  import video from '../../assets/imgs/video.png'
  // 引入基本模板
  let echarts = require("echarts/lib/echarts");
  // 引入柱状图组件
  require("echarts/lib/chart/radar");
  // 引入提示框和title组件
  require("echarts/lib/component/legend");
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/title");
  export default {
    props:{
      itemIndex:{
        type: Number
      },
      showView:{
        type: Boolean
      },
      echartId:{
        type: Number
      },
      title:{
        type: String
      }
    },
    components:{
      relation: relation
    },
    data() {
      return {
        isShowInfo: false,
        isShowAbout: false,
        video: video,
        myEcharts:{},
        chartOption:{
          tooltip: {
            trigger: 'axis'
          },
          textStyle:{
            color: '#000',
            fontSize: 8
          },
          grid: [
            {
              width: '100%',
              height: "70%"
            }
          ],
          radar: [
            {
              nameGap : 5,
              indicator: [
                {text: '路况', max: 100},
                {text: '进程', max: 100},
                {text: '特情', max: 100},
                {text: '资源', max: 100},
                {text: '安全', max: 100}
              ],
              center: ['50%', '55%']
            }
          ],
          series: [
            {
              type: 'radar',
              tooltip: {
                trigger: 'item'
              },
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: [
                {
                  value: [60, 73, 85, 40,90],
                  name: '某事件'
                }
              ]
            }
          ]
        }
      }
    },
    mounted(){
      this.checkView();
      window.eventHub.$on('resize', this.resizeEchart);
    },
    watch:{
      itemIndex(newIndex, oldIndex) {
        console.log(newIndex);
        if (newIndex == this.echartId&&this.showView) {
          this.isShowInfo = true;
        }else{
          this.isShowInfo = false;
        }
      }
    },
    methods: {
      showInfo(){
        if (!this.isShowInfo) {
          this.$emit('click',this.echartId);
        }else{
          this.$emit('click',null);
        }
      },
      createEcharts(id) {
        console.log(id);
        let echartObj = echarts.init(document.getElementById(id));
        echartObj.setOption(this.chartOption, true);
        return echartObj;
      },
      resizeEchart(){
        this.checkView();
        this.myEcharts.resize();
      },
      checkView(){
        let ch = document.documentElement.clientHeight;
        this.chartOption.textStyle.fontSize = ch * 0.025;
        this.myEcharts = this.createEcharts(this.echartId);
        console.log(this.chartOption.textStyle.fontSize);
      }
    }
  }

</script>
<style lang="scss" scoped>
  #card {
    width: 75vh;
    /*padding: 15px;*/
    /*background-color: rgba(255, 255, 255, .9);*/
    user-select:none;
    background: linear-gradient(180deg, rgba(246, 246, 222, 0.8) 0%, #fff 50%);
    position: relative;
    border-bottom: 1px solid #ccc;
    > .top{
      position: relative;
      padding: 15px;
      height: 35vh;
      > p {
        width: 100%;
        font-size: 3.5vh;
        > span {
          color: red;
        }
      }
      > .inner {
        width: 100%;
        height: 90%;
        display: inline-flex;
        > .mychart {
          width: 45%;
          height: 100%;
        }
        > .info {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          > p {
            font-size: 1.9vh;
            font-weight: 100;
            color: #666;
            &:not(:last-child) {
              margin-bottom: 10px;
            }
            > span {
              color: cornflowerblue;
            }
          }
        }
      }
      > .more{
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 0;
        color: #666;
        >span{
          display: inline-block;
          font-size: 1.5vh;
          font-weight: 200;
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-bottom: none;
          border-right: none;
          cursor: pointer;
        }
        > .isActive{
          background-color: #bbc9da;
        }
      }
    }
    > .bottom{
      width: 100%;
      padding: 1vh 3vh;
      display: inline-flex;
      background-color: #bbc9da;
      box-shadow: 0px 0px 10px #888888 inset;
      > .item{
        border: 1px solid #999;
        width: 9vh;
        height: 8vh;
        border-radius: 1vh;
        background-color: #9aa2b5;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > img {
          width: 5vh;
          margin-bottom: 0.5vh;
        }
        > p {
          font-size: 1vh;
          color: #e1e3e9;
        }
        &:not(:last-child){
          margin-right: 2vh;
        }
      }
    }

  }
</style>
