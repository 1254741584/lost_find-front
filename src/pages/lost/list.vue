<template>
  <el-container>
    <el-header>
      <Head></Head>
    </el-header>
    <el-main>
      <el-row>
        <ul>
          <li v-for="type in lostTypeList" :key="type.id" :class="type.id == lostType ? 'acitvate' : ''">
            <span @click="selectType(type.id)">{{type.name}}</span>
          </li>
        </ul>
      </el-row>
      <el-row class="lost-list">
        <el-col :span="6" class="lost" v-for="(lost, index) in lost_List" :key="index">
          <el-card class="card-lost">
            <el-row >
              <p v-if="lost.name">{{lost.name}}</p>
              <p v-if="lost.description">{{lost.description}}</p>
              <p v-if="lost.address">{{lost.address}}</p>
              <p v-if="lost.img" v-html="formatImagePath(lost.img)" class="lost-img"></p>
              <p v-if="lost.type_name">{{lost.type_name}}</p>
              <p v-if="lost.reward">{{lost.reward}}</p>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSize"
          :page-size="currentPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import Head from '@/components/Head'

export default {
  name: 'LostList',
  data () {
    return {
      lostTypeList: [],
      lostType: '',
      lost_List: [],
      currentPage: 1,
      pageSize: [10, 20, 50, 100],
      currentPageSize: 10
    }
  },
  mounted () {
    const i18nList = {
      name: this.$t('lost.name'),
      placeholder_name: this.$t('lost.placeholder_name'),
      description: this.$t('lost.description'),
      address: this.$t('lost.address'),
      reward: this.$t('lost.reward'),
      lostType: this.$t('lost.lostType'),
      img: this.$t('lost.img'),
      submit: this.$t('lost.submit')
    }
    this.i18nList = i18nList

    this.lostType = this.$route.query.lostType

    let that = this
    that.axios.get('/lost/lostTypeList').then(function (resp) {
      that.lostTypeList = resp.data
    })

    this.getLostList()
  },
  methods: {
    selectType (id) {
      console.info(id)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    getLostList () {
      let data = {
        page: this.currentPage,
        pageSize: this.currentPageSize,
        lostType: this.lostType
      }

      let that = this
      that.axios.get('/lost/list', {
        params: data
      }).then(function (resp) {
        let data = resp.data
        if (data.status === 'success') {
          that.lost_List = data.data
        }
      })
    },
    formatImagePath: function (data) {
      console.info(data)
      let paths = data.split(',')
      let str = ''
      for (let i in paths) {
        str += `<img src="http://127.0.0.1:8080/img/${paths[i]}" class="img-lost"/>`
      }

      return str
    }
  },
  components: {
    Head
  },
  computed: {
    // formatImagePath: function (data) {
    //   console.info(data)
    //   // let paths = data.split(',')
    //   // for (let i in paths) {
    //   //   console.info(paths[i])
    //   // }

    //   return data
    // }
  }
}
</script>

<style lang="less" scoped>
  .acitvate {
    background: yellow;
  }

  ul {
    list-style-type: none;

    li {
      display: block;
      float: left;
      padding: 10px 15px;
      margin: 0 5px;
      border: 1px #ccc solid;
      border-radius: 5px;

      &:hover {
        border: 1px red solid;
      }
    }
  }
</style>

<style scoped>
.lost-img>>> img{
  width: 100px;
  height: 100px;
}
</style>
