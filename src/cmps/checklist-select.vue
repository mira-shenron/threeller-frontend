<template>
  <el-select value-key="id" @change="changeVal" v-model="value" placeholder="(none)">
    <el-option-group
      v-for="group in options"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value.id"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>

export default {
  props: ["options"],
  data() {
    return {
      value: '',
    };
  },
  created() {

  },
  methods: {
    changeVal() {
        console.log(this.value);
      this.$emit("change", this.value);
    },
  },
};
</script>