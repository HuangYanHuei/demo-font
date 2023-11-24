<template>
  <div id="slide" @mouseover="stopInterval" @mouseout="startInterval">
    <img
    v-for="val in items"
    :key="val"
    :src="require(`../assets/banner/${val}.png`)"
    :class="{ 'show': val === currentItem }"
    />
    <a class="prev" @click="showPrev"></a>
    <a class="next" @click="showNext"></a>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup () {
    const counter = ref(0)
    const items = [701, 702, 703]
    const itemsCount = items.length
    const currentItem = ref(701)
    const timer = 4000
    let interval

    const showCurrent = () => {
      const itemToShow = Math.abs(counter.value % itemsCount)
      currentItem.value = items[itemToShow]
    }

    const showNext = () => {
      counter.value++
      showCurrent()
    }

    const showPrev = () => {
      counter.value--
      showCurrent()
    }

    const stopInterval = () => {
      clearInterval(interval)
    }

    const startInterval = () => {
      interval = setInterval(showNext, timer)
    }

    onMounted(() => {
      startInterval()
    })

    return {
      currentItem,
      stopInterval,
      startInterval,
      showPrev,
      showNext,
      items
    }
  }
}
</script>

<style scoped>
#slide {
  position: relative;
  max-width: 3.5rem;
}

#slide img {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 1.2rem;
  opacity: 0;
  visibility: hidden;
  transition: 0.8s;
}

#slide img:first-child {
  position: static;
}

#slide img.show {
  opacity: 1;
  visibility: visible;
}

#slide .prev,
#slide .next {
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: 0.4s;
  background-color: rgba(0, 0, 0, 0.12);
  padding: .14rem .12rem;
}

#slide .next {
  right: 0;
}

#slide .prev:hover,
#slide .next:hover {
  background-color: rgba(0, 0, 0, 0.24);
}

#slide .prev:after,
#slide .next:after {
  display: block;
  content: "";
  width: .1rem;
  height: .1rem;
  border-top: .02rem solid #fff;
  border-right: .02rem solid #fff;
}

#slide .prev:after {
  transform: rotate(-135deg);
  margin-left: .04rem;
}

#slide .next:after {
  transform: rotate(45deg);
  margin-right: .04rem;
}
</style>
