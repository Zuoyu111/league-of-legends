<template>
  <div>
    <h2>{{id ? '编辑' : '新建'}}分类</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" >
          <el-option
              v-for="item in parents"
              :key="item._id"
              :label="item.name"
              :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>


export default {
  name: "CategoryEdit",
  props: ['id'],
  data() {
    return {
      model: {},
      parents: []
    }
  },
  methods: {
    async save() {

      if( this.id ) {
        console.log(this.model)
        await this.$http.put(`rest/categories/${this.id}`,this.model)
      } else {
        await this.$http.post('rest/categories',this.model)
      }

      await this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功了'
      })

    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
      console.log(res.data,898989)
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
      console.log(res,888)
    }
  },
  created() {
    this.fetchParents()
    this.id && this.fetch()
  }
}
</script>

<style scoped>

</style>