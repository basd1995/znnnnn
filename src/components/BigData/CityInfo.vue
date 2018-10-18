<template>
  <div id="city-info">
    <div class="title">
      <p>全市概况</p><span>...</span>
    </div>
    <div class="top">
      <div class="inner">
        <div class="name">国省干路</div>
        <span class="num">157</span><span class="txt">条</span>
      </div>
      <div class="inner">
        <div class="name">全市道路</div>
        <span class="num">157</span><span class="txt">条</span>
      </div>
    </div>
    <div class="top" style="border-bottom: 0.5px solid #555;">
      <div class="inner">
        <div class="name">过江隧道</div>
        <span class="num">18</span><span class="txt">条</span>
      </div>
      <div class="inner">
        <div class="name">总里程</div>
        <span class="num">658</span><span class="txt">公里</span>
      </div>
    </div>
    <div class="bottom">
      <div class="inner">
        <span class="name">收费站</span><span class="num">18</span><span class="txt">个</span>
      </div>
      <div class="inner">
        <span class="name">桥隧</span><span class="num">6</span><span class="txt">个</span>
      </div>
    </div>
    <div class="bottom">
      <div class="inner">
        <span class="name">服务器</span><span class="num">18</span><span class="txt">个</span>
      </div>
      <div class="inner">
        <span class="name">公路站</span><span class="num">12</span><span class="txt">个</span>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
  #city-info{
    width: 100%;
    height: 55%;
    color: #fff;
    background-color: var(--bigdata-color);
    > .title{
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      padding: 5%;
      font-size: 3vh;
    }
    > .top{
      width: 100%;
      height: 22.5%;
      justify-content: space-around;
      align-items: center;
      display: inline-flex;
      > .inner{
        width: 35%;
        margin-bottom: 3%;
        > .name{
          font-size: 2vh;
          font-weight: 300;
        }
        > .num{
          font-size: 4.5vh;
          font-weight: 600;
          letter-spacing: 1px;
          margin-right: 8%;
          background: linear-gradient(to bottom, #fff, #93e3f9);
          -webkit-background-clip: text;
          color: transparent;
        }
        > .txt{
          font-size: 2vh;
          font-weight: 300;
        }
      }
    }
    > .bottom{
      width: 100%;
      height: 21%;
      justify-content: space-around;
      align-items: center;
      display: inline-flex;
      > .inner{
        width: 35%;
        margin-bottom: 3%;
        display: inline-flex;
        align-items: center;
        > .name{
          font-size: 2vh;
          font-weight: 300;
        }
        > .num{
          font-size: 4vh;
          font-weight: 600;
          letter-spacing: 1px;
          margin: 0 8%;
          background: linear-gradient(to bottom, #fff, #f1f037);
          -webkit-background-clip: text;
          color: transparent;
        }
        > .txt{
          font-size: 2vh;
          font-weight: 300;
        }
      }
    }
  }
</style>
