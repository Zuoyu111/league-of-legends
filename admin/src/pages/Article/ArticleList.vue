<template>
  <div>
    <h2>分类列表</h2>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="260"></el-table-column>
      <el-table-column prop="title" label="文章名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="$router.push(`/articles/edit/${scope.row._id}`)" type="primary">编辑</el-button>
          <el-button @click="remove(scope.row)" type="danger ">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: "CategoryList",
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/articles')
      this.items = res.data
    },
    async remove(row) {

        this.$confirm(`是否确定删除分类"${row.title}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          await this.fetch()
        })

    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style scoped>

</style>