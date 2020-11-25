

<template>
  <section class="home-page">
    <div class="welcome-layout">
      <el-row :gutter="20">
        <el-col :span="10"
          ><img src="../assets/imgs/clear.jpg" class="grid-content" alt=""
        /></el-col>
        <el-col :span="14"
          ><div class="grid-content bg-purple-dark">cool stuff</div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="14"
          ><div class="grid-content bg-purple">cool stuff</div></el-col
        >
        <el-col :span="10"
          ><img src="../assets/imgs/not-ideal.jpg" class="grid-content" alt=""
        /></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10"
          ><img src="../assets/imgs/ideal.jpg" class="grid-content" alt=""
        /></el-col>
        <el-col :span="14"
          ><div class="grid-content bg-purple">cool stuff</div></el-col
        >
      </el-row>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home-page",
  components: {},
  computed: {},
};
</script>
