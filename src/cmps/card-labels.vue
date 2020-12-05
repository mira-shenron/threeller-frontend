<template>
  <div class="card-labels flex column">
    <div class="main-labels" v-click-outside="onClickOutside">
      <el-input
        class="search"
        placeholder="Search labels..."
        v-model="searchBy"
      ></el-input>
      <ul>
        <li v-for="(color, idx) in labelsToShow" class="flex" :key="color.id">
          <span
            class="card-label"
            :class="{
              [color.color]: { color },
              picked: colorLabel[idx].isPicked,
            }"
            @click="addLabel(color)"
            >{{ color.txt }}</span
          >
          <button @click.stop="updatLabel(color)">🖊</button>
        </li>
      </ul>
    </div>
    <div class="btn-container">
      <button class="label-btn-1" @click.stop="openColorModale">
        Create a new label
      </button>
    </div>
    <button>Enable color blind friendly mode</button>
  </div>
</template>

<script>
import { boardService } from "../services/board.service.js";
// import editContainer from "../cmps/edit-container.vue";
import vClickOutside from "v-click-outside";
import { eventBus, CLOSE_EDIT,UPDATE_COLORLIST,DELETE_COLORLIST} from "@/services/event-bus.service.js";

export default {
  name: "card-labels",
  props: {
    propcard: Object,
    chooseColor: Object,
  },
  components: {
    // editContainer,
  },
  // components: {cardEdit},
  data() {
    return {
      isShowModal: false,
      colorLabel: [],
      addColorsLabels: [],
      labelPicked: null,
      searchBy: "",
      card:null,
      // pickedColor:['#89b4c4'],
    };
  },
  computed: {
    labelsToShow() {
      if (!this.searchBy) return this.colorLabel;
      else {
        return this.colorLabel.filter(
          (label) =>
            label.txt.toLowerCase().includes(this.searchBy.toLowerCase()) ||
            label.color.includes(this.searchBy)
        );
      }
    },
  },
  methods: {
    onClickOutside() {
      if (this.card) {
        eventBus.$emit(CLOSE_EDIT);
      }
      // this.$emit("changeColorList");
    },
    updatLabel(label) {
      this.$emit("openColorModale", label);
    },
    openColorModale() {
      this.$emit("openColorModale");
    },
    addLabel(color) {
      // console.log('problem0')
      const colorIdxfromCard = this.card.labels.findIndex(
        (currColor) => currColor.id === color.id
      );
      var copyCardLabels= JSON.parse(JSON.stringify(this.card.labels))
      // console.log('copyCardLabels1',copyCardLabels)
      const colorIdxfromBoard = this.colorLabel.findIndex(
        (currColor) => currColor.id === color.id
      );
      if (colorIdxfromCard === -1) {
        copyCardLabels.push(color);
        // console.log('copyCardLabels1push',copyCardLabels)
        this.colorLabel[colorIdxfromBoard].isPicked = true;
      } else {
        // console.log('problem1')
        copyCardLabels.splice(colorIdxfromCard, 1);
        // console.log('copyCardLabelssplice',copyCardLabels)
        this.colorLabel[colorIdxfromBoard].isPicked = false;
        // console.log('problem2')
      }
      // console.log(
      //   "copyCardLabels",
      //   copyCardLabels,
      //   "colorLabel",
      //   this.colorLabel
      // );
      this.colorLabel = JSON.parse(JSON.stringify(this.colorLabel));
      // console.log('have a pro')
      copyCardLabels.forEach((label,idx)=>{
        // console.log('idx',idx)
        if(label){
          this.card.labels.splice(idx,1,label)
        }else {
          this.card.labels=[]
        }
      })
      this.card.labels= JSON.parse(JSON.stringify(copyCardLabels));
      // console.log("this.card", this.card);
      this.$emit("updatingCard", this.card);
    },
  },
  created() {
    this.card=JSON.parse(JSON.stringify(this.propcard));
    var colorList =JSON.parse(JSON.stringify(this.$store.getters.currBoard.colorList));
    if (!colorList) {
      const basicColor = ["green", "yellow", "orange", "red", "purple", "blue"];
      var colors = basicColor.map((color) =>
        boardService.getEmptyColorLabel(color)
      );
      this.colorLabel = colors;
    } else this.colorLabel = colorList;
    //לסדר את הצבעים שיוסיף אותם כמו שצריך לשנות להם לשם עם האותיות הרלוונטיות
    if (!this.card.labels) {
      this.card.labels = [];
    }
    if (
      !(
        Object.keys(this.chooseColor).length === 0 &&
        this.chooseColor.constructor === Object
      )
    ) {
      if (
        this.chooseColor.pickedColor.color &&
        this.chooseColor.str === "Create"
      ) {
        eventBus.$emit(UPDATE_COLORLIST,this.chooseColor.pickedColor);
         var newcolorList =JSON.parse(JSON.stringify(this.$store.getters.currBoard.colorList));
        this.colorLabel = newcolorList;
      } else if (
        this.chooseColor.pickedColor.color &&
        this.chooseColor.str === "Save"
      ) {
        const idx = this.colorLabel.findIndex(
          (currlabel) => currlabel.id === this.chooseColor.pickedColor.id
        );
        this.colorLabel.splice(idx, 1, this.chooseColor.pickedColor);
      } else if (
        this.chooseColor.pickedColor.color &&
        this.chooseColor.str === "Delete"
      ) {
        const idx = this.colorLabel.findIndex(
          (currlabel) => currlabel.id === this.chooseColor.pickedColor.id
        );
        this.colorLabel.splice(idx, 1);
        // console.log('this.colorLabel delete',this.colorLabel)
         eventBus.$emit(DELETE_COLORLIST,this.chooseColor.pickedColor);
      }
    }

    this.colorLabel.forEach((label) => {
        label.isPicked = false;
    });

    // console.log("this.card.labels", this.card.labels); // 
    if (this.card.labels.length) {
      this.card.labels.forEach((label) => {
        // console.log("label", label);
        if (label.isPicked) {
          const idx = this.colorLabel.findIndex(
            (currlabel) => currlabel.id === label.id
          );
          if (idx === -1) {
            this.colorLabel.push(label);
          } else {
            this.colorLabel[idx].isPicked = true;
            this.colorLabel.splice(idx,1,this.colorLabel[idx]);
            // console.log('this.colorLabel[idx]',this.colorLabel[idx])
            }
        }
      });

    }else {
      this.colorLabel.forEach((label) => {
        label.isPicked = false;
      })
    }
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>
