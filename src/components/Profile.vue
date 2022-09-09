<template>
  <div class="profile">
          <div @click="show" class="profile-img">
              <img class="outline" :src="`http://localhost:1337${profileInfo.cover.formats.small.url}`" alt="profile-pic">
          </div>
          <div v-if="showProfile" class="profile-menu">
              <h4><span>{{ profileInfo.name }}</span> به زالزالک خوش آمدی!</h4>
              <div class="option">
                  <img src="@/assets/image/svg/edit.svg" alt="edit-icon">
                  <router-link to="/create-post"><p>ایجاد بلاگ</p></router-link>
              </div>
              <div @click="signOut" class="option">
                <img src="@/assets/image/svg/sign-out-alt-regular.svg" alt="sign-out-icon">
                <p>خروج</p>
              </div>
          </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Profile',
    data() {
        return {
            showProfile: null
        }
    },
    computed: {
        ...mapGetters(["profileInfo"])
    },
    methods: {
        show() {
            this.showProfile = !this.showProfile
        },
        signOut() {
            this.$store.commit("ELIMINITE_PROFILE_INFO")
            this.$store.commit("CHANGE_ADMIN_STATE")

            localStorage.removeItem('jwt')
            localStorage.removeItem('user')

            this.$router.push('/login')
        },
    },
    watch: {
        $route() {
            this.showProfile = false
        }
    }
}
</script>

<style lang="scss" scoped>
.profile {
    margin-right: 2rem;
    @media(max-width:900px) {
        margin-right: 1rem;
    }
    @media(max-width: 450px) {
       //display: none;
    }

    &-img {
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        margin-top: .5rem;
        
        @media(max-width:900px) {
            width: 5.5rem;
            height: 5.5rem;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .outline {
            padding: .4rem;
            border-radius: 50%;
            background: linear-gradient(45deg, #20fce2, #0679df);
        }
    }

    &-menu {
        position: absolute;
        top: 10rem;
        right: 1rem;
        width: 20rem;
        background-color: #303030;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border-radius: 1.5rem;
        z-index: 999;

        h4 {
            color: #fff;
            border-bottom: 1px solid #fff;
            padding: 1.7rem .5rem;
            margin-right: .5rem;
            margin-bottom: .5rem;

            span {
                color: aqua;
            }
        }

        .option {
            color: #fff;
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            padding: .7rem;
            cursor: pointer;

            img {
                width: 1.8rem;
                height: auto;
                filter:  brightness(0) invert(1);
            }

            p {
                font-size: 1.4rem;
                margin-right: 1rem;
                color: #fff;

                &:hover {
                    color: aqua;
                }
            }
        }

        &::before {
            content: '';
            display: block;
            position: absolute;
            top: .5rem;
            left: 80%;
            transform: translate(-50%,-100%);
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-bottom: 15px solid #333;
        }
    }
}
</style>