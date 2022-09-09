<template>
  <div class="container">
    <section class="intro">
      <div class="intro-article">
        <SelectedArticle v-for="article in selectArticle" :key="article.id" :article="article" />
      </div>
      <CTA />
    </section>
    <section>     
      <Biography />
      <div class="nav">
        <router-link class="link" to="/bio">زندگینامه های بیشتر ↬</router-link>
      </div>
    </section>
    <section class="article">
      <div class="flex">
        <ArticleGrid v-for="article in showArticle" :key="article.id" :article="article" />
      </div>
      <div class="nav">
        <router-link class="link link-edit" to="/article">مقالات بیشتر ↬</router-link>
      </div>
    </section>
    <div v-if="showBtn" @click="backToUp" class="back-to-up">
      <img src="@/assets/image/svg/up-arrow.svg" alt="up-icon">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SelectedArticle from '@/components/SelectedArticle.vue'
import CTA from '@/components/CTA.vue'
import Biography from './Biography.vue'
import ArticleGrid from '@/components/ArticleGrid.vue'
export default {
  name: 'Home',
  components: {
    SelectedArticle,
    CTA,
    Biography,
    ArticleGrid
  },
  data() {
    return {
      showBtn: null
    }
  },
  computed: {
    ...mapGetters(["articles"]),
    selectArticle() {
      return this.articles.filter(article => article.editorSelected === true).slice(0, 3)
    },
    bioArticle() {
      return this.articles.filter(article => article.subject === 'زندگینامه').slice(0, 3)
    },
    showArticle() {
      return this.articles.slice(0, 7)
    }
  },
  methods: {
    backToUp() {
      window.scrollTo({top: 0, behavior: 'smooth'})
    },
    show() {
      const customHeight = 1000
      const scroll = window.scrollY

      if (scroll > customHeight) return this.showBtn = true
      return this.showBtn = false
    },
  },
  created() {
    window.addEventListener('scroll', this.show)
  }
}
</script>

<style lang="scss" scoped>
.intro {
  display: flex;
  width: 100%;
  margin: 4rem 0;

  @media(max-width: 1300px) {
    flex-direction: column;
  }
  &-article {
    width: 100%;
  }
}
.nav {
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
}
.link-edit {
  margin-top: 2.5rem;
}
.back-to-up {
  position: fixed;
  cursor: pointer;
  padding: 1.5rem;
  border-radius: 1.2rem;
  background-color: #E65100;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 5rem;
  right: 2rem;

  img {
    filter: var(--svg-white);
  }
}
</style>