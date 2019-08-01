<template>
  <div class="item-draw">
    <div class="num" v-for="(item, index) in nums" :key="index">{{item}}</div>
  </div>
</template>

<script>
/**
 * @Describe: Describe
 * @Author: liuyang
 * @Date: 2019-08-01 14:20
 */
export default {
  name: "ItemDraw",
  props: {
    result: Array
  },
  data () {
    return {
      nums: [0, 0, 0, 0],
      timer: null
    };
  },
  methods: {
    run () {
      cancelAnimationFrame(this.timer);
      this.timer = requestAnimationFrame(() => {
        this.getNums();
        this.run();
      });
    },
    stop () {
      cancelAnimationFrame(this.timer);
      this.nums = this.result;
    },
    reset () {
      this.nums = [0, 0, 0, 0];
    },
    getNums () {
      this.nums = Array.from({ length: 4 }).map(() => {
        return ~~(Math.random() * 10);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.item-draw {
  display: flex;
  background: #fff;
  padding: 0 10px;
  border-radius: 4px;
  border: 2px solid #000;
}

.num {
  font-size: 40px;
  font-weight: bold;
  width: 40px;
  text-align: center;
}
</style>
