<template>
  <div id="date">
    <div class="real-weather">
      <img src="../../assets/imgs/cloud.png" alt="">
      <div class="tmp">
        <div class="tmp-num">
          <span>20<span>℃</span></span>
        </div>
        <div class="tmp-dw">
          <p>阴(实时)</p>
        </div>
      </div>
    </div>
    <div class="real-time">
      <p class="ti">{{time}}</p>
      <p class="da">{{date}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        date: '',
        time: ''
      }
    },
    mounted(){
      this.getDate();
      this.getTime();
      this.timer = setInterval(this.getTime,1000);
    },
    beforeDestroy(){
      if (this.timer){
        clearInterval(this.timer);
      }
    },
    methods:{
      getDate(){
        let str = new Date();
        this.date = str.getFullYear()+'年'+this.format((str.getMonth()+1))+'月'+ str.getDate() +'日';
      },
      getTime(){
        let str = new Date();
        let sec = str.getSeconds().toString();
        let minutes = str.getMinutes().toString();
        let hours = str.getHours().toString();
        this.time = hours + ':' + this.format(minutes) + ':' + this.format(sec)
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
  }
</script>
<style scoped lang="scss">
  #date{
    width: 65vh;
    height: 30vh;
    display: inline-flex;
    justify-content: space-around;
    align-items: flex-end;
    vertical-align: top;
  }
  .real-weather{
    text-align: center;
    width: 25vh;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 24.5vh;
    > img{
      width: 10vh;
    }
  }
  .tmp{
    vertical-align: bottom;
  }
  .tmp-num{
    /*display: inline-block;*/
    font-size: 4vh;
    color: #fff;
  }
  .tmp-dw{
    display: inline-block;
    color: #fff;
  }
  .tmp-dw>p{
    font-size: 4vh;
  }
  .real-time{
    width: 25vh;
    height: 25vh;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .ti{
    color: #fff;
    font-size: 5vh;
    font-weight: 500;
    letter-spacing: 2px;
  }
  .da{
    color: #ccc;
    font-size: 2.5vh;
    letter-spacing: 1.5px;
    font-weight: 400;
  }
</style>
