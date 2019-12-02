<template>
  <div @click="showMessage" class="message-con">
    <Tooltip content="查看公告列表" placement="bottom">
      <Badge v-if="$store.state.app.counts>0" :count="$store.state.app.counts">
        <Icon type="ios-notifications" :size="22"></Icon>
      </Badge>
      <Icon v-else type="ios-notifications" :size="22"></Icon>
    </Tooltip>
  </div>
</template>

<script>
import util from "@/libs/util.js";
export default {
  name: "messageTip",
  data() {
    return {};
  },
  methods: {
    showMessage() {
      if (sessionStorage.getItem("old_cookieaccess_token")) {
        this.$Message.warning("退出切换，才可查看自己的公告列表");
      } else {
        this.$router.push({
          name: "systemBulletinList"
        });
      }
    }
  },
  created() {}
};
</script>

