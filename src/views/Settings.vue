<template>
  <div>
    <TopBar />
    <div class="container-fluid">
      <div class="row row-content">
        <div class="col-md-3 col-lg-2">
          <LeftMenuBar />
        </div>
        <div class="col-md-6 col-lg-8">
          <SettingsPage/>
        </div>
        <div class="col-md-3 col-lg-2 content-offset">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import LeftMenuBar from "@/components/LeftMenuBar.vue";
import SettingsPage from "@/components/SettingsPage.vue";

export default {
  name: "Settings",
  components: {
    TopBar,
    LeftMenuBar,
    SettingsPage
  },
};
</script>

<style lang="scss" scoped>
.row-content {
  padding-left: 0px;
}
.container-fluid {
  padding-left: 0px;
}
.content-offset {
  background-color: rgba(194, 212, 247, 0.29);
}
.row-content {
  min-height: calc(100vh - 50px);
}
</style>

