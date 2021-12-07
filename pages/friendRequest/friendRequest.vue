<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/common/back.png" class="back-img"></image>
			</view>
			<view class="top-bar-center">
				<view class="title">
					好友请求
				</view>
			</view>
			<view class="top-bar-right">
				<view class="pice">
				</view>
			</view>
		</view>
		<view class="main">
			<view class="requester" v-for="(item,index) in requester" :key="index">
				<view class="requester-top">
					<view class="reject btn" @tap="refuse(item.id)">
						拒绝
					</view>
					<view class="header-img">
						<image src="../../static/img/four.png"></image>
					</view>
					<view class="agree btn" @tap="agree(item.id)">
						同意
					</view>
				</view>
				<view class="requester-center">
					<view class="title">
						{{item.name}}
					</view>
					<view class="time">
						{{changeTime(item.lastTime)}}
					</view>
				</view>
				<view class="notic">
					<text>留言:</text>
					{{item.msg}}
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
				uid: '',
				token: '',
				myname: '',
				requester: []
			}
		},
		onLoad() {
			this.getStorages()
			// this.getrequester()
			this.friendRequest()
		},
		methods: {
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
			backOne() {
				uni.navigateBack({
					detail: 1
				})
			},
			changeTime: function(data) {
				return myfun.dateTime(data)
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
							for (let i = 0; i < res.length; i++) {
								res[i].imgurl =this.serverUrl+'/user/'+res[i].imgurl
								this.getleave(res,i)
							}
							this.requester=res

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
			getleave(arr,i) {
				 uni.request({
					url: this.serverUrl + "/index/getLastMsg",
					data: {
						uid: this.uid,
						fid:arr[i].id,
						token: this.token
					},
					method: "POST",
					success: data => {
						let status = data.data.status
						if (status == 200) {
							let res = data.data.result
							let e =arr[i]
							e.msg =res.message
							arr.splice(i,1,e)
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
			refuse(fid){
				uni.request({
					url: this.serverUrl + "/friend/deleteFriend",
					data: {
						uid: this.uid,
						fid:fid,
						token: this.token
					},
					method: "POST",
					success: data => {
						let status = data.data.status
						if (status == 200) {
							for(let i=0;i<this.requester.length;i++){
								if(this.requester[i].id == fid){
									this.requester.splice(i,1)
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
			agree(fid){
				uni.request({
					url: this.serverUrl + "/friend/updateFriendState",
					data: {
						uid: this.uid,
						fid:fid,
						token: this.token
					},
					method: "POST",
					success: data => {
						let status = data.data.status
													console.log(status)
						if (status == 200) {
							for(let i=0;i<this.requester.length;i++){
								if(this.requester[i].id == fid){
									this.requester.splice(i,1)
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
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		background: rgba(255, 255, 255, 0.96);
		border-bottom: 1px solid $uni-border-color;
		.top-bar-center {
			z-index: -100;
		}
	}

	.main {
		padding: 108rpx $uni-spacing-col-base;

		.requester {
			margin-top: 112rpx;
			padding: $uni-spacing-col-base;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0 24rpx 64rpx -8rpx rgba(0, 0, 0, 0.1);


		}

		.requester-top {
			display: flex;
			flex-direction: row;

			.btn {
				text-align: center;
				flex: none;
				width: 160rpx;
				height: 64rpx;
				background: rgba(255, 93, 91, 0.1);
				border-radius: 40rpx;
				font-size: $uni-font-size-lg;
				line-height: 64rpx;
			}

			.reject {
				color: $uni-color-warning;
				background-color: rgba(255, 93, 91, 0.1);
			}

			.agree {
				color: $uni-text-color;
				background-color: $uni-color-primary;
			}

			.header-img {
				margin-top: -72rpx;
				flex: auto;
				text-align: center;

				image {
					width: 144rpx;
					height: 144rpx;
					border-radius: 50%;
					background: $uni-color-primary;
				}
			}
		}

		.requester-center {
			text-align: center;
			padding-top: 40rpx;
			padding-bottom: 40rpx;

			.title {
				font-size: 32rpx;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 50rpx;
			}

			.time {
				font-size: $uni-font-size-sm;
				color: $uni-text-color-disable;
				line-height: 34rpx;
			}
		}

		.notic {
			padding: $uni-spacing-row-base $uni-spacing-col-base;
			border-radius: $uni-border-radius-base;
			background-color: $uni-bg-color-grey;
			font-size: $uni-font-size-base;
			color: $uni-text-color;
			line-height: 40rpx;
		}

	}
</style>
