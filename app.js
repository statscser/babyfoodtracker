App({
  globalData: {
    foodList: [
      // 蔬菜🥦
      { name: '芦笋', en: 'Asparagus', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '甜菜', en: 'Beets', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '彩椒', en: 'Bell Pepper', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '西兰花', en: 'Broccoli', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '南瓜', en: 'Butternut Squash', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '胡萝卜', en: 'Carrots', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '花菜', en: 'Cauliflower', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '芹菜', en: 'Celery', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '玉米', en: 'Corn', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '黄瓜', en: 'Cucumber', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '茄子', en: 'Eggplant', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '四季豆', en: 'Green Beans', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '羽衣甘蓝', en: 'Kale', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '芋头', en: 'Taro', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '蘑菇', en: 'Mushrooms', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '洋葱', en: 'Onion', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '豌豆', en: 'Peas', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '土豆', en: 'Potato', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '南瓜', en: 'Pumpkin', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '红薯', en: 'Sweet Potato', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '西葫芦', en: 'Zucchini', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      // 水果🍎
      { name: '苹果', en: 'Apple', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '牛油果', en: 'Avocado', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '香蕉', en: 'Banana', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '黑莓', en: 'Blackberries', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '蓝莓', en: 'Blueberries', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '哈密瓜', en: 'Cantaloupe', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '樱桃', en: 'Cherries', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '无花果', en: 'Figs', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '葡萄', en: 'Grapes', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '白兰瓜', en: 'Honeydew', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '猕猴桃', en: 'Kiwi', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '柠檬', en: 'Lemon', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '芒果', en: 'Mango', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '橙子', en: 'Orange', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '桃子', en: 'Peach', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '梨', en: 'Pear', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '菠萝', en: 'Pineapple', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '覆盆子', en: 'Raspberries', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '草莓', en: 'Strawberries', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      { name: '西瓜', en: 'Watermelon', emoji: '🍎', category: '水果', progress: 0, like: null, remark: '' },
      // 谷物🌾
      { name: '大麦', en: 'Barley', emoji: '🌾', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '面包', en: 'Bread', emoji: '🌾', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '燕麦', en: 'Oatmeal', emoji: '🌾', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '意面', en: 'Pasta', emoji: '🌾', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '藜麦', en: 'Quinoa', emoji: '🌾', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '米饭', en: 'Rice', emoji: '🌾', category: '谷物', progress: 0, like: null, remark: '' },
      { name: '玉米饼', en: 'Tortilla', emoji: '🌾', category: '谷物', progress: 0, like: null, remark: '' },
      // 蛋奶🥚
      { name: '黄油', en: 'Butter', emoji: '🥚', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '切达奶酪', en: 'Cheddar', emoji: '🥚', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '奶酪', en: 'Cottage Cheese', emoji: '🥚', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '奶油奶酪', en: 'Cream Cheese', emoji: '🥚', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '马苏里拉', en: 'Mozzarella', emoji: '🥚', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '帕尔玛奶酪', en: 'Parmesan', emoji: '🥚', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '瑞可达', en: 'Ricotta', emoji: '🥚', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '酸奶', en: 'Yogurt', emoji: '🥚', category: '蛋奶', progress: 0, like: null, remark: '' },
      { name: '鸡蛋', en: 'Egg', emoji: '🥚', category: '蛋奶', progress: 0, like: null, remark: '' },
      // 肉类🍖
      { name: '牛肉', en: 'Beef', emoji: '🍖', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '鸡肉', en: 'Chicken', emoji: '🍖', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '羊肉', en: 'Lamb', emoji: '🍖', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '猪肉', en: 'Pork', emoji: '🍖', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '三文鱼', en: 'Salmon', emoji: '🍖', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '火鸡', en: 'Turkey', emoji: '🍖', category: '肉类', progress: 0, like: null, remark: '' },
      // 豆类🫘
      { name: '黑豆', en: 'Black Beans', emoji: '🫘', category: '豆类', progress: 0, like: null, remark: '' },
      { name: '鹰嘴豆', en: 'Chickpeas', emoji: '🫘', category: '豆类', progress: 0, like: null, remark: '' },
      { name: '亚麻籽', en: 'Flaxseeds', emoji: '🫘', category: '豆类', progress: 0, like: null, remark: '' },
      { name: '豆腐', en: 'Tofu', emoji: '🫘', category: '豆类', progress: 0, like: null, remark: '' },
      // 香料��
      { name: '九层塔', en: 'Basil', emoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '肉桂', en: 'Cinnamon', emoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '大蒜', en: 'Garlic', emoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '生姜', en: 'Ginger', emoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '薄荷', en: 'Mint', emoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '肉豆蔻', en: 'Nutmeg', emoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '红椒粉', en: 'Paprika', emoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '欧芹', en: 'Parsley', emoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '迷迭香', en: 'Rosemary', emoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      { name: '姜黄', en: 'Tumeric', emoji: '🌿', category: '香料', progress: 0, like: null, remark: '' },
      // 常见补充
      { name: '山药', en: 'Chinese Yam', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '紫薯', en: 'Purple Sweet Potato', emoji: '🥦', category: '蔬菜', progress: 0, like: null, remark: '' },
      { name: '鳕鱼', en: 'Cod', emoji: '🍖', category: '肉类', progress: 0, like: null, remark: '' },
      { name: '面条', en: 'Noodles', emoji: '🌾', category: '谷物', progress: 0, like: null, remark: '' }
    ]
  }
}); 