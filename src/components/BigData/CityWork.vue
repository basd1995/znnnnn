<template>
  <div id="city-work">
    <div class="title"><p>城区中心出行结构</p><span>...</span></div>
    <div id='myEchart' class="mychart" style="width: 100%;height: 100%;position: absolute;"></div>
  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require("echarts/lib/echarts");
  // 引入柱状图组件
  require("echarts/lib/chart/line");
  // 引入提示框和title组件
  require("echarts/lib/component/legend");
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/title");
  require("echarts/lib/component/markLine");
  export default {
    data(){
      return {
        myEcharts: {}
      }
    },
    mounted(){
      this.myEcharts = this.createEcharts('myEchart');
      window.eventHub.$on('resize',this.resizeEchart);
    },
    methods:{
      createEcharts(id){
        let echartObj = echarts.init(document.getElementById(id));
        echartObj.setOption({
          textStyle: {
            color: '#fff',
            fontSize: 8
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['搜索引擎','百度','谷歌','必应','其他'],
            itemWidth:10,//图例的宽度
            itemHeight:10,//图例的高度
            left:'right',
            top: '20%',
            itemGap: 1,
            padding: [0,0],
            textStyle: {
              color: '#fff',
              fontSize: 8
            },
          },
          grid: {
            height: '70%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'搜索引擎',
              type:'bar',
              data:[862, 1018, 964, 1026, 1679, 1600, 1570],
              markLine : {
                lineStyle: {
                  normal: {
                    type: 'dashed'
                  }
                },
                data : [
                  [{type : 'min'}, {type : 'max'}]
                ]
              }
            },
            {
              name:'百度',
              type:'bar',
              barWidth : 5,
              stack: '搜索引擎',
              data:[620, 732, 701, 734, 1090, 1130, 1120]
            },
            {
              name:'谷歌',
              type:'bar',
              stack: '搜索引擎',
              data:[120, 132, 101, 134, 290, 230, 220]
            },
            {
              name:'必应',
              type:'bar',
              stack: '搜索引擎',
              data:[60, 72, 71, 74, 190, 130, 110]
            },
            {
              name:'其他',
              type:'bar',
              stack: '搜索引擎',
              data:[62, 82, 91, 84, 109, 110, 120]
            }
          ]
        },true);
        return echartObj;
      },
      resizeEchart(){
        this.myEcharts.resize();
      }
    }
  }
</script>
<style lang="scss" scoped>
  #city-work{
    color: #fff;
    width: 100%;
    height: 43%;
    background-color: var(--bigdata-color);
    position: absolute;
    bottom: 0;
    > .title{
      position: absolute;
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      padding: 5%;
      font-size: 3vh;
    }
    > #myEchart{
      width: 100%;
      height: 100%;
    }
  }
</style>
