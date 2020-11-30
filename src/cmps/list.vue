<template>
  <section class="flex column list">
    <div class="list-header flex space-between align-center">
      <h2 v-if="!isShowEditName" @click="openNameEditor" class="list-title">
        {{ list.title }}
      </h2>
      <div v-show="isShowEditName" class="input-container">
        <el-input
          ref="input"
          @change="changeListName"
          @blur="changeListName"
          v-model="copiedList.title"
        ></el-input>
      </div>
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
        @emitOpenAddCard="onOpenCardFromMenu"
      >
      </list-menu>
      <list-menu-action-container
        v-if="isShowListMenu && listActionType === 'copyList'"
        v-click-outside="closeListMenu"
        @emitCloseMenu="closeListMenu"
        @emitClearMenuAction="chooseAction"
        :actionType="'Copy List'"
      >
        <list-copy
          slot="edit-body"
          :currList="list"
          @emitCloseMenu="closeListMenu"
        />
      </list-menu-action-container>
      <list-menu-action-container
        v-if="isShowListMenu && listActionType === 'moveList'"
        v-click-outside="closeListMenu"
        @emitCloseMenu="closeListMenu"
        @emitClearMenuAction="chooseAction"
        :actionType="'Move List'"
      >
        <list-move
          slot="edit-body"
          :currList="list"
          @emitCloseMenu="closeListMenu"
        ></list-move>
      </list-menu-action-container>
    </div>
    <div class="card-container">
      <Container
        @drop="onCardDrop"
        group-name="list"
        :get-child-payload="getCardPayload"
        drag-class="card-ghost"
        drop-class="card-ghost-drop"
        :drop-placeholder="dropPlaceholderOptions"
      >
        <Draggable v-for="card in list.cards" :key="card.id">
          <card-preview
            @click.native="showCardDetails(card)"
            @emitDelete="deleteCard"
            :card="card"
          ></card-preview>
        </Draggable>
        <card-add
          v-if="isShowAddCard"
          @emitAddCard="addCard"
          @emitCloseAddCard="toggleAddCard"
        ></card-add>
      </Container>
    </div>
    <div
      v-if="!isShowAddCard"
      class="add-card-link clickable"
      @click="toggleAddCard"
    >
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
import listMove from "./list-move.vue";
import cardAdd from "./card-add.vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { eventBus, SAVE_LIST } from "@/services/event-bus.service.js";

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
    Container,
    Draggable,
  },
  data() {
    return {
      isShowListMenu: false,
      listActionType: null,
      isShowAddCard: false,
      isShowEditName: false,
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      copiedList: null,
    };
  },
  methods: {
    addCard(title) {
      const card = {
        title,
        id: utilService.makeId(),
        createdAt: Date.now(),
        style: {
          color: "white",
          type: null,
        },
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
      console.log("wassap", this.isShowListMenu, this.listActionType);
    },
    closeListMenu() {
      this.isShowListMenu = false;
      this.listActionType = null;
    },
    chooseAction(type) {
      this.listActionType = type;
    },
    toggleAddCard() {
      this.isShowAddCard = !this.isShowAddCard;
    },
    onCardDrop(dropResult) {
      const listId = this.list.id;
      this.$emit("emitCardDrop", { listId, dropResult });
    },
    getCardPayload(index) {
      return this.list.cards[index];
    },
    onOpenCardFromMenu() {
      this.isShowListMenu = false;
      this.isShowAddCard = true;
    },
    openNameEditor() {
      this.isShowEditName = true;
      console.log(this.$refs.input);
      this.$nextTick(() => this.$refs.input.focus())
    },
    changeListName() {
      if (!this.copiedList.title) return;
      this.isShowEditName = false;
      eventBus.$emit(SAVE_LIST, this.copiedList);
    },
    // updatingCard(card){
    // console.log("in list card:", card)

    // }
  },
  created() {
    this.copiedList = JSON.parse(JSON.stringify(this.list));
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>
