<template>
  <div class="popular_page">
    <h2>Inspiracje</h2>

    <div class="buttons_color">
      <h4>Wybierz kategorie</h4>
      <div class="sort-button">
        <md-button
          v-for="(category, index) in categories"
          :key="index"
          :id="category.key"
          :class="{ active: currentCategory === category.key }"
          @click="setFilterCategoryType(category.key)"
        >
          {{ category.name }}
        </md-button>
      </div>
    </div>

    <div class="flexsearch">
      <md-autocomplete
        class="search"
        v-model="searchinbase"
        :md-options="names"
      >
        <label>Wyszukaj...</label>
      </md-autocomplete>
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
          :categoryName="getCategoryName(element.categoryKey)"
          :categoryKey="element.categoryKey"
          :photoId="element.photoId"
        />
      </div>
    </div>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <div class="addnew">
      <p>Nie ma zadania którego szukasz?</p>
      <button class="newbtn" @click="$router.push('addtomylist')">
        Dodaj swoją propozycje!
      </button>
    </div>

    <div>
      <form @submit.prevent>
        <b-modal id="modal" hide-footer @hidden="closeModal">
          <div v-if="activeBucket">
            <h3>{{ activeBucket.name }}</h3>

            <span :class="`category  ${activeBucket.categoryKey}`">
              <md-icon>fiber_manual_record</md-icon>
              {{ getCategoryName(activeBucket.categoryKey).toUpperCase() }}
            </span>

            <h5>{{ activeBucket.desc }}</h5>
            <div class="imagesmodal">
              <img v-if="url" :src="activeBucket.url" />
              <img v-else src="skds.jpg" />
            </div>
            <h6>{{ activeBucket.longdesc }}</h6>
            <div class="dropdownmenu">
              <span> Dodaj do swojej listy jako: </span>
              <select v-model="selected">
                <option
                  v-for="(status, index) in statuses"
                  :key="index"
                  :value="status.key"
                >
                  {{ status.name }}
                </option>
              </select>
            </div>
            <div class="toend">
              <b-button variant="success" @click="addOneBacket(activeBucket)"
                >Dodaj</b-button
              >
              <b-button variant="danger" @click="closeModal()">Anuluj</b-button>
            </div>
          </div>
        </b-modal>
      </form>
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
    categories: [],
    currentCategory: null,
    perPage: 10,
    searchinbase: null,
    data: [],
    activeBucket: null,
    selected: "",
    statuses: [],
    url: null,
  }),
  methods: {
    makeToast(variant = null) {
      if (variant === "success") {
        this.$bvToast.toast("Udało się dodać zadanie do twojej Bucketlisty!", {
          title: `Sukces!`,
          variant: variant,
          solid: true,
        });
      } else {
        this.$bvToast.toast("Coś poszło nie tak, spróbuj jeszcze raz", {
          title: `Błąd!`,
          variant: variant,
          solid: true,
        });
      }
    },
    getCategoryName(currentKey) {
      const category = this.categories.find(({ key }) => key === currentKey);
      return category ? category.name : "";
    },
    toUpper(value) {
      return value.toUpperCase();
    },
    showModal(name) {
      const bucket = this.data.find((bucket) => bucket.name === name);
      if (!bucket) {
        return;
      }

      if (!bucket.photoId) {
        this.activeBucket = bucket;
        this.$bvModal.show("modal");
      } else {
        const storage = firebase.storage();
        const img = storage.ref(bucket.photoId);
        img.getDownloadURL().then((url) => {
          this.activeBucket = { ...bucket, url };
          this.$bvModal.show("modal");
          this.url = url;
        });
      }
    },
    closeModal() {
      this.activeBucket = null;
      this.$bvModal.hide("modal");
    },
    setFilterCategoryType(newCategory) {
      this.currentCategory =
        newCategory === this.currentCategory ? null : newCategory;
    },
    async addOneBacket(backet) {
      const { currentUser } = firebase.auth();

      if (!currentUser) {
        return;
      }

      const userDoc = firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid);

      try {
        const snapshot = await userDoc.get();
        const { backetList, ...rest } = snapshot.data();

        const bucketEl = Object.assign({}, backet);
        delete bucketEl.url;

        const newBacket = {
          ...bucketEl,
          statusKey: this.selected,
        };

        const newBacketList = backetList
          ? [...backetList, newBacket]
          : [newBacket];

        userDoc.set({
          ...rest,
          backetList: newBacketList,
        });
      } catch (error) {
        console.log(error);
      }
      this.makeToast("success");
      this.getDefaultBackets();
      this.closeModal();
    },
    async getDefaultBackets() {
      const { currentUser } = firebase.auth();
      if (!currentUser) {
        return;
      }

      const users = firebase.firestore().collection("users");
      const app = firebase.firestore().collection("app");

      try {
        const userSnapshot = await users.doc(currentUser.uid).get();
        const { backetList } = userSnapshot.data();

        const defaultBacketListElementsSnapshot = await app
          .doc("defaultBacketListElements")
          .get();

        const { elements } = defaultBacketListElementsSnapshot.data();

        const backets = elements.filter((backet) => {
          const searchedBacket = backetList.find(
            (userBacket) =>
              userBacket.defaultBacketListElementId ===
              backet.defaultBacketListElementId
          );
          return searchedBacket ? false : true;
        });

        this.data = backets;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    rows() {
      return this.filteredData.length;
    },
    filteredByCategory() {
      return this.data.filter(({ categoryKey }) => {
        if (this.currentCategory) {
          const unifiedCategory = categoryKey.toLowerCase().trim();
          const unifiedCurrentCategory = this.currentCategory
            .toLowerCase()
            .trim();
          return unifiedCurrentCategory === unifiedCategory;
        }
        return true;
      });
    },
    filteredData() {
      return this.filteredByCategory.filter(({ name }) => {
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
    const app = firebase.firestore().collection("app");

    this.getDefaultBackets();

    app
      .doc("category")
      .get()
      .then((snapshot) => {
        const { category } = snapshot.data();
        this.categories = category;
      })
      .catch((error) => {
        console.log(error);
      });

    app
      .doc("backetListStatuses")
      .get()
      .then((snapshot) => {
        const { statuses } = snapshot.data();
        this.statuses = statuses;
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
.active {
  border: 5px inset rgb(183, 106, 255);
}
.buttons_color {
  width: 100%;
}
.sort-button,
.imagesmodal,
.flexsearch,
h4 {
  display: flex;
  justify-content: center;
}
h2 {
  padding-top: 0.2em;
  display: flex;
  justify-content: center;
  font-family: "Tagger";
  font-size: 55px;
}
.sort-button .md-button {
  width: 125px;
  white-space: normal;
  height: 100px;
  border-radius: 31px;
  font-size: 100%;
  margin: 0.5em 1em 0.5em 1em;
}
.popular_page {
  width: 100%;
}
.newbtn {
  width: 100%;
  margin-right: 0px;
}
.addnew {
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: end;
}
.toend {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 10%;
}
p {
  display: block;
  margin-bottom: 0px;
}
button {
  width: 125px;
  border-radius: 31px;
  font-size: 100%;
  background-color: rgb(218, 179, 255);
  margin: 0.5em;
}
#journey {
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
.journey {
  color: #ff8a8f;
}
.food {
  color: #f6d6a6;
}
.career {
  color: #bad6ba;
}
.love {
  color: #dfb8f4;
}
.sport {
  color: #edb5db;
}
.other {
  color: #92dcef;
}
</style>
