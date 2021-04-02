<template>
  <div class="left_menu_bar">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <div>
        <avatar username="Jane Doe" :size="150"></avatar>
      </div>

      <div class="list">
        <md-list>
          <md-list-item md-expand>
            <md-icon>star</md-icon>
            <span class="md-list-item-text">BUCKETLIST</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset" to="yourlist"
                >• Twoja lista</md-list-item
              >
              <md-list-item class="md-inset" to="Home"
                >• Statystki</md-list-item
              >
            </md-list>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">INSPIRACJE</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset" to="popularlist"
                >• Popularne</md-list-item
              >
            </md-list>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>face</md-icon>
            <span class="md-list-item-text">ZNAJOMI</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset" to="friends"
                >• Twoi znajomi</md-list-item
              >
              <md-list-item class="md-inset" to="addfriend"
                >• Dodaj znajomego</md-list-item
              >
            </md-list>
          </md-list-item>
          <md-list-item md-expand>
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">USTAWIENIA</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset" to="settings"
                >• Informacje</md-list-item
              >
              <md-list-item class="md-inset" to="profilephoto"
                >• Zdjęcie profilowe</md-list-item
              >
            </md-list>
          </md-list-item>
        </md-list>
      </div>
      <footer>
        <md-button
          type="submit"
          class="md-raised md-primary"
        >
          <md-icon>power_settings_new</md-icon>
        </md-button>
      </footer>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import { validationMixin } from "vuelidate";
import Avatar from 'vue-avatar'

export default {
  name: "LeftMenuBar",
  mixins: [validationMixin],
  data: () => ({
    sending: false,
  }),
  components: {
    Avatar
  },
  methods: {
    signOut() {
      this.sending = true;
      const auth = firebase.auth();

      auth
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch();
    },
    validateUser() {
      this.signOut();
    },
  },
};
</script>

<style lang="scss" scoped>
$list-width: 100%;
$list-height: 100%;

small {
  font-size: 18px;
  font-weight: bolder;
  display: block;
  text-align: center;
}
.left_menu_bar {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: rgba(161, 189, 243, 0.29);
  width: $list-width;
  height: $list-height;
}
.list {
  width: $list-width;
}
.left_menu_bar > .md-list {
  width: $list-width;
  max-width: 100%;
  height: 100%;
  display: inline-block;
  overflow: auto;
  border: 1px solid rgba(#000, 0.12);
  vertical-align: top;
}
.md-layout {
  width: 100%;
  justify-content: center;
}
.md-button {
  background-color: rgb(228, 247, 255);
  opacity: 0.9;
  color: rgb(0, 0, 0);
  border-radius: 0.5em;
}
footer {
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
}
</style>
