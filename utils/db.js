// 云数据库工具类
const db = wx.cloud.database();

/**
 * 获取当前用户openid
 */
async function getOpenId() {
  try {
    const res = await wx.cloud.callFunction({
      name: 'getOpenId'
    });
    return res.result.openid;
  } catch (err) {
    console.error('获取openid失败:', err);
    throw err;
  }
}

/**
 * 初始化食物基础数据到云数据库
 * 只需要执行一次，用于初始化foods集合
 */
async function initFoodsData(foodList) {
  try {
    // 检查是否已存在数据
    const countRes = await db.collection('foods').count();
    if (countRes.total > 0) {
      console.log('食物数据已存在，跳过初始化');
      return;
    }

    // 批量插入食物数据
    const batchSize = 20;
    for (let i = 0; i < foodList.length; i += batchSize) {
      const batch = foodList.slice(i, i + batchSize).map(food => ({
        name: food.name,
        en: food.en,
        emoji: food.emoji,
        foodEmoji: food.foodEmoji || food.emoji,
        category: food.category,
        createTime: new Date(),
        updateTime: new Date()
      }));

      await db.collection('foods').add({
        data: batch
      });
    }
    console.log('食物数据初始化完成');
  } catch (err) {
    console.error('初始化食物数据失败:', err);
    throw err;
  }
}

/**
 * 获取所有食物列表（从云数据库）
 */
async function getFoodsList() {
  try {
    const res = await db.collection('foods')
      .orderBy('name', 'asc')
      .get();
    return res.data;
  } catch (err) {
    console.error('获取食物列表失败:', err);
    throw err;
  }
}

/**
 * 获取用户的所有食物记录
 */
async function getUserFoodRecords() {
  try {
    const openid = await getOpenId();
    const res = await db.collection('user_foods')
      .where({
        _openid: openid
      })
      .get();
    return res.data;
  } catch (err) {
    console.error('获取用户食物记录失败:', err);
    throw err;
  }
}

/**
 * 获取特定食物的用户记录
 */
async function getFoodRecord(foodId) {
  try {
    const openid = await getOpenId();
    const res = await db.collection('user_foods')
      .where({
        _openid: openid,
        foodId: foodId
      })
      .get();
    
    if (res.data.length > 0) {
      return res.data[0];
    }
    return null;
  } catch (err) {
    console.error('获取食物记录失败:', err);
    throw err;
  }
}

/**
 * 保存或更新食物记录
 */
async function saveFoodRecord(foodId, foodName, recordData) {
  try {
    const openid = await getOpenId();
    const { progress, progressList, like, likeLevel, remark } = recordData;

    // 检查记录是否存在
    const existing = await getFoodRecord(foodId);

    const record = {
      foodId: foodId,
      foodName: foodName,
      progress: progress || 0,
      progressList: progressList || [
        { status: '', date: '' },
        { status: '', date: '' },
        { status: '', date: '' }
      ],
      like: like || null,
      likeLevel: likeLevel || null,
      remark: remark || '',
      updateTime: new Date()
    };

    if (existing) {
      // 更新现有记录
      await db.collection('user_foods')
        .doc(existing._id)
        .update({
          data: record
        });
    } else {
      // 创建新记录
      record.createTime = new Date();
      await db.collection('user_foods').add({
        data: record
      });
    }
  } catch (err) {
    console.error('保存食物记录失败:', err);
    throw err;
  }
}

/**
 * 合并食物列表和用户记录
 * 将云数据库中的食物列表与用户记录合并，返回完整的食物数据
 */
function mergeFoodsWithRecords(foodsList, userRecords) {
  const recordsMap = {};
  userRecords.forEach(record => {
    recordsMap[record.foodId] = record;
  });

  return foodsList.map(food => {
    const record = recordsMap[food._id];
    if (record) {
      return {
        ...food,
        progress: record.progress,
        progressList: record.progressList,
        like: record.like,
        likeLevel: record.likeLevel,
        remark: record.remark
      };
    } else {
      // 没有记录的食物，使用默认值
      return {
        ...food,
        progress: 0,
        progressList: [
          { status: '', date: '' },
          { status: '', date: '' },
          { status: '', date: '' }
        ],
        like: null,
        likeLevel: null,
        remark: ''
      };
    }
  });
}

module.exports = {
  initFoodsData,
  getFoodsList,
  getUserFoodRecords,
  getFoodRecord,
  saveFoodRecord,
  mergeFoodsWithRecords,
  getOpenId
};


