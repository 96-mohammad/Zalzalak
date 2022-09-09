<template>
    <div class="container">
        <div class="flex flex-box">
            <Card v-for="article in bioArticle" :key="article.id" :article="article"/>
        </div>        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/Card.vue'
export default {
    name: 'Biography',
    components: {
        Card,
    },
    computed: {
        ...mapGetters(["articles"]),
        bioArticle() {
            return this.articles.filter(article => article.subject === 'زندگینامه')
        }
    }
}
</script>