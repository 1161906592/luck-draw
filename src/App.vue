<template>
  <div id="app" class="main">
    <div class="select">
      抽奖轮数：
      <el-select v-model="round" @change="handleChangeRound" style="width: 184px;">
        <el-option :value="0" label="第一轮"></el-option>
        <el-option :value="1" label="第二轮"></el-option>
        <el-option :value="2" label="第三轮"></el-option>
      </el-select>
    </div>
    <div class="h1">王者生活购物卡</div>
    <div class="wrap">
      <item-draw class="item"
                 v-for="(item, index) in luckArr"
                 :result="item"
                 :key="index"
                 ref="itemDraw"></item-draw>
    </div>
    <div class="special">
      <div class="label">智能洗衣机：</div>
      <item-draw :result="washLuckArr[0]" ref="wash"></item-draw>
    </div>
    <div class="special" v-if="tvLuckArr.length">
      <div class="label">液晶电视机：</div>
      <item-draw :result="tvLuckArr[0]" ref="tv"></item-draw>
    </div>
    <div v-if="!running" class="btn" @click="handleStart">开始抽奖</div>
    <div v-else class="btn" @click="handleStop">停止抽奖</div>
  </div>
</template>

<script>
/**
 * @Describe: Describe
 * @Author: liuyang
 * @Date: 2019-08-01 14:12
 */
import ItemDraw from "./components/ItemDraw";

const MaxNum = 1600;

export default {
  name: "FirstRound",
  components: { ItemDraw },
  data () {
    return {
      luckedArr: [],
      round: 0,
      step: 0,
      luckArr: Array.from({ length: 10 }),
      washLuckArr: Array.from({ length: 1 }),
      tvLuckArr: [],
      running: false
    };
  },
  methods: {
    handleChangeRound () {
      this.$refs.itemDraw.forEach((item) => {
        item.stop();
      });
      this.$refs.wash.stop();
      this.tvLuckArr.length && this.$refs.tv.stop();

      this.step = 0;
      this.$refs.itemDraw.forEach((item) => {
        item.reset();
      });
      this.$refs.wash.reset();
      this.tvLuckArr.length && this.$refs.tv.reset();

      if (this.round === 2) {
        this.tvLuckArr = Array.from({ length: 1 });
      } else {
        this.tvLuckArr = [];
      }
    },
    handleStart () {
      if (this.running) return;
      switch (this.step) {
        case 0:
          this.luckArr = this.getLuckNumArr(this.luckArr.length);
          this.$refs.itemDraw.forEach((item) => {
            item.run();
          });
          break;
        case 1:
          this.washLuckArr = this.getLuckNumArr(this.washLuckArr.length);
          this.$refs.wash.run();
          break;
        case 2:
          if (!this.tvLuckArr.length) return;
          this.tvLuckArr = this.getLuckNumArr(this.tvLuckArr.length);
          this.$refs.tv.run();
          break;
        default:
          return;
      }
      this.running = true;
    },
    handleStop () {
      switch (this.step) {
        case 0:
          this.$refs.itemDraw.forEach((item) => {
            item.stop();
          });
          break;
        case 1:
          this.$refs.wash.stop();
          break;
        case 2:
          this.$refs.tv.stop();
          break;
      }
      this.step++;
      this.running = false;
    },
    getLuckNumArr (num) {
      let result = [];
      let current = ~~(Math.random() * MaxNum) + 1;
      for (let i = 0; i < num; i++) {
        while (this.luckedArr.includes(current)) {
          current = ~~(Math.random() * MaxNum) + 1;
        }
        this.luckedArr.push(current);
        result.push(current);
      }
      return result.map(d => String(d).padStart(4, "0").split(""));
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
}

body {
  background: url("./assets/bg.jpg") bottom center/cover;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

<style scoped lang="scss">
.main {
  width: 1200px;
  margin: auto;
}

.select {
  box-sizing: border-box;
  padding-right: 94px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.h1 {
  margin-top: 50px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.wrap {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.special {
  margin: auto;
  margin-top: 40px;
  display: flex;
  align-items: center;
  width: 444px;

  .label {
    width: 130px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
}

.item {
  margin: 20px 28px;
}

.btn {
  width: 260px;
  margin: auto;
  margin-top: 60px;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  color: #00d468;
  border: 1px solid #00d468;
  background-color: #fff;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 4px;

  &:hover {
    background-color: #00d468;
    color: #fff;
  }
}

.back {
  width: 100px;
  height: 32px;
  line-height: 32px;
  margin: auto;
  margin-top: 50px;
  background: #fff;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  color: #00d468;

  &:hover {
    background-color: #00d468;
    color: #fff;
  }
}
</style>
