<template>
    <section class="board-preview clickable">
        <h2> {{board.title}} </h2>
    </section>
</template>

<script>

export default {
    props:{
        board:Object
    },
    components: {
        
    },
    data() {
        return {
            
        };
    },
    methods:{

    },
    created (){
        
    }
    
};
</script>
<style lang="scss">
.board-preview{
    background-color: rgb(134, 195, 190);
    height: 200px;
    width: 200px;
}
</style>