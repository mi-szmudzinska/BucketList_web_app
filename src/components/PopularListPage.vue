<template>
  <div class="popular_page">
    <h2>Inspiracje</h2>

    <div class="buttons_color">
      <h4>Wybierz kategorie</h4>
      <div class="sort-button">
        <md-button
          id="journy"
          :class="{ active: currentCategory === 'PODRÓŻE' }"
          @click="setFilterCategoryType('PODRÓŻE')"
        >
          PODRÓŻE
        </md-button>
        <md-button
          id="food"
          :class="{ active: currentCategory === 'JEDZENIE I KUCHNIA' }"
          @click="setFilterCategoryType('JEDZENIE I KUCHNIA')"
        >
          JEDZENIE <br />I KUCHNIA</md-button
        >
        <md-button
          id="career"
          :class="{ active: currentCategory === 'KARIERA' }"
          @click="setFilterCategoryType('KARIERA')"
        >
          KARIERA</md-button
        >
        <md-button
          id="love"
          :class="{ active: currentCategory === 'MIŁOŚĆ I RODZINA' }"
          @click="setFilterCategoryType('MIŁOŚĆ I RODZINA')"
        >
          MIŁOŚĆ <br />I RODZINA</md-button
        >
        <md-button
          id="sport"
          :class="{ active: currentCategory === 'SPORT' }"
          @click="setFilterCategoryType('SPORT')"
        >
          SPORT</md-button
        >
        <md-button
          id="other"
          :class="{ active: currentCategory === 'INNE' }"
          @click="setFilterCategoryType('INNE')"
          >INNE</md-button
        >
      </div>
    </div>

    <div>
      <md-autocomplete
        class="search"
        v-model="searchinbase"
        :md-options="names"
      >
        <label>Wyszukaj...</label>
      </md-autocomplete>

      <button>Nie ma czego szukasz? Dodaj swoją propozycje!</button>
    </div>
    <div class="grid-container">
      <div class="row row-content">
        <BucketCardPage
          v-for="(element, index) in currentData"
          :showModal="showModal"
          :key="index"
          :name="element.name"
          :desc="element.desc"
          :longdesc="element.longdesc"
          :category="element.category"
        />
      </div>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
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
          <span> Dodaj do swojej listy jako: </span>
          <select v-model="selected">
            <option disabled value="">Wybierz jeden status</option>
            <option>a</option>
            <option>b</option>
            <option>c</option>
          </select>
        </div>

        <b-button id="addbutton">Dodaj do swojej listy</b-button>
      </b-modal>
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
  name: "PopularListPage",
  data: () => ({
    active: false,
    value: null,
    currentPage: 1,
    currentCategory: null,
    perPage: 4,
    searchinbase: null,
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
    setFilterCategoryType(newCategory) {
      this.currentCategory =
        newCategory === this.currentCategory ? null : newCategory;
    },
  },
  computed: {
    rows() {
      return this.filteredData.length;
    },
    filteredByCategory() {
      return this.data.filter(({ category }) => {
        if (this.currentCategory) {
          return category === this.currentCategory;
        }
        return true;
      });
    },
    filteredData() {
      return this.filteredByCategory
        .filter(({ name }) => {
          if (typeof name == "string" && typeof this.searchinbase == "string") {
            const clearFilteredName = name.toLowerCase();
            const cleardNameToFind = this.searchinbase.toLowerCase();
            return clearFilteredName.includes(cleardNameToFind);
          }
          return true;
        });
    },
    currentData() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredData.slice(start, start + this.perPage);
    },
    names() {
      return this.filteredByCategory.map(({ name }) => name);
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
  onConfirm() {
    this.value = "Agreed";
  },
  onCancel() {
    this.value = "Disagreed";
  },
};
</script>

<style lang="scss" scoped>
.search {
  background-color: #eeeeee;
  border-radius: 10px;
  width: 50%;
}
.active {
  border: 1px solid red;
}
.buttons_color {
  width: 100%;
}
.sort-button .md-button {
  width: 125px;
  height: 100px;
  border-radius: 31px;
  font-size: 100%;
  margin: 0.5em 1em 0.5em 1em;
}
.popular_page {
  width: 100%;
}
button {
  width: 125px;
  border-radius: 31px;
  font-size: 100%;
  background-color: rgb(218, 179, 255);
  margin: 0.5em;
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
