<template>
  <index-hero></index-hero>
  <transition name="default">
    <div class="container" v-show="!isLoading && !noMatchingData">
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
    </div>
  </transition>
  <div class="no-data-container" v-if="noMatchingData">
    <img
      src="../assets/img/result-not-found.png"
      alt="Picture of no matching data"
    />
  </div>
  <div class="load-spinner-container" v-if="isLoading || isNextPageLoading">
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
      isNextPageLoading: false,
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
    nextPage() {
      if (this.pagination.currentPageNum !== this.pagination.numOfPages) {
        this.pagination.currentPageNum++;
      }
    },
    setNextPage(photos) {
      this.isNextPageLoading = true;
      setTimeout(() => {
        photos.forEach((photo) => {
          this.pagination.pageItems.push(photo);
        });
        this.isNextPageLoading = false;
      }, 800);
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
      this.setPagination(this.photos);
    },
    setPagination(photos) {
      let numOfPages = Math.ceil(photos.length / Constants.PHOTO_PAGESIZE);
      this.pagination.numOfPages = numOfPages;
      this.pagination.currentPageNum = null;
      this.pagination.currentPageNum = 1;
      this.pagination.numOfItems = photos.length;
    },
  },
  computed: {
    searchKeyword() {
      return this.$store.getters["photos/getSearchKeyword"];
    },
  },
  watch: {
    searchKeyword(enteredValue) {
      this.setPhotos(enteredValue);
    },
    photos() {
      this.photos.length === 0
        ? (this.noMatchingData = true)
        : (this.noMatchingData = false);
    },
    "pagination.currentPageNum": {
      handler(pageNum) {
        if (pageNum === 1) {
          this.pagination.pageItems = this.photos.slice(
            0,
            Constants.PHOTO_PAGESIZE
          );
        } else if (pageNum === this.pagination.numOfPages) {
          const nextPageItems = this.photos.slice(
            pageNum * Constants.PHOTO_PAGESIZE - Constants.PHOTO_PAGESIZE,
            this.pagination.numOfItems
          );
          this.setNextPage(nextPageItems);
        } else {
          const nextPageItems = this.photos.slice(
            pageNum * Constants.PHOTO_PAGESIZE - Constants.PHOTO_PAGESIZE,
            pageNum * Constants.PHOTO_PAGESIZE
          );
          this.setNextPage(nextPageItems);
        }
      },
      deep: true,
    },
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch("photos/loadAllPhotos");
    this.isLoading = false;
    const searchKeyword = this.$store.getters["photos/getSearchKeyword"];
    this.setPhotos(searchKeyword);
  },
  mounted() {
    const footerEl = document.querySelector("footer");
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isNextPageLoading) {
          this.nextPage();
        }
      });
    };
    const observer = new IntersectionObserver(callback, {
      root: null,
      threshold: 0,
      rootMargin: "25px",
    });
    observer.observe(footerEl);
  },
  beforeRouteLeave() {
    this.$store.dispatch("photos/resetSearchKeyword");
  },
};
</script>

<style lang="scss" scoped>
.container {
  @include container-fluid(140rem);
  padding: 6rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3.6rem;
}
.load-spinner-container {
  max-width: 140rem;
  margin: 0 auto;
  padding: 10rem 0;
  text-align: center;
}
.no-data-container {
  max-width: 140rem;
  margin: 0 auto;
  padding: 10rem 0;
  text-align: center;
  img {
    width: 20rem;
  }
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
