<template>
  <div id="relation">
    <p>中山西路解放路-重大事故-1死2伤{{index}} <span>(Ⅱ级)</span></p>
    <div id="relChar">

    </div>
  </div>
</template>
<script>
  import request from '../../service/request'
  // 引入基本模板
  let echarts = require("echarts/lib/echarts");
  // 引入柱状图组件
  require("echarts/lib/chart/graph");
  // 引入提示框和title组件
  require("echarts/lib/component/legend");
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/title");
  require("echarts/extension/dataTool");
  // require("echarts/")
  export default {
    props:['index'],
    data(){
      return {
        rEchart:{},
        // ss: ss
      }
    },
    mounted(){
      this.rEchart = this.createEcharts(
        'relChar'
      )
    },
    methods:{
      createEcharts(id) {
        let myChart = echarts.init(document.getElementById(id));
        request('http://192.168.2.86:8090/static/ss.gexf').then(response => {
          let gxef = response;
          myChart.showLoading();
          myChart.hideLoading();
          let graph = echarts.dataTool.gexf.parse(gxef);
          let categories = [];
          for (let i = 0; i < 9; i++) {
            categories[i] = {
              name: '类目' + i
            };
          }
          graph.nodes.forEach(function (node) {
            node.itemStyle = null;
            node.value = node.symbolSize;
            node.symbolSize /= 1.5;
            node.label = {
              normal: {
                show: node.symbolSize > 30
              }
            };
            node.category = node.attributes.modularity_class;
          });
          myChart.setOption({
            tooltip: {},
            // legend: [{
            //   // selectedMode: 'single',
            //   data: categories.map(function (a) {
            //     return a.name;
            //   })
            // }],
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
              {
                name: 'Les Miserables',
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                categories: categories,
                roam: true,
                focusNodeAdjacency: true,
                itemStyle: {
                  normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                  }
                },
                label: {
                  position: 'right',
                  formatter: '{b}'
                },
                lineStyle: {
                  color: 'source',
                  curveness: 0.3
                },
                emphasis: {
                  lineStyle: {
                    width: 10
                  }
                }
              }
            ]
          },true)
        });
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
      font-size: 2.5vh;
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
