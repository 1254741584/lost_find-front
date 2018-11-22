<template>
  <el-container>
    <el-main>
      <el-col :span="8" class="login-container">
        <el-form label-width="70px">
          <el-form-item :label="i18nList.account">
            <el-input v-model="account" :placeholder="i18nList.placeholder_account"></el-input>
          </el-form-item>
          <el-form-item :label="i18nList.password">
            <el-input type="password" v-model="password" :placeholder="i18nList.placeholder_password"></el-input>
          </el-form-item>
          <el-form-item :label="i18nList.identifying_code">
            <input type="text" v-model="code"/>
            <label id="code" @click="createCode" class="verification1" v-text="checkCode"></label>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">{{i18nList.login}}</el-button>
            <span>{{i18nList.forget_password}}</span>
          </el-form-item>
        </el-form>
      </el-col>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: '',
      i18nList: '',
      code: '',
      checkCode: ''
    }
  },
  mounted () {
    const i18nList = {
      account: this.$t('login.account'),
      password: this.$t('login.password'),
      placeholder_account: this.$t('login.placeholder_account'),
      placeholder_password: this.$t('login.placeholder_password'),
      identifying_code: this.$t('login.identifying_code'),
      login: this.$t('login.login'),
      forget_password: this.$t('login.forget_password')
    }
    this.i18nList = i18nList
    this.createCode()
  },
  methods: {
    login: function () {
      var that = this
      if (that.account === '') {
        alert('请输入账号')
        return
      }

      if (that.password === '') {
        alert('请输入密码')
        return
      }

      if (that.code.toUpperCase() !== that.checkCode.toUpperCase()) {
        alert('验证码不正确')
        return
      }
      that.axios.get('/user/login', {
        params: {
          name: that.account,
          password: that.password
        }
      }).then(function (response) {
        var data = response.data
        if (data.status === 'success') {
          that.$router.push({name: 'index', params: {}})
        }
      })
    },
    createCode: function () {
      var code = ''
      var codeLength = 4
      var random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z']
      for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36)
        code += random[index]
      }
      this.checkCode = code
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    border: 1px solid #ccc;
    padding: 80px 30px;
    float: right;
    margin-right: 70px;

    .el-form {
      width: 80%;
      margin: 20px auto;
    }
  }
</style>
