<template>
  <section class="about-us">
    <div class="img-container">
    <h1>زالزالک؛ آگاهی هرگز نمیخوابد</h1>
      <img src="@/assets/image/Pic (112).jpg" alt="">
    </div>
    <div class="about">
      <p>سالها بود خلا نبود رسانه متعبر در حوزه کتاب را حس میکردم. پس تصمیم گرفتم بالاخره پا در این عرصه خطیر بگذارم. ما در زالزالک به معرفی، بررسی و نقد کتاب های فارسی و خارجی خواهیم پرداخت همچنین نیم نگاهی هم به سینما و مطالب علمی خواهیم داشت. بخش مهم دیگر سایت مرور زندگینامه های افراد موفق است. هدف از اینکار ارائه الگوی مناسب برای مخاطب است. </p>
      <p>ما از تمام کسانی که علاقه مند همکاری هستند دعوت میکنیم تا به تیم زالزالک بپیوندند و ما را در تحقق اهداف مان یاری کنند.</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-us {
  padding-top: 3rem;

  .img-container {
    padding: 4.5rem;
    text-align: center;

    h1 {
      font-size: 5rem;
      font-family: Tanha;
      @media(max-width:650px) {
        font-size: 3rem;
      }
    }

    img {
      width: 75%;
      height: auto;
      margin-top: 3rem;

      @media(max-width:650px) {
        width: 100%;
      }
    }
  }

  .about {
    padding: 4rem;
    background-color: #bc3428;
    color: #fff;
    font-size: 2rem;
    text-align: justify;
  }
}
</style>