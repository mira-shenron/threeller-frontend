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
                <a href="">Join</a>
                <a href="">Members</a>
                <a href="">Labels</a>
                <a href="">Checklist</a>
                <a href="">Due Date</a>
                <a href="">Attachment</a>
                <a href="">Cover</a>
                <a href="">Move</a>
                <a href="">Copy</a>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: "card-details",
    props: {
        card: Object,
    },
    components: {},
    data() {
        return {};
    },
    methods: {
        isShowDetails() {
            this.$emit("closeModal");
            console.log('X')
        },
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
</style>
