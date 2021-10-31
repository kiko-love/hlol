<template>
  <div id="app-other">
    <div class="one-block-1">
      <div>HLOL</div>
      <div>作者：kikolove</div>
      <div>
        Github：https://github.com/kiko-love/hlol
      </div>
    </div>
    <div class="one-block-2"></div>
  </div>
</template>
<script>
import { localApi } from "@/api/main";

export default {
  data() {
    return {};
  },
  methods: {
    test() {
      const params = {};
      localApi("openDir", params)
        .then(res => {
          if (res.code !== 0) {
            return false;
          }
        })
        .catch(err => {
          console.log("err:", err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
#app-other {
  padding: 0px 10px;
  text-align: left;
  width: 100%;
  .one-block-1 {
    font-size: 16px;
    padding-top: 10px;
  }
  .one-block-2 {
    padding-top: 10px;
  }
}
</style>
