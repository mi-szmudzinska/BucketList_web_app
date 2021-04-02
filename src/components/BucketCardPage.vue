<template>
  <div class="grid-container">
    <div class="row row-content">
      <div class="col-md-6 col-lg-6">
        <md-card>
          <md-card-media-cover md-text-scrim>
            <md-card-media md-ratio="16:9">
              <img src="../assets/sushi.jpg" />
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <md-button @click="showModal(name)"
                  >{{ name }}
                  <md-icon id="arrow-icon">label_important</md-icon></md-button
                >

                <span class="md-subhead">{{ desc }}</span>
              </md-card-header>

              <md-card-actions>
                <span class="md-subhead category"
                  ><md-icon>fiber_manual_record</md-icon>{{ category }}</span
                >
                <span class="md-subhead status-idea"
                  ><md-icon>trending_up</md-icon></span
                >
              </md-card-actions>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BucketCard",
  props: {
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    longdesc: {
      type: String,
    },
    category: {
      type: String,
    },
    showModal: {
      type: Function
    }
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  width: 100%;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
#arrow-icon {
  padding-left: 20%;
}
.md-card-media.md-ratio-16-9 {
  height: 150px;
  opacity: 0.5;
}
.md-card-header {
  display: contents;
}
.md-subhead {
  padding-left: 0.5em;
}
.md-card-actions {
  justify-content: space-between;
}
.status-idea {
  color: rgb(157, 255, 157);
}
.category {
  color: rgb(255, 188, 157);
}
</style>
