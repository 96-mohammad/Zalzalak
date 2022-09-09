<template>
    <div class="container">
        <div class="flex">
           <ArticleGrid v-for="article in articles" :key="article.id" :article="article" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArticleGrid from '@/components/ArticleGrid.vue'
export default {
    name: 'Article',
    components: {
        ArticleGrid
    },
    computed: {
        ...mapGetters(["articles"])
    },
    created() {
        window.scrollTo(0,0)
    }
}
</script>
