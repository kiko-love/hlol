<template>
  <div id="app-demo-test-api">
    <!-- <a-breadcrumb>
      <a-breadcrumb-item href>
        <a-icon type="home" />
      </a-breadcrumb-item>
      <a-breadcrumb-item href>
        <a-icon type="user" />
        <span>Application List</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item>英雄列表</a-breadcrumb-item>
    </a-breadcrumb>-->
    <div style="height: 100%">
      <a-row type="flex" justify="space-between" align="top">
        <div class="top-bar">
          <div class="game-v">HLOL - 当前游戏版本：{{this.game_version}}</div>
          <div class="game-v">英雄数量: ：{{hero_list.length}}</div>
        </div>
      </a-row>
      <a-row type="flex" justify="center" align="top">
        <div class="h-list">
          <a-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-for="(item,index) in hero_list"
            :key="index"
            class="hero-card"
          >
            <a-card hoverable style="width: 250px" @click="viewofHero(item.heroId)">
              <template slot="actions" class="ant-card-actions">
                <!-- <video src="movie.ogg" controls="controls">
您的浏览器不支持 video 标签。
                </video>-->
                <!-- <audio controls="controls" style="width:250px">
                <source :src="item.selectAudio" type="audio/ogg" />Your browser does not support the audio element.
                </audio>-->
              </template>
              <template #cover>
                <div style="background-color: #ccb28c; height: 32px; width: 100%"></div>
              </template>
              <a-card-meta :title="item.name" :description="item.title+'('+item.changeLabel+')'">
                <template #avatar>
                  <a-avatar
                    :size="48"
                    :src="'https://game.gtimg.cn/images/lol/act/img/skin/small'+(item.heroId * 1000).toString()+'.jpg'"
                  />
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </div>
      </a-row>
    </div>
    <!-- <div class="one-block-2">
      <a-button @click="exec(1)"> 点击 </a-button>
    </div>-->
  </div>
</template>
<script>
import { localApi } from "@/api/main";

export default {
  created() {},
  mounted() {
    console.log(this.hero_list.length);
    if (this.hero_list.length == 0) {
      this.getHeroList();
    }
  },
  data() {
    return {
      hero_list: [],
      game_version: "00.00",
      type: 1
    };
  },
  methods: {
    exec(id) {
      const params = {
        id: id
      };
      localApi("testElectronApi", params)
        .then(res => {
          if (res.code !== 0) {
            return false;
          }
        })
        .catch(err => {
          console.log("err:", err);
        });
    },
    viewofHero(hid) {
      this.$router.push({ name: "heroDetail", params: { hid: hid } });
    },
    getHeroList() {
      let that = this;
      const hurl =
        "https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js";
      fetch(hurl)
        .then(response => response.json())
        .then(data => {
          that.hero_list = data.hero;
          that.game_version = data.version;
          console.log(data);
        })
        .catch(console.error);
    }
  }
};
</script>
<style lang="less" scoped>
#app-demo-test-api {
  padding: 0px 10px;
  text-align: left;
  width: 100%;
  overflow: hidden;
  .one-block-1 {
    font-size: 16px;
    padding-top: 10px;
  }
  .one-block-2 {
    padding-top: 10px;
  }
}

.h-list {
  height: calc(85vh);
  overflow: overlay;
  -webkit-user-select: none; /*webkit浏览器*/
}

.card-container {
  background: #ececec;
  // padding: 30px;
  display: flex;
}

.top-bar {
  background-color: #c2a476;
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-card {
  margin: 10px auto;
  display: flex;
  justify-content: center;
  // overflow: scroll !important;
}

.game-v {
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
}
</style>
