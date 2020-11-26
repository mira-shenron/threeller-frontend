<template>
    <div class="cardDetails">
        <div class="header-card">
            <button>🎫</button>
            <span>{{ card.title }}</span>
            <button @click="isShowDetails">X</button>
        </div>
        <div class="main-card">
            <div class="main-contsnt">
                <div>{{ card.description }}</div>
            </div>
            <div class="nav">
                <a @click="edit('join')" >Join</a>
                <a @click="edit('members')" >Members</a>
                <a @click="edit('labels')">Labels</a>
                <a @click="edit('checklist')" >Checklist</a>
                <a @click="edit('due Date')" >Due Date</a>
                <a @click="edit('attachment')" >Attachment</a>
                <a @click="edit('cover')" >Cover</a>
                <a @click="edit('move')" >Move</a>
                <a @click="edit('copy')" >Copy</a>
            </div>
        </div>
        <div class="editCmp" v-if="showEdit">
            <card-edit/>
        </div>
    </div>
</template>

<script>
import cardEdit from './card-edit.vue';
// @ is an alias to /src
export default {
    name: "card-details",
    props: {
        card: Object,
    },
    components: {
        cardEdit
        },
    data() {
        return {
            showEdit:null,
            featureToShow:null
        };
    },
    methods: {
        isShowDetails() {
            this.$emit("closeModal");
        },
        edit(feature){
          console.log("feature: ", feature)
          this.showEdit=true
        }
    },
    created() {},
};
</script>
<style lang="scss" scoped>
.cardDetails {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    position: relative;
    padding: 20px;
    text-align: center;
    margin: 100 auto;
    top: 100px;
    width: 80vw;
    left: 10vw;
    .header-card{
    display: flex;

    }
    .main-card {
        display: flex;
        & > * {
            display: flex;
            flex-direction: column;
        }
    }
}
.editCmp{
    background-color: #a2cffa;
}
</style>
