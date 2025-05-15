Page({
  data: {
    food: {
      name: '', en: '', emoji: '', progressList: [
        { status: '', date: '' },
        { status: '', date: '' },
        { status: '', date: '' }
      ], like: null, likeLevel: null, remark: ''
    },
    likeList: [
      { emoji: '😭', level: 1 },
      { emoji: '😟', level: 2 },
      { emoji: '😐', level: 3 },
      { emoji: '🙂', level: 4 },
      { emoji: '😄', level: 5 }
    ],
    currentTrackIndex: null
  },
  onLoad(options) {
    const idx = options.index || 0;
    const app = getApp();
    let foodList = app.globalData && app.globalData.foodList ? app.globalData.foodList : [];
    let food = foodList[idx] || {};
    
    // 兼容老数据
    if (!food.progressList) {
      let arr = [false, false, false].map((_, i) => ({ status: '', date: '' }));
      food.progressList = arr;
    }
    // 兼容老数据：如果只有like没有likeLevel，根据like找到对应的level
    if (food.like && !food.likeLevel) {
      const likeItem = this.data.likeList.find(item => item.emoji === food.like);
      if (likeItem) {
        food.likeLevel = likeItem.level;
      }
    }
    this.setData({ food: { ...food, idx: Number(idx) } });
  },
  onTrackTap(e) {
    const idx = e.currentTarget.dataset.index;
    // 如果点击的是当前打开的选项，则关闭它
    if (this.data.currentTrackIndex === idx) {
      this.setData({ currentTrackIndex: null });
    } else {
      this.setData({ currentTrackIndex: idx });
    }
  },
  onStatusSelect(e) {
    const { status, index } = e.currentTarget.dataset;
    let progressList = this.data.food.progressList.slice();
    
    // 如果是第一次选择状态，自动添加当前日期
    if (!progressList[index].date) {
      const now = new Date();
      const dateStr = `${now.getFullYear()}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getDate().toString().padStart(2,'0')}`;
      progressList[index].date = dateStr;
    }
    
    progressList[index].status = status;
    this.setData({
      'food.progressList': progressList,
      currentTrackIndex: null
    });
  },
  onMaskTap() {
    this.setData({ currentTrackIndex: null });
  },
  catchTap() {
    // 阻止事件冒泡，防止点击选项时触发遮罩的点击事件
    return;
  },
  onDateChange(e) {
    const idx = e.currentTarget.dataset.index;
    const date = e.detail.value;
    let progressList = this.data.food.progressList.slice();
    progressList[idx].date = date;
    this.setData({ 'food.progressList': progressList });
  },
  onLikeSelect(e) {
    const { emoji, level } = e.currentTarget.dataset;
    this.setData({ 
      'food.like': emoji,
      'food.likeLevel': level
    });
  },
  onRemarkInput(e) {
    this.setData({ 'food.remark': e.detail.value });
  },
  onBack() {
    wx.navigateBack({ delta: 1 });
  },
  onSave() {
    const app = getApp();
    const idx = this.data.food.idx;
    const food = this.data.food;
    
    // 计算进度（有状态且有日期的次数）
    const progress = food.progressList.filter(p => p.status && p.date).length;
    
    // 更新全局数据
    if (app.globalData && app.globalData.foodList) {
      app.globalData.foodList[idx] = {
        ...app.globalData.foodList[idx],
        progressList: food.progressList,
        progress,
        like: food.like,
        likeLevel: food.likeLevel,
        remark: food.remark
      };
    }
    
    wx.reLaunch({ url: '/pages/index/index' });
  }
}); 