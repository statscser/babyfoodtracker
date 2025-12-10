# 云数据库设计文档

## 数据库集合设计

### 1. foods 集合（食物基础数据 - 共享数据）
存储所有食物的基础信息，所有用户共享。

**字段：**
- `_id`: 自动生成
- `name`: String - 中文名称
- `en`: String - 英文名称
- `emoji`: String - 种类emoji
- `foodEmoji`: String - 食物特定emoji
- `category`: String - 分类（蔬菜、水果、肉类等）
- `createTime`: Date - 创建时间
- `updateTime`: Date - 更新时间

**索引：**
- `name`: 唯一索引
- `category`: 普通索引

### 2. user_foods 集合（用户食物记录）
存储每个用户对每个食物的记录数据。

**字段：**
- `_id`: 自动生成
- `_openid`: String - 用户openid（自动添加）
- `foodId`: String - 关联foods集合的_id
- `foodName`: String - 食物名称（冗余字段，便于查询）
- `progress`: Number - 排敏进度（0-3）
- `progressList`: Array - 排敏记录列表
  - `status`: String - 状态（allergy/observe/pass）
  - `date`: String - 日期（YYYY-MM-DD）
- `like`: String - 喜好emoji
- `likeLevel`: Number - 喜好等级（1-5）
- `remark`: String - 备注
- `createTime`: Date - 创建时间
- `updateTime`: Date - 更新时间

**索引：**
- `_openid`: 普通索引
- `foodId`: 普通索引
- `_openid + foodId`: 联合唯一索引（确保每个用户每个食物只有一条记录）

### 3. users 集合（用户信息 - 可选）
存储用户基本信息（如果需要扩展功能）。

**字段：**
- `_id`: 自动生成（使用openid作为_id）
- `_openid`: String - 用户openid
- `nickName`: String - 昵称
- `avatarUrl`: String - 头像
- `createTime`: Date - 创建时间
- `updateTime`: Date - 更新时间

**索引：**
- `_openid`: 唯一索引

## 数据访问模式

### 查询用户的所有食物记录
```javascript
db.collection('user_foods')
  .where({
    _openid: '{openid}'
  })
  .get()
```

### 查询特定食物的记录
```javascript
db.collection('user_foods')
  .where({
    _openid: '{openid}',
    foodId: '{foodId}'
  })
  .get()
```

### 更新/创建食物记录
```javascript
db.collection('user_foods')
  .where({
    _openid: '{openid}',
    foodId: '{foodId}'
  })
  .update({
    data: {
      progress: 2,
      progressList: [...],
      like: '😊',
      likeLevel: 4,
      remark: '备注',
      updateTime: new Date()
    }
  })
```


