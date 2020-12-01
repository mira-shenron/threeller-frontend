<template>
    <div class="card-labels flex column">
        <div class="main-labels" v-click-outside="onClickOutside">
            <el-input
                class="search"
                placeholder="Search labels..."
                v-model="searchBy"
            ></el-input>
            <ul>
                <li v-for="color in labelsToShow" class="flex" :key="color.id">
                    <span
                        class="card-label"
                        :class="{
                            [color.color]: { color },
                            picked: color.isPicked,
                        }"
                        @click="addLabel(color)"
                        >{{ color.txt }}</span
                    >
                    <button>🖊</button>
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
import { eventBus, CLOSE_EDIT } from "@/services/event-bus.service.js";

export default {
    name: "card-labels",
    props: {
        card: Object,
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
            // pickedColor:['#89b4c4'],
        };
    },
    computed: {
        labelsToShow() {
            // console.log(this.colorLabel);
            if (!this.searchBy) return this.colorLabel;
            else
                return this.colorLabel.filter(
                    (label) =>
                        label.txt
                            .toLowerCase()
                            .includes(this.searchBy.toLowerCase()) ||
                        label.color.includes(this.searchBy)
                );
        },
    },
    methods: {
        onClickOutside() {
            if (this.card) {
                eventBus.$emit(CLOSE_EDIT);
            }
            // this.$emit("changeColorList");//לא מצאתי
        },
        openColorModale() {
            this.$emit("openColorModale");
        },
        addLabel(color, idx) {
            // console.log("!!!!click", color);
            const colorIdx = this.card.labels.findIndex(
                (currColor) => currColor.id === color.id
            );
            this.labelPicked = idx;
            // console.log("colorIdx", colorIdx);
            if (colorIdx === -1) {
                this.card.labels.push(color);
                // this.card.labels[-1].isPicked=true
                // this.labelPicked=true
            } else {
                // console.log("deliting");
                this.card.labels.splice(colorIdx, 1);
                // this.card.labels[colorIdx].isPicked=false
                //  this.labelPicked=false
            }
            // console.log("this.card", this.card);
            this.$emit("updatingCard", this.card);
        },
    },
    created() {
        var colorList = this.$store.getters.currBoard.colorList;
        if (!colorList) {
            const basicColor = [
                "green",
                "yellow",
                "orange",
                "red",
                "purple",
                "blue",
            ];
            var coloros = basicColor.map((color) =>
                boardService.getEmptyColorLabel(color)
            );
            this.colorLabel = coloros;
        } else this.colorLabel = colorList;
        //לסדר את הצבעים שיוסיף אותם כמו שצריך לשנות להם לשם עם האותיות הרלוונטיות
        if (!this.card.labels) {
            this.card.labels = [];
        }
        if (this.chooseColor.color) {
            this.colorLabel.push(this.chooseColor);
            this.$emit("updatListOfColors", this.colorLabel);
        }
        // this.colorLabel.forEach(label=>{
        //     label.isPicked=false
        // })
    },
    directives: {
        clickOutside: vClickOutside.directive,
    },
};
</script>
