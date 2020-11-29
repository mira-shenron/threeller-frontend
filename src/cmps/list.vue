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
        <list-copy slot="edit-body" :currList="list" />
      </list-menu-action-container>
      <list-menu-action-container
        v-if="isShowListMenu && listActionType === 'moveList'"
        v-click-outside="closeListMenu"
        @emitCloseMenu="closeListMenu"
        @emitClearMenuAction="chooseAction"
        :actionType="'Move List'"
      >
        <div slot="edit-body">moveeeee</div>
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
    </div>
    <div class="add-card-container">
      <form @submit.prevent="addCard">
        <el-input
          class="list-card-composer-textarea"
          type="textarea"
          autosize
          resize="none"
          placeholder="Enter title for this card..."
          v-model="txt"
        >
        </el-input>
        <button>save</button>
      </form>
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
  },
  data() {
    return {
      txt: "",
      isShowListMenu: false,
      listActionType: null,
    };
  },
  methods: {
    addCard() {
      const title = this.txt;
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
