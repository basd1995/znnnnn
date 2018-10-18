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
    </div>

    <!--<div class="xxxx" style="height: 50px">-->

    <!--</div>-->
    <div class="more">
      <span @click="$emit('click',echartId)">显示详情</span>
      <span>相关资源</span>
    </div>
  </div>
</template>
<script>
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
      echartId:{
        type: Number
      },
      title:{
        type: String
      }
    },
    data() {
      return {
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
    methods: {
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
    padding: 15px;
    background-color: rgba(255, 255, 255, .9);
    user-select:none;
    position: relative;
    border-bottom: 1px solid #ccc;
    > .top{
      height: 28vh;
      > p {
        width: 100%;
        font-size: 3.5vh;
        > span {
          color: red;
        }
      }
      > .inner {
        width: 100%;
        height: calc(100% - 20px);
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
    }
  }
</style>
