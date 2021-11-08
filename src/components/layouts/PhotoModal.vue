<template>
  <div class="photo-modal-container" @click.self="closeModal">
    <main>
      <img :src="modalData.imgUrl" alt="" />
      <div class="content-container">
        <h1>{{ modalData.title }}</h1>
        <p>{{ modalData.description }}</p>
        <small>Created by {{ creatorFullName }} on {{ createTime }}</small>
        <button @click="closeModal">Close</button>
      </div>
    </main>
  </div>
</template>

<script>
import DateUtils from "../../utils/dateUtil";

export default {
  emits: ["closeModal"],
  props: ["modalData"],
  data() {
    return {
      creatorData: {},
    };
  },
  computed: {
    createTime() {
      return DateUtils.getDate(this.modalData.createTime);
    },
    creatorFullName() {
      if (this.creatorData.lastName === undefined) {
        return this.creatorData.firstName;
      }
      return this.creatorData.firstName + " " + this.creatorData.lastName;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
  async created() {
    this.creatorData = await this.$store.dispatch(
      "getUser",
      this.modalData.userId
    );
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeModal();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.photo-modal-container {
  @include fullScreenSize;
  background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.6));
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 6.6rem;
  main {
    max-width: 80rem;
    background-color: $color-white;
    max-height: 85vh;
    overflow: scroll;
    position: relative;
    border-radius: 9px;
    img {
      @include fullSize;
    }
    .content-container {
      display: flex;
      flex-direction: column;
      padding: 2.4rem 3.2rem;
      gap: 1.2rem;
      h1 {
        font-size: 2.4rem;
        line-height: 1.5;
        font-weight: 500;
      }
      p {
        font-size: 1.6rem;
        line-height: 1.5;
      }
      small {
        font-size: 1.4rem;
        color: #696969;
      }
      button {
        background-color: $color-black;
        color: $color-white;
        border-radius: 3px;
        padding: 0.7rem;
        border: 1px solid$color-black;
        font-weight: 300;
        cursor: pointer;
        margin-top: 1.2rem;
      }
    }
  }
}

/* max-width: 640px */
@media (max-width: 40em) {
  main {
    border-radius: 0;
  }
}
</style>
