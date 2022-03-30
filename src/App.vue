<template>
  <div id="main">
    <div id="back-img">
      <img src="./assets/img/bg/bg.jpg"
        alt="404"
        style="width: 100%;filter:blur(80px);" />
    </div>
    <div id="app">
      <TopBar></TopBar>
    </div>
  </div>
</template>
<script>
import TopBar from "components/common/topbar/TopBar";
export default {
  name: "App",
  components: {
    TopBar
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
  }
}
</style>
