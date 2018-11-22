<template>
    <el-row>
        <el-col :span="20">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="4">
            <span v-if="userName != ''">
                欢迎你:{{userName}}
                <el-button @click="logout">退出</el-button>
            </span>
            <span v-if="userName == ''">
                <el-button @click="login">登录</el-button>
                <el-button @click="register">注册</el-button>
            </span>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      userName: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    login () {
      this.$router.push({name: 'login', params: {}})
    },
    register () {
      this.$router.push({name: 'register', params: {}})
    },
    logout () {
      let that = this
      that.axios.get('/user/logout').then(function (response) {
        let data = response.data

        if (data.status === 'success') {
        //   window.reload()
          that.$router.go(0)
        }
      })
    }
  },
  mounted () {
    let that = this
    that.axios.get('/user/judge-login').then(function (response) {
      let data = response.data

      if (data.status === 'success') {
        that.userName = data.name
      }
    })
  }
}
</script>

<style lang="less" scoped>

</style>
