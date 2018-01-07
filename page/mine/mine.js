var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    userInfo:{}
  },
	onLoad: function () {
	},
	onShow: function () {
		this.setData({
			userInfo: app.globalData.userInfo
		});
	}
});

