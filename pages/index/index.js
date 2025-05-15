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
    filteredFoodList: [],
    searchText: '',
    filterOptions: {
      progress: 'all', // 'all', 'none', 'ongoing', 'completed'
      like: 'all' // 'all', '1', '2', '3', '4', '5'
    },
    tempFilterOptions: {
      progress: 'all',
      like: 'all'
    },
    sortOption: 'pinyin', // 'pinyin', 'like-asc', 'like-desc'
    showFilterPopup: false,
    showSortPopup: false
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
    this.setData({ foodList });
    this.updateFilteredList();
  },
  onTabChange(e) {
    const idx = e.currentTarget.dataset.index;
    this.setData({ currentTab: idx });
    this.updateFilteredList();
  },
  onFoodTap(e) {
    const index = e.currentTarget.dataset.index;
    const realIndex = this.data.foodList.findIndex(food => 
      food.name === this.data.filteredFoodList[index].name
    );
    wx.navigateTo({
      url: `/pages/detail/detail?index=${realIndex}`
    });
  },
  onSearchInput(e) {
    const searchText = e.detail.value;
    this.setData({ searchText });
    this.updateFilteredList();
  },
  clearSearch() {
    this.setData({ searchText: '' });
    this.updateFilteredList();
  },
  showFilterPopup() {
    this.setData({
      showFilterPopup: true,
      tempFilterOptions: JSON.parse(JSON.stringify(this.data.filterOptions))
    });
  },
  showSortPopup() {
    this.setData({ showSortPopup: true });
  },
  hideFilterPopup() {
    this.setData({ showFilterPopup: false });
  },
  hideSortPopup() {
    this.setData({ showSortPopup: false });
  },
  stopPropagation() {
    // 阻止事件冒泡
    return;
  },
  onFilterChange(e) {
    const { type, value } = e.currentTarget.dataset;
    this.setData({
      [`tempFilterOptions.${type}`]: value
    });
  },
  resetFilter() {
    this.setData({
      tempFilterOptions: {
        progress: 'all',
        like: 'all'
      }
    });
  },
  applyFilter() {
    this.setData({
      filterOptions: JSON.parse(JSON.stringify(this.data.tempFilterOptions)),
      showFilterPopup: false
    });
    this.updateFilteredList();
  },
  onSortChange(e) {
    const sortOption = e.currentTarget.dataset.value;
    this.setData({ sortOption });
    this.updateFilteredList();
    this.hideSortPopup();
  },
  updateFilteredList() {
    let filtered = this.data.foodList;

    // 调试：打印第一个食物的数据结构
    if (filtered.length > 0) {
      console.log('First food item:', filtered[0]);
      console.log('Like value type:', typeof filtered[0].like);
      console.log('Like value:', filtered[0].like);
    }

    // 应用分类筛选
    if (this.data.currentTab > 0) {
      const category = this.data.categories[this.data.currentTab].name;
      filtered = filtered.filter(f => f.category === category);
    }

    // 应用搜索筛选
    if (this.data.searchText) {
      const searchText = this.data.searchText.toLowerCase();
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(searchText) || 
        f.en.toLowerCase().includes(searchText)
      );
    }

    // 应用进度筛选
    if (this.data.filterOptions.progress !== 'all') {
      filtered = filtered.filter(f => {
        const progress = f.progress || 0;

        switch (this.data.filterOptions.progress) {
          case 'none': 
            return progress === 0; // 没有任何排敏记录
          case 'ongoing': 
            return progress === 1 || progress === 2; // 有1-2次记录
          case 'completed': 
            return progress === 3; // 有3次记录
          default: 
            return true;
        }
      });
    }

    // 应用喜好筛选
    if (this.data.filterOptions.like !== 'all') {
      const likeLevel = parseInt(this.data.filterOptions.like);
      filtered = filtered.filter(f => {
        // 获取食物的喜好等级（数字）
        const foodLikeLevel = f.likeLevel; // 使用数字等级进行筛选
        return foodLikeLevel === likeLevel;
      });
    }

    // 应用排序
    filtered.sort((a, b) => {
      switch (this.data.sortOption) {
        case 'pinyin':
          return a.name.localeCompare(b.name, 'zh-CN');
        case 'en':
          return (a.en || '').localeCompare(b.en || '', 'en');
        case 'progress-desc':
          return (b.progress || 0) - (a.progress || 0);
        case 'like-desc':
          return (b.likeLevel || 0) - (a.likeLevel || 0);
        default:
          return 0;
      }
    });

    this.setData({ filteredFoodList: filtered });
  }
}); 