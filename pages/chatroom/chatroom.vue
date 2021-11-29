<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/common/back.png" class="back-img"></image>
			</view>
			<view class="top-bar-center">
				<view class="title">
					小明
				</view>
			</view>
			<view class="top-bar-right">
				<view class="pice">
				</view>
				<view class="group-img">
					<image src="../../static/img/three.png"></image>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="chat" scroll-with-animation="true">
			<view class="chat-main">
				<view class="chat-ls">
					<view class="chat-time">
						12:32
					</view>
					<view class="msg-m msg-left">
						<image src="../../static/img/four.png" class="user-img"></image>
						<view class="message">
							<view class="msg-text">
								你好啊，我的朋友，多日不见，甚是想念。
							</view>

						</view>
					</view>
				</view>
				<view class="chat-ls">
					<view class="chat-time">
						12:32
					</view>
					<view class="msg-m msg-right">
						<image src="../../static/img/one.png" class="user-img"></image>
						<view class="message">
							<view class="msg-text">
								我也是啊，朋友。你好啊，我的朋友，多日不见，甚是想念。
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import datas from "../../commons/js/datas.js"
	import myfun from "../../commons/js/myfun.js"
	export default {
		data() {
			return {
				msg: []
			}
		},
		methods: {
			backOne() {
				uni.navigateBack({
					detail: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	page {
		height: 100%;
	}

	.content {
		height: 100%;
		background: rgba(244, 244, 244, 1);
	}

	.top-bar {
		background: rgba(244, 244, 244, 0.96);
		border-bottom: 1px solid $uni-border-color;

		.group-img {
			position: absolute;
			bottom: 10rpx;
			right: $uni-spacing-col-base;
			width: 68rpx;
			height: 68rpx;

			image {
				// margin-top: 10rpx;
				padding: 0;
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
			}
		}
	}

	.chat {
		height: 100%;

		.chat-main {
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 100rpx;
			padding-bottom: 120rpx;
			display: flex;
			flex-direction: column;

		}

		.chat-ls {
			.chat-time {
				font-size: $uni-font-size-sm;
				color: rgba(39, 40, 50, 0.3);
				line-height: 34rpx;
				padding: 20rpx 0;
				text-align: center;
			}

			.msg-m {
				display: flex;
				padding: 20rpx 0;

				.user-img {
					// flex: auto;
					width: $uni-img-size-sm;
					height: $uni-img-size-sm;
					border-radius: $uni-border-radius-base;
				}

				.message {
					flex: none;
					max-width: 480rpx;
				}

				.msg-text {
					font-size: $uni-font-size-lg;
					color: $uni-text-color;
					line-height: 44rpx;
					padding: 18rpx 24rpx;
				}
			}

			.msg-left {
				flex-direction: row;

				.msg-text {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}
			}

			.msg-right {
				flex-direction: row-reverse;

				.msg-text {
					margin-right: 16rpx;
					background-color: #fff260;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}
			}
		}
	}
</style>
