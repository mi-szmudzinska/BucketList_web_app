<template>
  <div class="register_page">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Zarejestruj się</div>
        </md-card-header>

        <md-card-content>
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">Imię</label>
                <md-input
                  type="first-name"
                  name="first-name"
                  id="first-name"
                  v-model="form.firstName"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.firstName.required"
                  >Imię wymagane</span
                >
                <span class="md-error" v-else-if="!$v.form.firstName.minlength"
                  >Niepoprawnie wproadzone dane</span
                >
              </md-field>

              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Nazwisko</label>
                <md-input
                type="last-name"
                  name="last-name"
                  id="last-name"
                  v-model="form.lastName"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.lastName.required"
                  >Nazwisko wymagane</span
                >
                <span class="md-error" v-else-if="!$v.form.lastName.minlength"
                  >Niepoprawnie wproadzone dane</span
                >
              </md-field>

            <md-field :class="getValidationClass('age')">
              <label for="age">Wiek</label>
              <md-input
                type="number"
                id="age"
                name="age"
                v-model="form.age"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.age.required"
                >Wiek wymagany</span
              >
              <span class="md-error" v-else-if="!$v.form.age.maxlength"
                >Niepoprawnie wproadzone dane</span
              >
            </md-field>

                <md-field :class="getValidationClass('gender')">
                  <label for="gender">Płeć</label>
                  <md-select
                    type="gender"
                    name="gender"
                    id="gender"
                    v-model="form.gender"
                    :disabled="sending"
                  >
                    <md-option value="Kobieta">Kobieta</md-option>
                    <md-option value="Mężczyzna">Mężczyzna</md-option>
                  </md-select>
              <span class="md-error" v-if="!$v.form.gender.required"
                >Określenie płci wymagane</span
              >
                </md-field>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input
              type="email"
              name="email"
              id="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required"
              >Email wymagany</span
            >
            <span class="md-error" v-else-if="!$v.form.email.email"
              >Bład, pamiętałęś o @?</span
            >
          </md-field>

            <md-field :class="getValidationClass('password')">
              <label for="password">Hasło</label>
              <md-input
                type="password"
                id="password"
                name="password"
                v-model="form.password"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.password.required"
                >Hasło wymagane</span
              >
              <span class="md-error" v-else-if="!$v.form.password.minLength"
                >Minimum 6 znaków</span
              >
            </md-field>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Zarejestruj się</md-button
          >
          <small>Masz już konto?</small>
          <md-button class="md-raised md-primary" @click="$router.push('/')">Zaloguj się</md-button>
        </md-card-actions>
      </md-card>

    </form>
  </div>
</template>

<script>
import "./../styles/popularListPage.css";
import firebase from "firebase";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  between,
} from "vuelidate/lib/validators";

export default {
  name: "RegisterPage",
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      age: null,
      gender: null,
      email: null,
      password: null,
      photoId: "user.png",
    },
    userSaved: false,
    sending: false,
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
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
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },

    },
  },
  methods: {
        makeToast(variant = null) {
      if (variant === "danger") {
        this.$bvToast.toast("Użytkownik o podanych danych istnieje, spróbuj jeszcze raz", {
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
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.age = null;
      this.form.gender = null;
      this.form.email = null;
      this.form.password = null;
    },
    saveUser() {
      this.sending = true;
      const auth =  firebase
        .auth();

      auth
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((user) => {
          return firebase
            .firestore()
            .collection("users")
            .doc(user.user.uid)
            .set({
              email: this.form.email, 
              firstName:this.form.firstName,
              lastName: this.form.lastName,
              age: this.form.age,
              gender: this.form.gender,
              photoId: this.form.photoId,
              backetList: [],
              friends: []
            });
        })
        .then(() => {
            return auth.signOut();
        })
        .then(() => {
            this.$router.push("/");
        })
        .catch((error) => {
        this.makeToast("danger");
        console.log(error);
        this.clearForm();
      });
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
small {
  display: block;
  font-size: 16px;
  font-weight: bold;
}
.register_page {
  padding-top: 0;
}
.md-field {
  background-color: rgb(233, 233, 233);
  border-radius: 0.5em;
  margin: 0 0 18px 0;
  width: 90%;
}
.md-button {
  background-color: rgb(205, 239, 255);
  color: rgb(0, 0, 0);
  border-radius: 0.5em;
  margin: 0 0 0.5em 0;
}
.md-error {
  color: rgb(255, 0, 0);
  transform: translateZ(0);
  bottom: -15px;
}
.md-title {
  font-display: "Oleo Script";
  font-size: 20px;
  font-weight: bold;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-layout-item.md-size-50 {
  min-width: 80%;
  max-width: 100%;
  flex: 0 1 50%;
  box-shadow: none;
}
.md-card-content {
  padding-bottom: 0;
}
.md-card-actions {
  display: block;
  padding-left: 1em;
}
</style>