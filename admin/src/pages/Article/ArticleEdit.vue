<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}文章</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="详情">
        <vue-editor
          id="editor"
          useCustomImageHandler
          @imageAdded="handleImageAdded"
          v-model="model.body"
        >
        </vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: "CategoryEdit",
  props: ["id"],
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  methods: {

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      console.log(111);
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      if (this.id) {
        console.log(this.model);
        await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/articles", this.model);
      }

      await this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功了",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>

<style scoped>
</style>