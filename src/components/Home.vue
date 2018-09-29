<template>
  <div class="home">
    <div id="map"></div>
    <div class="nav">
      <span>指挥调度>></span>{{nav}}<span>专栏</span>
    </div>
    <div class="menu-list">
      <b-menu :img-url="event" name="事件" :active="showEvent" @click="openEvent"></b-menu>
      <b-menu :img-url="traffic" name="路况" :active="showTraffic" @click="openTraffic"></b-menu>
      <b-menu :img-url="viproad" name="VIP线路" :active="showVipRoad" @click="openVipRoad"></b-menu>
      <b-menu :img-url="vipcar" name="VIP车辆" :active="showVipCar" @click="showVipCar = !showVipCar"></b-menu>
      <b-menu :img-url="car" name="重点车辆" :active="showCar" @click="showCar = !showCar"></b-menu>
      <b-menu :img-url="dispatch" name="勤务调度" :active="showDis" @click="openDispatch"></b-menu>
      <b-menu :img-url="eme" name="应急" :active="showEme" @click="openEme"></b-menu>
      <b-menu :img-url="active" name="重大活动" :active="showAct" @click="openActive"></b-menu>
      <b-menu :img-url="trafficbetter" name="信号优化" :active="showTrafficBetter"
              @click="openTrafficBetter"></b-menu>
    </div>
    <transition name="slide-fade">
      <div class="event-list" v-if="showEvent">
        <b-eventcard echart-id="top" @click="openView"></b-eventcard>
        <b-eventcard echart-id="mid" @click="openView"></b-eventcard>
        <b-eventcard echart-id="bottom"></b-eventcard>
      </div>
    </transition>
    <div class="relation-view" v-if="showView">
      <b-relation :index="viewId"></b-relation>
    </div>
  </div>
</template>

