<!--OfflineHandle.vue-->
<template>
  <div v-if="mask"
       class="offline-mask">
    <h2 class="offline-mask-title">{{ offlineTitle }}</h2>

    <p class="offline-mask-desc">{{ desc }}</p>
  </div>
</template>

<script>
import { showToast, showToastIcon } from '@/utils/ui'

export default {
  props: {
    offlineTitle: {
      type: String,
      default: '网络已断开，请检查网络连接。'
    },
    onlineTitle: {
      type: String,
      default: '网络已连接'
    },
    desc: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      mask: false
    }
  },
  mounted () {
    window.addEventListener('offline', this.eventHandle)
    window.addEventListener('online', this.eventHandle)
    // console.log(this.desc)
  },
  beforeDestroy () {
    window.removeEventListener('offline', this.eventHandle)
    window.removeEventListener('online', this.eventHandle)
  },
  methods: {
    eventHandle (event) {
      // 断网还是联网状态
      const type = event.type === 'offline' ? 'error' : 'success'
      // 判断断网还是联网
      if (type === 'error') {
        showToast(this.offlineTitle + this.desc, 'center', this.duration)
      } else {
        showToastIcon(this.onlineTitle, 'center', this.duration)
      }
      // 1.5s后，如果时断网的状态显示mask遮罩层，否则啥也不做
      setTimeout(() => {
        this.mask = event.type === 'offline'
      }, 1500)
    }
  }
}
</script>

<style scoped>
.offline-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  z-index: 9999;
  transition: position 2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.offline-mask-title {
  color: rgba(0, 0, 0, 0.8);
}
.offline-mask-desc {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}
</style>
