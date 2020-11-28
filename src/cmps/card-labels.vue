<template>
    <div class="card-labels flex column">
        <div class="main-labels" v-click-outside="onClickOutside">
            <input type="text" placeholder="Search labels..." />
            <ul>
                <li v-for="color in colorLabel" class="flex" :key="color.id">
                    <span
                        class="card-label"
                        :class="{ [color.color]: { color } }"
                        @click="addLabel(color)"
                        >{{ color.txt }}</span
                    >
                    <button>🖊</button>
                </li>
            </ul>
        </div>
        <button @click.stop="openColorModale">Create a new label</button>
        <button>Enable colo blind friendly mode</button>
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
            // pickedColor:['#89b4c4'],
        };
    },
    computed: {},
    methods: {
        onClickOutside() {
            if (this.card) {
                eventBus.$emit(CLOSE_EDIT);
                this.$emit("updatingCard", this.card);
            }
            this.$emit("changeColorList");
        },
        openColorModale() {
            this.$emit("openColorModale");
        },
        addLabel(color) {
            const colorIdx = this.card.labels.findIndex(
                (currColor) => currColor.color === color.color
            );
            if (colorIdx === -1) {
                this.card.labels.push(color);
            } else this.card.labels.splice(colorIdx, 1);
        },
    },
    created() {
        var colorList=this.$store.getters.currBoard.colorList
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
        }else this.colorLabel=colorList
        //לסדר את הצבעים שיוסיף אותם כמו שצריך לשנות להם לשם עם האותיות הרלוונטיות
        if (!this.card.labels) {
            this.card.labels = [];
        }

        if (this.chooseColor.color) {
            this.colorLabel.push(this.chooseColor);
            this.$emit("updatListOfColors", this.colorLabel);
        }
    },
    directives: {
        clickOutside: vClickOutside.directive,
    },
};
</script>
