<template>
  <div class="home">
    <div id="map"></div>
    <div class="nav">
      <span style="cursor:pointer;" @click="toHome">指挥调度>></span><span class="now">{{nav}}<span>专栏</span></span>
    </div>
    <div class="menu-list">
      <b-menu class="bmenu" :img-url="event" name="事件" :active="showEvent" @click="openEvent"></b-menu>
      <b-menu class="bmenu" :img-url="traffic" name="路况" :active="showTraffic" @click="openTraffic"></b-menu>
      <b-menu class="bmenu" :img-url="viproad" name="VIP线路" :active="showVipRoad" @click="openVipRoad"></b-menu>
      <b-menu class="bmenu" :img-url="vipcar" name="VIP车辆" :active="showVipCar" @click="showVipCar = !showVipCar"></b-menu>
      <b-menu class="bmenu" :img-url="car" name="重点车辆" :active="showCar" @click="showCar = !showCar"></b-menu>
      <b-menu class="bmenu" :img-url="dispatch" name="勤务调度" :active="showDis" @click="openDispatch"></b-menu>
      <b-menu class="bmenu" :img-url="eme" name="应急" :active="showEme" @click="openEme"></b-menu>
      <b-menu class="bmenu" :img-url="active" name="重大活动" :active="showAct" @click="openActive"></b-menu>
      <b-menu class="bmenu" :img-url="trafficbetter" name="信号优化" :active="showTrafficBetter"
              @click="openTrafficBetter"></b-menu>
    </div>
    <transition name="slide-fade">
      <div class="event-list" v-if="showEventList">
        <b-eventcard :class="{bg: showView}" v-for="(item,index) of eventList" :title="item.title" :show-view="showView" :item-index="viewId" :key="index" :echart-id="index+1" @click="openView"></b-eventcard>
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
  import Menu from './menu'
  import event from '../../assets/imgs/event.png'
  import traffic from '../../assets/imgs/traffic.png'
  import viproad from '../../assets/imgs/viproad.png'
  import vipcar from '../../assets/imgs/vipcar.png'
  import car from '../../assets/imgs/car.png'
  import police from '../../assets/imgs/police.png'
  import eWaring from '../../assets/imgs/e-waring.png'
  import active from '../../assets/imgs/active.png'
  import trafficbetter from '../../assets/imgs/traffic-better.png'
  import trb from '../../assets/imgs/trb.png'
  import video from '../../assets/imgs/video.png'
  import red from '../../assets/imgs/a-active.png'
  import eme from '../../assets/imgs/emergency.png'
  import emg from '../../assets/imgs/emg.png'
  import dispatch from '../../assets/imgs/dispatch.png'

  export default {
    name: "home",
    components: {
      "b-menu": Menu,
      'b-eventcard': EventCard,
      'b-relation': Relation
    },
    data() {
      return {
        showEventList: false,
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
        eventList:[
          {
            title: '中山西路解放路重大事故'
          },
          {
            title: '中山西路解放路重大事故'
          },
          {
            title: '中山西路解放路重大事故'
          },
          {
            title: '中山西路解放路重大事故'
          }
        ]
      };
    },
    mounted() {
      this.map();
      try {
        this.openEvent();
      }catch (e) {
        
      }
      
    },
    methods: {
      map() {
        let map = new BMap.Map("map");
        window.map = map;
        map.centerAndZoom(new BMap.Point(121.47, 31.23), 13); // 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity("上海");
        map.setMapStyle({style: "light"});
        map.enableScrollWheelZoom(true);
      },
      openView(id) {
        if (id!=null) {
          if (this.viewId) {
            if (this.viewId == id&&this.showView){
              this.showView = false;
            }else {
              this.viewId = id;
              this.showView = false;
              this.showView = true;
            }
          }else {
            this.showView = true;
            this.viewId = id;
          }
        }else {
          this.showView = false;
          this.viewId = id;
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
        this.showView = false;
        map.clearOverlays();
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
          this.showEventList = true;
          map.addControl(this.trafficCtrl);
          this.trafficCtrl.showTraffic({predictDate: {hour: 15, weekday: 1}}); //默认开启
        } else {
          this.showEventList = false;
          try {
            map.removeControl(this.trafficCtrl);
          }catch (e) {

          }
        }
      },
      //事件
      openEvent() {
        this.showView = false;
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
          this.showEventList = true;
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
          this.showEventList = false;
          map.clearOverlays();
        }
        //实时路况
        if (this.showTraffic) {
          map.addControl(this.trafficCtrl);
          this.trafficCtrl.showTraffic({predictDate: {hour: 15, weekday: 1}}); //默认开启
        } else {
          try {
            map.removeControl(this.trafficCtrl);
          }catch (e) {

          }
        }
      },
      //勤务调度
      openDispatch() {
        this.showView = false;
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
          this.showEventList = true;
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
          this.showEventList = false;
          map.clearOverlays();
        }
        //实时路况
        if (this.showTraffic) {
          map.addControl(this.trafficCtrl);
          this.trafficCtrl.showTraffic({predictDate: {hour: 15, weekday: 1}}); //默认开启
        } else {
          try {
            map.removeControl(this.trafficCtrl);
          }catch (e) {

          }
        }
      },
      //重大活动
      openActive() {
        this.showView = false;
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
          this.showEventList = true;
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
          this.showEventList = false;
          map.clearOverlays();
        }
        //实时路况
        if (this.showTraffic) {
          map.addControl(this.trafficCtrl);
          this.trafficCtrl.showTraffic({predictDate: {hour: 15, weekday: 1}}); //默认开启
        } else {
          try {
            map.removeControl(this.trafficCtrl);
          }catch (e) {

          }
        }
      },
      //应急
      openEme() {
        this.showView = false;
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
          this.showEventList = true;
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
          this.showEventList = false;
          map.clearOverlays();
        }
      },
      //信号优化
      openTrafficBetter() {
        this.showView = false;
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
          this.showEventList = true;
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
          this.showEventList = false;
          map.clearOverlays();
        }
        //实时路况
        if (this.showTraffic) {
          map.addControl(this.trafficCtrl);
          this.trafficCtrl.showTraffic({predictDate: {hour: 15, weekday: 1}}); //默认开启
        } else {
          try {
            map.removeControl(this.trafficCtrl);
          }catch (e) {

          }
        }
      },
      //vip道路
      openVipRoad() {
        this.showView = false;
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
          this.showEventList = true;
          let start = "东方明珠";
          let end = "上海博物馆";
          let driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, autoViewport: true}, policy: '最少时间'});
          driving.search(start, end);
        } else {
          this.showEventList = false;
          map.clearOverlays();
        }
        //实时路况
        if (this.showTraffic) {
          map.addControl(this.trafficCtrl);
          this.trafficCtrl.showTraffic({predictDate: {hour: 15, weekday: 1}}); //默认开启
        } else {
          try {
            map.removeControl(this.trafficCtrl);
          }catch (e) {

          }
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
        // eventMarker.setAnimation(BMAP_ANIMATION_BOUNCE);
      },
      toHome(){
        this.$router.push('/');
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
      > .bmenu {
        &:not(:last-child) {
          margin-right: 1.5vh;
        }
      }
    }
    > .event-list {
      position: absolute;
      right: 2vh;
      height: 75vh;
      overflow-x: auto;
      > .bg{
        background: linear-gradient(180deg, rgba(246, 246, 222, 0.8) 0%, #fff 50%);
      }
      /*overflow-y: auto;*/
    }
    > .relation-view {
      position: absolute;
      right: 77vh;
    }
    > .nav{
      position: absolute;
      background: linear-gradient(180deg, rgba(246, 246, 222, 0.8) 0%, #fff);
      padding: 10px 20px;
      font-size: 3vh;
      top: 5vh;
      > .now{
        font-size: 4vh;
      }
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
