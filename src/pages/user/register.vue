<template>
    <el-container>
        <el-main>
            <el-col :span="8" class="register-container">
                <el-form label-width="70px">
                <el-form-item :label="i18nList.account">
                    <el-input v-model="account" :placeholder="i18nList.placeholder_account"></el-input>
                </el-form-item>
                <el-form-item :label="i18nList.password">
                    <el-input type="password" v-model="password" :placeholder="i18nList.placeholder_password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">{{i18nList.register}}</el-button>
                </el-form-item>
                </el-form>
            </el-col>
        </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      account: '',
      password: '',
      i18nList: ''
    }
  },
  mounted () {
    const i18nList = {
      account: this.$t('login.account'),
      password: this.$t('login.password'),
      placeholder_account: this.$t('login.placeholder_account'),
      placeholder_password: this.$t('login.placeholder_password'),
      register: this.$t('login.register')
    }
    this.i18nList = i18nList
  },
  methods: {
    register: function () {
      const params = new URLSearchParams()
      params.append('name', this.account)
      params.append('password', this.password)

      let that = this
      that.axios.post('/user/register', params).then(function (response) {
        var data = response.data
        if (data.status === 'success') {
          that.$router.push({name: 'login', params: {}})
        }
      })
    }
  }
}
</script>
