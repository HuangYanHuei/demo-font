<template>
  <div class="wrapper">
    <StaticPart />
    <NearbyPart />
  </div>
  <DockerPart />
</template>
<script>
import StaticPart from './StaticPart.vue'
import NearbyPart from './NearbyPart.vue'
import DockerPart from './DockerPart.vue'
export default {
  name: 'HomePage',
  components: { StaticPart, NearbyPart, DockerPart }
}
</script>
<style lang="scss" scoped>
.wrapper {
  //overflow-y:auto;捲軸
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  //.1rem為了讓捲軸捲到最下面項目不要太貼docker
  padding: 0 .18rem .1rem .18rem;
}
</style>
