!<template>
  <div class="d-container">
    <a-row>
      <div style="background-color: transparent !important;position:fixed; z-index:10;">
        <a-page-header
          style="background-color: transparent !important; color:#ffffff;"
          :ghost="false"
          title="英雄详情"
          sub-title
          @back="() => $router.go(-1)"
        />
      </div>
    </a-row>
    <a-row>
      <div v-if="skins[0].iconImg !== undefined ">
        <a-avatar :size="64" :src="skins[0].iconImg" style="margin-top: 15px" />
        <div
          style="color:#fdd599; font-size: 20px; margin:0 0 15px 0"
        >{{heroInfo.hero.name+' - '+heroInfo.hero.title}}</div>
        <div class="des-sty">英雄简介</div>
        <div
          style="color:#beb194; font-size: 14px; text-align:left; width:80%; display: -webkit-inline-box;"
        >
          <div>{{heroInfo.hero.shortBio}}</div>
        </div>
      </div>
    </a-row>
    <a-row>
      <a-tabs default-active-key="1" :animated="false">
        <a-tab-pane v-for="(skill, index) in skill_passive" :key="index">
          <span slot="tab">
            <img width="32" height="32" :src="skill.abilityIconPath" />
            <span style="margin: 0px 0 0 5px; display: flex">{{skill.name}}</span>
            <span style="margin: 0px 0 0 5px; display: flex">被动技能</span>
          </span>
          <div style="width: 800px; text-align: left;">{{skill.description}}</div>
        </a-tab-pane>
        <a-tab-pane v-for="(skill, index) in skills" :key="index+1">
          <span slot="tab">
            <img width="32" height="32" :src="skill.abilityIconPath" />
            <span style="margin: 0px 0 0 5px; display: flex">{{skill.name}}</span>
            <span style="margin: 0px 0 0 5px; display: flex">{{skill.spellKey.toUpperCase()}}</span>
          </span>
          <div style="width: 800px; text-align: left;">{{skill.description}}</div>
        </a-tab-pane>
      </a-tabs>
    </a-row>
    <a-row>
      <a-carousel arrows dotPosition="bottom" effect="fade" style="background-color: black">
        <div
          slot="prevArrow"
          class="custom-slick-arrow arrow-slick-left"
          style="left: 10px;zIndex: 1"
        >
          <a-icon type="left-circle" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow arrow-slick-right" style="right: 10px">
          <a-icon type="right-circle" />
        </div>
        <!-- 自定义指示器 -->
        <a slot="customPaging" slot-scope="props">
          <div>
            <img
              width="49"
              height="36"
              :src="getpreviewImg(props.i)"
              :onerror="defaultImg"
              :alt="props.i"
            />
          </div>
          <!-- {{props.i}} -->
        </a>
        <template>
          <!-- 皮肤列表 -->
          <div v-for="(item,index) in skins" :key="index" class="skin-item">
            <template>
              <img :src="item.mainImg" alt />
            </template>
            <template>
              <div class="skin-name-container">
                <!-- 皮肤名字 -->
                <span class="skin-name">{{item.name}}</span>
              </div>
            </template>
          </div>
          <!-- 炫彩皮肤 -->
          <div v-for="(item,index) in chromas_skins" :key="index" class="skin-item">
            <template>
              <img
                :src="item.chromaImg"
                alt="skin"
                onerror="javascript:this.src='images/logoError.png';"
              />
            </template>
            <template>
              <div class="skin-name-container">
                <span class="skin-name">{{item.name}}</span>
              </div>
            </template>
          </div>
        </template>
      </a-carousel>
    </a-row>
    <a-row>
      <a-col>
        <!-- <img :src="nowSkin" alt /> -->
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  created() {},
  mounted() {
    console.log(this.$route.params);
    this.getHero(this.$route.params.hid);
  },
  data() {
    return {
      defaultImg:
        'this.width=36;this.height=36;this.onerror=null;this.src="' +
        require("@/assets/logo.png") +
        '"', //默认图地址
      skill_passive: [],
      skills: [],
      heroInfo: {},
      nowSkin: "",
      skins: [{}],
      chromas_skins: [{}],
      value: ""
    };
  },
  methods: {
    loadError(item, e) {
      // 图片加载出错
      // if (item.status == 0) {
      //   e.target.src = '@/assets/logo.png';
      //   item.status = 1;
      // }
      console.log(item);
      console.log(e);
    },
    sortSkills() {
      return this.sortByKey(this.heroInfo.spells, "spellKey");
    },
    sortByKey(array, key) {
      //(数组、排序的列)
      return array.sort(function(a, b) {
        let x = a[key];
        let y = b[key];
        console.log(x > y);
        return x > y;
      });
    },
    getHero(h_id) {
      let that = this;
      fetch("https://game.gtimg.cn/images/lol/act/img/js/hero/" + h_id + ".js")
        .then(response => response.json())
        .then(data => {
          that.heroInfo = data;
        })
        .then(() => {
          that.nowSkin = {};
          that.nowSkin = that.heroInfo.skins[0].mainImg;
          that.skins = [];
          that.chromas_skins = [];

          for (const s of that.heroInfo.skins) {
            // console.log(that.heroInfo.skins.length);
            if (s.chromas == 1) {
              that.chromas_skins.push(s);
            } else {
              that.skins.push(s);
            }
          }

          let skill_tmp = [],
            skey = ["Q", "W", "E", "R"];

          for (let a in that.heroInfo.spells) {
            if (that.heroInfo.spells[a].spellKey == "passive") {
              that.skill_passive.push(that.heroInfo.spells[a]);
            } else {
              skill_tmp.push(that.heroInfo.spells[a]);
            }
          }

          for (let k1 in skey) {
            for (let k2 in skill_tmp) {
              if (skey[k1] == skill_tmp[k2].spellKey.toUpperCase()) {
                that.skills.push(skill_tmp[k2]);
                continue;
              }
            }
          }
          console.log(that.skins);

          // console.log(that.chromas_skins);
        })
        .catch(console.error);
    },
    onchangeHeroId() {
      // console.log(this.value)
      this.getHero(this.value);
    },
    getpreviewImg(k) {
      if (k <= this.skins.length - 1) {
        return this.skins[k].mainImg;
      } else {
        k = k - this.skins.length;
        return this.chromas_skins[k].chromaImg;
      }
    }
  }
};
</script>

