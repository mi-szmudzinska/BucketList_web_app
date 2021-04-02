<template>
  <div class="popular_page">
    <h2>Inspiracje</h2>

    <div>
      <h4>Wybierz kategorie</h4>
      <div class="sort-button">
        <md-button id="journy"> PODRÓŻE </md-button>
        <md-button id="food"> JEDZENIE <br />I KUCHNIA</md-button>
        <md-button id="career"> KARIERA</md-button>
        <md-button id="love"> MIŁOŚĆ <br />I RODZINA</md-button>
        <md-button id="sport"> SPORT</md-button>
        <md-button id="other">INNE</md-button>
      </div>
    </div>

    <md-autocomplete class="search" v-model="searchinbase" :md-options="ideas">
      <label>Wyszukaj...</label>
    </md-autocomplete>

    <div class="itemlist">
      <BucketCardPage
        v-for="(element, index) in data"
        :showModal="showModal"
        :key="index"
        :name="element.name"
        :desc="element.desc"
        :longdesc="element.longdesc"
        :category="element.category"
        :state="element.state"
      />
    </div>
    <div>
      <b-modal id="modal" hide-footer @hidden="closeModal">
        <h2 v-if="activeBucket">{{ activeBucket.longdesc }}</h2>
        <div>
          <span> Dodaj do swojej listy jako: </span>
          <select v-model="selected">
            <option disabled value="">Wybierz jeden status</option>
            <option></option>
            <option></option>
            <option></option>
          </select>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import BucketCardPage from "@/components/BucketCardPage.vue";
import firebase from "firebase";
import "./../styles/popularListPage.css";
export default {
  components: { BucketCardPage },
  name: "PopularListPage",
  data: () => ({
    searchinbase: null,
    ideas: [],
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
.search {
  background-color: #eeeeee;
  border-radius: 10px;
  width: 50%;
}
.sort-button .md-button {
  width: 125px;
  height: 100px;
  border-radius: 31px;
  font-size: 100%;
  margin: 0.5em 1em 0.5em 1em;
}
.popular_page {
  width: 90%;
}

#journy {
  background: url(../assets/plane.png) no-repeat #ff8a8f center;
}
#food {
  background: url(../assets/icecream.png) no-repeat#f6d6a6 center;
}
#career {
  background: url(../assets/career.png) no-repeat #bad6ba center;
}
#love {
  background: url(../assets/heart.png) no-repeat#dfb8f4 center;
}
#sport {
  background: url(../assets/ball.png) no-repeat #edb5db center;
}
#other {
  background: url(../assets/star.png) no-repeat #92dcef center;
}
</style>
