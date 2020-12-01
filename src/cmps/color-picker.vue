<template>
    <section @click.stop class="color-picker">
        <el-input class="search" placeholder="Name" v-model="pickedColor.txt"></el-input>
        <div v-show="isPick" class="colors-controls flex warp align-center">
            <span
                class="color-pick"
                :class="{ picked: pickedColor.color === color, [color]: color }"
                @click.stop="selectColor(color)"
                v-for="color in colors"
                :key="color"
            ></span>
        </div>
        <el-button @click="addLabel()" type="success">Save</el-button>
       
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