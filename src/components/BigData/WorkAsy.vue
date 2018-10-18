<template>
  <div id="work-asy">
    <div id="leftChart"></div>
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
  require("echarts/lib/component/angleAxis");
  require("echarts/lib/component/polar");
  export default {
    data(){
      return {
        myEcharts:{}
      }
    },
    mounted(){
      this.myEcharts = this.createEchart('leftChart');
      window.eventHub.$on('resize',this.resizeEcharts);
    },
    methods:{
      createEchart(id){
        let echartObj = echarts.init(document.getElementById(id));
        echartObj.setOption({
          textStyle: {
            color: '#fff',
            // fontSize: 8
          },
          angleAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            z: 10,
            splitLine: {
              lineStyle: {
                type:'solid',
                width: 1,
                color: '#333',
              }
            },
          },
          radiusAxis: {
          },
          polar: {
          },
          series: [
            {
            type: 'bar',
            data: [1, 2, 3, 4, 3, 5, 1],
            coordinateSystem: 'polar',
            itemStyle: {
              normal: {
                // 随机显示
                //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

                // 定制显示（按顺序）
                color: function(params) {
                  var colorList = ['#dad16d','#7a789f','#dad16d','#7a789f','#dad16d','#7a789f','#dad16d',];
                  // var colorList = self.CONSTANT.PCI_RQI_COLOR;
                  return colorList[params.dataIndex];
                }
              }
            },
            name: 'A',
            stack: 'a'
          },
            {
            type: 'bar',
            data: [2, 4, 6, 1, 3, 2, 1],
            coordinateSystem: 'polar',
            itemStyle: {
              normal: {
                // 随机显示
                //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

                // 定制显示（按顺序）
                color: function(params) {
                  var colorList = ['#7a789f','#dad16d','#7a789f','#dad16d','#7a789f','#dad16d','#7a789f'];
                  // var colorList = self.CONSTANT.PCI_RQI_COLOR;
                  return colorList[params.dataIndex];
                }
              }
            },
            name: 'B',
            stack: 'a'
          }],
          legend: {
            show: true,
            data: ['A', 'B'],
            textStyle: {
              color: '#fff',
              // fontSize: 8
            },
          }
        },true);
        return echartObj;
      },
      resizeEcharts(){
        this.myEcharts.resize();
      }
    }
  }
</script>
<style lang="scss" scoped>
  #work-asy{
    width: 100%;
    height: 50%;
    position: absolute;
    background-color: var(--bigdata-color);
    bottom: 0;
    > #leftChart{
      width: 100%;
      height: 100%;
    }
  }
</style>
