<template>
    <div class="container">
        <div class="flex">
            <div class="blog-info">
                <img :src="`http://localhost:1337${article[0].profilePhoto.formats.thumbnail.url}`" alt="">
                <p>{{ article[0].author }}</p>                
                <p>{{ article[0].subject }}</p>
                <p>{{ formatDate }}</p>
            </div>
            <div class="blog-heading">
                <h1 class="title">{{ article[0].title }}</h1>
            </div>
            <div class="blog-img">
                <img :src="`http://localhost:1337${article[0].coverPhoto[0].formats.medium.url}`" alt="">
            </div>
            <div class="blog-summary">
                <span>چکیده مطلب </span>
                <p>{{ article[0].summary }}</p>
            </div>
            <div v-html="markedText" class="blog-content"></div>
        </div>
    </div>
</template>

<script>
import marked from 'marked'
import { mapGetters } from 'vuex'
export default {
    name: 'Detail',
    data() {
        return {
            article: [],
            profilePhoto: null
        }
    },
    computed: {
        ...mapGetters(["articles"]),
        markedText() {
            return marked(this.article[0].content);
        },
        formatDate() {
           const date = new Date(this.article[0].created_at)
           return new Intl.DateTimeFormat("fa", {
               weekday: 'long',
               year: 'numeric',
               month: 'long',
               day: 'numeric'               
           }).format(date)
        },
    },
    created() {
        this.article = this.articles.filter(item => item.id === this.$route.params.id)
        window.scrollTo(0,0)
        console.log(this.article[0])
    }
}
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 5rem;
    @media(max-width:1400px) {
        margin: 5rem 0; 
    }
}
.blog {
    &-info {
        display: flex;
        align-items: center;
        width: 75%;
        padding: 1.2rem;
        margin: 1.5rem 0;
        background-color: var(--secondary-color);
        font-family: Tanha;
        @media(max-width:1400px) {
            width: 100%; 
        }

        img {
            overflow: hidden;
            border-radius: 50%;
            object-fit: cover;
            width: 5rem;
            height: 5rem;
        }

        p {
            padding: 0 1rem;
            color: #fff;
        }
    }

    &-heading {
        margin: 1.5rem 0;
    }

    &-img {
        width: 75%;
        height: 42rem;
        margin: 1.5rem 0;
        @media(max-width:1400px) {
            width: 100%;   
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &-summary {
        display: flex;
        flex-direction: column; 
        margin: 1.5rem 0;
        font-family: Tanha;
        color: #777;
        width: 75%;
        border-bottom: 1px solid #777;
        padding-bottom: 3.5rem;
        @media(max-width:1400px) {           
            width: 100%;    
            text-align: right;
        }

        span {
            width: 20%;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
    }

    &-content {
        margin: 1.5rem 0;    
        width: 75%;
        text-align: justify;
        @media(max-width:1400px) {
            width: 100%;   
        }
    }
}
</style>