<template>
  <div class="main">
    <div class="select">
      抽奖轮数：
      <el-select v-model="round" @change="handleChangeRound">
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
    <div class="special" v-for="(item, index) in supLuckArr" :result="item" :key="index">
      <div class="label">{{index ? "液晶电视机" : "智能洗衣机"}}：</div>
      <item-draw :result="item" ref="special"></item-draw>
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
import ItemDraw from "../components/ItemDraw";

const MaxNum = 1600;

export default {
  name: "FirstRound",
  components: { ItemDraw },
  data () {
    return {
      luckedArr: [[], [], []],
      round: 0,
      luckArr: Array.from({ length: 10 }),
      supLuckArr: Array.from({ length: 1 }),
      running: false
    };
  },
  methods: {
    handleChangeRound () {
      this.handleStop();
      if (this.round === 2) {
        this.supLuckArr = Array.from({ length: 2 });
      } else {
        this.supLuckArr = Array.from({ length: 1 });
      }
      this.$refs.itemDraw.forEach((item) => {
        item.reset();
      });
      this.$refs.special.forEach((item) => {
        item.reset();
      });
    },
    handleStart () {
      this.running = true;
      this.luckedArr[this.round] = [];
      this.luckArr = this.getLuckNumArr(this.luckArr.length);
      this.supLuckArr = this.getLuckNumArr(this.supLuckArr.length);
      this.$refs.itemDraw.forEach((item) => {
        item.run();
      });
      this.$refs.special.forEach((item) => {
        item.run();
      });
    },
    handleStop () {
      this.$refs.itemDraw.forEach((item) => {
        item.stop();
      });
      this.$refs.special.forEach((item) => {
        item.stop();
      });
      this.running = false;
    },
    getLuckNumArr (num) {
      let result = [];
      let current = ~~(Math.random() * MaxNum) + 1;
      for (let i = 0; i < num; i++) {
        while (this.luckedArr.some(d => d.includes(current))) {
          current = ~~(Math.random() * MaxNum) + 1;
        }
        this.luckedArr[this.round].push(current);
        result.push(current);
      }
      return result.map(d => String(d).padStart(4, "0").split(""));
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  width: 1200px;
  margin: auto;
}
.select {
  box-sizing: border-box;
  padding-top: 60px;
  padding-left: 28px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.h1 {
  padding-top: 80px;
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
  margin-top: 50px;
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
  margin-top: 80px;
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
