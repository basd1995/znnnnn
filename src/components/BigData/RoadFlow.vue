<template>
  <div id="road-flow">
    <div class="title">{{title}}</div>
    <div :id=echartsId class="mychart" style="width: 100%;height: 100%;position: absolute;"></div>
  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require("echarts/lib/echarts");
  // 引入柱状图组件
  require("echarts/lib/chart/bar");
  // 引入提示框和title组件
  require("echarts/lib/component/legend");
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/title");
  export default {
    props:{
      echartsId:{
        type: Number
      },
      title:{
        type: String
      }
    },
    data(){
      return {
        myEcharts:{}
      }
    },
    mounted(){
      this.myEcharts = this.createEcharts(this.echartsId);
      window.eventHub.$on('resize', this.resizeEchart)
    },
    methods:{
      createEcharts(id) {
        console.log(id);
        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        for (let i = 0; i < 100; i++) {
          data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
          data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
        }
        for (let i = 0;i < 13;i++){
          data1[i] = 0
        }
        for (let i = 0;i < 7;i++){
          data2[i] = 0
        }
        let echartObj = echarts.init(document.getElementById(id));
        echartObj.setOption({
          grid: [
            {
              x: "13%",
              y: "20%",
              width: '80%',
              height: "70%"
            }
          ],
          textStyle:{
            color: '#fff',
            fontSize: 8
          },
          xAxis: {
            show:false,
            data: xAxisData,
            silent: false,
            splitLine: {
              show: false
            }
          },
          yAxis: {
            min:0,
            minInterval: 30,
            splitLine: {
              lineStyle: {
                type:'dotted',
                width: 1,
                color: '#333',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize:'8'
              }
            }
          },
          series: [{
            name: 'bar',
            type: 'bar',
            data: data1,
            color:'#6777bb',
            animationDelay: function (idx) {
              return idx * 10;
            }
          }, {
            name: 'bar2',
            type: 'bar',
            data: data2,
            color:'#ffca57',
            animationDelay: function (idx) {
              return idx * 10 + 100;
            }
          }],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
            return idx * 5;
          }
        }, true);
        return echartObj;
      },
      resizeEchart(){
        console.log('roadflow',this.myEcharts);
        this.myEcharts.resize();
      }
    }
  }
</script>
<style scoped lang="scss">
  #road-flow{
    position: relative;
    width: 30%;
    height: 100%;
    background-color: var(--bigdata-color);
    > .title{
      position: absolute;
      color: #ffffff;
      margin-left: 13%;
      margin-top: 1%;
      font-size: 1.5vh;
      font-weight: 200;
    }
  }
</style>
