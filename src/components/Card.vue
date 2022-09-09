<template>
    <div class="card">
        <router-link :to="{ name: 'Detail', params: { id: article.id } }">        
            <div class="card-img">
                <img :src="`http://localhost:1337${article.coverPhoto[0].formats.small.url}`" alt="cover-photo">
                <img v-if="article.editorSelected" class="icon" src="@/assets/image/svg/star.svg" alt="star-icon">
            </div>
            <div class="card-content">
                <h1>{{ article.title }}</h1>
                <div class="card-info">
                    <div class="card-info-heading">
                        <img src="@/assets/image/svg/pen-svgrepo.svg" alt="pen-icon">
                        <h4>{{ article.author }}</h4>
                    </div>
                    <div class="card-info-heading">
                        <img src="@/assets/image/svg/calendar-svgrepo.svg" alt="calender-icon">
                        <p class="date">{{ formatData }}</p>
                    </div>
                </div>
                <div class="card-description">
                    <p>{{ article.summary }}</p>
                </div>      
            </div>        
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'BiographyGrid',
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
    },
    created() {
        window.scrollTo(0,0)
    }
}
</script>

<style lang="scss" scoped>
.card {
   width: 30%;
   background-color: #fff;
   filter: var( --drop-shadow);
   height: 50rem;
   border-radius: 1.5rem;
   overflow: hidden;
   margin-right: 3rem;
   margin-bottom: 3rem;
   @media(max-width: 1100px) {
        width: 45%;
        margin-top: 4rem;
    }
    @media(max-width: 750px) {
        width: 100%;
        margin-right: 0;
    }

   &-content {
       padding: 1.5rem;
       display: flex;
       flex-direction: column;
   }

    &-img {
        width: 100%;
        height: 25%;
        position: relative;

        img {
            width: 100%;
            height: 25rem;
            object-fit: cover;
        }

        .icon {
            width: 2rem !important;
            height: auto !important;
            position: absolute;
            top: 2rem;
            right: 1rem;
        }
    }

    h1 {
        font-family: Tanha;
        font-size: 2.3rem;   
        color: #333;     
    }

    &-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 1.2rem 0;

        &-heading {
            display: flex;
            align-items: center;

            img {
                width: 2rem;
                height: auto;
                margin-left: .5rem;
            }
            
        }
    }

    &-description {
        text-align: justify;
        font-size: 1.4rem;
        color: #777;
    }
}
</style>