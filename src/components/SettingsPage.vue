<template>
  <div class="setting_page">
    <div class="viewport">
      <md-toolbar>
        <span class="md-title">USTAWIENIA PROFILU</span>
      </md-toolbar>
      <div class="divform">
        <form novalidate class="md-layout">
          <div class="col-md-3 col-lg-3">
            <md-list>
              <md-subheader>Email</md-subheader>

              <md-list-item>
                <md-field :class="getValidationClass('email')">
                  <label>Email</label>
                  <md-input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    v-model="form.email"
                    :disabled="sending"
                  ></md-input>
                  <span class="md-error" v-if="!$v.form.email.required"
                    >Email wymagany</span
                  >
                  <span class="md-error" v-else-if="!$v.form.email.email"
                    >Niepoprawnie wproadzone dane, pamiętaj o @</span
                  >
                </md-field>
              </md-list-item>

              <md-subheader>Imie i Nazwisko</md-subheader>
              <md-list-item>
                <md-field :class="getValidationClass('name')">
                  <label>Imię</label>
                  <md-input
                    name="name"
                    id="name"
                    autocomplete="name"
                    v-model="form.name"
                    :disabled="sending"
                  ></md-input>
                  <span class="md-error" v-if="!$v.form.name.minlength"
                    >Niepoprawnie wproadzone dane</span
                  >
                </md-field>
              </md-list-item>

              <md-list-item>
                <md-field :class="getValidationClass('subname')">
                  <label>Nazwisko</label>
                  <md-input
                    name="subname"
                    id="subname"
                    autocomplete="subname"
                    v-model="form.subname"
                    :disabled="sending"
                  ></md-input>
                  <span class="md-error" v-if="!$v.form.subname.minlength"
                    >Niepoprawnie wproadzone dane</span
                  >
                </md-field>
              </md-list-item>

              <md-subheader>Wiek</md-subheader>
              <md-list-item>
                <md-field :class="getValidationClass('age')">
                  <label>Wiek</label>
                  <md-input
                    type="number"
                    name="age"
                    id="age"
                    autocomplete="age"
                    v-model="form.age"
                  ></md-input>
                </md-field>
              </md-list-item>

              <md-subheader>Płeć</md-subheader>
              <md-list-item>
                <md-field :class="getValidationClass('gender')">
                  <label for="gender">Wybierz</label>
                  <md-select
                    type="gender"
                    name="gender"
                    id="gender"
                    autocomplete="gender"
                    v-model="form.gender"
                    :disabled="sending"
                  >
                    <md-option value="Kobieta">Kobieta</md-option>
                    <md-option value="Mężczyzna">Mężczyzna</md-option>
                  </md-select>
                </md-field>
              </md-list-item>

              <md-button
                type="submit"
                class="md-primary"
                :disabled="sending"
                @click.prevent="updateData()"
                >Zapisz zmiany</md-button
              >
            </md-list>
          </div>
        </form>
        <form novalidate class="md-layout">
          <div class="col-md-3 col-lg-3">
            <div class="addphoto">
              <md-subheader>Zdjęcie profilowe</md-subheader>
              <div>
                <input
                  type="file"
                  name="file"
                  ref="file"
                  accept="image/*"
                  placeholder="Wybierz zdjęcie"
                  @change="handleFile()"
                />
              </div>
              <div class="photoav">
                <img
                  v-if="fileContent"
                  :src="fileContent"
                  alt="Selected photo"
                />
              </div>
            </div>
            <md-button
              type="submit"
              class="md-primary"
              :disabled="sending"
              @click.prevent="addPhoto()"
              >Zapisz zmiany</md-button
            >
          </div>
        </form>
        <form novalidate class="md-layout">
          <div class="col-md-3 col-lg-3">
            <md-list>
              <md-subheader>Nowe hasło</md-subheader>
              <md-list-item>
                <md-field :class="getValidationClass('newpassword')">
                  <label>Nowe hasło</label>
                  <md-input
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    autocomplete="newpassword"
                    v-model="form.newpassword"
                    :disabled="sending"
                  ></md-input>
                  <span class="md-error" v-if="!$v.form.newpassword"
                    >Hasło wymagane</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.newpassword.minLength"
                    >Minimum 6 znaków</span
                  >
                </md-field>
              </md-list-item>
            </md-list>

            <md-button type="submit" class="md-primary" :disabled="sending" @click.prevent="changePassword"
              >Zapisz zmiany</md-button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import firebase from "firebase";
import {
  required,
  email,
  minLength,
  maxLength,
  between,
} from "vuelidate/lib/validators";
import "./../styles/popularListPage.css";
import { v4 } from "uuid";
import { refreshAvatarSubject$ } from "./../main.js";

