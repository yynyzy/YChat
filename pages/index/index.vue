<template>
	<view class="content">
		<view class="top-bar">
			<view @tap="goimg" class="top-bar-left">
				<image :src="imgurl" class="my-img"></image>
			</view>
			<view class="top-bar-center">
				<image class="logo" src="../../static/index/logo.png"></image>
			</view>
			<view class="top-bar-right">
				<view class="search" @tap="toSearch">
					<image src="../../static/index/search.png"></image>
				</view>
				<view class="add">
					<image src="../../static/index/add.png"></image>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="refresh" v-if="!refresh">
				<image src="../../static/index/refresh.png"></image>
				<view class="ref-title">
					下拉刷新
				</view>
			</view>
			<view class="noone" v-if="noone">
				<image src="../../static/index/noone.png" mode="aspectFill"></image>
				<view class="notitle">
					你还没有好友
				</view>
				<view class="search-bt" @tap="toSearch">
					搜索好友
				</view>
			</view>
			<view class="friends" v-if="requestData>0" @tap="goRequest">
				<view class="friend-list">
					<view class="friend-list-l">
						<text class="tip">{{requestData}}</text>
						<image src="../../static/index/apply.png"></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">好友申请</view>
							<view class="time">{{changeTime(requestTime)}}</view>
						</view>
						<view class="news"></view>
					</view>
				</view>
			</view>
			<view class="friends">
				<view class="friend-list" v-for="(item,index) in friends" :key="index" @tap="toChatRoom(item)">
					<view class="friend-list-l">
						<text class="tip" v-if="item.tip>0">{{item.tip}}</text>
						<image :src="item.imgurl"></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">{{item.name}}</view>
							<view class="time">{{changeTime(item.lastTime)}}</view>
						</view>
						<view class="news">{{item.msg}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import datas from "../../commons/js/datas.js"
	import myfun from "../../commons/js/myfun.js"
	export default {
		data() {
			return {
				friends: [],
				imgurl: '',
				uid: '',
				token: '',
				myname: '',
				requestData: 0,
				requestTime: '',
				refresh: false,
				noone: false
			}
		},
		onLoad() {
			this.getStorages()
			this.friendRequest()
			this.getFriends()
			this.join(this.uid)
			this.receiveSocketMsg()
		},
		onPullDownRefresh() {
			// this.refresh=false
			this.friends = []
			this.getStorages()
			this.friendRequest()
			this.getFriends()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			goimg() {
				uni.navigateTo({
					url: `../userHome/userHome?id=${this.uid}`
				})

			},
			changeTime: function(data) {
				return myfun.dateTime(data)
			},
			getStorages: function() {
				try {
					const value = uni.getStorageSync('user')
					if (value) {
						this.uid = value.id
						this.imgurl = this.serverUrl + value.imgurl
						this.token = value.token
						this.myname = value.name

					} else {
						uni.navigateTo({
							url: '../signin/signin'
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			getFriends: function() {
				uni.request({
					url: this.serverUrl + "/index/getFriend",
					data: {
						uid: this.uid,
						state: 0,
						token: this.token
					},
					method: "POST",
					success: data => {
						this.refresh = true
						let status = data.data.status
						if (status == 200) {
							let res = data.data.result
							if (res.length > 0) {
								this.noone = false
								for (let i = 0; i < res.length; i++) {
									res[i].imgurl = this.serverUrl + res[i].imgurl
									if (res[i].markname) {
										res[i].name = res[i].markname
									}
									this.friends.push(res[i])
								}
								this.friends = myfun.paixu(this.friends, 'lastTime', 0)
								for (let i = 0; i < this.friends.length; i++) {
									this.getLastMsg(this.friends, i)
									this.getUnread(this.friends, i)
								}
							} else {
								this.noone = true
							}
						} else if (status == 500) {
							uni.showToast({
								title: '服务器出错了',
								icon: 'none',
								duration: 1500
							})
						} else if (status == 300) {
							uni.navigateTo({
								url: '../login/login'
							})
						}
					}
				})
			},
			friendRequest() {
				uni.request({
					url: this.serverUrl + "/index/getFriend",
					data: {
						uid: this.uid,
						state: 1,
						token: this.token
					},
					method: "POST",
					success: data => {
						this.refresh = true
						let status = data.data.status
						if (status == 200) {
							this.noone = false
							let res = data.data.result
							this.requestData = res.length
							if (res.length > 0) {
								this.requestTime = res[0].lastTime
								for (let i = 1; i < res.length; i++) {
									if (this.requestTime < res[i].lastTime) {
										this.requestTime = res[i].lastTime
									}
								}
							} else {
								this.noone = true
							}
						} else if (status == 500) {
							uni.showToast({
								title: '服务器出错了',
								icon: 'none',
								duration: 1500
							})
						} else if (status == 300) {
							uni.navigateTo({
								url: '../login/login'
							})
						}
					}
				})
			},
			goRequest() {
				uni.navigateTo({
					url: '../friendRequest/friendRequest'
				})
			},
			getGroup: function() {
				uni.request({
					url: this.serverUrl + "/index/getGroup",
					data: {
						uid: this.uid,
						token: this.token
					},
					method: "POST",
					success: data => {
						this.refresh = true
						let status = data.data.status
						if (status == 200) {
							let res = data.data.result
							console.log(res)
							if (res.length > 0) {
								this.noone = false
								for (let i = 0; i < res.length; i++) {
									res[i].imgurl = this.serverUrl + res[i].imgurl
									if (res[i].markname) {
										res[i].name = res[i].markname
									}
									this.friends.push(res[i])
								}
								this.friends = myfun.paixu(this.friends, 'lastTime', 0)
								for (let i = 0; i < this.friends.length; i++) {
									this.getLastMsg(this.friends, i)
									this.getUnread(this.friends, i)
								}
							} else {
								this.noone = true
							}
						} else if (status == 500) {
							uni.showToast({
								title: '服务器出错了	getGroup',
								icon: 'none',
								duration: 1500
							})
						} else if (status == 300) {
							uni.navigateTo({
								url: '../login/login'
							})
						}
					}
				})
			},
			getLastMsg(arr, i) {
				uni.request({
					url: this.serverUrl + "/index/getLastMsg",
					data: {
						uid: this.uid,
						fid: arr[i].id,
						token: this.token
					},
					method: "POST",
					success: data => {
						this.refresh = true
						let status = data.data.status
						if (status == 200) {
							let res = data.data.result
							if (res.types == 0) {

							} else if (res.types == 1) {
								res.message = '[图片]'
							} else if (res.types == 2) {
								res.message = '[音频]'
							} else if (res.types == 3) {
								res.message = '[位置]'
							}
							let e = arr[i]
							e.msg = res.message
							arr.splice(i, 1, e)
						} else if (status == 500) {
							uni.showToast({
								title: '服务器出错了',
								icon: 'none',
								duration: 1500
							})
						} else if (status == 300) {
							uni.navigateTo({
								url: '../login/login'
							})
						}
					}
				})
			},
			getUnread(arr, i) {
				uni.request({
					url: this.serverUrl + "/index/unreadMsg",
					data: {
						uid: this.uid,
						fid: arr[i].id,
						token: this.token
					},
					method: "POST",
					success: data => {
						this.refresh = true
						let status = data.data.status
						if (status == 200) {
							let res = data.data.result
							let e = arr[i]
							e.msg = res
							arr.splice(i, 1, e)
						} else if (status == 500) {
							uni.showToast({
								title: '服务器出错了',
								icon: 'none',
								duration: 1500
							})
						} else if (status == 300) {
							uni.navigateTo({
								url: '../login/login'
							})
						}
					}
				})
			},
			toSearch: function() {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			toChatRoom(data) {
				uni.navigateTo({
					url: "../chatroom/chatroom?id=" + data.id + '&name=' + data.name + '&img=' + data.imgurl +
						'&type=' + data.type
				})
			},

			//socket模块
			//用户登录socket注册
			join(uid) {
				this.socket.emit('login', uid)
			},

			receiveSocketMsg() {
				this.socket.on('backmsg', (msg, fromId, tip) => {
					let nmsg = ''
					if (msg.types == 0) {
						nmsg = msg.message
					} else if (msg.types == 1) {
						nmsg = '【图片】'
					} else if (msg.types == 2) {
						nmsg = '【语音】'
					} else if (msg.types == 3) {
						nmsg = '【地图】'
					}

					for (let i = 0; i < this.friends.length; i++) {
						if (this.friends[i].id == fromId) {
							let e = this.friends[i]
							e.lastTime = new Date()
							e.msg = nmsg
							e.tip++
							this.friends.splice(i, 1)
							this.friends.unshift(e)
						}
					}
					console.log(this.friends)

				})

			}



		}
	}
</script>

曰<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		background: rgba(255, 255, 255, 0.96);
		border-bottom: 1px solid $uni-border-color;

		.top-bar-center {
			z-index: -100;
		}
	}

	.main {
		padding-top: 104rpx;
		padding-bottom: $uni-spacing-col-base
	}

	.refresh {
		text-align: center;
		padding-top: 480rpx;

		image {
			width: 32rpx;
			height: 32rpx;
		}

		.ref-title {
			padding-top: 10;
			font-size: $uni-font-size-base;
			color: rgba(39, 40, 50, 0.4);
			line-height: 40rpx;
		}
	}

	.noone {
		text-align: center;
		padding-top: 400rpx;

		image {
			width: 158rpx;
			height: 250rpx;
		}

		.notitle {
			padding: 32rpx 0;
			font-size: $uni-font-size-base;
			color: rgba(39, 40, 50, 0.4);
			line-height: 40rpx;
		}

		.search-bt {
			display: inline-block;
			width: 240rpx;
			height: 96rpx;
			background: $uni-color-primary;
			box-shadow: 0 52rpx 36rpx -32rpx rgba(255, 228, 49, 0.4);
			border-radius: 48rpx;
			font-size: $uni-font-size-base;
			color: $uni-text-color;
			line-height: 96rpx;
		}
	}

	.friend-list {
		height: 96rpx;
		padding: 16rpx $uni-spacing-col-base;

		&:active {
			background-color: $uni-bg-color-grey;
		}

		.friend-list-l {
			position: relative;
			float: left;

			image {
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
				background-color: $uni-color-primary
			}

			.tip {
				position: absolute;
				z-index: 10;
				top: -6rpx;
				left: 68rpx;
				min-width: 36rpx;
				height: 36rpx;
				background: $uni-color-warning;
				border-radius: $uni-border-radius-circle;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-inverse;
				line-height: 36rpx;
				text-align: center;
			}

		}

		.friend-list-r {
			padding-left: 128rpx;

			.top {
				height: 50rpx;

				.name {
					float: left;
					font-size: 36rpx;
					font-weight: 400;
					color: $uni-text-color;
					line-height: 50rpx;
				}

				.time {
					// display: none;
					float: right;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-disable;
					line-height: 50rpx;
				}
			}

			.news {
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				line-height: 40rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}
	}
</style>
