<template>
    <div class="container">
        <div v-if="foundArticle.length >= 1" class="flex flex-box">
            <ArticleGrid v-for="article in foundArticle" :key="article.id" :article="article" />
        </div>
        <div v-else class="center">
            <h1>متاسفانه موردی پیدا نشد!</h1>
        </div>
    </div>
</template>

<script>
import ArticleGrid from '@/components/ArticleGrid.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'SearchArticle',
    computed: {
        ...mapGetters(["foundArticle"])
    },
    components: {
        ArticleGrid
    },
    created() {
        this.$store.commit("ELIMINITE_SEARCH_RESAULT")
    },
}
</script>

<style lang="scss" scoped>
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 65vh;
    width: 100%;
}
</style>

