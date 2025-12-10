App({
  onLaunch() {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    // 检查登录状态
    this.checkLogin();
  },

  // 检查用户登录状态
  async checkLogin() {
    try {
      // 检查本地存储的登录状态
      const loginInfo = wx.getStorageSync('loginInfo');
      if (loginInfo && loginInfo.isLoggedIn) {
        this.globalData.userInfo = loginInfo.userInfo;
        this.globalData.isLoggedIn = true;
        return;
      }

      // 检查是否已授权（兼容旧版本）
      const setting = await wx.getSetting();
      if (setting.authSetting['scope.userInfo']) {
        try {
          const userInfo = await wx.getUserInfo();
          this.globalData.userInfo = userInfo.userInfo;
          this.globalData.isLoggedIn = true;
          // 保存登录状态
          wx.setStorageSync('loginInfo', {
            isLoggedIn: true,
            userInfo: userInfo.userInfo
          });
        } catch (err) {
          // getUserInfo 已废弃，需要用户重新授权
          this.globalData.isLoggedIn = false;
        }
      } else {
        this.globalData.isLoggedIn = false;
      }
    } catch (err) {
      console.error('检查登录状态失败:', err);
      this.globalData.isLoggedIn = false;
    }
  },

  // 用户登录
  async login() {
    try {
      // 获取用户信息授权（使用新的 getUserProfile API）
      const res = await wx.getUserProfile({
        desc: '用于保存您的食物记录'
      });
      
      this.globalData.userInfo = res.userInfo;
      this.globalData.isLoggedIn = true;

      // 保存登录状态到本地存储
      wx.setStorageSync('loginInfo', {
        isLoggedIn: true,
        userInfo: res.userInfo
      });

      // 初始化食物数据（如果还没有）
      await this.initCloudData();

      return true;
    } catch (err) {
      console.error('登录失败:', err);
      if (err.errMsg && (err.errMsg.includes('getUserProfile') || err.errMsg.includes('cancel'))) {
        // 用户拒绝授权
        return false;
      }
      throw err;
    }
  },

  // 初始化云数据库数据
  async initCloudData() {
    try {
      const db = require('./utils/db.js');
      
      // 初始化食物基础数据（如果还没有）
      await db.initFoodsData(this.globalData.foodList);
      
      console.log('云数据初始化完成');
    } catch (err) {
      console.error('初始化云数据失败:', err);
    }
  },

  globalData: {
    userInfo: null,
    isLoggedIn: false,
    foodList: [
      // 蔬菜🥦
      { name: '芦笋', en: 'Asparagus', emoji: '🥦', foodEmoji: '🥬', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '甜菜', en: 'Beets', emoji: '🥦', foodEmoji: '🍠', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '彩椒', en: 'Bell Pepper', emoji: '🥦', foodEmoji: '🫑', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '西兰花', en: 'Broccoli', emoji: '🥦', foodEmoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '胡萝卜', en: 'Carrots', emoji: '🥦', foodEmoji: '🥕', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '花菜', en: 'Cauliflower', emoji: '🥦', foodEmoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '芹菜', en: 'Celery', emoji: '🥦', foodEmoji: '🥬', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '玉米', en: 'Corn', emoji: '🥦', foodEmoji: '🌽', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '黄瓜', en: 'Cucumber', emoji: '🥦', foodEmoji: '🥒', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '茄子', en: 'Eggplant', emoji: '🥦', foodEmoji: '🍆', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '四季豆', en: 'Green Beans', emoji: '🥦', foodEmoji: '🫛', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '羽衣甘蓝', en: 'Kale', emoji: '🥦', foodEmoji: '🥬', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '芋头', en: 'Taro', emoji: '🥦', foodEmoji: '🍠', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '蘑菇', en: 'Mushrooms', emoji: '🥦', foodEmoji: '🍄', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '洋葱', en: 'Onion', emoji: '🥦', foodEmoji: '🧅', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '豌豆', en: 'Peas', emoji: '🥦', foodEmoji: '🫛', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '土豆', en: 'Potato', emoji: '🥦', foodEmoji: '🥔', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '南瓜', en: 'Pumpkin', emoji: '🥦', foodEmoji: '🎃', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '红薯', en: 'Sweet Potato', emoji: '🥦', foodEmoji: '🍠', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '西葫芦', en: 'Zucchini', emoji: '🥦', foodEmoji: '🥒', category: '蔬菜', progress: 0, like: null, remark: '' },
      // 水果🍎
      { name: '苹果', en: 'Apple', emoji: '🍎', foodEmoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '牛油果', en: 'Avocado', emoji: '🍎', foodEmoji: '🥑', category: '水果', progress: 0, like: null, remark: '' },
      { name: '香蕉', en: 'Banana', emoji: '🍎', foodEmoji: '🍌', category: '水果', progress: 0, like: null, remark: '' },
      { name: '黑莓', en: 'Blackberries', emoji: '🍎', foodEmoji: '🫐', category: '水果', progress: 0, like: null, remark: '' },
      { name: '蓝莓', en: 'Blueberries', emoji: '🍎', foodEmoji: '🫐', category: '水果', progress: 0, like: null, remark: '' },
      { name: '哈密瓜', en: 'Cantaloupe', emoji: '🍎', foodEmoji: '🍈', category: '水果', progress: 0, like: null, remark: '' },
      { name: '樱桃', en: 'Cherries', emoji: '🍎', foodEmoji: '🍒', category: '水果', progress: 0, like: null, remark: '' },
      { name: '无花果', en: 'Figs', emoji: '🍎', foodEmoji: '🫒', category: '水果', progress: 0, like: null, remark: '' },
      { name: '葡萄', en: 'Grapes', emoji: '🍎', foodEmoji: '🍇', category: '水果', progress: 0, like: null, remark: '' },
      { name: '白兰瓜', en: 'Honeydew', emoji: '🍎', foodEmoji: '🍈', category: '水果', progress: 0, like: null, remark: '' },
      { name: '猕猴桃', en: 'Kiwi', emoji: '🍎', foodEmoji: '🥝', category: '水果', progress: 0, like: null, remark: '' },
      { name: '柠檬', en: 'Lemon', emoji: '🍎', foodEmoji: '🍋', category: '水果', progress: 0, like: null, remark: '' },
      { name: '芒果', en: 'Mango', emoji: '🍎', foodEmoji: '🥭', category: '水果', progress: 0, like: null, remark: '' },
      { name: '橙子', en: 'Orange', emoji: '🍎', foodEmoji: '🍊', category: '水果', progress: 0, like: null, remark: '' },
      { name: '桃子', en: 'Peach', emoji: '🍎', foodEmoji: '🍑', category: '水果', progress: 0, like: null, remark: '' },
      { name: '梨', en: 'Pear', emoji: '🍎', foodEmoji: '🍐', category: '水果', progress: 0, like: null, remark: '' },
      { name: '菠萝', en: 'Pineapple', emoji: '🍎', foodEmoji: '🍍', category: '水果', progress: 0, like: null, remark: '' },
      { name: '覆盆子', en: 'Raspberries', emoji: '🍎', foodEmoji: '🫐', category: '水果', progress: 0, like: null, remark: '' },
      { name: '草莓', en: 'Strawberries', emoji: '🍎', foodEmoji: '🍓', category: '水果', progress: 0, like: null, remark: '' },
      { name: '西瓜', en: 'Watermelon', emoji: '🍎', foodEmoji: '🍉', category: '水果', progress: 0, like: null, remark: '' },
      // 谷物🌾
      { name: '大麦', en: 'Barley', emoji: '🌾', foodEmoji: '🌾', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '面包', en: 'Bread', emoji: '🌾', foodEmoji: '🍞', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '燕麦', en: 'Oatmeal', emoji: '🌾', foodEmoji: '🌾', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '意面', en: 'Pasta', emoji: '🌾', foodEmoji: '🍝', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '藜麦', en: 'Quinoa', emoji: '🌾', foodEmoji: '🌾', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '米饭', en: 'Rice', emoji: '🌾', foodEmoji: '🍚', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '玉米饼', en: 'Tortilla', emoji: '🌾', foodEmoji: '🌮', category: '谷物', progress: 0, like: null, remark: '' },
      // 蛋奶🥚
      { name: '黄油', en: 'Butter', emoji: '🥚', foodEmoji: '🧈', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '切达奶酪', en: 'Cheddar', emoji: '🥚', foodEmoji: '🧀', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '奶酪', en: 'Cottage Cheese', emoji: '🥚', foodEmoji: '🧀', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '奶油奶酪', en: 'Cream Cheese', emoji: '🥚', foodEmoji: '🧀', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '马苏里拉', en: 'Mozzarella', emoji: '🥚', foodEmoji: '🧀', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '帕尔玛奶酪', en: 'Parmesan', emoji: '🥚', foodEmoji: '🧀', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '瑞可达', en: 'Ricotta', emoji: '🥚', foodEmoji: '🧀', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '酸奶', en: 'Yogurt', emoji: '🥚', foodEmoji: '🥛', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '鸡蛋', en: 'Egg', emoji: '🥚', foodEmoji: '🥚', category: '蛋奶', progress: 0, like: null, remark: '' },
      // 肉类🍖
      { name: '牛肉', en: 'Beef', emoji: '🍖', foodEmoji: '🥩', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '鸡肉', en: 'Chicken', emoji: '🍖', foodEmoji: '🍗', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '羊肉', en: 'Lamb', emoji: '🍖', foodEmoji: '🥩', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '猪肉', en: 'Pork', emoji: '🍖', foodEmoji: '🥩', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '三文鱼', en: 'Salmon', emoji: '🍖', foodEmoji: '🐟', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '火鸡', en: 'Turkey', emoji: '🍖', foodEmoji: '🦃', category: '肉类', progress: 0, like: null, remark: '' },
      // 豆类🫘
      { name: '黑豆', en: 'Black Beans', emoji: '🫘', foodEmoji: '🫘', category: '豆类', progress: 0, like: null, remark: '' },
      { name: '鹰嘴豆', en: 'Chickpeas', emoji: '🫘', foodEmoji: '🫘', category: '豆类', progress: 0, like: null, remark: '' },
      { name: '亚麻籽', en: 'Flaxseeds', emoji: '🫘', foodEmoji: '🌾', category: '豆类', progress: 0, like: null, remark: '' },
      { name: '豆腐', en: 'Tofu', emoji: '🫘', foodEmoji: '🧈', category: '豆类', progress: 0, like: null, remark: '' },
      // 香料��
      { name: '九层塔', en: 'Basil', emoji: '🌿', foodEmoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '肉桂', en: 'Cinnamon', emoji: '🌿', foodEmoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '大蒜', en: 'Garlic', emoji: '🌿', foodEmoji: '🧄', category: '香料', progress: 0, like: null, remark: '' },
      { name: '生姜', en: 'Ginger', emoji: '🌿', foodEmoji: '🫚', category: '香料', progress: 0, like: null, remark: '' },
      { name: '薄荷', en: 'Mint', emoji: '🌿', foodEmoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '欧芹', en: 'Parsley', emoji: '🌿', foodEmoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '迷迭香', en: 'Rosemary', emoji: '🌿', foodEmoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '姜黄', en: 'Tumeric', emoji: '🌿', foodEmoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      // 常见补充
      { name: '山药', en: 'Chinese Yam', emoji: '🥦', foodEmoji: '🍠', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '紫薯', en: 'Purple Sweet Potato', emoji: '🥦', foodEmoji: '🍠', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '鳕鱼', en: 'Cod', emoji: '🍖', foodEmoji: '🐟', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '面条', en: 'Noodles', emoji: '🌾', foodEmoji: '🍜', category: '谷物', progress: 0, like: null, remark: '' }
    ]
  }
}); 