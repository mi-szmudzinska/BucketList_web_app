<template>
  <div class="top_bar">
    <md-toolbar>
      <span class="md-title">Bucketdream</span>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  name: "TopBar",
};
</script>

<style lang="scss" scoped>
.md-toolbar {
  background-color: #2735b7;
  color: rgb(255, 255, 255);
  align-content: center;
  justify-content: center;
  min-height: 50px;
}
.md-title {
  font-size: 1.6em;
  font-family: "Shine Himawari";
  font-weight: bold;
  font-size: 32px;
}
</style>

