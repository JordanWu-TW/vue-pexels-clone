<template>
  <div class="explorer-item-container" :class="{ new: isUploadedToday }">
    <div class="explorer-item-img">
      <img :src="imgUrl" alt="" />
    </div>
    <div class="explorer-item-content">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["photoId", "imgUrl", "title", "description", "userId", "createTime"],
  computed: {
    isUploadedToday() {
      let startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      let startOfTodayInMs = startOfToday.getTime();
      return this.createTime >= startOfTodayInMs ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.explorer-item-container {
  box-shadow: 0 2.4rem 4.8rem rgb(0 0 0 / 8%);
  border-radius: 9px;
  overflow: hidden;
  transition: all 0.2s linear;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
}

.explorer-item-img {
  height: 20rem;
  align-self: center;
  img {
    height: 100%;
    border-radius: 9px 9px 0 0;
  }
}

.explorer-item-content {
  padding: 2.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  h1 {
    font-size: 2.4rem;
    font-weight: 500;
  }
  p {
    font-size: 1.6rem;
    line-height: 1.5;
  }
}

.explorer-item-container.new::after {
  content: "New Release";
  text-align: center;
  color: $color-white;
  padding: 0.5rem 0;
  background-color: #05a081;
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: auto;
}

/* max-width: 544px */
@media (max-width: 34em) {
  .container {
    grid-template-columns: 1fr;
  }
  .explorer-item-img {
    height: 32rem;
  }
}
/* max-width: 448px */
@media (max-width: 28em) {
  .explorer-item-img {
    height: 25rem;
  }
}
/* max-width: 384px */
@media (max-width: 24em) {
  .explorer-item-img {
    height: 23rem;
  }
}
</style>
