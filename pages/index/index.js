Page({
  data: {
    categories: [
      { name: '全部', emoji: '🔎' },
      { name: '蔬菜', emoji: '🥦' },
      { name: '水果', emoji: '🍎' },
      { name: '肉类', emoji: '🍖' },
      { name: '谷物', emoji: '🌾' },
      { name: '蛋奶', emoji: '🥚' },
      { name: '香料', emoji: '🌿' },
      { name: '豆类', emoji: '🫘' },
    ],
    currentTab: 0,
    foodList: [
      { name: '苹果', en: 'Apple', emoji: '🍎', category: '水果', progress: 2, like: '😄' },
      { name: '鸡蛋', en: 'Egg', emoji: '🥚', category: '蛋奶', progress: 1, like: '😐' },
      // ...更多食物
    ],
    allFoodList: []
  },
  onLoad() {
    const app = getApp();
    const allFood = app.globalData.foodList || [];
    this.setData({ allFoodList: allFood, foodList: allFood });
  },
  onTabChange(e) {
    const idx = e.currentTarget.dataset.index;
    let filtered = this.data.allFoodList;
    if (idx > 0) {
      const cat = this.data.categories[idx].name;
      filtered = this.data.allFoodList.filter(f => f.category === cat);
    }
    this.setData({ currentTab: idx, foodList: filtered });
  },
  onFoodTap(e) {
    const idx = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + idx
    });
  }
}); 