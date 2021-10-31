<template>
  <index-hero></index-hero>
  <div class="container">
    <header>
      <h1>Upload Photos &amp; Videos</h1>
      <ul>
        <li>
          Your uploads will be distributed for free under the Pexels license.
          Learn more
        </li>
        <li>
          To increase the chance of being featured, please ensure that your
          submissions meet our guidelines.
        </li>
        <li>
          We'll review your submission. If it gets selected, you will receive an
          email notification and your content will be featured in our search.
        </li>
      </ul>
    </header>
    <div class="cta-add">
      <button @click="addImage">Add Image</button>
    </div>
    <upload-item
      v-for="upload in uploads"
      :key="upload"
      :uploadId="upload"
      @delete-upload="deleteUpload"
    ></upload-item>
  </div>
</template>

<script>
import IndexHero from "../components/sections/IndexHero.vue";
import UploadItem from "../components/upload/UploadItem.vue";

export default {
  components: {
    "index-hero": IndexHero,
    "upload-item": UploadItem,
  },
  data() {
    return {
      uploads: [],
    };
  },
  methods: {
    addImage() {
      const uploadId = new Date().getTime();
      this.uploads.unshift(uploadId);
    },
    deleteUpload(payload) {
      this.uploads = this.uploads.filter((uploadId) => {
        return uploadId !== payload;
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
}
header {
  width: 50%;
}
header h1 {
  text-align: center;
  font-size: 2.6rem;
  color: #1a1a1a;
  font-weight: 700;
  margin-bottom: 2rem;
}
header ul {
  color: #5e5e5e;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}
.cta-add {
  background-color: #f5f5f5;
  width: 75%;
  text-align: center;
  padding: 2rem;
  border: 2px dashed #dadada;
}
.cta-add button {
  background: #05a081;
  color: #fff;
  border-radius: 3px;
  padding: 1.1rem 2.3rem;
  border: 1px solid #05a081;
  font-weight: 300;
  cursor: pointer;
}
.cta-add button:hover {
  background-color: #06b995;
}
/* max-width: 800px */
@media (max-width: 50em) {
  header ul {
    list-style: none;
    gap: 1.75rem;
  }
  header {
    width: 75%;
  }
}
/* max-width: 544px */
@media (max-width: 34em) {
  .container {
    padding: 4rem 0;
  }
}
/* max-width: 448px */
@media (max-width: 28em) {
  header {
    width: 75%;
  }
}
/* max-width: 384px */
@media (max-width: 24em) {
  header,
  .cta-add {
    width: 80%;
  }
}
</style>
