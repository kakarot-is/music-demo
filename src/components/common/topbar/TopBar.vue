<template>
  <div id="topbar">
    <div class="left">
      <a href="#">
        <img :src="userImg"
          alt="404" />
      </a>
      <span v-if="currentUserInfo"
        style="fontSize:13px;">{{currentUserInfo.nickname}}</span>
      <el-button type="text"
        @click="dialogFormVisible = true"
        style="color:#fff"
        v-else>登录</el-button>
      <el-button @click="logout"
        v-if="currentUserInfo !== null"
        size="mini"
        style="margin-top: 10px;margin-left: 15px;">退出</el-button>
      <el-dialog title="请登录~"
        :visible.sync="dialogFormVisible"
        width="20%">
        <img src="~/assets/img/login/phone.png"
          style="display: block;margin: 10px auto;width:18%"
          alt="">
        <el-form :model="form"
          :rules="loginInfoRules">
          <el-form-item label="手机号"
            :label-width="formLabelWidth">
            <el-input v-model="form.phone"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码"
            :label-width="formLabelWidth">
            <el-input v-model="form.password"
              autocomplete="off"
              type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
          class="dialog-footer">
          <el-button @click="cancelLogin">取 消</el-button>
          <el-button type="primary"
            @click="confirmLogin">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="center">
      <slot name="center">
        <div>
          <a href='javascript:void(0)'
            @click.stop="togBack">
            <i class="el-icon-arrow-left"></i>
          </a>
        </div>
        <div>
          <a href>
            <i class="el-icon-refresh"></i>
          </a>
        </div>
        <div class="inputSq">
          <el-input size="mini"
            placeholder="请输入内容"
            v-model="input"
            clearable
            suffix-icon="el-icon-search"
            @keyup.enter.native="togSearch"></el-input>
        </div>
        <div>
          <a href>
            <i class="el-icon-microphone"></i>
          </a>
        </div>
      </slot>
    </div>
    <div class="right">
      <slot name="right">
        <a href>回到旧版</a>
        <a href>
          <i class="el-icon-monitor"></i>
        </a>
        <a href>
          <i class="el-icon-mobile-phone"></i>
        </a>
        <a href>
          <i class="el-icon-menu"></i>
        </a>
        <a href>
          <i class="el-icon-s-opportunity"></i>
        </a>
        <a href>
          <i class="el-icon-setting"></i>
        </a>
        <a href>
          <i class="el-icon-bell"></i>
        </a>
        <a href>
          <i class="el-icon-close"></i>
        </a>
      </slot>
    </div>
  </div>
</template>
<script>
import { getPhoneLogin, getPhoneLoginOut, getUserSonglist } from "network/login"
import { USER_SONGLIST } from '@/store/mutationType'
export default {
  name: "TopBar",
  data() {
    return {
      userImg: require("assets/img/common/logo.png"),//默认图片
      currentUserInfo: window.localStorage.getItem('currentUserInfo') === 'null' ? null : JSON.parse(window.localStorage.getItem('currentUserInfo')), //本地获取用户信息
      input: '',
      dialogFormVisible: false, // 登录弹窗
      form: {
        phone: "18279636216",
        password: "2468098134.x",
      },
      loginInfoRules: { // 登录格式的校验
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
      },
      formLabelWidth: "80px"
    }
  },
  methods: {
    togBack() {
      this.$router.back();
    },
    togSearch() {
      if (this.input === '') {
        this.$toast.show("不能为空哦~", 2000);
        return;
      }

    },
    logout() { //退出登录
      this.getPhoneLoginOut()
    },
    async getPhoneLoginOut() {
      await getPhoneLoginOut()
      // 清除当前用户信息
      this.currentUserInfo = null
      window.localStorage.setItem("currentUserInfo", null);
      this.userImg = require("assets/img/common/logo.png");
      this.$store.commit(USER_SONGLIST, []);
    },
    //点击登录界面的 取消
    cancelLogin() {
      this.dialogFormVisible = false;
    },
    confirmLogin() { this.getPhoneLogin(this.form.phone, this.form.password) },
    async getPhoneLogin(phone, pwad) {
      const res = await getPhoneLogin(phone, pwad)
      if (res === undefined) {
        this.dialogFormVisible = true; // 登录框不消失
        this.$toast.show("该手机号码不存在或未注册", 2000)
        return
      }
      //其他错误时
      if (res.code !== 200) {
        this.dialogFormVisible = true;
        //提示对应的错误信息
        this.$toast.show(res.message, 2000);
        // console.log(res.message);
        return;
      }
      //保存cookie的信息
      // window.localStorage.setItem("musicCookie", res.cookie);
      //保存用户信息,退出时删除
      window.localStorage.setItem('currentUserInfo', JSON.stringify(res.profile))
      this.currentUserInfo = res.profile // 放入用户信息 图片
      this.userImg = this.currentUserInfo.avatarUrl
      this.dialogFormVisible = false;
      this.$toast.show(`欢迎你${this.currentUserInfo.nickname}`, 2000)
      this.getUserSonglist(this.currentUserInfo.userId);
    },
    async getUserSonglist(userId) {  // 获取用户歌曲列表 保存vuex
      const res = await getUserSonglist(userId)
      console.log(res.playlist);
      this.$store.commit(USER_SONGLIST, res.playlist)
    }
  },
  created() {
    // 判断本地是否有用户信息
    if (this.currentUserInfo) {
      this.userImg = this.currentUserInfo.avatarUrl
      this.getUserSonglist(this.currentUserInfo.userId);
    }
  },
  components: {
  }
};
</script>
<style scoped lang="scss">
#topbar{
  height: 60px;
  background: #5292fe;
  padding: 10px;
  position: relative;
  color: #fff;
  display: flex;
  justify-content: space-between;
  .center {
    color: #fff;
    margin-top: 4px;
    display: flex;
    justify-content: space-around;
    .inputSq {
        width: 360px;
        margin-left: 15px;
        margin-top: 12px;
    }
    /deep/ input.el-input__inner{
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.8);
        color: #888;
    }
     a i{
      font-size: 20px;
      color: rgba(255, 255, 255, 0.8);
      margin-left: 10px;
      margin-top: 15px;
     }
     a i:hover{
      color: rgba(255, 255, 255, 1);
     }     
    }
  .right{
     margin-top: 18px;
     a {
        color: rgba(255, 255, 255, 0.8);
        margin-right: 15px;
        text-decoration: none;
        font-size: 13px;
    }
     a:last-child {
        margin-right: 200px;
        font-size: 19px;
    }    
  }
  .left {
    margin-left: 20px;
    margin-top: 10px;
    a{
        font-size: 14px;
        color: white;
        text-decoration: none;
        vertical-align: middle;
        margin-right: 5px;
    }
    a>img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }
  }
}
.el-row {
margin-bottom: 20px;
background-color: #5292fe;
width: 100%;
}
.el-col {
border-radius: 4px;
}
.bg-purple-dark {
background: #5292fe;
}
.bg-purple {
background: blue;
}
.bg-purple-light {
background: #5292fe;
}
.grid-content {
border-radius: 4px;
min-height: 80px;
}
.row-bg {
padding: 10px 0;
background-color: #5292fe;
}
</style>