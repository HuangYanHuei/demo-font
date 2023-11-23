<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <CheckPart />
  </div>
</template>

<script>
import TopArea from './TopArea'
import ProductList from './ProductList'
import CheckPart from './CheckPart'

export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductList, CheckPart }
}
</script>

<style lang="scss" scoped>
.wrapper {
  // 用於撐開整個元素
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #eee;
}
</style>