<style lang="less" scoped>
html body {
  height: 100%;
  width: 100%;
}

.des-sty {
  color: #fad156;
  font-size: 17px;
  margin-top: -10px;
}

.des-sty::before {
  content: "";
  height: 20px;
  width: 20px;
  background-color: #c2a476;
  color: #c2a476;
}

li img {
  transition: 0.1s;
}

/deep/ li.slick-active img {
  margin: 5px 0 0 0;
  width: 72px;
  height: 56px;
  border: 2px solid wheat;
  transition: 0.1s;
}

/deep/ li.slick-active img:hover {
  margin: 5px 0 0 0;
  width: 72px;
  height: 56px;
  border: 2px solid wheat;
  transition: 0.1s;
}

/deep/ li img:hover {
  margin: 5px 0 0 0;
  width: 64px;
  height: 48px;
  border: 2px solid wheat;
  transition: 0.1s;
}

/deep/ .ant-tabs-tabpane {
  color: wheat;
  text-align: center;
  width: 300px;
}

/deep/ .ant-tabs-tab {
  color: #7c694b;
  filter: grayscale(100%);
  transition: 0.5s;
}

/deep/ .ant-tabs-tabpane {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
}

/deep/ .ant-tabs-tab:hover {
  color: wheat;
}

/deep/ .ant-tabs-tab-active {
  color: wheat;
  filter: brightness(100%);
  transition: 0.5s;
}

/deep/ .anticon-arrow-left {
  color: #919190 !important;
  transition: 0.5s;
}

/deep/ .anticon-arrow-left :hover {
  color: wheat !important;
  transition: 0.5s;
}

/deep/ .ant-page-header-heading-title {
  color: wheat;
}

/deep/ .ant-page-header-heading-sub-title {
  color: rgb(209, 207, 202);
}

.d-container {
  width: 100%;
  background-color: black;
  height: calc(95vh);
  overflow: overlay;
  -webkit-user-select: none; /*webkit浏览器*/
}

.d-container img {
  max-width: 99%;
  max-height: 100%;
  border-radius: 5px;
  //   border: 2px solid #c2a476;
  //   filter: blur(20px);
  margin: 15px auto;
}

.skin-item {
  // border: 2px solid #c2a476;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96% !important;
}

/deep/ .slick-dots-bottom {
  // display: none !important;
  text-align: left;
}

.skin-name {
  font-size: 24px;
  color: wheat;
}

.skin-name-container {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.arrow-slick-left {
  margin-left: 40px;
}

.arrow-slick-right {
  margin-right: 40px;
}

.custom-slick-arrow {
  margin-top: -30px;
  width: 32px;
  height: 32px;
  font-size: 32px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  transition: 0.3s;
}

.custom-slick-arrow:before {
  display: none;
}

.custom-slick-arrow:hover {
  color: #c2a476;
  opacity: 0.8;
  font-size: 40px;
  transition: 0.3s;
}
</style>