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
    progressTextMap: {
      'none': '未排敏',
      'ongoing': '正在排敏',
      'completed': '已排敏'
    },
    likeTextMap: {
      '1': '😫',
      '2': '😕',
      '3': '😐',
      '4': '🙂',
      '5': '😋'
    },
    sortOption: 'pinyin', // 'pinyin', 'like-asc', 'like-desc'
    showFilterPopup: false,
    showSortPopup: false,
    // 常用汉字的完整拼音映射表（基于实际使用的食物名称）
    pinyinMap: {
      '芦': 'lu', '笋': 'sun', '甜': 'tian', '菜': 'cai', '彩': 'cai', '椒': 'jiao', '西': 'xi', '兰': 'lan', 
      '花': 'hua', '南': 'nan', '瓜': 'gua', '胡': 'hu', '萝': 'luo', '卜': 'bo', '芹': 'qin', '玉': 'yu', 
      '米': 'mi', '黄': 'huang', '茄': 'qie', '子': 'zi', '四': 'si', '季': 'ji', '豆': 'dou', '羽': 'yu', 
      '衣': 'yi', '甘': 'gan', '蓝': 'lan', '芋': 'yu', '头': 'tou', '蘑': 'mo', '菇': 'gu', '洋': 'yang', 
      '葱': 'cong', '豌': 'wan', '土': 'tu', '红': 'hong', '薯': 'shu', '葫': 'hu', '苹': 'ping', '果': 'guo', 
      '牛': 'niu', '油': 'you', '香': 'xiang', '蕉': 'jiao', '黑': 'hei', '莓': 'mei', '哈': 'ha', '密': 'mi', 
      '樱': 'ying', '桃': 'tao', '无': 'wu', '葡': 'pu', '萄': 'tao', '白': 'bai', '猕': 'mi', '猴': 'hou', 
      '柠': 'ning', '檬': 'meng', '芒': 'mang', '橙': 'cheng', '梨': 'li', '菠': 'bo', '萝': 'luo', '覆': 'fu', 
      '盆': 'pen', '草': 'cao', '大': 'da', '麦': 'mai', '面': 'mian', '包': 'bao', '燕': 'yan', '意': 'yi', 
      '藜': 'li', '饭': 'fan', '饼': 'bing', '切': 'qie', '达': 'da', '奶': 'nai', '酪': 'lao', '马': 'ma', 
      '苏': 'su', '里': 'li', '拉': 'la', '帕': 'pa', '尔': 'er', '玛': 'ma', '瑞': 'rui', '可': 'ke', 
      '酸': 'suan', '鸡': 'ji', '蛋': 'dan', '肉': 'rou', '羊': 'yang', '猪': 'zhu', '三': 'san', '文': 'wen', 
      '鱼': 'yu', '火': 'huo', '鹰': 'ying', '嘴': 'zui', '亚': 'ya', '麻': 'ma', '籽': 'zi', '腐': 'fu', 
      '九': 'jiu', '层': 'ceng', '塔': 'ta', '桂': 'gui', '蒜': 'suan', '生': 'sheng', '姜': 'jiang', '薄': 'bo', 
      '荷': 'he', '蔻': 'kou', '粉': 'fen', '欧': 'ou', '迷': 'mi', '迭': 'die', '山': 'shan', '药': 'yao', 
      '紫': 'zi', '鳕': 'xue', '条': 'tiao'
    }
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
  // 获取中文字符的完整拼音
  getPinyin(char) {
    // 先查映射表
    const pinyinMap = this.data.pinyinMap;
    if (pinyinMap && pinyinMap[char]) {
      return pinyinMap[char];
    }
    // 如果不是中文字符，返回原字符的小写
    const code = char.charCodeAt(0);
    if (code < 0x4e00 || code > 0x9fff) {
      return char.toLowerCase();
    }
    // 如果是中文字符但不在映射表中，返回 'zzz' 放在最后
    return 'zzz';
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
          // 使用自定义的拼音排序方法，按完整拼音排序
          const nameA = a.name || '';
          const nameB = b.name || '';
          const len = Math.max(nameA.length, nameB.length);
          
          // 逐字符比较完整拼音
          for (let i = 0; i < len; i++) {
            const charA = nameA[i] || '';
            const charB = nameB[i] || '';
            const pinyinA = this.getPinyin(charA);
            const pinyinB = this.getPinyin(charB);
            
            // 比较完整拼音（字符串比较会自动按字母顺序）
            if (pinyinA < pinyinB) return -1;
            if (pinyinA > pinyinB) return 1;
            
            // 如果完整拼音相同，继续比较下一个字符
          }
          
          // 如果所有字符的拼音都相同，按原字符串长度排序（短的在前面）
          if (nameA.length < nameB.length) return -1;
          if (nameA.length > nameB.length) return 1;
          
          return 0;
        case 'en':
          try {
            return (a.en || '').localeCompare(b.en || '', 'en');
          } catch (e) {
            return (a.en || '') < (b.en || '') ? -1 : ((a.en || '') > (b.en || '') ? 1 : 0);
          }
        case 'progress-desc':
          return (b.progress || 0) - (a.progress || 0);
        case 'like-desc':
          return (b.likeLevel || 0) - (a.likeLevel || 0);
        default:
          return 0;
      }
    });

    this.setData({ filteredFoodList: filtered });
  },
  clearFilter(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      [`filterOptions.${type}`]: 'all',
      [`tempFilterOptions.${type}`]: 'all'
    });
    this.updateFilteredList();
  }
}); 