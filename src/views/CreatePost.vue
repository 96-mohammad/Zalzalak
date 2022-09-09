<template>
  <div class="create-post">  
    <PhotoPreview v-if="photoShow" :photoUrl="photoUrl" @changeShow="photoShow=$event" />
    <Loading v-if="loadingShow" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>ارور : </span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="عنوان مقاله" v-model="title" />
        <input type="text" placeholder="موضوع" v-model="subject">
        <div class="upload-file">
          <button><label for="blog-photo">بارگذاری تصویر</label></button>
          <input  @change="fileChange" type="file" ref="photo" id="blog-photo" accept=".png, .jpg, ,jpeg"/>
          <button @click="changePhotoPreview" class="preview" :class="{'button-inactive': !photoUrl}">
            پیش نمایش تصویر
          </button>
        </div>
      </div>
      <div class="blog-more-info">
        <textarea v-model="summary" placeholder="چکیده"></textarea>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="content" useCustomImageHandler  />
      </div>
      <div class="blog-actions">
        <button @click="sendData">انتشار وبلاگ</button>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from "quill"
window.Quill = Quill
const ImageResize = require("quill-image-resize-module").default
Quill.register("modules/imageResize", ImageResize)
import PhotoPreview from '@/components/PhotoPreview.vue'
import Loading from '@/components/Loading.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'CreatePost',
    data() {
      return {
        title: '',
        content: '',
        file: null,
        subject: '',
        summary: '',
        editorSettings: {
          modules: {
            imageResize: {},
          },
        },
        error: null,
        errorMsg: null,
        loadingShow: null,
        photoUrl: null,
        photoShow: false,
        imageId: null,
        profileImage: null,
        profileId: null
      }
    },
    components: {
      PhotoPreview,
      Loading
    },
    methods: {
      fileChange() {
        this.file = this.$refs.photo.files[0]
        this.photoUrl = URL.createObjectURL(this.file)
      },
      changePhotoPreview() {
        this.photoShow = true
      },
      //*** Upload Data to Strapi  ***/
      async uploadPhoto() {
        if (!this.file) {
          this.error = true
          this.errorMsg = 'لطفا فایل عکس را بارگذاری کنید'
          return;
        }
        const formData = new FormData()
        formData.append('files', this.file)

        await axios.post("http://localhost:1337/upload", formData).then(res => {
          this.imageId = res.data[0].id
        }).catch(() => {
          this.error = true
          this.errorMsg = 'اشکالی در آپلود عکس به وجود آمده است'
        })
        return true;
      },
      async sendData() {
        this.loadingShow = true
        if (await this.uploadPhoto()) {
          if (!this.title.length <= 0 && !this.subject.length <= 0 && !this.summary.length <= 0 && !this.content.length <= 0) {
            try {
              await axios.post("http://localhost:1337/articles", {
                title: this.title,
                subject: this.subject,
                summary: this.summary,
                content: this.content,
                coverPhoto: this.imageId,
                author: this.profileInfo.name,
                profilePhoto: this.profileInfo.cover.id
              }, {
                headers: {
                  Authorization: 
                    `Bearer ${localStorage.getItem('jwt')}`
                }
              }).then(() => {
                console.log(this.imageId)
                this.loadingShow = false
                this.$router.push('/')
              })
            }
            catch(err) {
              this.loadingShow = false
              console.log(err)
            }
          }
          this.loadingShow = false
          this.error = true
          this.errorMsg = 'شما باید تمام فیلد ها را پُر کنید'
          window.scrollTo(0, 0)
          return;
        }
        this.loadingShow = false
        window.scrollTo(0, 0)
        return;
      } 
    },
    computed: {
      ...mapGetters(["profileInfo"])
    },
    created() {
      this.profileImage = this.profileInfo.cover
      console.log(this.profileImage)
    }
}
</script>

<style lang="scss" scoped>
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
    @media(max-width: 1100px) {
      margin-top: 2.5rem;
    }
  }

  textarea {
    font-size: 1.6rem;
    font-family: Tanha;
    margin: 2rem 0;
    resize: none;
    padding: 2rem;
    width: 75%;
    height: 20rem;

    &:focus {
      outline: none;
    }
  }

  .button-inactive {
    pointer-events: none !important;
    cursor: none !important;
    background-color: rgba(128, 128, 128, 0.5) !important;
  }

  .router-button {
    transition: 0.5s ease-in-out all;
    cursor: pointer;
    align-self: center;
    font-size: 1.6rem;
    border-radius: 1.2rem;
    padding: 1.2rem 2.6rem;
    color: #fff;
    background-color: #303030;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;
    @media(max-width: 1100px) {
      display: block;
    }

    input:nth-child(1) {
      min-width: 30rem;
      margin-left: 3rem;
    }

    input {
      font-family: Tanha;
      font-size: 1.6rem;
      transition: 0.5s ease-in-out all;
      padding: 1rem .4rem;
      border: none;
      border-bottom: 1px solid #303030;
     
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
        @media(max-width: 1100px) {
          box-shadow: none;
        }
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 3rem;
      position: relative;
      display: flex;
      justify-content: space-evenly;

      @media(max-width: 1100px) {
        flex-direction: column;
        width: 50%;
      }

      input {
        display: none;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }

  //*** Error Styling ***//
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    margin-bottom: 1.2rem;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }
}
</style>