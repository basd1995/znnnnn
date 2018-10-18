<template>
  <div class="big-data">
    <div id="map"></div>
    <div class="title">
      <p class="today">
        {{date}}{{week}}
      </p>
      <p class="name">数据智能应用平台</p>
      <p class="run"><span>正常运行：</span>120小时30分10秒</p>
    </div>
    <transition name="slide-fade">
      <div class="road" v-if="show">
        <b-road :echarts-id="1" title="高速公路流量变化"></b-road>
        <b-road :echarts-id="2" title="国省干路流量变化"></b-road>
        <b-road :echarts-id="3" title="过江隧道流量变化"></b-road>
      </div>
    </transition>
    <transition name="slide-fadet">
      <div class="car" v-if="show">
        <b-car :echarts-id="11" :echarts-idt="111" title="浙江省"></b-car>
        <b-car :echarts-id="12" :echarts-idt="122" title="江苏省"></b-car>
        <b-car :echarts-id="13" :echarts-idt="133" title="安徽省"></b-car>
      </div>
    </transition>
      <div class="city">
        <b-city></b-city>
        <b-cwork></b-cwork>
      </div>
      <div class="holiday">
        <b-holiday></b-holiday>
        <b-workasy></b-workasy>
      </div>
  </div>
</template>

<script>
  import WorkAsy from './WorkAsy'
  import Holiday from './Holiday'
  import CityWork from './CityWork'
  import CityInfo from './CityInfo'
  import CarFlow from  './CarFlow'
  import RoadFlow from './RoadFlow'
  import MapStyle from './MapStyle'
  export default {
    components:{
      'b-road': RoadFlow,
      'b-car': CarFlow,
      'b-city': CityInfo,
      'b-cwork': CityWork,
      'b-holiday': Holiday,
      'b-workasy': WorkAsy
    },
    data() {
      return {
        show: false,
        heatmapOverlay: new BMapLib.HeatmapOverlay({"radius":10}),
        date:'',
        week:''
      };
    },
    mounted() {
      this.map();
      this.getDate();
      this.startAn();
    },
    methods: {
      startAn() {
        this.show = true;
      },
      map() {
        let map = new BMap.Map("map");
        window.map = map;
        map.centerAndZoom(new BMap.Point(121.475781,31.230253), 12); // 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity("上海");
        map.setMapStyle({styleJson: MapStyle});
        map.enableScrollWheelZoom(true);
        map.addOverlay(this.heatmapOverlay);
        let points = [];
        for (let i = 0;i < 3000;i++){
          let obj = {
            "lng":null,
            "lat":null,
            "count":null
          };
          //max期望的最大值
          //min期望的最小值
          let lng = 121 + Math.floor(Math.random()*(700000-300000+1)+300000)/1000000;
          let lat = 31 + Math.floor(Math.random()*(350000-100000+1)+100000)/1000000;
          let count = Math.floor(Math.random()*(100-1+1)+1);
          obj.lng = lng;
          obj.lat = lat;
          obj.count = count;
          points.push(obj);
        }
        this.heatmapOverlay.setDataSet({data:points,max:100});
      },
      getDate(){
        let str = new Date();
        let weekList = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        this.date = str.getFullYear()+'年'+this.format((str.getMonth()+1))+'月'+ this.format(str.getDate()) +'日';
        this.week = weekList[str.getDay()];
      },
      format(s){
        let value = parseInt(s);
        if (value<10) {
          return '0'+ s;
        }else {
          return s;
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .big-data{
    position: relative;
    width: 100%;
    height: 100%;
    > #map {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    > .title{
      position: absolute;
      left: 50%;
      margin-left: -25%;
      color: #fff;
      z-index: 100;
      display: inline-flex;
      background-color: var(--bigdata-color);
      align-items: center;
      width: var(--bigdata-mid);
      justify-content: space-around;
      padding: 7px 0;
      > .name{
        font-size: 3.5vh;
      }
      > .today,.run{
        font-size: 2.2vh;
        > span{
          color:#90def9;
        }
      }
    }
    > .road{
      position: absolute;
      width: var(--bigdata-mid);
      height: 15%;
      left: 50%;
      margin-left: -25%;
      top: 10%;
      display: inline-flex;
      justify-content: space-between;
    }
    > .car{
      position: absolute;
      width: var(--bigdata-mid);
      height: 15%;
      left: 50%;
      margin-left: -25%;
      bottom: 0;
      display: inline-flex;
    }
    > .city{
      position: absolute;
      width: var(--bigdata-around);
      height: 100%;
    }
    > .holiday{
      position: absolute;
      width: var(--bigdata-around);
      right: 0;
      height: 100%;
    }
  }
  .slide-fade-enter-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(-20%);
    opacity: 0;
  }
  .slide-fadet-enter-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);;
  }

  .slide-fadet-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fadet-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(20%);
    opacity: 0;
  }
</style>
