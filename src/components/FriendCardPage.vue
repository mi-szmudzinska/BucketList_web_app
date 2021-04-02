<template>
    <md-card>
     <div class="row row-content">
          <div class="col-md-3 col-lg-3">        
          <md-avatar>
          <img
            src="https://vuematerial.io/assets/examples/avatar.png"
            alt="Avatar"
          />
        </md-avatar>
          </div>
          <div class="col-md-9 col-lg-9">
      <md-card-media>

        <span class="md-title">Alicja Nowak</span>
        <label>{{gender}}, {{age}} lat, {{city}}</label>

        <label>Zadania ukończone</label>
        <k-progress :percent="a" status="success"></k-progress>
        <label>Zadania w trakcie realizacji</label>
        <k-progress :percent="b" status="warning"></k-progress>
        <label>Zadania w planach</label>
        <k-progress :percent="c" status="error"></k-progress>
        <label>Zainteresowania: {{interests}}</label>
        <md-button>Zaobserwuj by zobaczyć więcej</md-button>
      </md-card-media>
    </div>
    </div>
    </md-card>
</template>

<script>
export default {
  name: "AddCard",
  props: {
    gender: {
      type: String
    },
    age: {
      type: Number
    },
    interests: {
      type: String
    },
    city: {
      type: String
    },
    a: {
      type: Number
    },
    b: {
      type: Number
    },
    c: {
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
.col-md-3{
    display: flex;
    padding-right: 0px;
}
.md-card-media {
    display: grid;;
}
.md-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.md-title {
  color: #000;
}
.friends-page {
  min-width: 100%;
}
.md-card {
  width: 500px;
  height: 20%px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.k-progress {
  padding: 0;
  margin: 0;
}
label {
  margin: 0;
}
</style>
