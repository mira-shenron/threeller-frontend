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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path class="kiwi"
            d="M16.8 15.1c-1.1-0.9-1.8-2.2-1.8-3.6v-3c0-2.5-1.7-4.6-4-5.3l0-0.7c0-0.8-0.7-1.5-1.5-1.5s-1.5 0.7-1.5 1.5v0.7c-2.3 0.7-4 2.8-4 5.3v3c0 1.4-0.7 2.7-1.8 3.6-0.2 0.1-0.2 0.4-0.2 0.6s0.3 0.3 0.5 0.3h4.6c0 0.2-0.1 0.3-0.1 0.5 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0-0.2 0-0.3 0-0.5h4.6c0.2 0 0.4-0.1 0.5-0.3s0-0.4-0.2-0.6zM9 2.5c0-0.3 0.2-0.5 0.5-0.5s0.5 0.2 0.5 0.5v0.5c-0.2 0-0.3 0-0.5 0s-0.3 0-0.5 0v-0.5zM11 16.5c0 0.8-0.7 1.5-1.5 1.5s-1.5-0.7-1.5-1.5c0-0.2 0-0.3 0.1-0.5h2.8c0.1 0.2 0.1 0.3 0.1 0.5zM3.7 15c0.3-0.3 0.5-0.6 0.7-1 0.4-0.8 0.6-1.6 0.6-2.5v-3c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5v3c0 0.9 0.2 1.7 0.6 2.5 0.2 0.4 0.4 0.7 0.7 1h-11.5z"
          />
        </svg>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "app-header",
};
</script>