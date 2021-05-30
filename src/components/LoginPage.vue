<template>
  <div class="login_page">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <small class="welcome">Witaj w Bucketdream!</small>
      <small>Zaloguj się</small>
      <md-field md-clearable :class="getValidationClass('email')">
        <label for="email">Email</label>
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
          >Bład, pamiętałęś o @?</span
        >
      </md-field>

      <md-field :class="getValidationClass('password')">
        <label for="password">Hasło</label>
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
      </md-field>

      <md-button type="submit" class="md-raised md-primary" :disabled="sending"
        >Zaloguj się</md-button
      >
      <small>Nie masz jeszcze konta?</small>
      <md-button class="md-raised md-primary" to="register"
        >Zarejestruj się</md-button
      >
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "LoginPage",
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null,
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
      password: {
        required,
      },
    },
  },
  methods: {
    makeToast(variant = null) {
      if (variant === "danger") {
        this.$bvToast.toast("Coś poszło nie tak, spróbuj jeszcze raz!", {
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
      this.form.email = null;
      this.form.password = null;
    },
    saveUser() {
      this.sending = true;
      const auth = firebase.auth();

      auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.push("/home");
        })
        .catch((error) => {
          this.makeToast("danger");
          console.log(error);
        })
        .finally(() => {
          this.sending = false;
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
.login_page {
  padding-top: 10%;
}
.md-error {
  color: rgb(255, 0, 0);
  transform: translateZ(0);
  bottom: -15px;
}
.md-layout {
  display: block;
}
.md-field {
  background-color: rgb(233, 233, 233);
  border-radius: 0.5em;
  width: 70%;
}
.md-button {
  background-color: rgb(205, 239, 255);
  color: rgb(0, 0, 0);
  border-radius: 0.5em;
  margin: 0 0 1em 0;
}
small {
  display: block;
  font-size: 16px;
  font-weight: bold;
}
.welcome {
  font-display: "Oleo Script";
  font-size: 20px;
  margin-bottom: 0.5em;
}
.md-toolbar {
  background-color: rgba(194, 212, 247, 0.29);
  width: 430px;
  height: 100%;
}
</style>