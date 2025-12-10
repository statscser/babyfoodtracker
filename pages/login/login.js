// 登录页面
const app = getApp();
const db = require('../../utils/db.js');

Page({
  data: {
    loading: false
  },

  onLoad() {
    // 如果已登录，直接跳转
    if (app.globalData.isLoggedIn) {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  },

  async onLogin() {
    this.setData({ loading: true });

    try {
      // 调用登录
      const success = await app.login();
      
      if (success) {
        // 登录成功，初始化数据并跳转
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });

        // 延迟跳转，让用户看到提示
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
      } else {
        wx.showToast({
          title: '需要授权才能使用',
          icon: 'none',
          duration: 2000
        });
      }
    } catch (err) {
      console.error('登录失败:', err);
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none',
        duration: 2000
      });
    } finally {
      this.setData({ loading: false });
    }
  }
});


