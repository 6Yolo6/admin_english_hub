<template>
  <el-row class="tac">
    <el-col :span="24">
      <div style="padding-left: 30px;color: black !important;">
        <h4>English Hub后台管理</h4>
      </div>
      <el-menu default-active="/manageUser" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <router-link to="manageUser">
          <el-menu-item index="/manageUser">
            <i class="el-icon-data-line"></i>
            <span>管理用户</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="/manageSource">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span>管理资源</span>
          </template>
          <router-link to="manageCategory">
            <el-menu-item index="">
              <i class="el-icon-data-line"></i>
              <span>管理单词</span>
            </el-menu-item>
          </router-link>
          <router-link to="manageComment">
            <el-menu-item index="">
              <i class="el-icon-data-line"></i>
              <span>管理图书</span>
            </el-menu-item>
          </router-link>
          <router-link to="manageComment">
            <el-menu-item index="">
              <i class="el-icon-data-line"></i>
              <span>管理视频</span>
            </el-menu-item>
          </router-link>
          <router-link to="manageOrder">
            <el-menu-item index="">
              <i class="el-icon-s-grid"></i>
              <span>管理新闻</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
        <router-link to="myAbout">
          <el-menu-item index="/myAbout">
            <i class="el-icon-info"></i>
            <span>关于</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "aside",
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.el-menu-item-group__title {
  padding: 0px !important;
}

.el-menu-item.is-active {
  background-color: rgb(159, 250, 223) !important;
}

.el-menu-item,
.el-submenu,
.el-submenu__title {
  color: #333 !important; /* 更暗的颜色以便在白色背景上看清楚 */
  background-color: rgb(159, 248, 249) !important;
}

.el-menu-item:hover,
.el-submenu__title:hover {
  color: rgb(237, 183, 112) !important; /* 当鼠标悬停时，文本颜色变为白色 */
  background-color: rgb(223, 226, 229);
}
</style>