<script>
  import Relation from './relation'
  import EventCard from './EvenCard'
  import Menu from "./menu";
  import event from '../assets/imgs/event.png'
  import traffic from '../assets/imgs/traffic.png'
  import viproad from '../assets/imgs/viproad.png'
  import vipcar from '../assets/imgs/vipcar.png'
  import car from '../assets/imgs/car.png'
  import police from '../assets/imgs/police.png'
  import eWaring from '../assets/imgs/e-waring.png'
  import active from '../assets/imgs/active.png'
  import trafficbetter from '../assets/imgs/traffic-better.png'
  import trb from '../assets/imgs/trb.png'
  import video from '../assets/imgs/video.png'
  import red from '../assets/imgs/a-active.png'
  import eme from '../assets/imgs/emergency.png'
  import emg from '../assets/imgs/emg.png'
  import dispatch from '../assets/imgs/dispatch.png'

  export default {
    name: "home",
    components: {
      "b-menu": Menu,
      'b-eventcard': EventCard,
      'b-relation': Relation
    },
    data() {
      return {
        showView: false,
        viewId: null,
        act: false,
        current: '',
        showEvent: false,
        showTraffic: false,
        showVipRoad: false,
        showVipCar: false,
        showCar: false,
        showDis: false,
        showEme: false,
        showAct: false,
        showTrafficBetter: false,
        event: event,
        traffic: traffic,
        viproad: viproad,
        vipcar: vipcar,
        car: car,
        police: police,
        waring: eWaring,
        eme: eme,
        emg: emg,
        trb: trb,
        police: police,
        dispatch: dispatch,
        active: active,
        red: red,
        trafficbetter: trafficbetter,
        trafficCtrl: new BMapLib.TrafficControl({
          showPanel: false //是否显示路况提示面板,BmapLib需要在baseconf声明
        }),
        nav: '',
      };
    },
    mounted() {
      this.map();
      this.openEvent();
    },
    methods: {
      map() {
        let map = new BMap.Map("map");
        window.map = map;
        map.centerAndZoom(new BMap.Point(121.47, 31.23), 13); // 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity("上海");
        map.setMapStyle({style: "light"});
      },
      openView(id) {
        if (this.viewId) {
          if (this.viewId == id&&this.showView){
            this.showView = false;
            console.log(id);
          }else {
            this.viewId = id;
            this.showView = false;
            this.showView = true;
            console.log(id);
          }
        }else {
          this.showView = true;
          this.viewId = id;
          console.log(id);
        }
      },
      //互斥方法
      mutex(n) {
        if (this.current == '' || this.current != n) {
          this.current = n;
          this.act = true;
        } else if (this.current == n) {
          this.act = false;
        }
      },
      //路况
      openTraffic() {
        this.nav = '路况';
        this.showTraffic = !this.showTraffic;
        this.showEvent = false;
        this.showVipRoad = false;
        this.showVipCar = false;
        this.showCar = false;
        this.showDis = false;
        this.showEme = false;
        this.showAct = false;
        this.showTrafficBetter = false;
        //实时路况
        if (this.showTraffic) {
          map.addControl(this.trafficCtrl);
          this.trafficCtrl.showTraffic({predictDate: {hour: 15, weekday: 1}}); //默认开启
        } else {
          map.removeControl(this.trafficCtrl);
        }
      },
      //事件
      openEvent() {
        this.nav = '事件';
        map.clearOverlays();
        this.showEvent = !this.showEvent;
        this.showTraffic = false;
        this.showVipRoad = false;
        this.showVipCar = false;
        this.showCar = false;
        this.showDis = false;
        this.showEme = false;
        this.showAct = false;
        this.showTrafficBetter = false;
        if (this.showEvent) {
          let bounds = map.getBounds();
          let sw = bounds.getSouthWest();
          let ne = bounds.getNorthEast();
          let lngSpan = Math.abs(sw.lng - ne.lng);
          let latSpan = Math.abs(ne.lat - sw.lat);
          for (var i = 0; i < 10; i++) {
            let point = new BMap.Point(sw.lng + lngSpan * (Math.random()), ne.lat - latSpan * (Math.random()));
            this.addMark(point, this.waring);
          }
        } else {
          map.clearOverlays();
        }
      },
      //勤务调度
      openDispatch() {
        this.nav = '勤务调度';
        map.clearOverlays();
        this.showDis = !this.showDis;
        this.showEvent = false;
        this.showTraffic = false;
        this.showVipRoad = false;
        this.showVipCar = false;
        this.showCar = false;
        this.showEme = false;
        this.showAct = false;
        this.showTrafficBetter = false;
        if (this.showDis) {
          let bounds = map.getBounds();
          let sw = bounds.getSouthWest();
          let ne = bounds.getNorthEast();
          let lngSpan = Math.abs(sw.lng - ne.lng);
          let latSpan = Math.abs(ne.lat - sw.lat);
          for (var i = 0; i < 10; i++) {
            let point = new BMap.Point(sw.lng + lngSpan * (Math.random()), ne.lat - latSpan * (Math.random()));
            this.addMark(point, this.police);
          }
        } else {
          map.clearOverlays();
        }
      },
      //重大活动
      openActive() {
        this.nav = '重大活动';
        map.clearOverlays();
        this.showAct = !this.showAct;
        this.showDis = false;
        this.showEvent = false;
        this.showTraffic = false;
        this.showVipRoad = false;
        this.showVipCar = false;
        this.showCar = false;
        this.showEme = false;
        this.showTrafficBetter = false;
        if (this.showAct) {
          let bounds = map.getBounds();
          let sw = bounds.getSouthWest();
          let ne = bounds.getNorthEast();
          let lngSpan = Math.abs(sw.lng - ne.lng);
          let latSpan = Math.abs(ne.lat - sw.lat);
          for (var i = 0; i < 10; i++) {
            let point = new BMap.Point(sw.lng + lngSpan * (Math.random()), ne.lat - latSpan * (Math.random()));
            this.addMark(point, this.red);
          }
        } else {
          map.clearOverlays();
        }
      },
      //应急
      openEme() {
        this.nav = '应急';
        map.clearOverlays();
        this.showEme = !this.showEme;
        this.showAct = false;
        this.showDis = false;
        this.showEvent = false;
        this.showTraffic = false;
        this.showVipRoad = false;
        this.showVipCar = false;
        this.showCar = false;
        this.showTrafficBetter = false;
        if (this.showEme) {
          let bounds = map.getBounds();
          let sw = bounds.getSouthWest();
          let ne = bounds.getNorthEast();
          let lngSpan = Math.abs(sw.lng - ne.lng);
          let latSpan = Math.abs(ne.lat - sw.lat);
          for (var i = 0; i < 10; i++) {
            let point = new BMap.Point(sw.lng + lngSpan * (Math.random()), ne.lat - latSpan * (Math.random()));
            this.addMark(point, this.emg);
          }
        } else {
          map.clearOverlays();
        }
      },
      //信号优化
      openTrafficBetter() {
        this.nav = '信号优化';
        map.clearOverlays();
        this.showTrafficBetter = !this.showTrafficBetter;
        this.showAct = false;
        this.showDis = false;
        this.showEvent = false;
        this.showTraffic = false;
        this.showVipRoad = false;
        this.showVipCar = false;
        this.showCar = false;
        this.showEme = false;
        if (this.showTrafficBetter) {
          let bounds = map.getBounds();
          let sw = bounds.getSouthWest();
          let ne = bounds.getNorthEast();
          let lngSpan = Math.abs(sw.lng - ne.lng);
          let latSpan = Math.abs(ne.lat - sw.lat);
          for (var i = 0; i < 10; i++) {
            let point = new BMap.Point(sw.lng + lngSpan * (Math.random()), ne.lat - latSpan * (Math.random()));
            this.addMark(point, this.trb);
          }
        } else {
          map.clearOverlays();
        }
      },
      //vip道路
      openVipRoad() {
        this.nav = 'VIP道路';
        map.clearOverlays();
        this.showVipRoad = !this.showVipRoad;
        this.showTrafficBetter = false;
        this.showAct = false;
        this.showDis = false;
        this.showEvent = false;
        this.showTraffic = false;
        this.showVipCar = false;
        this.showCar = false;
        this.showEme = false;
        if (this.showVipRoad) {
          let start = "东方明珠";
          let end = "上海博物馆";
          let driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, autoViewport: true}, policy: '最少时间'});
          driving.search(start, end);
        } else {
          map.clearOverlays();
        }
      },
      /*
      * i is a pic object
      */
      addMark(point, i) {
        let icon = new BMap.Icon(i, new BMap.Size(50, 50), {
          imageSize: new BMap.Size(50, 50)
        });
        let eventMarker = new BMap.Marker(point, {icon: icon, offset: new BMap.Size(0, -25)});  // 创建标注
        map.addOverlay(eventMarker);
        eventMarker.setAnimation(BMAP_ANIMATION_BOUNCE);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home {
    width: 100%;
    height: 100%;
    position: relative;
    > .menu-list {
      position: absolute;
      width: 100%;
      bottom: 10px;
      text-align: center;
      > b-menu {
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
    > .event-list {
      position: absolute;
      right: 1vw;
      height: 75vh;
      overflow-y: auto;
    }
    > .relation-view {
      position: absolute;
      right: 73vh;
    }
    > .nav{
      position: absolute;
      background: linear-gradient(180deg, rgba(246, 246, 222, 0.8) 0%, #fff);
      padding: 10px 20px;
      font-size: 20px;
      top: 10px;
    }
  }

  #map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  button {
    z-index: 2;
    position: absolute;
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
    transform: translateY(-75vh);
    opacity: 0;
  }
</style>
