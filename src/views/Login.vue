<template>
  <div class="form-wrap">
    <form class="login">
      <router-link class="router-link" to="/">بازگشت به صفحه اصلی</router-link>
      <h2>ورود به زالزالک</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="ایمیل" v-model="email" />
          <img src="@/assets/image/svg/email-regular.svg" alt="email-icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="پسورد" v-model="password" />
          <img src="@/assets/image/svg/password-solid.svg" alt="password-icon" />
        </div>
        <div v-if="errorShow" class="error">{{ errorMsg }}</div>
      </div>
      <router-link class="router-link" to="/forgot-password"
        >رمز عبور خود را فراموش کرده اید؟</router-link
      >
      <button @click.prevent="login">ورود</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
       email: "",
       password: "",
       errorShow: null,
       errorMsg: null
    }
  },
  methods: {
    login() {
      if (!this.email.length || !this.password.length) {
        this.errorShow = true
        this.errorMsg = 'رمزعبور یا ایمیل شما خالی است'
        return;
      }

      this.$store.dispatch("signIn", {email: this.email, password: this.password});
      this.$router.push('/');
      }
    },
  }
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 1100px) {
    width: 90%;
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 3.5rem;
      color: #303030;
      margin-bottom: 2rem;
      @media (max-width: 1100px) {
        font-size: 3rem;
      }
    }
    
    .inputs {
      width: 100%;
      max-width: 35rem;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2.5rem;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 1rem 1rem 1rem 4rem;
          height: 7rem;
          font-size: 1.8rem;
          font-family: Tanha;

          &:focus {
            outline: none;
          }
        }

        img {
          width: 1.4rem;
          position: absolute;
          left: 2rem;
        }
      }
    }

    .angle {
      display: initial;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 6rem;
      right: -3rem;
      height: 101%;
      @media (max-width: 1100px) {
        display: none;
      }
    }
  }
  
  .background {
    display: initial;
    flex: 2;
    background-size: cover;
    background-image: url("../assets/background.png");
    width: 100%;
    height: 100%;
    @media (max-width: 1100px) {
      display: none;
    }
  }
}
</style>