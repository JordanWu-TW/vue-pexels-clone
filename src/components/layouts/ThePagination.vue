<template>
  <div class="pagination-container">
    <button class="btn prev-page">
      <ion-icon
        name="chevron-back-outline"
        class="chevron-back-outline"
      ></ion-icon>
    </button>
    <button class="btn on">1</button>
    <button class="btn">2</button>
    <button class="btn">3</button>
    <button class="btn">4</button>
    <button class="btn">5</button>
    <button class="btn next-page">
      <ion-icon
        name="chevron-forward-outline"
        class="chevron-forward-outline"
      ></ion-icon>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
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
}
</style>
