<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}英雄</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
                class="avatar-uploader"
                accept="image/*"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="背景图">
            <el-upload
                class="avatar-uploader"
                accept="image/*"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(model,'background_img',res.url)"
            >
              <img v-if="model.background_img" :src="model.background_img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                  v-for="item in categories"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>

          <el-form-item label="技能">
            <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>

          <el-form-item label="攻击">
            <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>

          <el-form-item label="生存">
            <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                  v-for="item in items"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                  v-for="item in items"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>

          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>

          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>



        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})" size="small"> <i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12"  v-for="(item,index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

              <el-form-item label="冷却值">
                <el-input v-model="item.cdTime"></el-input>
              </el-form-item>

              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>

              <el-form-item label="图标">
                <el-upload
                    class="avatar-uploader"
                    accept="image/*"
                    :action="uplaodUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res => $set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.desc" type="textarea"></el-input>
              </el-form-item>

              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button @click="model.skills.splice(index,1)" type="danger" size="small">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="最佳搭档" name="partners">
          <el-button @click="model.partners.push({})" size="small"> <i class="el-icon-plus"></i> 添加搭档</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12"  v-for="(item,index) in model.partners" :key="index">

              <el-form-item label="名称">
                <el-select filterable v-model="item.hero">
                  <el-option
                      v-for="hero in heroes"
                      :key="hero._id"
                      :value="hero._id"
                      :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.desc" type="textarea"></el-input>
              </el-form-item>


              <el-form-item>
                <el-button @click="model.partners.splice(index,1)" type="danger" size="small">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>




      </el-tabs>


      <el-form-item>
        <el-button style="margin-top: 1rem" type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HeroEdit",
  props: ["id"],
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        heroes: [],
        scores: {
          difficult: 0,
        },
        items1: [],
        items2: [],
        skills: [],
        partners: [],
        usageTips: '',
        battleTips: '',
        teamTips: ''
      },
      categories: [],
      items: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/heroes", this.model);
      }

      await this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功了",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // this.model = res.data;
      // this.model = Object.assign({},this.model,res.data)
      console.log(res.data)
      this.model = { ...this.model, ...res.data };
    },
    async fetchCategory() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get(`rest/heroes`);
      this.heroes = res.data;
    },
    afterUpload(res) {
      console.log(res);
      this.$set(this.model, "avatar", res.url);
    },
  },
  created() {
    this.id && this.fetch();
    this.fetchItems()
    this.fetchCategory();
    this.fetchHeroes();
  },
};
</script>

<style>

</style>