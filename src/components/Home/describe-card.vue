<template>
  <div id="card">
    <img :src=imgUrl alt="">
    <p class="title">{{title}}</p>
    <p class="info">{{info}}</p>
  </div>
</template>
<script>
  export default {
    name: 'card',
    props: {
      title: {
        type: String
      },
      imgUrl: {
        type: String
      },
      info: {
        type: String
      }
    }
  }
</script>
<style scoped>
  #card {
    position: relative;
    display: inline-block;
    width: 50vh;
    height: 50vh;
    transition: all 0.1s linear;
    background: #fff;
  }

  #card > img {
    width: 100%;
  }
  .title, .info{
    margin-left: 2vh;
  }

  .title {
    font-size: 24px;
    color: var(--color-title);
    font-weight: 900;
  }
  .info{
    font-size: var(--font-size-info);
    color: var(--color-info);
    top: 22em;
    right: .5em;
    width: 13em;
  }
  #card:hover {
    transform: scale(1.1);
    /*transition: all 0.3s linear;*/
    -webkit-box-shadow: 0 5px 20px #666;
    box-shadow: 0 5px 20px #666;
    z-index: 10;
  }
</style>
