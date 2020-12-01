<template>
    <div class="card-cover" v-click-outside="onClickOutside">
        <div>
            <h4>Size</h4>
            <div class="cover-type-btn flex">
                <div
                    @click.stop="selectCoverType('half-cover')"
                    class="half-cover flex column"
                    role="button"
                    :class="{ picked: pickedCover === 'half-cover',[pickedColor]: pickedColor,grey:!pickedColor }"
                    
                >
                    <div></div >
                    <div class="fakeTxt flex column">
                        <div class="first-line"></div>
                        <div class="second-line"></div>
                    </div>
                </div>
                <div
                    @click.stop="selectCoverType('full-cover')"
                    class="full-cover flex column"
                    role="button"
                    :class="{ picked: pickedCover === 'full-cover',[pickedColor]: pickedColor,grey:!pickedColor }"
                >
                 <div></div >
                  <div class="fakeTxt flex column">
                        <div class="first-line"></div>
                        <div class="second-line"></div>
                    </div>
                </div>
            </div>
            <button class="remove-btn clean-btn" v-if="pickedColor" @click.stop="removeBgColor">Remove Cover</button>
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
import vClickOutside from "v-click-outside";
import { eventBus, CLOSE_EDIT } from "@/services/event-bus.service.js";

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

    },
    methods: {
         onClickOutside() {
           if (this.card) {
               this.card.style={
                   color:this.pickedColor,
                   type:this.pickedCover
               }
                eventBus.$emit(CLOSE_EDIT);
                this.$emit("updatingCard", this.card);
            // console.log('this.card',this.card)
            }
        },
        selectCoverType(cover) {
            this.pickedCover = cover;
            this.selectColor(this.pickedColor)
        },
        selectColor(color){
            this.pickedColor=color
            if(!this.pickedCover){
                this.selectCoverType('half-cover')
            }
            this.$emit("updatingCard", this.card)
            this.$emit('changeBgColor',{color,type:this.pickedCover})
            // console.log('this.card',this.card)
            
        },
        removeBgColor(){
            this.pickedColor=null
            this.selectCoverType(null)
            this.$emit('changeBgColor',null)
        }
    },
    created() {
        this.style = this.card.style;
    },
    directives: {
        clickOutside: vClickOutside.directive,
    },
};
</script>
<style lang="scss" scoped>
</style>