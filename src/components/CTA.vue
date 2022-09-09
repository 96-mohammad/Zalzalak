<template>
    <div class="cta">
      <Modal v-if="modalShow" :message="modalMsg" @closeModal="close" />
        <div class="img-container">
          <img src="@/assets/image/logo.png" alt="">
        </div>
        <h1>با مشترک شدن در خبرنامه زالزالک به سرعت از نوشته های جدید ما اطلاع پیدا کنید</h1>
        <p> قطعا این همراهی شما انرژی ما را برای فعالیت بیشتر افزایش خواهد داد</p>
        <div class="form-group">
          <input v-model="email" class="email" type="email" placeholder="ایمیل شما">
          <input @click="sendEmail" class="submit" type="submit" value="مشترک شوید!">
        </div>
        <div v-if="error" class="error">{{ errorMsg }}</div>
    </div>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/Modal.vue'
export default {
    name: 'CTA',
    data() {
      return {
        email: '',
        modalShow: null,
        modalMsg: '',
        error: null,
        errorMsg: '',
      }
    },
    components: {
      Modal,
    },
    methods: {
      async sendEmail() {
        if (this.email.length <= 0) {
          this.error = true
          this.errorMsg = 'لطفا ابتدا فیلد ایمیل را پر کنید'
          return;
        }

        await axios.post("http://localhost:1337/emails", {
          email: this.email
        })
        .then(() => {
          this.email = ''
          this.error = false
          this.modalShow = true
          this.modalMsg = `سپاسگذار این همراهی پر از محبت شما هستیم`
        })
        .catch(() => {
          this.email = ''
          this.error = false
          this.modalShow = true
          this.modalMsg = `مشکلی به وجود آمده است. لطفا بعدا تلاش نمایید`
        })
        return;
      },
      close() {
        this.modalShow = false
      }
    }
}
</script>

<style lang="scss" scoped>
.cta {
    background-color: #a7e1fa;
    position: relative;
    padding: 125px 1.5em 2em 1.5em;
    margin-top: 8rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 11px;
    width: 50%;
    height: min-content;

    @media(max-width: 1300px) {
      width: 80%;
      margin: 0 auto;
    }

    .img-container {
      position: absolute;
      top: -7rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }  
    }

    h1 {
      margin: 2rem 0;
      font-size: 1.6rem;
      font-family: Tanha;

      @media(max-width: 1300px) {
        font-size: 2rem;
      }
      @media(max-width: 750px) {
        font-size: 1.6rem;
      }
    }
    
    p {
      font-weight: 300;
      font-size: 1.2rem;
      color: #333;
      @media(max-width: 1300px) {
        font-size: 1.6rem;
      }
      @media(max-width: 750px) {
        font-size: 1.2rem;
      }
    }
  }

  .form-group {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.1rem;
    margin-top: 3rem;    

    @media(max-width: 600px) {
      display: block;
    }

    .email {
      font-family: Tanha;
      font-size: 1.7rem;
      margin: 0;
      padding: 1.2rem 1.5rem;
      border: 0;
      border-top-right-radius: 11px;
      border-bottom-right-radius: 11px;
      background: #fff;
      @media(max-width: 600px) {
        border-radius: 11px;
      }

      &:focus {
        outline: none;
      }
    }

    .submit {
      color: #fff;
      font-family: Tanha;
      font-size: 1.5rem;
      cursor: pointer;
      background-color: #0168b8;
      padding: 1.2rem 1.5rem;
      border: 0;
      border-top-left-radius: 11px;
      border-bottom-left-radius: 11px;
      transition: all .3s ease-in-out;

      &:hover {
        background-color: #0984e2;
      }

      @media(max-width: 600px) {
        margin-top: 1.5rem;
        border-radius: 11px;
      }
    }
}
</style>