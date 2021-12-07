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
			<view class="friends" v-if="requestData>0">
				<view class="friend-list" v-for="(item,index) in friends" :key="item.id">
					<view class="friend-list-l">
						<text class="tip" v-if="item.tip>0">{{item.tip<99?item.tip:"99+"}}</text>
						<image :src="item.img"></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">{{item.name}}</view>
							<view class="time">{{changeTime(item.time)}}</view>
						</view>
						<view class="news">{{item.news}}</view>
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
				requestTime: ''
			}
		},
		onLoad() {
			this.getStorages()
			this._getFriends()	
			this.friendRequest()
			this.getFriends()
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
						this.imgurl = this.serverUrl + '/user/' + value.imgurl
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
			_getFriends: function() {
				this.friends = datas.getFrinedLists()
				for (let i = 0; i < this.friends.length; i++) {
					this.friends[i].img = "../../static/img/" + this.friends[i].imgurl
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
						let status = data.data.status
						if (status == 200) {
							let res = data.data.result
							console.log(res)
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
						let status = data.data.status
						if (status == 200) {
							let res = data.data.result
							this.requestData = res.length
							if (res.length > 0) {
								this.requestTime = res[0].lastTime
								for (let i = 1;i < res.length; i++) {
									if (this.requestTime < res[i].lastTime) {
										this.requestTime = res[i].lastTime
									}
								}
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
			goRequest(){
				uni.navigateTo({
					url: '../friendRequest/friendRequest'
				})
			},
			toSearch: function() {
				uni.navigateTo({
					url: "../search/search"
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
