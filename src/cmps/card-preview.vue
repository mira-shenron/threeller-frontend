<template>
    <section class="card ">
        <button>e</button>
    <h3> {{card.title}} </h3>
    </section>
</template>

<script>

 
export default {
    name: "card-detail",
    props:{
        card:Object
    },
    components: {
        // cardDetails
    },
    data() {
        return {
            
        };
    },
    methods:{
        // showCardDetails(){
        //      console.log('tache')
        // }
    },
    created (){
        
    }
    
};
</script>
<style lang="scss">
.card{
    background-color: rgb(236, 103, 103);
}
</style>