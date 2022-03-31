<template>
  <div id="btmbar">
    <div class="scroll">
      <!-- 进度条 -->
      <el-slider v-model="musicDuration"
        :max="totalDuration"
        @change="musicDurationChange"
        :show-tooltip="false"
        :disabled="isUrl"></el-slider>
    </div>
    <div class="content">
      <div class="left">
        <div class="singimg">
          <a href="javascript:void(0)"
            @click.stop="togSingel">
            <div class="s-img">
              <img :src="getNowMusicMenu.al.picUrl"
                alt />
              <div class="m-img">
                <a href="javascript:void(0)"
                  @click.stop="togSingel">
                  <i class="el-icon-arrow-up"
                    style="color:rgba(255,255,255,0.8)"></i>
                  <i class="el-icon-arrow-up"
                    style="color:rgba(255,255,255,0.8);position: absolute;top:12px;left:13px"></i>
                </a>
              </div>
            </div>
          </a>
        </div>
        <div class="sing">
          <div>
            <a href>{{getNowMusicMenu.ar[0].name}} -
              {{getNowMusicMenu.name || getNowMusicMenu.al.name}}</a>
          </div>
          <div class="sing-time">
            <span>{{musicDuration | showTime}}</span>/
            <span>{{getTime}}</span>
          </div>
        </div>
        <div class="icon">
          <span style="cursor: pointer;">
            <i class="el-icon-star-off"
              v-show="true"></i>
            <i class="el-icon-star-on"
              v-show="false"></i>
          </span>
        </div>
        <div class="icon">
          <span style="cursor: pointer;">
            <i class="el-icon-download"></i>
          </span>
        </div>
        <div class="icon">
          <span style="cursor: pointer;">
            <i class="el-icon-chat-dot-square"></i>
          </span>
        </div>
        <div class="icon">
          <span style="cursor: pointer;">
            <i class="el-icon-more-outline"></i>
          </span>
        </div>
      </div>
      <div class="play">
        <div class="pre"
          @click="preMusic">
          <span style="cursor: pointer;">
            <i class="el-icon-caret-left"></i>
          </span>
        </div>
        <div class="start"
          @click="playMusic">
          <span style="cursor: pointer;">
            <i class="el-icon-video-pause"
              v-show="isplay"></i>
            <i class="el-icon-video-play"
              v-show="!isplay"></i>
          </span>
        </div>
        <div class="next"
          @click="nextMusic">
          <span style="cursor: pointer;">
            <i class="el-icon-caret-right"></i>
          </span>
        </div>
      </div>
      <div class="more">
        <div style="marginRight:30px"
          class="loundBox">
          <a href="#">
            <i class="el-icon-mic"></i>
          </a>
          <div class="lound">
            <el-slider v-model="value"
              vertical
              height="60px"
              size="mini"
              @change="volumeChange"></el-slider>
          </div>
        </div>
        <el-button type="primary"
          class="more-btn">
          倍速
          <i class="el-icon-arrow-up el-icon--right"></i>
        </el-button>
        <el-button type="primary"
          class="more-btn">
          标准
          <i class="el-icon-arrow-up el-icon--right"></i>
        </el-button>
        <div>
          <a href="#">
            <i class="el-icon-s-data"></i>
          </a>
        </div>
        <div>
          <a href="#">
            <i class="el-icon-sort"></i>
          </a>
        </div>
        <div>
          <a href="#">
            <i class="el-icon-close-notification"></i>
          </a>
        </div>
        <div>
          <span @click="showRightList"
            style="cursor: pointer;">
            <i class="el-icon-s-unfold"></i>
          </span>
        </div>
      </div>
    </div>
    <el-dialog :modal="false"
      :show-close="false"
      title="播放列表"
      :visible.sync="showRightDialog"
      width="23%"
      center>

    </el-dialog>
  </div>
</template>
<script>
import { timeFormat, songTimeFormat } from "utils/util";
import { mapGetters } from "vuex"
export default {
  name: "",
  data() {
    return {
      musicDuration: 12, // 当前播放时间
      totalDuration: 100, // 总时长
      isUrl: false, //设置无歌曲时进度条不可拖动
      isplay: false,
      value: 1,
      showRightDialog: false // 展示右边的歌单对话框
    };
  },
  computed: {
    getTime() {
      return timeFormat(this.getNowMusicMenu.dt);
    },
    ...mapGetters(["getNowMusicMenu",])
  },
  methods: {
    //显示右下角歌单
    showRightList() {
      this.showRightDialog = true;
    },
    musicDurationChange() {

    },
    togSingel() {

    },
    preMusic() { },
    playMusic() { },
    nextMusic() { },
    volumeChange() { }
  },
  components: {

  },
  filters: {
    showTime(value) {
      return songTimeFormat(value);
    },
  },
};
</script>
<style >
/* .el-dialog__wrapper{
  position: absolute !important;
  right: 0;
  bottom: 0;
  z-index: 99999;
  overflow: auto;
} */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
#btmbar .el-dialog{
  position: absolute;
  right: 260px;
  bottom: 80px;
  max-height: 600px;
  overflow: auto;
}
.scroll .el-slider__bar {
  background-image: linear-gradient(to left, #a1c4fd 0%, #c2e9fb 100%);
}
.lound .el-slider__bar {
  background: linear-gradient(#a1c4fd 0%, #c2e9fb 100%);
}
.loundBox:hover .el-slider.is-vertical .el-slider__runway {
  display: block;
}
.lound .el-slider__button {
  width: 10px;
  height: 10px;
}
.lound .el-slider.is-vertical .el-slider__runway {
  width: 4px;
  display: none;
}
</style>
<style scoped>
.lound {
  position: absolute;
  top: -26px;
  left: 10px;
}
.scroll {
  width: 98%;
  position: absolute;
  top: -22px;
  /* left: 217px; */
}
.more {
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
}
.more-btn {
  padding: 0;
  width: 60px;
  height: 20px;
  background: none;
  color: #888;
  margin-right: 8px;
}
.more div i {
  margin-right: 10px;
  font-size: 16px;
  color: #888;
}
.more div:last-of-type {
  margin-right: 200px;
}
#btmbar {
  position: relative;
  height: 70px;
  background: rgba(0, 0, 255, 0.1);
}
.content {
  display: flex;
  justify-content: space-between;
}
.content .left {
  display: flex;
}
.content .left > div {
  margin-left: 10px;
  margin-top: 10px;
}
.singimg img {
  width: 45px;
  height: 45px;
}
.s-img {
  position: relative;
}
.s-img:hover .m-img {
  display: block;
}
.m-img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 62px;
  font-size: 20px;
  border-radius: 5px;
  display: none;
}
.sing {
  padding-top: 8px;
  font-size: 14px;
}
.sing-time {
  margin-top: 8px;
  color: rgb(187, 192, 195);
}
.icon {
  padding-top: 15px;
  padding-left: 8px;
  font-size: 20px;
}
.play {
  display: flex;
  justify-content: space-between;
}
.play > div {
  font-size: 40px;
  margin-top: 10px;
}
.play i {
  color: #5192fe;
}
</style>