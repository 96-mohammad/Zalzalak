<template>
  <div class="header" :class="{'fixed': header}">
      <div class="logo">
        <router-link tag="a" to="/">
            <h1 class="title">زالزالک</h1>
        </router-link>
      </div>
      <Profile v-if="userState" />
      <form @submit.prevent="search">
        <input type="text" placeholder="جستجوی مقالات..." v-model="searchText">
        <img src="@/assets/image/svg/magnifier.svg">
      </form>
      <nav v-if="!smallScreen" class="main-nav">
        <ul class="list">
            <router-link v-if="!userState" class="link-1" to="/login"><li>ورود</li></router-link>
            <router-link class="link-1" to="/"><li>خانه</li></router-link>
            <router-link class="link-1"  to="/literature"><li>ادبیات</li></router-link>
            <router-link class="link-1"  to="/cinema"><li>سینما</li></router-link>
            <router-link class="link-1"  to="/history"><li>تاریخ</li></router-link>
        </ul>
      </nav>
      <button @click="show" class="btn" v-else>
        فهرست <img :class="{rotate: showMenu}" src="@/assets/image/svg/bottom-icon.svg">
      </button>
      <nav v-if="showMenu" class="second-nav">
        <ul class="list">
            <router-link v-if="!userState" class="link-1" to="/login"><li>ورود</li></router-link>
            <router-link class="link-1" to="/"><li>خانه</li></router-link>
            <router-link class="link-1"  to="/literature"><li>ادبیات</li></router-link>
            <router-link class="link-1"  to="/cinema"><li>سینما</li></router-link>
            <router-link class="link-1"  to="/history"><li>تاریخ</li></router-link>
        </ul>
      </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Profile from '@/components/Profile.vue'
export default {
    name: 'Header',
    data() {
        return {
            smallScreen: null,
            showMenu: null,
            searchText: '',
            header: null
        }
    },
    components: {
        Profile
    },
    computed: {
        ...mapGetters(["articles", "userState"])
    },
    methods: {
        checkScreen() {
            const windowWidth = window.innerWidth

            if (windowWidth <= 1100) { 
                this.smallScreen = true
                return
            }
            return this.smallScreen = false            
        },
        show() {
            this.showMenu = !this.showMenu
        },
        search() {
            if (!this.searchText <= 0) {
                this.$store.dispatch("searchArticle", this.searchText)
                this.searchText = ''
                this.$router.push({ name: "SearchArticle" }).catch(()=>{})          
            }
        },
        fixHeader() {
            const customHeight = 80
            const scroll = window.scrollY

            if (scroll > customHeight) return this.header = true;
            return this.header = false
        }
    },
    created() {
        this.checkScreen();
        window.addEventListener('resize', this.checkScreen)
        window.addEventListener('scroll', this.fixHeader)
    },
    watch: {
        $route() {
            this.showMenu = false
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: relative;
    background-color: #e93f30;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    height: 10rem;
    font-size: 2.2rem;

    .logo {
        position: absolute;
        top: 1.8rem;
        left: 2rem;
        padding: 0 1rem;
        max-width: 20%;

        @media(max-width:750px) {
            top: 3rem;
            padding: 0;
        }

        a {
            color: #fff;
            padding: 0;

            h1 {
                background-image: linear-gradient(to right, #fff , #b9aeae);
                background-clip: text;
                color: transparent;
            }
        }

        h1 {
            font-size: 4rem;

            @media(max-width:750px) {
                font-size: 3rem;
            }
        }
    }
} 

.main-nav {
    display: block;
}
.second-nav {
    background-color: #e93f30;
    height: 8rem;
    width: 100%;
    position: absolute;
    top: 10rem;
    display: flex;
    justify-content: center;
    z-index: 999;

    @media(max-width:550px) {
        font-size: 1.8rem;
    }
}

.list {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.link-1 {
    color: #fff;  
    transition: all .2s ease-in-out;  
    &:not(:last-child) {
        margin-left: 7rem;
        @media(max-width:550px) {
            margin-left: 3rem;
        }
    }
    &:hover {
        transform: scale(1.2);
    }
}

form {
    position: relative;
    margin: 0 3rem;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    width: 25%;
    background-color: #fff;
    padding: .8rem 1rem;
    margin-top: .5rem;
    border-radius: 1rem;

    input {
        width: 100%;
        border: none;
        font-family: Tanha;
        font-size: 1.7rem;

        &:focus {
            outline: none;
        }
    }

    img {
        position: absolute;
        top: 2rem;
        left: 3rem;
        width: 2.5rem;
        @media(max-width: 700px) {
            display: none;
        }
    }

    @media(max-width: 1100px) {
        width: 45%;
    }
    @media(max-width: 700px) {
        width: 30%;
        font-size: 1rem;
    }
}
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .7rem;
    padding: 1rem 3rem;
    border: 1px solid rgba(0,0,0,.05);
    color: inherit;
    background-color: rgba(0,0,0,.2);
    border-radius: 11px;
    box-shadow: 0 13px 7px -15px rgb(50 50 93 / 25%), 0 8px 16px -8px rgb(0 0 0 / 30%), 0 -6px 16px -6px rgb(0 0 0 / 3%);
    font-size: 1.8rem;
    max-width: 20%;

    img {
        margin-right: .8rem;
        filter:  brightness(0) invert(1);
        transition: transform .2s ease-in-out;
    }

    .rotate {
        transform: rotate(180deg);
        margin-right: .8rem;
    }

    @media(max-width: 750px) {
        font-size: 1.4rem;
        padding: 1rem 1.5rem;
    }
}
.fixed {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 999;
}
</style>