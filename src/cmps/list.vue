<template>
  <section class="flex column list">
    <div class="list-header flex space-between align-center">
      <h2 class="list-title">{{ list.title }}</h2>
      <div
        @click="toggleListMenu"
        class="list-menu-icn flex align-center clickable"
      >
        <i class="el-icon-more"></i>
      </div>
      <list-menu
        v-if="isShowListMenu && !listActionType"
        v-click-outside="closeListMenu"
        @emitCloseMenu="closeListMenu"
        @emitChooseAction="chooseAction"
      >
      </list-menu>
      <list-menu-action-container
        v-if="isShowListMenu && listActionType === 'copyList'"
        v-click-outside="closeListMenu"
        @emitCloseMenu="closeListMenu"
        @emitClearMenuAction="chooseAction"
        :actionType="'Copy List'"
      >
        <list-copy slot="edit-body" :currList="list" @emitCloseMenu="closeListMenu"/>
      </list-menu-action-container>
      <list-menu-action-container
        v-if="isShowListMenu && listActionType === 'moveList'"
        v-click-outside="closeListMenu"
        @emitCloseMenu="closeListMenu"
        @emitClearMenuAction="chooseAction"
        :actionType="'Move List'"
      >
        <list-move slot="edit-body" :currList="list" @emitCloseMenu="closeListMenu"></list-move>
      </list-menu-action-container>
    </div>
    <div class="card-container flex column">
      <!-- <div > -->
        <card-preview v-for="card in list.cards" :key="card.id"
          @click.native="showCardDetails(card)"
          @emitDelete="deleteCard"
          :card="card"
        ></card-preview>
      <!-- </div> -->
      <card-add v-if="isShowAddCard" @emitAddCard=addCard @emitCloseAddCard="toggleAddCard"></card-add>
    </div>
    <div v-if="!isShowAddCard" class="add-card-link clickable" @click="toggleAddCard">
      <i class="el-icon-plus"></i>
      <span>Add another card</span>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import vClickOutside from "v-click-outside";
import cardPreview from "@/cmps/card-preview.vue";
import listMenu from "@/cmps/list-menu.vue";
import utilService from "@/services/util.service.js";
import listMenuActionContainer from "./list-menu-action-container.vue";
import listCopy from "@/cmps/list-copy.vue";
import listMove from './list-move.vue';
import cardAdd from './card-add.vue';

export default {
  props: {
    list: {
      type: Object,
    },
  },
  components: {
    cardPreview,
    listMenu,
    listMenuActionContainer,
    listCopy,
    listMove,
    cardAdd,
  },
  data() {
    return {
      isShowListMenu: false,
      listActionType: null,
      isShowAddCard: false,
    };
  },
  methods: {
    addCard(title) {
      const card = {
        title,
        id: utilService.makeId(),
        createdAt: Date.now(),
        style:{
              color:'white',
              type:null
            }
      };
      this.list.cards.push(card);
      this.txt = "";
      this.$emit("emitSaveBoard");
    },
    deleteCard(cardId) {
      const idx = this.list.cards.findIndex((card) => card.id === cardId);
      this.list.cards.splice(idx, 1);
      this.$emit("emitSaveBoard");
    },
    showCardDetails(card) {
      this.$emit("showCardDetails", card);
    },
    toggleListMenu() {
      this.isShowListMenu = !this.isShowListMenu;
      this.listActionType = null;
    },
    closeListMenu() {
      this.isShowListMenu = false;
      this.listActionType = null;
    },
    chooseAction(type) {
      this.listActionType = type;
    },
    toggleAddCard(){
      this.isShowAddCard = !this.isShowAddCard
    }
    // updatingCard(card){
    // console.log("in list card:", card)

    // }
  },
  created() {},
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>
