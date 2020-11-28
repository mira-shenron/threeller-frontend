<template>
    <div class="card-cover">
        <div>
            <h4>Size</h4>
            <div class="cover-type-btn flex">
                <div
                    @click.stop="selectCoverType('half-cover')"
                    class="half-cover flex column"
                    role="button"
                    :class="{ picked: pickedCover === 'half-cover' }"
                    
                >
                    <div :style="{ backgroundColor: bgColor }"></div >
                    <div class="fakeTxt flex column">
                        <div class="first-line"></div>
                        <div class="second-line"></div>
                    </div>
                </div>
                <div
                    @click.stop="selectCoverType('full-cover')"
                    class="full-cover flex column"
                    role="button"
                    :class="{ picked: pickedCover === 'full-cover' }"
                    :style="{ backgroundColor: bgColor }"
                >
                 <div></div >
                  <div class="fakeTxt flex column">
                        <div class="first-line"></div>
                        <div class="second-line"></div>
                    </div>
                </div>
            </div>
            <h4>Colors</h4>
            <div class="flex warp">
                <button
                    class="color-pick clean-btn"
                    :class="{ picked: pickedColor === color, [color]: color }"
                    @click.stop="selectColor(color)"
                    v-for="color in colors"
                    :key="color"
                ></button>
            </div>
        </div>
    </div>
</template>

<script>
// import cardLabels from './card-labels.vue';
// import { boardService } from "../services/board.service.js";

// @ is an alias to /src
export default {
    name: "card-cover",
    props: {
        card: Object,
    },
    components: {},
    data() {
        return {
            style: null,
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
            ],
            pickedCover: null,
            pickedColor:null
        };
    },
    computed: {
        bgColor() {
            if (!this.style) {
                return "rgba(94, 108, 132,30%)";
            } else if (this.style && this.style.bgColor) {
                return this.style.bgColor;
            } else return this.style;
        },
        // fakeLineColor() {},
    },
    methods: {
        selectCoverType(cover) {
            this.pickedCover = cover;
        },
        selectColor(color){
            this.pickedColor=color
        }
    },
    created() {
        // console.log(this.style)
        this.style = this.card.style;
    },
};
</script>
<style lang="scss" scoped>
</style>