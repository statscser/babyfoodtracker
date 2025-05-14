Page({
  data: {
    food: {
      name: '', en: '', emoji: '', progressList: [
        { checked: false, date: '' },
        { checked: false, date: '' },
        { checked: false, date: '' }
      ], like: '😄', remark: ''
    },
    likeList: ['😭','😟','😐','🙂','😄'],
    pickerDate: '',
    pickerIndex: null
  },
  onLoad(options) {
    // 简单模拟：从全局或本地获取数据，实际可用全局变量或storage
    const idx = options.index || 0;
    const app = getApp();
    let foodList = app.globalData && app.globalData.foodList ? app.globalData.foodList : [
      { name: '苹果', en: 'Apple', emoji: '🍎', progress: 2, like: '😄', remark: '' },
      { name: '鸡蛋', en: 'Egg', emoji: '🥚', progress: 1, like: '😐', remark: '' }
    ];
    let food = foodList[idx] || {};
    // 兼容老数据
    if (!food.progressList) {
      let arr = [false, false, false].map((_, i) => ({ checked: food.progress > i, date: '' }));
      food.progressList = arr;
    }
    this.setData({ food: { ...food, idx: Number(idx) } });
  },
  onTrackCheck(e) {
    const idx = e.currentTarget.dataset.index;
    let progressList = this.data.food.progressList.slice();
    const checked = e.detail.value;  // 直接使用checkbox的值
    progressList[idx].checked = checked;
    if (checked) {
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}`;
      progressList[idx].date = dateStr;
    } else {
      progressList[idx].date = '';
    }
    this.setData({ 'food.progressList': progressList });
  },
  onDateTap(e) {
    const idx = e.currentTarget.dataset.index;
    this.setData({ pickerIndex: idx, pickerDate: this.data.food.progressList[idx].date || '' });
    // 显示日期选择器
    this.selectComponent('#datePicker').show();
  },
  onDateChange(e) {
    const idx = e.currentTarget.dataset.index;
    const date = e.detail.value;
    let progressList = this.data.food.progressList.slice();
    progressList[idx].date = date;
    progressList[idx].checked = true;
    this.setData({ 'food.progressList': progressList });
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