<template>
  <div id="app"> 
    <Header v-if="headerShow" />     
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  data() {
    return {
      headerShow: null
    }
  },
  components: {
    Header,
    Footer
  },
  methods: {
    checkRoute() {
      if (this.$route.name === 'Login' || this.$route.name === 'ForgotPassword') return this.headerShow = false
      return this.headerShow = true
    }
  },
  created() {
    this.checkRoute();
    this.$store.dispatch("fetchData")
  },
  watch: {
    $route() {
      this.checkRoute()
    }
  }
}
</script>

<style lang="scss">
//*** Import Persian Fonts ***///
@font-face {
  font-family: Tanha;
  src: url('assets/fonts/tanha-font/Tanha.eot');
  src: url('assets/fonts/tanha-font/Tanha.eot?#iefix') format('Tanha-opentype'),
       url('assets/fonts/tanha-font/Tanha.woff') format('woff'),
       url('assets/fonts/tanha-font/Tanha.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: Yekan;
  src: url('assets/fonts/yekan-font/Yekan.eot');
  src: url('assets/fonts/yekan-font/Yekan.eot?#iefix') format('Yekan-opentype'),
       url('assets/fonts/yekan-font/Yekan.woff') format('woff'),
       url('assets/fonts/yekan-font/Yekan.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
//*** Global Styles ***//
:root {
  --box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
  --primary-color: #e93f30;
  --drop-shadow: drop-shadow(0px 0px 10px rgba(0,0,0,.5));
  --secondary-color: #5D4037;
  --svg-white: brightness(0) invert(1); //used with filter
  --svg-green: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
}

*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  @media(max-width: 470px) {
    font-size: 50%;
  }
}

body {
  font-family: Yekan, Tanha;
  font-size: 1.6rem;
  color: #333;
}

button {
  cursor: pointer;
  display: block;
  padding: 1.2rem 2.6rem;
  border-radius: 1.2rem;
  color: #fff;
  background-color: #303030;
  border: none;
  font-family: Tanha;
  font-size: 1.6rem;
  transition: 0.5s ease-in-out all;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

a {
  text-decoration: none;
  display: inline-block;
}

li {
  list-style: none;
}

h4 {
  color: #444;
  font-weight: 400;
  font-family: Tanha;
  font-size: 1.4rem;
}

.container {
  margin: 0 auto;
  max-width: 140rem;
  height: 100%;
  padding: 0 3rem;
}

.title {
  font-size: 3rem;
  font-family: Tanha;
  display: block;
}

.link {
  color: var(--primary-color);
  font-size: 1.4rem;
  transition: all .3s ease-in-out;

  &:hover {
    border-bottom: .1rem solid var(--primary-color);
  }
}

.router-link {
    text-decoration: none;
    color: #000;
    cursor: pointer;
    font-size: 1.4rem;
    margin: 1.2rem 0;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease all;

    &:hover {
      border-color: #303030;
    }
}

.date {
  font-size: 1.5rem;
  letter-spacing: .1rem;
  color: #666;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

.flex-box {
  margin: 3rem 0;
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
  margin: 1rem 0;
}
</style>
