Page({
  data: {
    food: {
      name: '', en: '', emoji: '', progress: 0, like: '😄', remark: ''
    },
    likeList: ['😭','😟','😐','🙂','😄']
  },
  onLoad(options) {
    // 简单模拟：从全局或本地获取数据，实际可用全局变量或storage
    const idx = options.index || 0;
    const app = getApp();
    let foodList = app.globalData && app.globalData.foodList ? app.globalData.foodList : [
      { name: '苹果', en: 'Apple', emoji: '🍎', progress: 2, like: '😄', remark: '' },
      { name: '鸡蛋', en: 'Egg', emoji: '🥚', progress: 1, like: '😐', remark: '' }
    ];
    this.setData({ food: { ...foodList[idx], idx: Number(idx) } });
  },
  onLikeSelect(e) {
    this.setData({ 'food.like': e.currentTarget.dataset.like });
  },
  onRemarkInput(e) {
    this.setData({ 'food.remark': e.detail.value });
  },
  onBack() {
    wx.navigateBack({ delta: 1 });
  },
  onSave() {
    // 实际应保存到全局或storage
    wx.reLaunch({ url: '/pages/index/index' });
  }
}); 