<template>
  <el-container>
    <el-header>
      <Head></Head>
    </el-header>
    <el-main>
      <el-col :span="6" class="new-lost" v-for="(lost, index) in lost_list" :key="index">
        <el-card class="card-lost">
          {{lost}}
        </el-card>
      </el-col>
    </el-main>
  </el-container>
</template>
<script>
import Head from '@/components/Head'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lost_list: []
    }
  },
  components: {
    Head
  },
  mounted () {
    let that = this
    that.axios.get('/lost/getNewLost').then(function (response) {
      that.lost_list = response.data
      console.info(response.data)
    })
  }
}
</script>

<style lang="less" scoped>
  h1 {
    p {
      color: red;
    }
  }

  .new-lost {
    .card-lost {
      display: flex;
    }
  }
</style>
