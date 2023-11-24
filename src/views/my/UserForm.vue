<template>
  <div class="wrapper">
    <div class="top">
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="top__icon" @click="handleBackClick" />
      <p class="top__title">編輯使用者資訊</p>
      <div class="top__save" @click="handleSaveClick">保存</div>
    </div>
    <div class="info">
      <form class="info__list">
        <div class="info__name">
          <label for="">名字 :</label>
          <input type="text" name="name" v-model="info.name" />
        </div>
        <div class="info__img">
          <label class="upload-label" for="fileInput">
            <p>圖片：點擊圖片上傳</p>
            <img v-if="info.image" :src="info.image" />
          </label>
          <input type="file" name="image" id="fileInput" accept="image/*" @change="handleFileChange" style="display:none"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

export default {
  name: 'UserForm',
  setup () {
    const store = useStore()
    const info = reactive({
      id: '',
      name: '',
      image: ''
    })
    const handleBackClick = () => {
      router.back()
    }

    const handleFileChange = (e) => {
      const { files } = e.target

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        info.image = ''
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0])
        info.image = imageURL
      }
    }

    const handleSaveClick = async (event) => {
      // 找到最近的父級 form 元素
      const form = document.querySelector('form')
      const formData = new FormData(form)
      for (const [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
      await store.dispatch('putUserInfoData', {
        formData
      })
      router.back()
    }
    onMounted(() => {
      const data = store.state.user
      info.id = data.id
      info.name = data.name
      info.image = data.image
    })
    return { handleBackClick, handleSaveClick, info, handleFileChange }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #F1F1F1;

  .top {
    position: relative;
    padding: 0 .18rem;
    margin-bottom: .12rem;
    display: flex;
    font-size: .16rem;
    line-height: .44rem;
    color: #333;
    background: #FFF;

    &__icon {
      position: absolute;
      top: .14rem;
      color: $search-fontColor;
    }

    &__title {
      margin: auto;
    }

    &__save {
      color: $content-fontcolor;
    }
  }

  .info {
    &__list {
      padding: 0 .18rem;
      font-size: .14rem;
      line-height: .44rem;
      list-style: none;
      background: #FFF;
    }
    &__img {
      display: flex;
      flex-direction:column;
      justify-content: top;
    }
    img {
      margin-top: .1rem;
      height:1rem;
      width:1rem;
      border-radius: 50%;
    }

    div {
      display: flex;
      border-bottom: solid #F1F1F1;

      label {
        font-size: 14px;
        color: #666666;
      }

      input {
        flex: 1;
        padding: .05rem;
        font-size: 14px;
        color: #151515;
        line-height: 20px;
        outline: none;
        border: none;
      }
    }
  }
}
</style>
