<template>
  <p
    v-for="(item, index) in lyric"
    :key="index"
    :class="{ active: index === lineIndex }"
    class="lyric-line"
  >
    {{ item.text }}
  </p>
</template>

<script>
export default {
  props: {
    lyric: {
      type: Array,
      default: () => [],
    },
    lineIndex: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.lyric-line {
  text-align: center;
  transition: font-weight 0.3s ease-in-out, font-size 0.3s ease-in-out;
}
.active {
  font-weight: 900;
  font-size: 1.6rem;
}
</style>