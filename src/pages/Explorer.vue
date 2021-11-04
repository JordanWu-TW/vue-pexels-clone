<template>
  <index-hero></index-hero>
  <transition name="default">
    <div class="container" v-if="!isLoading && !noMatchingData">
      <explorer-item
        v-for="photo in pagination.pageItems"
        :key="photo.photoId"
        :userId="photo.userId"
        :photoId="photo.photoId"
        :imgUrl="photo.imgUrl"
        :title="photo.title"
        :description="truncatedDescription(photo.description)"
        :createTime="photo.createTime"
        @click="showModal(photo)"
      ></explorer-item>
      <div class="pagination-container">
        <button class="btn prev-page" @click="prevPage">
          <ion-icon
            name="chevron-back-outline"
            class="chevron-back-outline"
          ></ion-icon>
        </button>
        <button
          class="btn"
          v-for="pageNum in pagination.numOfPages"
          :key="pageNum"
          :class="{ on: isCurrentPage(pageNum) }"
          @click="toPageNum(pageNum)"
        >
          {{ pageNum }}
        </button>
        <button class="btn next-page" @click="nextPage">
          <ion-icon
            name="chevron-forward-outline"
            class="chevron-forward-outline"
          ></ion-icon>
        </button>
      </div>
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
      photos: null,
      isLoading: false,
      noMatchingData: false,
      isModalVisible: false,
      modalData: null,
      pagination: {
        numOfItems: null,
        numOfPages: null,
        currentPageNum: null,
        pageItems: null,
      },
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
    isCurrentPage(pageNum) {
      return pageNum === this.pagination.currentPageNum;
    },
    toPageNum(pageNum) {
      if (pageNum !== this.pagination.currentPageNum) {
        this.pagination.currentPageNum = pageNum;
      }
    },
    prevPage() {
      if (this.pagination.currentPageNum !== 1) {
        this.pagination.currentPageNum--;
      }
    },
    nextPage() {
      if (this.pagination.currentPageNum !== this.pagination.numOfPages) {
        this.pagination.currentPageNum++;
      }
    },
    setPhotos(searchKeyword) {
      let photos = this.$store.getters["photos/getAllPhotos"];
      if (searchKeyword.trim() !== "") {
        photos = photos.filter((photo) => {
          const lowerCasedSearchKeyword = searchKeyword.toLowerCase();
          const lowerCasedSearchTitle = photo.title.toLowerCase();
          const lowerCasedSearchDescription = photo.description.toLowerCase();
          return (
            lowerCasedSearchTitle.includes(lowerCasedSearchKeyword) ||
            lowerCasedSearchDescription.includes(lowerCasedSearchKeyword)
          );
        });
      }
      this.photos = photos;
      this.setPagination(photos);
    },
    setPagination(photos) {
      let numOfPages = Math.floor(photos.length / Constants.PHOTO_PAGESIZE);
      if (photos.length % Constants.PHOTO_PAGESIZE !== 0) {
        numOfPages++;
      }
      this.pagination.numOfPages = numOfPages;
      this.pagination.currentPageNum = 1;
      this.pagination.numOfItems = photos.length;
    },
  },
  watch: {
    photos() {
      this.photos.length === 0
        ? (this.noMatchingData = true)
        : (this.noMatchingData = false);
    },
    "pagination.currentPageNum": function(pageNum) {
      if (pageNum === 1) {
        this.pagination.pageItems = this.photos.slice(
          0,
          Constants.PHOTO_PAGESIZE
        );
      } else if (pageNum === this.pagination.numOfPages) {
        this.pagination.pageItems = this.photos.slice(
          pageNum * Constants.PHOTO_PAGESIZE - Constants.PHOTO_PAGESIZE,
          this.pagination.numOfItems
        );
      } else {
        this.pagination.pageItems = this.photos.slice(
          pageNum * Constants.PHOTO_PAGESIZE - Constants.PHOTO_PAGESIZE,
          pageNum * Constants.PHOTO_PAGESIZE
        );
      }
    },
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch("photos/loadAllPhotos");
    this.isLoading = false;

    const searchKeyword = this.$store.getters["photos/getSearchKeyword"];
    this.setPhotos(searchKeyword);
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
.pagination-container {
  margin-top: 2.4rem;
  grid-column: 1 / -1;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.btn {
  font-size: inherit;
  font-weight: 500;
  background: transparent;
  color: #2d2d2d;
  border: none;
  border-radius: 3px;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.chevron-back-outline,
.chevron-forward-outline {
  width: 2.2rem;
  height: 2.2rem;
}
.btn.on {
  background: #05a081;
  color: #fff;
  cursor: default;
}
.btn:hover:not(.on) {
  transform: scale(1.1);
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
