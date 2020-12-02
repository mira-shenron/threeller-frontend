<template>
    <div class="card-labels flex column">
        <div class="main-labels" v-click-outside="onClickOutside">
            <el-input
                class="search"
                placeholder="Search labels..."
                v-model="searchBy"
            ></el-input>
            <ul>
                <li
                    v-for="(color, idx) in labelsToShow"
                    class="flex"
                    :key="color.id"
                >
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
            if (!this.searchBy) return this.colorLabel;
            else {
                return this.colorLabel.filter(
                    (label) =>
                        label.txt
                            .toLowerCase()
                            .includes(this.searchBy.toLowerCase()) ||
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
            const colorIdxfromCard = this.card.labels.findIndex(
                (currColor) => currColor.id === color.id
            );
            const colorIdxfromBoard = this.colorLabel.findIndex(
                (currColor) => currColor.id === color.id
            );
            if (colorIdxfromCard === -1) {
                this.card.labels.push(color);
                this.colorLabel[colorIdxfromBoard].isPicked = true;
            } else {
                this.card.labels.splice(colorIdxfromCard, 1);
                this.colorLabel[colorIdxfromBoard].isPicked = false;
            }
            console.log(
                "this.card.labels",
                this.card.labels,
                "colorLabel",
                this.colorLabel
            );
            this.colorLabel = JSON.parse(JSON.stringify(this.colorLabel));
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
        console.log("this.chooseColor", this.chooseColor);
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
                this.colorLabel.push(this.chooseColor);
                this.$emit("updatListOfColors", this.colorLabel);
            } else if (
                this.chooseColor.pickedColor.color &&
                this.chooseColor.str === "Save"
            ) {
                const idx = this.colorLabel.findIndex(
                    (currlabel) =>
                        currlabel.id === this.chooseColor.pickedColor.id
                );
                //  this.colorLabel[idx]=this.chooseColor.pickedColor
                this.colorLabel.splice(idx, 1, this.chooseColor.pickedColor);
            } else if (
                this.chooseColor.pickedColor.color &&
                this.chooseColor.str === "Delete"
            ) {
                const idx = this.colorLabel.findIndex(
                    (currlabel) =>
                        currlabel.id === this.chooseColor.pickedColor.id
                );
                this.colorLabel.splice(idx, 1);
            }
        }
        this.colorLabel.forEach((label) => {
            if (!label.isPicked) {
                label.isPicked = false;
            }
        });
        this.card.labels.forEach((label) => {
            if (!this.card.labels.length) return;
            if (label.isPicked) {
                const idx = this.colorLabel.findIndex(
                    (currlabel) => currlabel.id === label.id
                );
                this.colorLabel[idx].isPicked = true;
            }
        });
    },
    directives: {
        clickOutside: vClickOutside.directive,
    },
};
</script>
