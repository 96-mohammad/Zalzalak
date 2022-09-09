<template>
    <div class="container">
        <div class="flex flex-box">
           <Card v-for="article in cinemaArticle" :key="article.id" :article="article" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/Card.vue'
export default {
    name: 'Cinema',
    components: {
        Card
    },
    computed: {
        ...mapGetters(["articles"]),
        cinemaArticle() {
            return this.articles.filter(article => article.subject === 'سینما')
        }
    },
    created() {
        window.scrollTo(0,0)
    }
}
</script>