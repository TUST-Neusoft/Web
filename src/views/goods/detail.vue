<template>
  <div style="padding: 0 15vw;">
    <el-container>
      <el-aside width="35%">
        <el-card :body-style="{ padding: '0px' }">
          <!-- 当前选中的图片显示 -->
          <div class="image-contain">
            <el-image :src="currentImage" fit="fill" alt="Current Product Image" class="current-image" />
          </div>
          <el-divider />
          <div class="block" style="margin-top:0px">
            <!-- 图片列表 -->
            <div class="image-list-container">
              <i class="el-icon-arrow-left" style="color: black;" @click="moveLeft" />
              <!-- 显示当前索引范围内的图片 -->
              <el-row :gutter="20">
                <el-col v-for="(imageSrc, index) in displayImages" :key="index" :span="6">
                  <el-image :src="imageSrc" fit="fill" class="image-list-item"
                    @click="selectImage(index + startIndex)" />
                </el-col>
              </el-row>
              <i class="el-icon-arrow-right" style="color: black;" @click="moveRight" />
            </div>
          </div>
        </el-card>
      </el-aside>
      <el-main style="padding:0px;margin-left: 20px;">
        <div class="product-info">
          <h2 class="product-name">{{ goods.goodsName }}</h2>
          <el-button type="primary" style="margin-right: 10px;" @click="toggleFavorite">
            <i :class="favoriteIcon" /> {{ favoriteText }}
          </el-button>
        </div>
        <p class="product-description">{{ goods.goodsIntroduce }}</p>

        <div class="product-main">
          <p class="product-price" style="margin-left:20px;">门店价格：<span
              style="color: red;font-weight: bold;font-size: 25px;">￥{{ goods.goodsPrice }}</span></p>
          <p style="color: gray;margin-left:20px;">市场价格：￥{{ market - price }}</p>
          <p style="margin-left:20px;">累计销量：{{ sales }}件</p>
          <p style="margin-left:20px;">收藏次数：{{ pickup - times }}</p>
        </div>
        <div class="control-container">
          <p style="color: gray;">选择自提点：</p>
          <el-select v-model="selectedOption" filterable placeholder="请选择" @change="handleFirstSelectChange">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="selectedSubOption" style="margin-left: 10px;" filterable placeholder="请选择">
            <el-option v-for="subOption in subOptions" :key="subOption" :label="subOption" :value="subOption" />
          </el-select>
        </div>
        <div class="control-container">
          <p style="color: gray;">购买数量：</p>
          <el-input-number v-model="num" :min="1" :max="10" label="描述文字" @change="handleChange" />
        </div>
        <el-button style="margin-top: 50px;" type="primary" icon="el-icon-shopping-cart-2"
          @click="Cartsadd">加入购物车</el-button>
      </el-main>

    </el-container>

    <el-form ref="form" :model="form" label-width="80px" class="custom-form">
      <el-tabs v-model="activeName">
        <el-tab-pane label="商品详情" style="font-size: 18px;" name="first">
          <div class="editor-content" v-html="goods.goodsContent" />
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { getDetail } from '@/api/goods'
import { addCarts } from '@/api/carts';
export default {
  name: 'Detail',
  data() {
    return {
      // 商品详情
      activeName: 'first',
      // 定义图片数组，包含所有图片的路径
      imageSources: [
        require('@/assets/404_images/milk.png'),
        require('@/assets/404_images/milk02.jpg'),
        require('@/assets/404_images/R (1).png'),
        require('@/assets/404_images/R.jpg'),
        require('@/assets/404_images/OIP.png')
      ],
      options: [
        {
          value: '选项1',
          label: '天津科技大学13公寓',
          secLabel: [401, 402, 403, 404, 405, 406]
        },
        {
          value: '选项2',
          label: '天津科技大学14公寓',
          secLabel: [501, 502, 503, 504, 505, 506]
        },
        {
          value: '选项3',
          label: '天津科技大学15公寓',
          secLabel: [601, 602, 603, 604, 605, 606]
        },
        {
          value: '选项4',
          label: '天津科技大学16公寓',
          secLabel: [701, 702, 703, 704, 705, 706]
        },
        {
          value: '选项5',
          label: '天津科技大学17公寓',
          secLabel: [801, 802, 803, 804, 805, 806]
        }
      ],
      // 选择自提点
      selectedOption: '',
      selectedSubOption: '',
      subOptions: [],
      // 当前选中的图片索引
      currentImageIndex: 0,
      // 判断商品是否收藏
      isFavorited: false,
      startIndex: 0, // 用于记录当前显示图片的起始索引
      displayCount: 4, // 每次显示的图片数量
      title: '蒙牛早餐奶原麦250ml*16',
      description: '蒙牛早餐奶原麦250ml*16',
      price: 100,
      num: 1,
      goodsNo: '',
      goods: {

      }
    }
  },
  computed: {
    currentImage() {
      return this.imageSources[this.currentImageIndex]
    },
    displayImages() {
      // 返回当前应显示的图片数组
      return this.imageSources.slice(this.startIndex, this.startIndex + this.displayCount)
    },
    isAtLeftEdge() {
      // 是否在最左侧
      return this.startIndex === 0
    },
    isAtRightEdge() {
      // 是否在最右侧
      return this.startIndex >= this.imageSources.length - this.displayCount
    },
    // 判断收藏按钮状态
    favoriteIcon() {
      return this.isFavorited ? 'el-icon-star-on' : 'el-icon-star-off'
    },
    favoriteText() {
      return this.isFavorited ? '已收藏' : '收藏'
    }
  },
  watch: {
    // 当当前选中的图片索引改变时，调整 startIndex
    currentImageIndex(newIndex) {
      this.adjustStartIndex()
    }
  },
  mounted() {
    this.getDetail()
    this.addCarts()
  },
  methods: {
    selectImage(index) {
      this.currentImageIndex = index
    },
    moveLeft() {
      if (!this.isAtLeftEdge) {
        this.startIndex = Math.max(this.startIndex - this.displayCount, 0)
      }
    },
    moveRight() {
      if (!this.isAtRightEdge) {
        this.startIndex = Math.min(this.startIndex + this.displayCount, this.imageSources.length - this.displayCount)
      }
    },
    adjustStartIndex() {
      let adjustedIndex = this.startIndex
      if (this.isAtLeftEdge) {
        adjustedIndex = 0
      } else if (this.isAtRightEdge) {
        adjustedIndex = Math.max(0, this.imageSources.length - this.displayCount)
      } else {
        adjustedIndex = Math.floor((this.currentImageIndex / this.imageSources.length) * this.displayCount)
      }
      this.startIndex = adjustedIndex
    },
    // 第一个选择器的变化处理
    handleFirstSelectChange(value) {
      const selectedOption = this.options.find(option => option.value === value)
      this.subOptions = selectedOption ? selectedOption.secLabel : []
      this.selectedSubOption = '' // 重置第二个选择器的值
    },
    // 购买数量
    handleChange(value) {
      console.log(value)
    },
    // 收藏按钮点击函数
    toggleFavorite() {
      this.isFavorited = !this.isFavorited
    },
    async Cartsadd() {
      const response = await addCarts(this.goodsNo, this.storeNo, this.num);
      if (response.code === 0) {
        this.$message.success('成功添加购物车'),
        this.num=1;
      }
    },
    async getDetail() {
      this.goodsNo = this.$route.query.goodsNo
      const response = await getDetail(this.goodsNo)
      this.goods = response.data
    }
  }
}
</script>

<style scoped>
.el-aside {
  color: #333;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 100px;
  margin-top: 50px;
}

.el-main {
  margin-top: 50px;
  width: 65%;
}

body>.el-container {
  margin-bottom: 40px;
}

.image-list-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  overflow-x: auto;
  white-space: nowrap;
}

.image-list-item {
  width: 100%;
  height: 100px;
  cursor: pointer;
}

.image-list-container::-webkit-scrollbar {
  display: none;
}

.image-contain {
  width: 600px;
  height: 600px;
}

.current-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name {
  margin-top: 0px;
}

.product-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-description {
  color: gray;
  margin-top: 0px;
}

.product-main {
  margin-top: 40px;
  background-color: rgb(250, 242, 242);
  padding: 20px;
  margin-right: 20px
}

.control-container {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.custom-form {
  border: 1px solid #ccc;
  border-radius: 2px;
  margin-left: 100px;
  margin-top: 20px;
  margin-right: 20px;
  padding: 10px;
}
</style>
