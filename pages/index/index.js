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
    foodList: [],
    filteredFoodList: []
  },
  onLoad() {
    const app = getApp();
    const foodList = app.globalData.foodList || [];
    this.setData({ 
      foodList,
      filteredFoodList: foodList
    });
  },
  onShow() {
    // 每次显示页面时重新获取数据，确保数据同步
    const app = getApp();
    const foodList = app.globalData.foodList || [];
    let filtered = foodList;
    if (this.data.currentTab > 0) {
      const category = this.data.categories[this.data.currentTab].name;
      filtered = foodList.filter(f => f.category === category);
    }
    this.setData({ 
      foodList,
      filteredFoodList: filtered
    });
  },
  onTabChange(e) {
    const idx = e.currentTarget.dataset.index;
    let filtered = this.data.foodList;
    if (idx > 0) {
      const category = this.data.categories[idx].name;
      filtered = this.data.foodList.filter(f => f.category === category);
    }
    this.setData({ 
      currentTab: idx, 
      filteredFoodList: filtered 
    });
  },
  onFoodTap(e) {
    const index = e.currentTarget.dataset.index;
    const realIndex = this.data.foodList.findIndex(food => 
      food.name === this.data.filteredFoodList[index].name
    );
    wx.navigateTo({
      url: `/pages/detail/detail?index=${realIndex}`
    });
  }
}); 