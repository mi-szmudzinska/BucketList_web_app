<template>
  <div class="yourlist_page">
    <h4>Mój Bucketdream</h4>

    <div class="sort-btn">
      <div class="buttonssort">
        <button v-b-toggle.collapse-1>
          NAZWA<md-icon>keyboard_arrow_down</md-icon>
        </button>
        <button v-b-toggle.collapse-2>
          STATUSY<md-icon>keyboard_arrow_down</md-icon>
        </button>
        <button v-b-toggle.collapse-3>
          KATEGORIE<md-icon>keyboard_arrow_down</md-icon>
        </button>
      </div>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <div class="searchwidth">
            <md-autocomplete
              class="search"
              v-model="searchinbase"
              :md-options="names"
            >
              <label>Wyszukaj...</label>
            </md-autocomplete>
          </div>
        </b-card>
      </b-collapse>

      <b-collapse id="collapse-2" class="mt-2">
        <b-card>
          <div class="sort-button">
            <md-button
              v-for="(status, index) in statuses"
              :key="index"
              :id="status.key"
              :class="{ active: currentStatus === status.key }"
              @click="setFilterStatusType(status.key)"
            >
              {{ status.name }}
            </md-button>
          </div>
        </b-card>
      </b-collapse>

      <b-collapse id="collapse-3" class="mt-2">
        <b-card>
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
        </b-card>
      </b-collapse>
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
          :statusName="getStatusName(element.statusKey)"
          :statusKey="element.statusKey"
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

    <div>
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
          <div class="dropdownmen">
            <span> Chcesz zmenić status? </span>
            <br />
            <select v-model="selected">
              <option
                v-for="status in statuses"
                :value="status.key"
                :key="status.key"
              >
                {{ status.name }}
              </option>
            </select>
          </div>
          <div class="toend">
            <b-button variant="success" @click="updatedata()">Zapisz</b-button>
            <b-button class="deletebucket" @click="deletebucket()">
              Usuń z swojej listy
            </b-button>
            <b-button variant="danger" @click="closeModal()">Odrzuć</b-button>
          </div>
        </div>
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
  name: "YourListPage",
  data: () => ({
    active: false,
    value: null,
    currentPage: 1,
    currentCategory: null,
    currentStatus: null,
    categories: [],
    perPage: 10,
    searchinbase: null,
    data: [],
    activeBucket: null,
    selected: "",
    status: "",
    statuses: [],
    backetList: [],
    url: null,
  }),
  methods: {
    makeToast(variant = null) {
      if (variant === "success") {
        this.$bvToast.toast("Udało się usunąć zadanie", {
          title: `Sukces!`,
          variant: variant,
          solid: true,
        });
      } else if (variant === "info") {
        this.$bvToast.toast("Udało Ci się zaktualizować status zadania", {
          title: `Aktualizacja`,
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
    async deletebucket() {
      const { currentUser } = firebase.auth();
      if (!currentUser) {
        return;
      }

      const users = firebase.firestore().collection("users");

      try {
        const snapshot = await users.doc(currentUser.uid).get();

        const { backetList, ...rest } = snapshot.data();

        const currentBuckets = backetList.filter(
          (bucket) =>
            bucket.defaultBacketListElementId !==
            this.activeBucket.defaultBacketListElementId
        );

        await users.doc(currentUser.uid).set({
          ...rest,
          backetList: currentBuckets,
        });
        this.makeToast("success");
        this.getBacketsElement();
        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    },
    async updatedata() {
      const { currentUser } = firebase.auth();
      if (!currentUser) {
        return;
      }

      const users = firebase.firestore().collection("users");

      try {
        const snapshot = await users.doc(currentUser.uid).get();

        const { backetList, ...rest } = snapshot.data();

        const currentBucket = backetList.find(
          (bucket) =>
            bucket.defaultBacketListElementId ===
            this.activeBucket.defaultBacketListElementId
        );
        const index = backetList.indexOf(currentBucket);
        backetList[index].statusKey = this.selected;

        await users.doc(currentUser.uid).set({
          ...rest,
          backetList,
        });
        this.makeToast("info");
        this.getBacketsElement();
        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    },
    getCategoryName(currentKey) {
      const category = this.categories.find(({ key }) => key === currentKey);
      return category ? category.name : "";
    },
    getStatusName(statusKey) {
      const status = this.statuses.find(({ key }) => key === statusKey);
      return status ? status.name : "";
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
        this.selected = bucket.statusKey;
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
    setFilterStatusType(newStatus) {
      this.currentStatus = newStatus === this.currentStatus ? null : newStatus;
    },
    getBacketsElement() {
      const { currentUser } = firebase.auth();
      const users = firebase.firestore().collection("users");

      if (!currentUser) {
        return;
      } else {
        this.uid = currentUser.uid;
      }

      users
        .doc(currentUser.uid)
        .get()
        .then((snapshot) => {
          const { backetList } = snapshot.data();
          this.data = backetList;
        })
        .catch((error) => {
          console.log(error);
        });
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
    filteredByStatus() {
      return this.filteredByCategory.filter(({ statusKey }) => {
        if (this.currentStatus) {
          const unifiedStatus = statusKey.toLowerCase().trim();
          const unifiedCurrentStatus = this.currentStatus.toLowerCase().trim();
          return unifiedCurrentStatus === unifiedStatus;
        }
        return true;
      });
    },
    filteredData() {
      return this.filteredByStatus.filter(({ name }) => {
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
      return this.filteredByStatus.map(({ name }) => name);
    },
  },
  created() {
    const app = firebase.firestore().collection("app");

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

    this.getBacketsElement();
  },
};
</script>

<style lang="scss" scoped>
.yourlist_page {
  width: 100%;
}
.active {
  border: 3px inset rgb(183, 106, 255);
}
.status-idea {
  color: rgb(157, 255, 157);
}
.category {
  color: rgb(255, 188, 157);
}
.card {
  border: none;
}
.toend {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 10%;
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
.card-body {
  padding: 0;
}
button {
  width: 125px;
  border-radius: 31px;
  font-size: 100%;
  background-color: rgb(196, 133, 255);
  margin: 0.5em;
}
.sort-button .md-button {
  width: 125px;
  white-space: normal;
  height: 50px;
  border-radius: 31px;
  font-size: 100%;
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
.searchwidth {
  width: 30%;
}
.deletebucket {
  width: 30%;
}
.search {
  background-color: #eeeeee;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 0px;
}
.sort-btn {
  justify-content: center;
}
.card-body,
.buttonssort,
.imagesmodal {
  display: flex;
  justify-content: center;
}
h4 {
  padding-top: 0.2em;
  display: flex;
  justify-content: center;
  font-family: "Tagger";
  font-size: 55px;
}
#journey {
  background-color: #ff8a8f;
}
#food {
  background-color: #f6d6a6;
}
#career {
  background-color: #bad6ba;
}
#love {
  background-color: #dfb8f4;
}
#sport {
  background-color: #edb5db;
}
#other {
  background-color: #92dcef;
}
#now {
  background-color: #ffe46b;
}
#todo {
  background-color: #9af3f7;
}
#done {
  background-color: #a0fdc4;
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
