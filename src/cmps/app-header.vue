<template>
  <header class="app-header flex align-center space-between">
    <nav class="left-nav flex">
      <div class="nav-btn">
        <img src="@/assets/card-icons/menu.png" />
      </div>
      <div class="nav-btn flex align-center">
        <img src="@/assets/card-icons/home.png" />
      </div>
    </nav>
    <h1 class="logo clickable">Threeller</h1>
    <nav class="right-nav flex justify-center align-center">
      <div class="nav-btn">
        <img src="@/assets/card-icons/info.png" />
      </div>
      <div class="nav-btn flex justify-center align-center">
        <img src="@/assets/card-icons/bell.png" />
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "app-header",
};
</script>