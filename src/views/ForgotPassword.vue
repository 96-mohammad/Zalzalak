<template>
  <div class="reset-password">
    <Modal v-if="modalShow" :message="modalMsg" @closeModal="closeModal" />
    <Loading v-if="loadingShow"/>
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          بازگشت به
          <router-link class="router-link" :to="{ name: 'Login' }">صفحه ورود</router-link>
        </p>
        <h2>بازیابی رمزعبور</h2>
        <p>رمز عبور خود را فراموش کرده اید؟ ایمیل تان را وارد کنید تا رمز جدید برایتان ارسال شود</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="ایمیل" v-model="email" />
            <img src="@/assets/image/svg/email-regular.svg" alt="email-icon">
          </div>
        </div>
        <button @click.prevent="resetPassword">بازیابی</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import Modal from '@/components/Modal.vue'
export default {
    name: 'ForgotPassword',
    components: {
      Loading,
      Modal
    },
    data() {
        return {
          email: '',
          loadingShow: null,
          modalShow: null,
          modalMsg: ''
        }
    },
    methods: {
        closeModal() {
          this.modalShow = !this.modalShow
        },
        async resetPassword() {
          this.loadingShow = true

          await axios.post("http://localhost:1337/auth/forgot-password", {
            email: this.email
          })
          .then(() => {
            this.loadingShow = false
            this.modalShow = true
            this.modalMsg = 'رمز جدید به ایمیل تان ارسال شد'
          })
          .catch(() => {
            this.loadingShow = false
            this.modalShow = true
            this.modalMsg = 'ایمیل شما صحیح نیست'
          })
        }
    }
}
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 1.5rem;
      }

      p {
        text-align: center;
      }

      input {
        margin-top: 2.5rem;
      }

      img {
        margin-top: 2.8rem;
      }
    }
  }
}
</style>