<template>
    <section @click.stop class="color-picker">
        <!-- <div
            @click="isPick = !isPick"
            class="color-pick"
            :style="{ backgroundColor: value }"
        ></div> -->
        <!-- <form @submit.prevent="addLabel()" > -->
        <input type="text" placeholder="Name" v-model="pickedColor.txt" />
        <div v-show="isPick" class="colors-controls flex warp align-center">
            <span
                class="color-pick"
                :class="{ picked: pickedColor.color === color, [color]: color }"
                @click.stop="selectColor(color)"
                v-for="color in colors"
                :key="color"
            ></span>
        </div>
        <button @click="addLabel()">save</button>
        <!-- </form> -->
    </section>
</template>

<script>
import { boardService } from "../services/board.service.js";

export default {
    props: {
        value: Object,
        card: Object,
    },
    data() {
        return {
            isPick: true,
            colors: [
                "green",
                "yellow",
                "orange",
                "red",
                "purple",
                "blue",
                "sky",
                "lime",
                "pink",
                "black",
                "grey",
            ],
            pickedColor: boardService.getEmptyColorLabel()
            ,
        };
    },
    methods: {
        selectColor(color) {
            this.pickedColor.color = color;
        },
        addLabel() {
            if (this.pickedColor.color !== "grey")
                this.$emit("input", this.pickedColor);
                this.$emit('openLabelsModal',)
            this.isPick = false;
        },
    },
};
</script>

<style>
</style>