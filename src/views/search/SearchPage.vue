<!--  -->
<template>
  <div class="wrapper">
    <div class="search">
      <font-awesome-icon class="search__icon" icon="fa-solid fa-magnifying-glass"/>
      <input
      class="search__area"
      @change="handleSearchChange"
      v-model="searchValue"
      />
      <div
      class="search__cancel" @click="handleSearchCancelClick"
      >取消
      </div>
    </div>
    <div class="list-area" v-if="history.length">
      <h2 class="list-area__title">搜尋歷史</h2>
      <div
      class="list-area__delete"
      @click="handleClearHistoryClick"
      >清除搜索歷史
    </div>
    </div>
    <ul class="list-name">
      <li
        class="list-name__detail"
        v-for="item in history"
        :key="item"
        @click="handleHistoryClick(item)"
        >{{ item }}
      </li>
    </ul>
    <div class="list-area">
      <h2 class="list-area__title">熱門搜索</h2>
    </div>
    <ul class="list-name">
      <li
      class="list-name__detail"
      v-for="item in hotWordList"
      :key="item"
      @click="handleHistoryClick(item)"
      >{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'SearchPage',
  setup () {
    const router = useRouter()
    const history = ref(JSON.parse(localStorage.history || '[]'))
    const searchValue = ref('')
    // 輸入搜索內容後執行的操作
    const handleSearchChange = (e) => {
      searchValue.value = (e.target.value).trim()
      if (!searchValue.value) return
      const hasValue = history.value.find(item => item === searchValue.value)
      if (!hasValue) {
        history.value.push(searchValue.value)
        localStorage.history = JSON.stringify(history.value)
      }
      router.push(`/searchList?keyword=${searchValue.value}`)
      searchValue.value = ''
    }

    // 刪除所有歷史紀錄
    const handleClearHistoryClick = () => {
      history.value = []
      // localStorage.removeItem('history')
      localStorage.history = JSON.stringify([])
    }

    // 按下歷史搜索邏輯 && 按下熱門搜索邏輯
    const handleHistoryClick = (item) => {
      router.push(`/searchList?keyword=${item}`)
    }

    // 取消搜索
    const handleSearchCancelClick = () => {
      router.back()
    }

    return { handleSearchChange, history, handleClearHistoryClick, searchValue, handleHistoryClick, handleSearchCancelClick }
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
  margin: .16rem .18rem 0 .18rem;
  .search {
    position: relative;
    display: flex;
    line-height: .32rem;
    &__icon {
      position: absolute;
      top: .08rem;
      left: .16rem;
      font-size: .16rem;
      color: $search-fontColor;
    }
    &__area {
      flex:1;
      padding: 0 .12rem 0 .44rem;
      font-size: .14rem;
      color: $content-fontcolor;
      background: $search-bgColor;
      border-radius: .16rem;
      border: none;
      outline: none;
    }
    &__cancel {
      margin-left: .12rem;
      color: $content-fontcolor;
      font-size: .16rem;
    }
  }
  .list-area {
    display: flex;
    margin-top: .24rem;
    line-height: .22rem;
    color: $content-fontcolor;
    &__title {
      font-size: .16rem;
    }
    &__delete {
      margin-left: auto;
      font-size: .14rem;
    }
  }
  .list-name {
    display: flex;
    flex-wrap: wrap;
    &__detail {
      margin: .12rem .1rem 0 .1rem;
      padding: .08rem .1rem;
      font-size: .14rem;
      line-height: .16rem;
      color: $medium-fontColor;
      background: $search-bgColor;
      border-radius: .02rem;
      list-style: none;
    }
  }
}
</style>
