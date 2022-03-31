<template>
  <div id="main">
    <div id="back-img">
      <img src="./assets/img/bg/bg.jpg"
        alt="404"
        style="width: 100%;filter:blur(80px);" />
    </div>
    <div id="app">
      <TopBar></TopBar>
      center
      <BottomBar class="btm-b"></BottomBar>
    </div>
  </div>
</template>
<script>
import TopBar from "components/common/topbar/TopBar";
import BottomBar from "components/common/bottombar/BottomBar";
export default {
  name: "App",
  components: {
    TopBar,
    BottomBar
  }
}
</script>
<style lang="scss" scoped>
#main{
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  #back-img{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    img{
        width: 100%;
    }
  }
  #app{
    width: 1400px;
    margin: 0 auto;
    margin-top: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
      .btm-b {
        position: relative;
      }
  }
}
</style>
