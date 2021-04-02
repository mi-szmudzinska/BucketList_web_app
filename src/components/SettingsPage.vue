<template>
  <div class="setting_page">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <div class="viewport">
        <md-toolbar>
          <span class="md-title">USTAWIENIA PROFILU</span>
        </md-toolbar>
        <div class="row row-content">
          <div class="col-md-4 col-lg-4">
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
                    autocomplete="given-name"
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
                    autocomplete="family-name"
                    v-model="form.subname"
                    :disabled="sending"
                  ></md-input>
                  <span class="md-error" v-if="!$v.form.subname.minlength"
                    >Niepoprawnie wproadzone dane</span
                  >
                </md-field>
              </md-list-item>
            </md-list>

            <md-list>
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
            </md-list>
            <md-button type="submit" class="md-primary" :disabled="sending"
              >Zapisz zmiany</md-button
            >
          </div>
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

          <div class="col-md-4 col-lg-4">
            <md-list>
              <md-subheader>Hasło</md-subheader>

              <md-list-item>
                <md-field :class="getValidationClass('password')">
                  <label>Obecne hasło</label>
                  <md-input
                    type="password"
                    id="password"
                    name="password"
                    autocomplete="agpassworde"
                    v-model="form.password"
                    :disabled="sending"
                  ></md-input>
                  <span class="md-error" v-if="!$v.form.password.required"
                    >Hasło wymagane</span
                  >
                  <span class="md-error" v-else-if="!$v.form.password.minLength"
                    >Minimum 6 znaków</span
                  >
                </md-field>
              </md-list-item>

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

              <md-list-item>
                <md-field :class="getValidationClass('repeatPassword')">
                  <label>Powtórz nowe hasło</label>
                  <md-input
                    type="password"
                    id="repeatPassword"
                    name="repeatPassword"
                    autocomplete="repeatPassword"
                    v-model="form.repeatPassword"
                    :disabled="sending"
                  ></md-input>
                  <span class="md-error" v-if="!$v.form.password.sameAs"
                    >Nowe hasła nie są identyczne</span
                  >
                  <span class="md-error" v-else-if="!$v.form.password"
                    >Minimum 6 znaków</span
                  >
                  <span class="md-error" v-else-if="!$v.form.password.minLength"
                    >Minimum 6 znaków</span
                  >
                </md-field>
              </md-list-item>
            </md-list>
            <md-button type="submit" class="md-primary" :disabled="sending"
              >Zapisz zmiany</md-button
            >
          </div>
        </div>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
      </div>
    </form>
    <md-snackbar :md-active.sync="userSaved"
      >Zmiany ktore wprowadziłeś zostały zapisane poprawnie</md-snackbar
    >
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import "./../styles/popularListPage.css";

export default {
  name: "SettingsPage",
  mixins: [validationMixin],
    components: {
      Avatar,
  },
  data: () => ({
    user: {
        avatar: "https://i.pinimg.com/564x/c6/02/75/c602759505907c9351372b8c2d97cc7c.jpg"
      },
    form: {
      email: "ala@wp.pl",
      name: "xex",
      subname: "xxe",
      password: "%hasło%",
      age: "12",
      gender: "",
      newpassword: "",
      repeatPassword: "",
    },
    userSaved: false,
    sending: false,
    lastUser: null,
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
      },
      gender: {
        required,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      newpassword: {
        minLength: minLength(6),
      },
      repeatPassword: {
        sameAsPasseord: sameAs("newpassword"),
        minLength: minLength(6),
      },
    },
  },
  methods: {
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
      this.form.repeatPassword = null;
    },
    saveUser() {
      this.sending = true;

      window.setTimeout(() => {
        this.lastUser = `${this.form.name} ${this.form.subname}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.setting_page {
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
.col-md-4 {
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
.editphoto {
  padding-top: 1em;
  align-content: center;
  justify-content: center;
  display: grid;
}
</style>

