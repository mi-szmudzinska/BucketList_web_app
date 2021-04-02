<template>
  <div class="yourlist_page">
    <div class="grid-container">
      <div>
        <h3>Mój Bucketdream</h3>

        <md-autocomplete
          class="search"
          v-model="searchinbase"
          :md-options="ideas"
        >
          <label>Wyszukaj...</label>
        </md-autocomplete>

        <div class="sort-btn">
          <button > Nazwa </button>
          <button > STATUS </button>
        </div>
      </div>

      <BucketCardPage v-for="(element, index) in data"
      :key="{ index }"
      :title="element.title"
      />

      
    </div>
  </div>
</template>

<script>
import BucketCardPage from "@/components/BucketCardPage.vue";
import "./../styles/popularListPage.css";

export default {
  components: { BucketCardPage },
  name: "PopularListPage",
  data: () => ({
    ideas: [
      "Algeria",
      "Argentina",
      "Brazil",
      "Canada",
      "Italy",
      "Japan",
      "United Kingdom",
      "United States",
    ],
    data: [
      {
        title: "elo",
      },
    ],

  }),
};
</script>

<style lang="scss" scoped>
.yourlist_page {
  width: 90%;
}
.status-idea {
  color: rgb(157, 255, 157);
}
.category {
  color: rgb(255, 188, 157);
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
button {
  width: 125px;
  border-radius: 31px;
  font-size: 100%;
  background-color: rgb(218, 179, 255);
  margin: 0.5em;
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
.search {
  background-color: #eeeeee;
  border-radius: 10px;
  width: 50%;
}
</style>
