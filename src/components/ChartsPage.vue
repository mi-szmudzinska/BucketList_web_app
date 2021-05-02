<template>
  <div class="charts_page">
    <div class="container-fluid">
      <h2>TWOJE CELE</h2>
      <md-content>
        <form>Wykres</form>
        <div class="rightstats">
          <h4>Gratulacje {{ this.firstName }}!</h4>
          <span class="sm-list-item-text"
            >Ukończyłaś %% swoich celów co daje XX%</span
          >
          <span class="sm-list-item-text"
            >W trakcie realizacji masz %% celów co daje XX%</span
          >
          <span class="sm-list-item-text"
            >W planach masz %% celów co daje XX%</span
          >
        </div>
      </md-content>
    </div>
    <hr />
    <div class="container-fluid">
      <h4
        >Zobacz jak wypadasz na tle swoich znajomych</h4
      >
      <md-content class="downblock">
        <form class="chartfriend">Wykres</form>
        <div class="downstats">
          <h3>TY I %FRINEND%</h3>
          <hr class="friendHR" />
          <span class="item-text"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
            quibusdam, non molestias et! Earum magnam, similique, quo recusandae
            placeat dicta asperiores modi sint ea repudiandae maxime? Quae non
            explicabo, neque.</span
          >
        </div>
      </md-content>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "ChartsPage",

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
        const { firstName } = snapshot.data();
        this.firstName = firstName;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 55%;
  height: 100%;
  background-color: rgb(184, 220, 221);
}
.charts_page {
  min-width: 98%;
}
.md-list-item-text {
  margin: 1em 1em 1em 1em;
  font-size: 16px;
  font-weight: bold;
}
.md-content {
  width: 98%;
  height: 350px;
  margin: 1em;
  display: flex;
}
.rightstats {
  margin-left: 1.5em;
  display: block;
  align-self: center;
}
.sm-list-item-text {
  display: block;
}
.chartfriend {
  width: 80%;
  height: 100%;
}
.downblock {
  height: 600px;
}
hr {
  width: 95%;
  border-bottom: 3px solid #893774;
}
.friendHR {
  border-bottom: 5px solid #004aad;
  width: 80%;
}
.downstats {
  width: 40%;
  text-align: center;
  margin: 10% 4% 0 4%;
}
h2{
  padding-top: 0.2em;
  display: flex;
  justify-content: center;
  font-family: "Tagger";
  font-size: 45px;
}
h3{
  display: flex;
  justify-content: center;
  font-family: "LoveSummer";
  font-size: 35px;
}
h4{
  display: flex;
  justify-content: center;
  font-family: "Tagger";
  font-size: 35px;
}
.item-text {
  color: #03a2dc;
}
</style>
