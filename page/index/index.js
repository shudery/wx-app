var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
		filterId: 1,
		address: '定位中…',
		banners: [
			{
				id: 3,
				img: '../../icon/home/title.png',
				url: '',
				name: '百亿巨惠任你抢'
			},
			{
				id: 1,
        img: '../../icon/home/title.png',
				url: '',
				name: '告别午高峰'
			},
			{
				id: 2,
        img: '../../icon/home/title.png',
				url: '',
				name: '金牌好店'
			}
		],
		icons: [
			[
				{
					id: 1,
					img: '/icon/index/share.png',
					name: '分享赚钱',
					url: ''
				},
				{
					id: 2,
					img: '/icon/index/money.png',
					name: '我的金库',
					url: ''
				},
				{
					id: 3,
					img: '/icon/index/way.png',
					name: '全部订单',
					url: ''
				},
				{
					id: 4,
					img: '/icon/index/ticket.png',
					name: '领券中心',
					url: ''
				},
				{
					id: 5,
					img: '/icon/index/golden.png',
					name: '砸金蛋',
					url: ''
				},
				{
					id: 6,
					img: '/icon/index/save.png',
					name: '我的收藏',
					url: ''
				},
				{
					id: 7,
					img: '/icon/index/mine.png',
					name: '我的拼团',
					url: ''
				},
				{
					id: 8,
					img: '/icon/index/chart.png',
					name: '粉丝拼团',
					url: ''
				},
        {
          id: 9,
          img: '/icon/index/fans.png',
          name: '我的粉丝',
          url: ''
        },
        {
          id: 10,
          img: '/icon/index/act.png',
          name: '拼团活动',
          url: ''
        }
			],
			[
				{
					id: 17,
					img: '/icon/index/share.png',
					name: '新商家',
					url: ''
				},
				{
					id: 18,
					img: '/icon/index/share.png',
					name: '免配送费',
					url: ''
				},
				{
					id: 11,
					img: '/icon/index/share.png',
					name: '鲜花蛋糕',
					url: ''
				},
				{
					id: 12,
					img: '/icon/index/share.png',
					name: '名气餐厅',
					url: ''
				},
				{
					id: 13,
					img: '/icon/index/share.png',
					name: '异国料理',
					url: ''
				},
				{
					id: 14,
					img: '/icon/index/share.png',
					name: '家常菜',
					url: ''
				},
				{
					id: 15,
					img: '/icon/index/share.png',
					name: '能量西餐',
					url: ''
				},
				{
					id: 16,
					img: '/icon/index/share.png',
					name: '无辣不欢',
					url: ''
				}
			]
		],
		shops: app.globalData.shops
	},
	onLoad: function () {
		var self = this;
		wx.getLocation({
			type: 'gcj02',
			success: function (res) {
				var latitude = res.latitude;
				var longitude = res.longitude;
				server.getJSON('/waimai/api/location.php', {
					latitude: latitude,
					longitude: longitude
				}, function (res) {
					console.log(res)
					if (res.data.status != -1) {
						self.setData({
							address: res.data.result.address_component.street_number
						});
					} else {
						self.setData({
							address: '定位失败'
						});
					}
				});
			}
		})
	},
	onShow: function () {
	},
	onScroll: function (e) {
		if (e.detail.scrollTop > 100 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
		} else if (e.detail.scrollTop < 100 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}
	},
	tapSearch: function () {
		wx.navigateTo({url: 'search'});
	},
  toInfo(){
    wx.navigateTo({
      url: '../msg/msg',
    })
  },
	toNearby: function () {
		var self = this;
		self.setData({
			scrollIntoView: 'nearby'
		});
		self.setData({
			scrollIntoView: null
		});
	},
	tapFilter: function (e) {
		switch (e.target.dataset.id) {
			case '1':
				this.data.shops.sort(function (a, b) {
					return a.id > b.id;
				});
				break;
			case '2':
				this.data.shops.sort(function (a, b) {
					return a.sales < b.sales;
				});
				break;
			case '3':
				this.data.shops.sort(function (a, b) {
					return a.distance > b.distance;
				});
				break;
		}
		this.setData({
			filterId: e.target.dataset.id,
			shops: this.data.shops
		});
	},
	tapBanner: function (e) {
		var name = this.data.banners[e.target.dataset.id].name;
		wx.showModal({
			title: '提示',
			content: '您点击了“' + name + '”活动链接，活动页面暂未完成！',
			showCancel: false
		});
	}
});

