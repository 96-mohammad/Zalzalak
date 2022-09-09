<template>  
    <div class="card"> 
        <img :src="`http://localhost:1337${article.coverPhoto[0].formats.small.url}`" alt="article-cover">   
        <img v-if="article.editorSelected" class="icon" src="@/assets/image/svg/star.svg" alt="star-icon">
        <router-link :to="{ name: 'Detail', params: { id: article.id } }"><h1>{{ article.title }}</h1></router-link>           
        <div class="card-description">
            <p>{{ article.summary }}</p>
        </div>
        <div class="card-date">
            <img src="@/assets/image/svg/calendar-svgrepo.svg" alt="calender-icon">
            <p class="date">{{ formatData }}</p>
        </div>
    </div>       
</template>

<script>
export default {
    name: 'ArticleGrid',
    props: ["article"],
    computed: {
        formatData() {
           const date = new Date(this.article.created_at)
           return new Intl.DateTimeFormat("fa", {
               weekday: 'long',
               year: 'numeric',
               month: 'long',
               day: 'numeric'               
           }).format(date)
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    position: relative;
    width: 30%;
    height: min-content;
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    margin-right: 3rem;
    @media(max-width: 1100px) {
        width: 45%;
        margin-top: 4rem;
    }
    @media(max-width: 750px) {
        width: 100%;
        margin-right: 0;
    }

    img {
        width: 100%;
        height: 25rem;
        object-fit: cover;
    }

    .icon {
        width: 2rem !important;
        height: 2rem !important;
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
        
    h1 {
        margin-top: 1.5rem;
        font-family: Tanha;
        font-size: 2.3rem;   
        color: #333;
        transition: color .3s ease-in-out;         
        &:hover {
            color: var(--primary-color);
        }
    }

    &-description {
        text-align: justify;
        font-size: 1.4rem;
        color: #777;
        margin: 1.5rem 0;
    }

    &-date {
        display: flex;
        align-items: center;

        img {
            width: 2rem;
            height: 2rem;
            margin-left: .5rem;
        }
    }
}
</style>