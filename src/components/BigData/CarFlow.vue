<template>
  <div id="car-flow">
    <div style="width: 50%;height: 100%;position: relative;">
      <div class="title">{{title}}</div>
      <div :id=echartsId class="mychart" style="width: 100%;height: 100%;"></div>
      <div class="info">入上海车流量</div>
    </div>
    <div style="width: 50%;height: 100%;position: relative;">
      <div :id=echartsIdt class="mychart" style="width: 100%;height: 100%;"></div>
      <div class="info">出上海车流量</div>
    </div>
  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require("echarts/lib/echarts");
  // 引入柱状图组件
  require("echarts/lib/chart/pie");
  // 引入提示框和title组件
  require("echarts/lib/component/legend");
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/title");
  export default {
    props:{
      echartsId:{
        type: Number
      },
      echartsIdt:{
        type: Number
      },
      title:{
        type: String
      }
    },
    data(){
      return {
        myEcharts:{
          left:{},
          right:{}
        }
      }
    },
    mounted(){
      this.myEcharts.left = this.createEcharts(this.echartsId);
      this.myEcharts.right = this.createEcharts(this.echartsIdt);
      window.eventHub.$on('resize', this.resizeEchart)
    },
    methods:{
      createEcharts(id) {
        console.log(id);
        let data = [
          {value:1548, name:'直接访问',itemStyle:{color:"#ffc957"}},
          {value:234, name:'联盟广告',itemStyle:{color:"#6576bb"}},
          {value:645, name:'邮件营销',itemStyle:{color:"#fef37d"}},
          {value:435, name:'视频广告',itemStyle:{color:"#8fbac1"}}
        ];
        let echartObj = echarts.init(document.getElementById(id));
        echartObj.setOption({
          //提示类型
          // tooltip: {
          //   //自定义
          //   trigger: "item",
          //   formatter: "{b}: {c} ({d}%)"
          // },
          series: [
            {
              type: "pie",
              radius: ["45%", "63%"],
              center: ["50%", "50%"],
              avoidLabelOverlap: true,
              hoverAnimation: true,
              label: {
                normal: {
                  show: false,
                  position: "ouyside",
                  textStyle: {
                    fontSize: "12"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false,
                  //配置提示线的距离
                  length: 0,
                  length2: 8
                }
              },
              data: data
            }
          ]
        }, true);
        return echartObj;
      },
      resizeEchart(){
        this.myEcharts.left.resize();
        this.myEcharts.right.resize();
      }
    }
  }
</script>
<style scoped lang="scss">
  #car-flow{
    position: relative;
    flex: 1;
    display: inline-flex;
    height: 100%;
    background-color: var(--bigdata-color);
    &:not(:last-child){
      border-right: 1px solid #666;
    }
    > div .title{
      position: absolute;
      font-size: 1vh;
      color: #FFF;
      margin-left: 10%;
      font-weight: 200;
    }
    > div .info{
      position: absolute;
      bottom: 0;
      color: #fff;
      text-align: center;
      width: 100%;
      font-size: 1vh;
      font-weight: 200;
    }
  }
</style>
