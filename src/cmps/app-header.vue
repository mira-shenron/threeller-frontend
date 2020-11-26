<template>
  <header class="app-header flex align-center space-between">
    <nav class="left-nav flex">
      <div class="nav-btn">
        <img src="@/assets/svgs/home-solid.svg" />
      </div>
      <div class="nav-btn flex align-center">
        <img src="@/assets/svgs/home-solid.svg" />
      </div>
    </nav>
    <h1 class="logo clickable">Threeller</h1>
    <nav class="right-nav flex">
      <div class="nav-btn">
        <img src="@/assets/svgs/alarm.svg" />
      </div>
      <div class="nav-btn flex align-center">
        <img src="@/assets/svgs/alarm.svg" />
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "app-header",
};
</script>