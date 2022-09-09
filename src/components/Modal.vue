<template>
  <div class="modal-container">
      <div class="modal-content">
          <img src="@/assets/image/svg/tick.svg" alt="tick-icon">
          <p>{{ message }}</p>
          <button @click="closeModal">فهمیدم!</button>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Modal',
    props: ["message"],
    methods: {
        closeModal() {
            this.$emit("closeModal")
        }
    }
}
</script>

<style lang="scss" scoped>
    .modal-container {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,.7);
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 999;

        .modal-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 30rem;
            background-color: #fff;
            padding: 4rem 3rem;
            border-radius: 8px;
        
            p {
                text-align: center;
                margin-bottom: 2rem;
                font-size: 1.8rem;
            }

            button {
                align-self: center;
            }

            img {
                width: 5rem;
                height: 5rem;
                margin-bottom: 1.5rem;
                filter: var(--svg-green);
            }
        }
    }
</style>