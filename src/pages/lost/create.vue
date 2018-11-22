<template>
  <el-container>
    <el-main>
      <el-col :span="12">
        <el-form label-width="70px">
          <el-form-item :label="i18nList.name">
            <el-input v-model="name" :placeholder="i18nList.placeholder_name"></el-input>
          </el-form-item>
          <el-form-item :label="i18nList.description">
            <el-input type="textarea" v-model="description" :placeholder="i18nList.description"></el-input>
          </el-form-item>
          <area-select :data="pcaa" type="text" :placeholders="placeholders" :level="2" v-model="selected" ></area-select>
          <el-form-item :label="i18nList.address">
            <el-input v-model="address" :placeholder="i18nList.address"></el-input>
          </el-form-item>
          <el-form-item :label="i18nList.lostType">
            <el-select v-model="lostType" :placeholder="i18nList.lostType">
              <el-option
                v-for="item in lostTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="i18nList.reward">
            <el-input v-model="reward" :placeholder="i18nList.reward"></el-input>
          </el-form-item>
          <el-form-item :label="i18nList.img">
            <el-upload
              class="upload-demo"
              action="/api/lost/img/upload"
              :multiple="multiple"
              :on-change="handleChange"
              :on-success="successUpload"
              :file-list="img">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">{{i18nList.submit}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-main>
  </el-container>
</template>

<script>
import { pcaa } from 'area-data'
export default {
  name: 'LostCreate',
  data () {
    return {
      i18nList: '',
      name: '',
      description: '',
      pcaa: pcaa,
      placeholders: ['选择省', '选择市', '选择区'],
      selected: [],
      address: '',
      img: [],
      imgPath: [],
      reward: '',
      lostType: '',
      lostTypeList: [],
      multiple: true
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

    let that = this
    that.axios.get('/lost/lostTypeList').then(function (resp) {
      that.lostTypeList = resp.data
    })
  },
  methods: {
    handleChange (file, img) {
      this.img = img.slice(-3)
    },
    successUpload (response, file, fileList) {
      if (response.status === 'success') {
        this.imgPath.push(response.path)
      }
    },
    submit () {
      const params = new URLSearchParams()
      params.append('name', this.name)
      params.append('description', this.description)
      params.append('selected', this.selected)
      params.append('address', this.address)
      params.append('img', this.imgPath)
      params.append('reward', this.reward)
      params.append('lostType', this.lostType)

      let that = this
      that.axios.post('/lost/create', params).then(function (response) {
        var data = response.data
        console.info(response)
        if (data.status === 'success') {
          // that.$router.push({name: 'login', params: {}})
        }
      })
    }
  }
}
</script>
