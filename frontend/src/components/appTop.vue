<template>
  <div>
    <div class="app-top-action">
      <div class="appTitle">HLOL</div>
      <div>
        <button class="btn-minimize" @click="minimizeWin"></button>
        <button class="btn-close" @click="closeWin"></button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// const electron = window.electron
// const ipc = window.electron.ipcRenderer

export default {
  methods: {
    minimizeWin(){
      //  ipc.send('window-min') // 通知主进程我要进行窗口最小化操作
    },
    maximizeWin(){
      // ipc.send('window-max')
    },
    closeWin(){
      // ipc.send('window-close')
    },
  }
};
</script>

<style>
.app-top-action {
  background-color: #ffffff;
  height: 32px;
  width: 100%;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-top-action button {
  background-color: transparent;
  -webkit-app-region: no-drag;
  margin: 0 15px 0 5px;
  outline: none;
  /* height: 70%; */
}

.appTitle {
  margin: 0 0 0 15px;
  font-size: 20px;
  color: rgb(175, 124, 30);
}

.btn-close {
  background-color: rgb(161, 45, 29) !important;
  border: 0px;
  color: rgb(161, 45, 29);
  border-radius: 50%;
  height: 15px;
  width: 15px;
}

.btn-close:hover {
  background-color: rgb(141, 6, 6) !important;
}

.btn-minimize {
  background-color: rgb(19, 151, 19) !important;
  border: 0px;
  color: rgb(19, 151, 19);
  border-radius: 50%;
  height: 15px;
  width: 15px;
}

.btn-minimize:hover {
  background-color: rgb(15, 110, 15) !important;
}

.btn-minimize:active {
  border: 0px;
  background-color: green;
}
</style>