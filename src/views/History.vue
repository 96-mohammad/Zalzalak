<template>
    <div class="container">
        <div class="flex flex-box">
           <Card v-for="article in historyArticle" :key="article.id" :article="article" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/Card.vue'
export default {
    name: 'History',
    components: {
        Card
    },
    computed: {
        ...mapGetters(["articles"]),
        historyArticle() {
            return this.articles.filter(article => article.subject === 'تاریخ')
        }
    },
    created() {
        window.scrollTo(0, 0)
    }
}
</script>