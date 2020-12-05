<template>
    <section @click.stop class="color-picker">
        <el-input class="search" placeholder="Name" v-model="pickedColor.txt"></el-input>
        <div v-show="isPick" class="colors-controls flex warp align-center">
            <span
                class="color-pick"
                :class="{ picked: pickedColor.color === color, [color]: color }"
                @click="selectColor(color)"
                v-for="color in colors"
                :key="color"
            ></span>
        </div>
        <div v-if="!value.color">
        <el-button @click.stop="addLabel('Create')" type="success">Create</el-button>
        </div>
        <div v-if="value.color">
            <el-button @click.stop="addLabel('Save')" type="success">Save</el-button>
            <el-button @click.stop="addLabel('Delete')" type="danger">Delete</el-button>
        </div>

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
            pickedColor:null
            ,
        };
    },
    methods: {
        selectColor(color) {
            this.pickedColor.color = color;
            console.log('color',this.pickedColor)
        },
        addLabel(str) {
            console.log('str',str,'this.pickedColor',this.pickedColor)
            if (this.pickedColor.color !== "grey"){
                this.$emit("input", {pickedColor:this.pickedColor,str});
                this.$emit('openLabelsModal')
            this.isPick = false;
            }
        },
    },
    created(){
        if (Object.keys(this.value).length === 0 &&
            this.value.constructor === Object) {this.pickedColor=boardService.getEmptyColorLabel();}
        else if (this.value||this.value.color) {this.pickedColor=this.value;}
        // console.log('this.value', this.pickedColor)
   
    }
};
</script>

<style>
</style>