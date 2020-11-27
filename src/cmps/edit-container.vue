<template>
  <div class="edit-container">
    <h2>{{ feature }}</h2>
    <button @click.stop="onEmitCloseEdit">X</button>
    <slot name="edit-body"></slot>
  </div>
</template>

<script>
// @ is an alias to /src
import {eventBus,CLOSE_EDIT} from '@/services/event-bus.service.js'
export default {
  name: "card-edit",
  props: {
    feature: String,
  },
  methods:{
      onEmitCloseEdit(){
          eventBus.$emit(CLOSE_EDIT)
      }
  },
<<<<<<< HEAD
  created(){

  }
=======
>>>>>>> d16e0d174fcefeb72d477ca591390049eae5afcf
};
</script>
<style lang="scss" scoped>
</style>