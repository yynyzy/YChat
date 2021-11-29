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
					<view class="reject btn">
						拒绝
					</view>
					<view class="header-img">
						<image src="../../static/img/four.png"></image>
					</view>
					<view class="agree btn">
						同意
					</view>
				</view>
				<view class="requester-center">
					<view class="title">
						{{item.name}}
					</view>
					<view class="time">
					{{changeTime(item.time)}}
					</view>
				</view>
				<view class="notic">
					<text>留言</text>
					你好，想请求加为好友。谢谢你的通过。
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
				requester: []
			}
		},
		onLoad() {
			this.getrequester()
		},
		methods: {
			backOne() {
				uni.navigateBack({
					detail: 1
				})
			},
			changeTime: function(data) {
				return myfun.dateTime(data)
			},
			getrequester: function() {
				this.requester = datas.getFrinedLists()
				for (let i = 0; i < this.requester.length; i++) {
					this.requester[i].img = "../../static/img/" + this.requester[i].imgurl
				}
				console.log(this.requester)
			},
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		background: rgba(255, 255, 255, 0.96);
		border-bottom: 1px solid $uni-border-color;
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
