<template>
  <div id="holiday">
    <div class="title"><p>节假日公共出行</p><span>...</span></div>
    <div id='myEchart2' class="mychart"></div>
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
  require("echarts/lib/component/markPoint");
  require("echarts/lib/component/markLine");
  export default {
    data(){
      return {
        myEcharts2: {}
      }
    },
    mounted(){
      this.myEcharts2 = this.createEcharts('myEchart2');
      window.eventHub.$on('resize',this.resizeEchart);
    },
    methods:{
      createEcharts(id){
        let echartObj = echarts.init(document.getElementById(id));
        echartObj.setOption({
          textStyle: {
            color: '#fff',
            // fontSize: 8
          },
          tooltip : {
            trigger: 'axis'
          },
          grid: {
            // height: '70%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'蒸发量',
              type:'bar',
              data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
              markPoint : {
                // symbolSize: 40,
                textStyle: {
                  color: '#fff'
                },
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              itemStyle:{
                normal:{
                  color:'#dad16d'
                }
              },
              markLine : {
                data : [
                  {type : 'average', name: '平均值'}
                ]
              }
            },
            {
              name:'降水量',
              type:'bar',
              data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
              markPoint : {
                textStyle: {
                  color: '#fff'
                },
                data : [
                  {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                  {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                ]
              },
              itemStyle:{
                normal:{
                  color:'#7a789f'
                }
              },
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            }
          ]
        },true);
        return echartObj;
      },
      resizeEchart(){
        this.myEcharts2.resize();
      }
    }
  }
</script>
<style lang="scss" scoped>
  #holiday{
    color: #fff;
    width: 100%;
    height: 50%;
    background-color: var(--bigdata-color);
    position: absolute;
    border-bottom: 0.5px solid #555;
    > .title{
      position: absolute;
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      padding: 5%;
      font-size: 3vh;
    }
    > #myEchart2{
      width: 100%;
      height: 100%;
    }
  }
</style>
