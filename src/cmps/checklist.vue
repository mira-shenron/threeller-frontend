<template>
  <div class="flex column">
    <span>Title</span>
    <input type="text" v-model="checklistName" />
    <span>Copy Items From</span>
    <checklist-select
      @change="copyFromChecklist"
      :options="checklistOptions"
      class="checklist-select"
    ></checklist-select>
    <button @click.stop="addChecklist">Add</button>
  </div>
</template>


<script>
import checklistSelect from "./checklist-select.vue";
import {boardService} from '@/services/board.service.js'
import  {eventBus, SAVE_MEMBERS, CLOSE_EDIT} from "@/services/event-bus.service.js";

export default {
  props: {
    card: Object
  },
  components: {
    checklistSelect
  },
  data() {
    return {
      checklistName:'',
      newChecklist: null,
      checklistOptions: [{
        label: 'card1',
        options: [{
          value: {
                  "id": "YEhmF",
                  "title": "Checklist",
                  "todos": [
                    {
                      "title": "To Do 1",
                      "isDone": false,
                      "id": "212jX"
                    }
                  ]
                },
          label: 'checklist1'
        }, 
        {
          value: {
                  "id": "YEhmhj",
                  "title": "Checklist",
                  "todos": [
                    {
                      "title": "To Do 1",
                      "isDone": false,
                      "id": "212jX"
                    }
                  ]
                },
          label: 'checklist2'
        },
         {
          value: {
                  "id": "YEhmhjjj",
                  "title": "Checklist",
                  "todos": [
                    {
                      "title": "To Do 1",
                      "isDone": false,
                      "id": "212jX"
                    }
                  ]
                },
          label: 'checklist3'
        }]
      }]
    }
  },
  computed: {
  },
  methods: {
      copyFromChecklist(value){
          console.log('copyFromChecklist', value);
      },
      addChecklist(){
          var newChecklist = boardService.getEmptyChecklist(this.checklistName);
          if(!this.card.checklists) this.card.checklists = [newChecklist];
          else this.card.checklists.push(newChecklist);
          eventBus.$emit(SAVE_MEMBERS, this.card);
          eventBus.$emit(CLOSE_EDIT);
      }
  },
  created() {

  }

}
</script>