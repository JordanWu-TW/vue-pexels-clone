<template>
  <div class="add-item-container">
    <div class="add-item-container-left">
      <img :src="imgUrl" alt="" />
    </div>
    <div class="add-item-container-right">
      <div class="form-control form-input-img-url">
        <label for="image-url">Image URL <span>(required)</span></label>
        <input
          type="text"
          name="image-url"
          id="image-url"
          v-model="inputObj.imgUrl"
          @blur="validateImgUrl"
          :class="{
            uploaded: isUploaded,
            invalid: formValidation.imgUrl === false,
          }"
          :readonly="isUploaded"
        />
      </div>
      <div class="form-control form-input-title">
        <label for="title">Title <span>(required)</span></label>
        <input
          type="text"
          name="title"
          id="title"
          v-model="inputObj.title"
          @blur="validateTitle"
          :class="{
            uploaded: isUploaded,
            invalid: formValidation.title === false,
          }"
          :readonly="isUploaded"
        />
      </div>
      <div class="form-control form-input-description">
        <label for="description">Description <span>(required)</span></label>
        <textarea
          name="description"
          id="description"
          rows="5"
          v-model="inputObj.description"
          @blur="validateDescription"
          :class="{
            uploaded: isUploaded,
            invalid: formValidation.description === false,
          }"
          :readonly="isUploaded"
        ></textarea>
      </div>
      <div class="cta-container" v-if="!isUploaded">
        <button @click="deleteUpload">Cancel</button>
        <button
          :class="{ 'btn-disabled': !isFormValidated }"
          :disabled="!isFormValidated"
          @click="upload"
        >
          {{ uploadButtonDisplayText }}
        </button>
      </div>
      <transition name="success">
        <div class="upload-success" v-if="isUploaded">Success</div>
      </transition>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  emits: ["delete-upload"],
  props: ["uploadId"],
  data() {
    return {
      inputObj: {
        imgUrl: "",
        title: "",
        description: "",
      },
      formValidation: {
        imgUrl: null,
        title: null,
        description: null,
      },
      isLoading: false,
      isUploaded: false,
    };
  },
  computed: {
    imgUrl() {
      if (this.formValidation.imgUrl) {
        return this.inputObj.imgUrl;
      } else {
        return require("../../assets/img/placeholder-image.png");
      }
    },
    isFormValidated() {
      if (
        this.formValidation.imgUrl &&
        this.formValidation.title &&
        this.formValidation.description
      ) {
        return true;
      } else {
        return false;
      }
    },
    uploadButtonDisplayText() {
      if (this.isLoading) {
        return "Loading...";
      } else {
        return "Upload";
      }
    },
  },
  methods: {
    validateImgUrl() {
      if (
        this.inputObj.imgUrl.trim() !== "" &&
        (this.inputObj.imgUrl.trim().startsWith("http://") ||
          this.inputObj.imgUrl.trim().startsWith("https://"))
      ) {
        this.formValidation.imgUrl = true;
      } else {
        this.formValidation.imgUrl = false;
      }
    },
    validateTitle() {
      if (this.inputObj.title.trim() !== "") {
        this.formValidation.title = true;
      } else {
        this.formValidation.title = false;
      }
    },
    validateDescription() {
      if (this.inputObj.description.trim() !== "") {
        this.formValidation.description = true;
      } else {
        this.formValidation.description = false;
      }
    },
    deleteUpload() {
      this.$emit("delete-upload", this.uploadId);
    },
    async upload() {
      this.isLoading = true;
      await this.$store.dispatch("photos/uploadPhoto", {
        uploadId: this.uploadId,
        createTime: this.uploadId,
        ...this.inputObj,
      });
      this.isLoading = false;
      this.isUploaded = true;
    },
  },
};
</script>

<style scoped>
.add-item-container {
  width: 75%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  margin-top: 4rem;
}
.add-item-container .add-item-container-left {
  padding-right: 2rem;
  position: relative;
}
.add-item-container .add-item-container-right {
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.add-item-container .add-item-container-left img {
  width: 100%;
}
.form-control {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-control label {
  font-size: 1.4rem;
  color: #1a1a1a;
  font-weight: 700;
}
.form-control label span {
  color: #5e5e5e;
  font-weight: 300;
}
.form-control input,
.form-control textarea {
  border: 2px solid #eee;
  padding: 0.6rem;
  border-radius: 3px;
}
.form-control input:focus,
.form-control textarea:focus {
  border: 2px solid #071b4d;
}
.form-control input.invalid,
.form-control textarea.invalid {
  border: 2px solid red;
  opacity: 0.6;
}
.form-control input.uploaded,
.form-control textarea.uploaded {
  background-color: #f5f5f5;
}
.form-control textarea {
  font-family: inherit;
  font-size: 1.3rem;
  line-height: 1.5;
  resize: none;
}
.add-item-container hr {
  grid-column: 1 / -1;
  margin-top: 2.5rem;
  opacity: 0.3;
  height: 1px;
}
.add-item-container:last-child hr {
  display: none;
}
.cta-container {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
}
.cta-container button {
  background-color: #000;
  color: #fff;
  border-radius: 3px;
  padding: 1.1rem 2.3rem;
  border: 1px solid #000;
  font-weight: 300;
  cursor: pointer;
}
.cta-container button:hover {
  opacity: 0.8;
}
.cta-container button.btn-disabled {
  background-color: #dcdcdc;
  border: 1px solid #dcdcdc;
  opacity: 1;
  cursor: default;
}
.upload-success {
  width: 100%;
  text-align: center;
  background: #05a081;
  color: #fff;
  border-radius: 3px;
  padding: 0.7rem 0;
  border: 1px solid #05a081;
  font-size: 1.3rem;
}
.success-enter-from {
  transform: translateY(5rem);
}
.success-enter-to {
  transform: translateY(0);
}
.success-enter-active {
  transition: all 0.25s ease-out;
}
/* max-width: 640px */
@media (max-width: 40em) {
  .add-item-container {
    grid-template-columns: 1fr;
    row-gap: 2.5rem;
  }
  .add-item-container .add-item-container-left {
    padding-right: 0;
  }
  .add-item-container .add-item-container-right {
    padding-left: 0;
  }
  .add-item-container hr {
    margin-top: 1rem;
  }
}
/* max-width: 384px */
@media (max-width: 24em) {
  .add-item-container {
    width: 80%;
  }
}
</style>
