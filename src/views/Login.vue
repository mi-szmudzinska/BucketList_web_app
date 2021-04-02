<template>
  <div>
    <TopBar />
    <div class="container-fluid">
      <div class="row row-content">
        <div class="col-md-3 content-offset"></div>
        <div class="col-md-6">
          <div class="row mt-3">
            <div class="col-md-6">
              <img alt="Vue logo" src="../assets/logo.png" />
            </div>
            <div class="col-md-6">
              <LoginPage />
            </div>
          </div>
        </div>
        <div class="col-md-3 content-offset"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import LoginPage from "@/components/LoginPage.vue";

export default {
  name: "Login",
  components: {
    TopBar,
    LoginPage,
  },
};
</script>

<style lang="scss" scoped>
.content-offset {
  background-color: rgba(194, 212, 247, 0.29);
}
.row-content {
  min-height: calc(100vh - 50px);
}
img {
  max-width: 80%;
  float: right;
}
</style>
