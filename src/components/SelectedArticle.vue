<template>
  <article class="article">
      <div class="article-heading">
          <div class="img-container">
              <img :src="`http://localhost:1337${article.coverPhoto[0].formats.small.url}`" alt="cover-photo">
          </div>
          <div class="article-information">
              <div class="article-information-heading">
                <img src="@/assets/image/svg/pen-svgrepo.svg" alt="pen-icon">
                <h4>{{ article.author }}</h4>
              </div>
              <router-link :to="{ name: 'Detail', params: { id: article.id } }"><h1 class="title">{{ article.title }}</h1></router-link>
              <div class="article-information-heading">
                <img src="@/assets/image/svg/calendar-svgrepo.svg" alt="calender-icon">
                <p class="date">{{ formatData }}</p>
              </div>
          </div>
      </div>
      <div class="description">
        <p>{{ article.summary }}</p>
      </div>
  </article>
</template>

<script>
export default {
    name: 'SelectedArticle',
    props: ['article'],
    computed: {
        formatData() {
           const date = new Date(this.article.created_at)
           return new Intl.DateTimeFormat("fa", {
               weekday: 'long',
               year: 'numeric',
               month: 'long',
               day: 'numeric',
               
           }).format(date)
        }
    }
}
</script>

<style lang="scss" scoped>
.article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 5rem 0;

    &-heading {
        display: flex;
        align-items: center;

        @media(max-width: 650px) {
            flex-direction: column;
        }
    }

    &-information {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        margin: 0 2rem;

        &-heading {
            display: flex;
            align-items: center;

            img {
                width: 2rem;
                height: 2rem;
                margin-left: .5rem;
            }
        }

        @media(max-width: 650px) {
            margin: 0;
            justify-content: flex-start;
        }

        h1 {
            margin: 1.5rem 0;
            color: #333;
            transition: color .3s ease-in-out;         
            &:hover {
                color: var(--primary-color);
            }
        }
    }
}

.img-container {
    max-width: 40rem;
    max-height: 40rem;
    transform: scale(.8) translateX(15%) rotateZ(calc(-1 * (11 * 1deg)));
    border-radius: 1.2rem;
    cursor: pointer;
    overflow: hidden;
    transition: transform .3s ease-in-out;
    filter: drop-shadow(0px 0px 10px rgba(0,0,0,.5));

    @media(max-width: 650px) {
        transform: translateX(0) rotateZ(0);
        max-width: 100%;
        cursor: default;
        margin-bottom: 2rem;
    }

    &:hover {
        transform: translateX(0) rotateZ(calc(-1 * (11 * 0)));
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.description {
    color: #777;
    max-width: 75%;
    text-align: justify;

    @media(max-width: 1100px) {
        max-width: 100%;
    }

    @media(max-width: 650px) {
        max-width: 100%;
    }
}
</style>