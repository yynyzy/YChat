<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/common/back.png" class="back-img"></image>
			</view>

			<view class="top-bar-right">
				<view class="more-img">
					<image src="../../static/userhome/more.png"></image>
				</view>
			</view>
		</view>
		<view class="bg">
			<view class="bg-bai">
				<image src="../../static/img/three.png" class="bg-img" mode="aspectFill"></image>
			</view>
		</view>
		<view class="main">
			<view class="user-header">
				<view class="sex" :style="{background:sexBg}">
					<image src="../../static/userhome/female.png"></image>
				</view>
				<image src="../../static/img/three.png" class="user-img" mode="aspectFill"></image>
			</view>
			<view class="user-imf">
				<view class="name">{{user.name}}</view>
				<view class="nick">昵称：{{user.nick}}</view>
				<view class="intr">{{user.intr}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexBg: 'rgba(255, 93, 91, 1)',
				user: {
					name: "致远",
					nick: "理想乡",
					intr: "众神眷恋之地，严致远与严以诺，众神眷恋之地，严致远与严以诺，众神眷恋之地，严致远与严以诺，众神眷恋之地，严致远与严以诺"
				}
			}
		},
		methods: {
			backOne() {
				uni.navigateBack({
					detail: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.bg {
		position: fixed;
		z-index: -2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		.bg-bai {
			width: 100%;
			height: 100%;
			// background-color: #eee;
		}

		.bg-img {
			opacity: 0.4;
			position: absolute;
			z-index: -1;
			left: -10rpx;
			top: -10rpx;
			width: 110%;
			height: 110%;
			filter: blur(16px);
		}
	}

	.main {
		text-align: center;
		padding-top: 148rpx;

		.user-header {
			margin: 0 auto;
			position: relative;
			width: 412rpx;
			height: 412rpx;

			.sex {
				z-index: 10;
				position: absolute;
				bottom: 22rpx;
				right: 22rpx;
				width: 64rpx;
				height: 64rpx;
				border-radius: $uni-border-radius-circle;

				image {
					padding: 16rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}

			.user-img {
				width: 400rpx;
				height: 400rpx;
				border-radius: 48rpx;
				border: 6rpx solid rgba(255, 255, 255, 1);
			}
		}
	}
</style>
