<template>
  <footer class="footer">    
    <div class="footer-head">
      <h1>زالزالک</h1>
    </div>
    <div class="flex">
      <div class="copyright">
        <p>تمامی حقوق مادی و معنوی این سایت متعلق به مجموعه زالزالک میباشد. استفاده از مطالب سایت با ذکر منبع بلامانع است.</p>
      </div>
      <div class="social">
        <img src="@/assets/image/svg/linkedin-brands.svg" alt="">
        <img src="@/assets/image/svg/instagram-brands.svg" alt="">
        <img src="@/assets/image/svg/twitter-brands.svg" alt="">
      </div>
    </div>
  </footer> 
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
.footer {
  color: #fff;
  background-color: var(--primary-color);
  padding: 2rem 5rem;
  margin-top: 2rem;

  &-head {
    width: 100%;
    text-align: center;
    margin-top: 2rem;

    h1 {
      font-size: 6rem;
      font-family: Tanha;
      background-image: linear-gradient(to right, #fff , #b9aeae);
      background-clip: text;
      color: transparent;
    }
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3rem;
    margin-top: 3rem;

    @media(max-width: 650px) {
      flex-direction: column;
    }

    .copyright {
      width: 55%;

      @media(max-width: 650px) {
        width: 100%;
      }

      p {
        padding-top: 2rem;
      }

      &::before {
        content: '';
        display: block;
        width: inherit;
        height: .3rem;
        background-color: #fff;
      }
    }

    .social {
      width: 35%;
      align-self: flex-start;

      @media(max-width: 650px) {
        width: 100%;
        margin-top: 3rem;
        text-align: center;
      }

      &::before {
        content: '';
        display: block;
        width: inherit;
        height: .3rem;
        background-color: #fff;
      }

      img {
        filter: brightness(0) invert(1);
        width: 4rem;
        height: auto;
        cursor: pointer;
        padding-top: 2rem;
        &:not(:last-child) {
          margin-left: 2rem;
        }

        &:hover {
          filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
        }
      }
    }
  }
}
</style>