export default {
  name: "SettingsPage",
  mixins: [validationMixin],
  data: () => ({
    avatarletters: [],
    fileContent: null,
    form: {
      email: "",
      name: "",
      subname: "",
      age: "",
      gender: "",
      newpassword: ""
    },
    userSaved: false,
    sending: false,
  }),
  validations: {
    form: {
      email: {
        required,
        email,
      },
      name: {
        required,
        minLength: minLength(3),
      },
      subname: {
        required,
        minLength: minLength(3),
      },
      age: {
        required,
        maxLength: maxLength(3),
        between: between(5, 140),
      },
      gender: {
        required,
      },
      newpassword: {
        minLength: minLength(6),
      },
    },
  },
  methods: {
    async changePassword(){
      try {  
         await firebase.auth().currentUser.updatePassword(this.form.newpassword)
          this.$bvToast.toast("Udało Ci się zaktualizować hasło.", {
          title: `Sukces!`,
          autoHideDelay: 9000,
          variant: "success",
          solid: true,
        });
      } catch (error) {
        console.log(error)
          this.$bvToast.toast("Coś poszło nie tak, spróbuj jeszcze raz.", {
          title: `Bład!`,
          variant: "danger",
          solid: true,
        });
      }
    
    },
    makeToast(variant = null) {
      if (variant === "info") {
        this.$bvToast.toast("Udało Ci się zaktualizować dane.", {
          title: `Sukces!`,
          autoHideDelay: 9000,
          variant: variant,
          solid: true,
        });
      } else if (variant === "success") {
        this.$bvToast.toast("Udało Ci się zmienić zdjęcie profilowe.", {
          title: `Aktualizacja`,
          variant: variant,
          solid: true,
        });
      } else {
        this.$bvToast.toast("Coś poszło nie tak, spróbuj jeszcze raz.", {
          title: `Błąd!`,
          variant: variant,
          solid: true,
        });
      }
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.newpassword = null;
    },
    saveUser() {
      this.sending = true;

      window.setTimeout(() => {
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    async updateData() {
      if (this.$v.$invalid) {
        this.makeToast("danger");
        return;
      }

      const { currentUser } = firebase.auth();
      if (!currentUser) {
        return;
      }

      const users = firebase.firestore().collection("users");

      try {
        const snapshot = await users.doc(currentUser.uid).get();

        const user = snapshot.data();

        await users.doc(currentUser.uid).set({
          ...user,
          firstName: this.form.name,
          lastName: this.form.subname,
          email: this.form.email,
          gender: this.form.gender,
          age: this.form.age,
        });

        this.makeToast("info");
      } catch (error) {
        this.makeToast("danger");
        console.log(error);
      }
    },
    handleFile() {
      this.file = this.$refs.file.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.fileContent = reader.result;
      };
    },

    async addPhoto() {
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
        const storageRef = firebase.storage().ref();
        const photoRef = storageRef.child(hash);
        await photoRef.put(this.file);

        const snapshot = await userDoc.get();
        const { photoId, ...rest } = snapshot.data();

        if (photoId && photoId !== "user.png" ) {
          await storageRef.child(photoId).delete();
        }

        userDoc.set({
          ...rest,
          photoId: hash,
        });

        refreshAvatarSubject$.next();
        this.makeToast("info");
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
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
        const { age, email, firstName, gender, lastName } = snapshot.data();
        this.form.age = age;
        this.form.email = email;
        this.form.name = firstName;
        this.form.gender = gender;
        this.form.subname = lastName;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.divform {
  display: flex;
  height: 800px;
}
.setting_page {
  height: 100%;
}
.photoav {
  width: 200px;
  overflow: hidden;
  margin-top: 1em;
  margin-bottom: 1em;
}
.md-layout {
  height: 100%;
}
.viewport {
  width: 100%;
  display: inline-block;
  vertical-align: top;
  overflow: auto;
}
.md-error {
  color: rgb(255, 0, 0);
  transform: translateZ(0);
  bottom: -17px;
}
.md-field {
  background-color: rgb(233, 233, 233);
  border-radius: 0.5em;
  margin-bottom: 0.5em;
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
form{
width: 100%;
}
.md-list-item{
  width: 300px;
}
.col-md-3 {
  display: block;
  justify-content: center;
  max-width: 100%;
  border-left: 4px solid #dfdfdf;
}
.md-button {
  background-color: rgb(205, 239, 255);
  color: rgb(0, 0, 0);
  border-radius: 0.5em;
}
.md-snackbar {
  display: flex;
  justify-content: center;
  align-content: center;
}
.md-elevation-4 {
    box-shadow: 0 1px 2px -1px;
}
.editphoto {
  padding-top: 1em;
  align-content: center;
  justify-content: center;
  display: grid;
}
.md-title {
    font-family: "Tagger";
  font-size: 30px;
  padding-top: 0.2em;
}
</style>

