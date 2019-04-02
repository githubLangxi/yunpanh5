<template>
    <div class="rtportal">
        <router-view></router-view>



    </div>
</template>

<script>
import heartbeat from '@/plugins/heartbeat'
import auth from '@/auth'

export default {
  data () {
    return {

    }
  },
  methods: {
    copyMsg() {
      alert('copy')
      this.contextMenuVisible = false
    },
    quoteMsg() {
      alert('quote')
      this.contextMenuVisible = false
    },
    deleteMsg() {
      alert('delete')
      this.contextMenuVisible = false
    }
  },
    mounted: function () {
        if (!heartbeat.isAlive()) {
            auth.logout();
        }

        heartbeat.keepAlive();
    }
}
</script>

<style lang="scss">

  .bbb{
    background-color:khaki;
  }
.flex{
		display: flex;
	}
</style>
