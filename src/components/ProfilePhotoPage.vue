<template>
  <div class="settingpfoto_page">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <div class="viewport">
        <md-toolbar>
          <span class="md-title">USTAWIENIA PROFILU</span>
        </md-toolbar>
        <div class="row row-content">
          <div class="col-md-4 col-lg-4"></div>
          <div class="col-md-4 col-lg-4">
            <div class="editphoto">
              <avatar :src="user.avatar" :size="200"></avatar>
              <md-button
                type="submit"
                class="md-primary"
                id="pick-avatar"
                :disabled="sending"                
                >Zmień zdjęcie profilowe
              </md-button>

                
            </div>
          </div>
          <div class="col-md-4 col-lg-4"></div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import Avatar from 'vue-avatar'

export default {
  name: "ProfilePage",
  mixins: [validationMixin],
  components: {
      Avatar,
  },
  data() {
    return {
      user: {
        avatar: "https://i.pinimg.com/564x/c6/02/75/c602759505907c9351372b8c2d97cc7c.jpg"
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.editphoto {
  padding-top: 1em;
  align-content: center;
  justify-content: center;
  display: grid;
}
.settingpfoto_page {
  height: 100%;
}
.md-layout {
  height: 100%;
}
.viewport {
  width: 100%;
  display: inline-block;
  vertical-align: top;
  overflow: auto;
  border: 1px solid rgba(#000, 0.12);
}
.md-toolbar {
  display: grid;
  justify-content: center;
  font-weight: bold;
}
.row-content {
  display: flex;
  justify-content: center;
  height: 40%;
  width: 100%;
}
.col-md-4 {
  border-left: 4px solid #dfdfdf;
}
.col-lg-4 {
  border-left: 4px solid #dfdfdf;
}
.md-button {
  background-color: rgb(205, 239, 255);
  color: rgb(0, 0, 0);
  border-radius: 0.5em;
}
</style>

