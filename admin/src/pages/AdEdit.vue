<template>
  <div>
    <h2>{{id ? '编辑' : '新建'}}广告位</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
          
      <el-form-item label="广告">
        <el-button @click="model.items.push({})" size="small"> <i class="el-icon-plus"></i> 添加广告</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="24"  v-for="(item,index) in model.items" :key="index">
              <el-form-item label="链接(URL)">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item style="margin-top:1rem;" label="图片">
                <el-upload
                    class="avatar-uploader"
                    accept="image/*"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="res => $set(item,'image',res.url)"
                >
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>                            

              <el-form-item>
                <el-button @click="model.items.splice(index,1)" type="danger" size="small">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form-item>



      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>


export default {
  name: "AdEdit",
  props: ['id'],
  data() {
    return {
      model: {
        items: []
      },
      
    }
  },
  methods: {
    async save() {

      if( this.id ) {
        console.log(this.model)
        await this.$http.put(`rest/ads/${this.id}`,this.model)
      } else {
        await this.$http.post('rest/ads',this.model)
      }

      await this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功了'
      })

    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      // this.model = res.data
      // this.model = Object.assign({},res.data,this.model)
      this.model = {...this.model,...res.data}
      // console.log(res.data,898989)
    }
  },
  created() {
    // this.fetchParents()
    this.id && this.fetch()
  }
}
</script>

<style scoped>

</style>