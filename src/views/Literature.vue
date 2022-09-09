<template>
    <div class="container">
        <div class="flex flex-box">
           <Card v-for="article in literatureArticle" :key="article.id" :article="article" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/Card.vue'
export default {
    name: 'Literature',
    components: {
        Card
    },
    computed: {
        ...mapGetters(["articles"]),
        literatureArticle() {
            return this.articles.filter(article => article.subject === 'ادبیات')
        }
    },
    created() {
        window.scrollTo(0,0)
    }
}
</script>