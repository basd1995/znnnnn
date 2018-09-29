<template>
  <div id="relation">
    <p>中山西路解放路-重大事故-1死2伤{{index}} <span>(Ⅱ级)</span></p>
    <div id="relChar">

    </div>
  </div>
</template>
<script>
  import jon from './les-miserables'
  // 引入基本模板
  let echarts = require("echarts/lib/echarts");
  // 引入柱状图组件
  require("echarts/lib/chart/graph");
  // 引入提示框和title组件
  require("echarts/lib/component/legend");
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/title");
  export default {
    props:['index'],
    data(){
      return {
        rEchart:{}
      }
    },
    mounted(){
      this.rEchart = this.createEcharts(
        'relChar'
      )
    },
    methods:{
      createEcharts(id){
        let myChart = echarts.init(document.getElementById(id));
        myChart.showLoading();
        let json = jon;
        myChart.hideLoading();
        let option = {};
        myChart.setOption(option = {
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
            {
              type: 'graph',
              layout: 'none',
              // progressiveThreshold: 700,
              data: json.nodes.map(function (node) {
                return {
                  x: node.x,
                  y: node.y,
                  id: node.id,
                  name: node.label,
                  symbolSize: node.size,
                  itemStyle: {
                    normal: {
                      color: node.color
                    }
                  }
                };
              }),
              edges: json.edges.map(function (edge) {
                return {
                  source: edge.sourceID,
                  target: edge.targetID
                };
              }),
              label: {
                emphasis: {
                  position: 'right',
                  show: true
                }
              },
              roam: true,
              focusNodeAdjacency: true,
              lineStyle: {
                normal: {
                  width: 0.5,
                  curveness: 0.3,
                  opacity: 0.7
                }
              }
            }
          ]
        }, true);
      }
    }
  }
</script>
<style lang="scss" scoped>
  #relation{
    width: 70vh;
    height: 70vh;
    background: linear-gradient(180deg, rgba(225, 240, 229, 0.8) 0%, #fff);
    > p{
      position: absolute;
      top: 0;
      padding: 5px 0;
      text-align: center;
      width: 100%;
      background: #fff;
      >span{
        color: red;
      }
    }
    >#relChar{
      width: 100%;
      height: 100%;
    }
  }
</style>
