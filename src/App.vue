<template>
    <div class="rtportal">
        <router-view></router-view>
    </div>
</template>

<script>
import heartbeat from '@/plugins/heartbeat'
import auth from '@/auth'
export default {
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
