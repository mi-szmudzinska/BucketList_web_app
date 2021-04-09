<template>
  <div class="yourlist_page">
    <div class="grid-container">
      <div>
        <h3>Mój Bucketdream</h3>

        <md-autocomplete
          class="search"
          v-model="searchinbase"
          :md-options="ideas"
        >
          <label>Wyszukaj...</label>
        </md-autocomplete>

        <div class="sort-btn">
          <button>NAZWA</button>
          <button>STATUS</button>

          <md-menu md-size="medium" md-align-trigger>
            <button md-menu-trigger>KATEGORIA</button>

            <md-menu-content>
              <md-menu-item>PODRÓŻE</md-menu-item>
              <md-menu-item>JEDZENIE I KUCHNIA</md-menu-item>
              <md-menu-item>KARIERA</md-menu-item>
              <md-menu-item>MIŁOŚĆ I RODZINA</md-menu-item>
              <md-menu-item>SPORT</md-menu-item>
              <md-menu-item>INNE</md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </div>

      <div>
        <BucketCardPage
          v-for="(element, index) in data"
          :showModal="showModal"
          :key="index"
          :name="element.name"
          :desc="element.desc"
          :longdesc="element.longdesc"
          :category="element.category"
        />
      </div>

      <div>
        <b-modal id="modal" hide-footer @hidden="closeModal">
          <h3 v-if="activeBucket">{{ activeBucket.name }}</h3>
          <span id="category" v-if="activeBucket">
            <md-icon>fiber_manual_record</md-icon>
            {{ activeBucket.category }}
          </span>
          <h5 v-if="activeBucket">{{ activeBucket.desc }}</h5>
          <img src="../assets/palne.jpg" />
          <h6 v-if="activeBucket">{{ activeBucket.longdesc }}</h6>
          <div class="dropdownmen">
            <span> Chcesz zmenić status? </span>
            <br />
            <select v-model="selected">
              <option disabled value="">Wybierz nowy:</option>
              <option>a</option>
              <option>b</option>
              <option>c</option>
            </select>
          </div>

          <button id="addbutton">Zapisz</button>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import BucketCardPage from "@/components/BucketCardPage.vue";
import firebase from "firebase";
import "./../styles/popularListPage.css";
import "./../styles/modal.css";

export default {
  components: { BucketCardPage },
  name: "YourListPage",
  data: () => ({
    searchinbase: null,
    ideas: [
      "Algeria",
      "Argentina",
      "Brazil",
      "Canada",
      "Italy",
      "Japan",
      "United Kingdom",
      "United States",
    ],
    data: [],
    activeBucket: null,
    selected: "",
  }),
  methods: {
    showModal(name) {
      this.activeBucket = this.data.find((bucket) => bucket.name === name);
      this.$bvModal.show("modal");
    },
    closeModal() {
      this.activeBucket = null;
    },
  },
  created() {
    firebase
      .firestore()
      .collection("app")
      .doc("defaultBacketListElements")
      .get()
      .then((snapshot) => {
        const { elements } = snapshot.data();
        this.data = elements;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.yourlist_page {
  width: 90%;
}
.status-idea {
  color: rgb(157, 255, 157);
}
.category {
  color: rgb(255, 188, 157);
}
.md-card {
  width: 100%;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
#arrow-icon {
  padding-left: 10%;
}
button {
  width: 125px;
  border-radius: 31px;
  font-size: 100%;
  background-color: rgb(218, 179, 255);
  margin: 0.5em;
}
.md-card-media.md-ratio-16-9 {
  height: 150px;
  opacity: 0.5;
}
.md-card-header {
  display: contents;
  padding: 0.5em 0.5em 0 0.5em;
}
.md-subhead {
  padding-left: 0.5em;
}
.md-button.md-title {
  -webkit-text-stroke: 0.2px white;
}
.md-card-actions {
  justify-content: space-between;
}
.search {
  background-color: #eeeeee;
  border-radius: 10px;
  width: 50%;
}
</style>
