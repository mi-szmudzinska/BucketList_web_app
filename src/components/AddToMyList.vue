<template>
  <div class="addtolist_page">
    <md-toolbar>
      <h3>Dodaj nowe zadanie!</h3>
    </md-toolbar>
    <div class="row row-content">
      <div class="col-md-3 col-lg-3"></div>

      <div class="col-md-6 col-lg-6">
        <div class="addtask">
          <form @submit.prevent>
            <h5>Uzupełnij pola:</h5>
            <md-field md-clearable>
              <label>Tytuł</label>
              <md-input v-model="title" maxlength="50"></md-input>
            </md-field>

            <md-field md-clearable>
              <label>Krótki opis, chwytliwe słowa opisujące zadanie</label>
              <md-input v-model="desc" maxlength="100"></md-input>
            </md-field>

            <md-field md-clearable>
              <label
                >To pole jest na opis dla Ciebie byś kiedyś miał co
                wspominać!</label
              >
              <md-textarea v-model="longdesc" md-counter="500"></md-textarea>
            </md-field>

            <h5>Wybierz kategorie:</h5>

            <div class="divbtn">
              <md-button
                v-for="(categoryEl, index) in categories"
                :key="index"
                :id="categoryEl.key"
                :class="{
                  active: categoryKey === categoryEl.key,
                  'sort-button': true,
                }"
                @click="setFilterCategoryType(categoryEl.key)"
              >
                {{ categoryEl.name }}
              </md-button>
            </div>

            <div class="dropdownmen">
              <span> Dodaj do swojej listy jako: </span>
              <select v-model="selected">
                <option disabled value="">Wybierz status</option>
                <option
                  v-for="(status, index) in statuses"
                  :key="index"
                  :value="status.key"
                >
                  {{ status.name }}
                </option>
              </select>
            </div>
            <div class="addphoto">
              <div>
                <h5>Dodaj zdjęcie:</h5>
                <input
                  type="file"
                  name="file"
                  ref="file"
                  accept="image/*"
                  placeholder="Wybierz zdjęcie"
                  @change="handleFile()"
                />
              </div>
              <div class="photoex">
                <img v-if="fileContent" :src="fileContent" alt="Selected photo">
              </div>
            </div>
            <md-button clas="addtolist" @click="addBacket()"
              >Dodaj do swojej listy!</md-button
            >
          </form>
        </div>
      </div>

      <div class="col-md-3 col-lg-3"></div>
    </div>
  </div>
</template>

<script>
import "./../styles/popularListPage.css";
import "./../styles/modal.css";
import firebase from "firebase";
import { v4 } from 'uuid';

export default {
  name: "AddToMyList",
  data: () => ({
    selected: "",
    active: false,
    title: "",
    file: null,
    desc: "",
    longdesc: "",
    fileContent: null,
    categoryKey: "",
    status: "",
    statuses: [],
    categories: [],
  }),
  methods: {
    handleFile() {
      console.log(this.$refs.file.files[0]);
      this.file = this.$refs.file.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.file)
      reader.onload = () => {
        this.fileContent = reader.result;
      }
    },
    async addBacket() {
      const { currentUser } = firebase.auth();
      if (!currentUser) {
        return;
      }

      const userDoc = firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid);

        

      try {

        const hash = v4();
        const defaultBacketListElementId = v4();
        const storageRef = firebase.storage().ref();
        const photoRef = storageRef.child(hash);
        await photoRef.put(this.file)

        const snapshot = await userDoc.get();
        const { backetList, ...rest } = snapshot.data();

        const newBacket = {
          defaultBacketListElementId,
          categoryKey: this.categoryKey,
          desc: this.desc,
          longdesc: this.longdesc,
          name: this.title,
          photoId: hash,
          statusKey: this.selected,
        };

        const newBacketList = backetList
          ? [...backetList, newBacket]
          : [newBacket];

        console.log({
          ...rest,
          backetList: newBacketList,
        });
        userDoc.set({
          ...rest,
          backetList: newBacketList,
        });
      } catch (error) {
        console.log(error);
      }
    },
    setFilterCategoryType(newCategory) {
      this.categoryKey = newCategory === this.categoryKey ? null : newCategory;
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
  },
};
</script>

<style lang="scss" scoped>
.md-field {
  background-color: rgb(187, 245, 255);
  border-radius: 0.5em;
}
p {
  margin-bottom: 0px;
}
input {
  margin-bottom: 1em;
}
.photoex{
  width: 100%;
  overflow: hidden;
}
.md-toolbar {
  display: grid;
  justify-content: center;
}
h5 {
  text-align: start;
}
h6 {
  text-align: center;
  margin-top: 2em;
  margin-bottom: 2em;
}
.row-content {
  display: flex;
  justify-content: center;
  height: 40%;
  width: 100%;
}
.col-md-6 {
  border-left: 4px solid #dfdfdf;
  border-right: 4px solid #dfdfdf;
}
.md-button {
  background-color: rgb(205, 239, 255);
  white-space: normal;
  color: rgb(0, 0, 0);
  border-radius: 0.5em;
  margin-left: 6px;
}
.dropdownmen {
  margin-top: 1em;
  text-align: left;
  margin-bottom: 2em;
}
.addtask {
  padding-top: 1em;
  align-content: center;
  justify-content: center;
}
.active {
  border: 5px inset rgb(183, 106, 255);
}
.sort-button {
  width: 35%;
  height: 50px;
}
.divbtn {
  display: inline;
}
.md-elevation-4 {
  box-shadow: none;
}
.addphoto {
  margin-bottom: 1em;
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
</style>
