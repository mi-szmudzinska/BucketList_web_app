<template>
  <div class="charts_page">
    <div class="container-fluid">
      <span class="md-list-item-text">TWOJE CELE</span>
      <md-content>
        <form>Wykres</form>
        <div class="rightstats">
          <h4>Gratulacje %IMIE%</h4>
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
      <span class="md-list-item-text"
        >Zobacz jak wypadasz na tle swoich znajomych</span
      >
      <md-content class="downblock">
        <form class="chartfriend">Wykres</form>
        <div class="downstats">
          <h2>TY I %FRINEND%</h2>
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
export default {
  name: "ChartsPage",
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
  border-bottom: 5px solid #004AAD;
  width: 80%;
}
.downstats {
  width: 40%;
  text-align: center;
  margin: 10% 4% 0 4%;
}
h2 {
  color: #ff3d5a;
}
.item-text {
  color: #03A2DC;
}
</style>
