<template>
  <div class="col-md-6 col-lg-6">
    <md-card>
      <md-card-media-cover md-text-scrim>
        <md-card-media md-ratio="16:9">
          <img v-if="url" :src="url" />
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
            <span :class="`md-subhead category ${categoryKey}`"
              ><md-icon>fiber_manual_record</md-icon
              >{{ categoryName.toUpperCase() }}</span
            >
            <span :class="`md-subhead status-idea ${statusKey}`"
              ><md-icon>trending_up</md-icon>{{ statusName }}
            </span>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
  </div>
</template>

<script>
import "./../styles/popularListPage.css";
import firebase from "firebase";
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
    categoryName: {
      type: String,
    },
    categoryKey: {
      type: String,
    },
    statusName: {
      type: String,
    },
    statusKey: {
      type: String,
    },
    showModal: {
      type: Function,
    },
    photoId: {
      type: String,
    }
  },
  data: () => ({
    url: null,
  }),
  created() {
    this.updatePhotoUrl();
  },
  watch: {
    photoId() {
      this.updatePhotoUrl();
    },
  },
  methods: {
    updatePhotoUrl() {
      if (!this.photoId) {
        return;
      }

      const storage = firebase.storage();
      const img = storage.ref(this.photoId);
      img.getDownloadURL().then((url) => {
        this.url = url;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  width: 100%;
  margin-top: 15px;
}
.md-card-media.md-ratio-16-9 {
  height: 150px;
  opacity: 0.8;
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
.now {
  color: #ffd000;
}
.todo {
  color: #00f7ff;
}
.done {
  color: #81ff81;
}
.journey {
  color: #ff8a8f;
}
.food {
  color: #f6d6a6;
}
.career {
  color: #bad6ba;
}
.love {
  color: #dfb8f4;
}
.sport {
  color: #edb5db;
}
.other {
  color: #92dcef;
}
</style>
