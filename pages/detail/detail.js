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
    const progressList = this.data.food.progressList;

    // 检查是否可以编辑当前记录
    if (idx > 0) {
      // 检查前一条记录是否已填写
      const prevRecord = progressList[idx - 1];
      if (!prevRecord.status || !prevRecord.date) {
        wx.showToast({
          title: '请先完成前一次记录',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }

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
    
    // 检查是否可以编辑当前记录
    if (index > 0) {
      // 检查前一条记录是否已填写
      const prevRecord = progressList[index - 1];
      if (!prevRecord.status || !prevRecord.date) {
        wx.showToast({
          title: '请先完成前一次记录',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }
    
    // 如果是第一次选择状态，自动添加当前日期
    if (!progressList[index].date) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // 检查是否与前一次记录同一天
      if (index > 0) {
        const prevDate = new Date(progressList[index - 1].date);
        prevDate.setHours(0, 0, 0, 0);
        if (today.getTime() === prevDate.getTime()) {
          wx.showToast({
            title: '不能与之前记录同一天',
            icon: 'none',
            duration: 2000
          });
          return;
        }
      }
      
      const dateStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}`;
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
    
    // 检查是否是未来日期
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 设置为当天的开始时间
    
    if (selectedDate > today) {
      wx.showToast({
        title: '不能选择未来日期',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    let progressList = this.data.food.progressList.slice();
    
    // 检查与之前记录的时间关系
    if (idx > 0) {
      const prevDate = new Date(progressList[idx - 1].date);
      prevDate.setHours(0, 0, 0, 0);
      if (selectedDate.getTime() === prevDate.getTime()) {
        wx.showToast({
          title: '不能与之前记录同一天',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (selectedDate < prevDate) {
        wx.showToast({
          title: '必须晚于前一次记录时间',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }
    
    // 检查与之后记录的时间关系
    if (idx < progressList.length - 1 && progressList[idx + 1].date) {
      const nextDate = new Date(progressList[idx + 1].date);
      nextDate.setHours(0, 0, 0, 0);
      if (selectedDate.getTime() === nextDate.getTime()) {
        wx.showToast({
          title: '不能与之后记录同一天',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (selectedDate > nextDate) {
        wx.showToast({
          title: '必须早于后一次记录时间',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }
    
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