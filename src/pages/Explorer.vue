<template>
  <index-hero></index-hero>
  <transition name="default">
    <div class="container" v-if="!isLoading && !noMatchingData">
      <explorer-item
        v-for="photo in photos"
        :key="photo.photoId"
        :userId="photo.userId"
        :photoId="photo.photoId"
        :imgUrl="photo.imgUrl"
        :title="photo.title"
        :description="truncatedDescription(photo.description)"
        :createTime="photo.createTime"
        @click="showModal(photo)"
      ></explorer-item>
    </div>
  </transition>
  <div class="no-data-container" v-if="noMatchingData">
    <img
      src="../assets/misc/result-not-found.png"
      alt="Picture of no matching data"
    />
  </div>
  <div class="load-spinner-container" v-if="isLoading">
    <load-spinner></load-spinner>
  </div>
  <transition name="default">
    <photo-modal
      v-if="isModalVisible"
      @closeModal="closeModal"
      :modalData="modalData"
    ></photo-modal>
  </transition>
</template>

<script>
import StringUtils from "../utils/stringUtils";
import Constants from "../constants";
import IndexHero from "../components/sections/IndexHero.vue";
import ExplorerItem from "../components/explorer/ExplorerItem.vue";
import PhotoModal from "../components/layouts/PhotoModal.vue";

export default {
  components: {
    "index-hero": IndexHero,
    "explorer-item": ExplorerItem,
    "photo-modal": PhotoModal,
  },
  data() {
    return {
      isLoading: false,
      noMatchingData: false,
      isModalVisible: false,
      modalData: null,
    };
  },
  methods: {
    showModal(data) {
      this.modalData = data;
      this.isModalVisible = true;
    },
    closeModal() {
      this.modalData = null;
      this.isModalVisible = false;
    },
    truncatedDescription(description) {
      if (description.length >= Constants.PHOTO_DESCRIPTION_LENGTH) {
        description = StringUtils.truncate(
          description,
          Constants.PHOTO_DESCRIPTION_LENGTH
        );
      }
      return description;
    },
  },
  computed: {
    photos() {
      let photos = this.$store.getters["photos/getAllPhotos"];
      if (this.searchKeyword !== "") {
        photos = photos.filter((photo) => {
          const lowerCasedSearchKeyword = this.searchKeyword.toLowerCase();
          const lowerCasedSearchTitle = photo.title.toLowerCase();
          const lowerCasedSearchDescription = photo.description.toLowerCase();
          return (
            lowerCasedSearchTitle.includes(lowerCasedSearchKeyword) ||
            lowerCasedSearchDescription.includes(lowerCasedSearchKeyword)
          );
        });
      }
      return photos;
    },
    searchKeyword() {
      return this.$store.getters["photos/getSearchKeyword"];
    },
  },
  watch: {
    photos() {
      this.photos.length === 0
        ? (this.noMatchingData = true)
        : (this.noMatchingData = false);
    },
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch("photos/loadAllPhotos");
    this.isLoading = false;
  },
  beforeRouteLeave() {
    this.$store.dispatch("photos/resetSearchKeyword");
  },
};
</script>

<style scoped>
.container {
  max-width: 140rem;
  margin: 0 auto;
  padding: 6rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3.6rem;
}
.load-spinner-container,
.no-data-container {
  max-width: 140rem;
  margin: 0 auto;
  padding: 10rem 0;
  text-align: center;
}
.no-data-container img {
  width: 20rem;
}
/* max-width: 1248px */
@media (max-width: 78em) {
  .container {
    grid-template-columns: repeat(3, 1fr);
    padding: 6rem;
    row-gap: 3.6rem;
  }
}
/* max-width: 800px */
@media (max-width: 50em) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
/* max-width: 544px */
@media (max-width: 34em) {
  .container {
    grid-template-columns: 1fr;
  }
}
/* max-width: 384px */
@media (max-width: 24em) {
  .container {
    padding: 3rem;
  }
}
</style>
