<template>
	<view>
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
		<view class="bottom-bar">
			<view class="bottom-btn">
				加为好友
			</view>
		</view>
		<view class="add-misg">
			<view class="name">
				{{user.name}}
			</view>
			<textarea :value="myname+'请求加为好友~'" maxlength="120" class="add-main" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexBg: 'rgba(255, 93, 91, 1)',
				myname: "春雨",
				user: {
					name: "致远",
					nick: "理想乡",
					intr: "众神眷恋之地，严致远与严以诺，众神眷恋之地，严致远与严以诺，众神眷恋之地，严致远与严以诺，众神眷恋之地"
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
		right: 0;
		width: 100%;
		height: 100%;

		.bg-bai {
			width: 100%;
			height: 100%;

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
				z-index: 11;
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
				z-index: 10;
				width: 400rpx;
				height: 400rpx;
				border-radius: 48rpx;
				border: 6rpx solid rgba(255, 255, 255, 1);
			}

			.user-imf {
				padding-top: 42rpx;

				.name {
					font-size: 52rpx;
					color: $uni-text-color;
					line-height: 74rpx;
				}

				.nick {
					font-size: $uni-font-size-base;
					line-height: 40rpx;
					color: $uni-text-color;
				}

				.intr {
					padding: 20rpx 100rpx;
					font-size: $uni-font-size-base;
					font-weight: 300;
					color: $uni-text-color;
					line-height: 48rpx;
				}
			}
		}


	}

	.bottom-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 104rpx;

		.bottom-btn {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			text-align: center;
			line-height: 80rpx;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			width: 684rpx;
			height: 80rpx;
			background: $uni-color-primary;
			border-radius: $uni-border-radius-sm;
		}
	}
.add-misg{
	position: fixed;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
padding: 0 56rpx;
height: 1252rpx;
background: rgba(255,255,255,1);
border-radius: 40rpx 40rpx  0 0;
.name{
	padding-top: 168rpx;
	font-size: 52rpx;
	color: $uni-text-color;
	line-height: 74rpx;
}
.add-main{
	padding: 18rpx 22rpx;
	height: 720rpx;
	background: $uni-bg-color-grey;
	border-radius: $uni-border-radius-base;
	font-size: $uni-font-size-lg;
	color: $uni-text-color;
	line-height: 44rpx;
}
}

</style>
