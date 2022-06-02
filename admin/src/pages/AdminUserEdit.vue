<template>
  <div>
    <h2>{{id ? '编辑' : '新建'}}管理员</h2>
    <el-form label-width="120px" @submit.native.prevent="save">

      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
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
    }
  },
  methods: {
    async save() {

      if( this.id ) {
        console.log(this.model)
        await this.$http.put(`rest/admin_users/${this.id}`,this.model)
      } else {
        await this.$http.post('rest/admin_users',this.model)
      }

      await this.$router.push('/admin_users/list')
      this.$message({
        type: 'success',
        message: '保存成功了'
      })

    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
      
    },
  },
  created() {
    this.id && this.fetch()
  },
  mounted() {
    // if(this.id) this.model = {}
  },
  watch: {
    id(value) {
      console.log(value)
      this.model = {}
    }
  }
}
</script>

<style scoped>

</style>