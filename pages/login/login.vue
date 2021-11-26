<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-right" @tap="tosign()">
				<view class="text">注册</view>
			</view>
			</view>
			<view class="logo">
				<image src="../../static/index/logo.png"/>
			</view>
			<view class="main">
				<view class="title">登录</view>
				<view class="slogan">您好，欢迎来到 YChat</view>
				<view class="inputs">
					<input type="text" class="user" placeholder="用户名/邮箱" placeholder-style="color:#aaa;font-weight:400;"/>
					<input type="password" class="psw" placeholder="密码"  placeholder-style="color:#aaa;font-weight:400;"/>
				</view>
				<view class="tips">用户名或密码输入错误</view>
			</view>
			<view class="submit">登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			testFun(){
				uni.request({
					url:"http://192.168.0.3:3000/test",
					data:{
						
					},
					method:"GET",
					success:data=>{
						console.log(data)
					}
				})
			},
			tosign(){
				uni.navigateTo({
					url:"../sign/sign"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: var(--status-bar-height);
	}

	.top-bar {
		position: fixed;
		z-index: 1001;
		top: 0;
		left: 0;
		width: 100%;
		height: 88rpx;
		padding-top: var(--status-bar-height);
		background: $uni-bg-color;
		// box-sizing: border-box;

		.top-bar-right {
			float: right;
			padding-right: 32rpx;
			.text{
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
			}
		}

	}
	.logo{
		text-align: center;
		image {
			padding-top: 256rpx;
			width: 194rpx;
			height: 92rpx;
			margin: 0 auto;
		}
	} 

	.main {
		padding: 54rpx $uni-spacing-row-lg 120rpx;
		// width: 100%;
		.title {
			font-size: 56rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 80rpx;
		}
		.slogan{
			font-size: 40rpx;
			color: $uni-text-color-grey;
			line-height: 56rpx;
		}
		.inputs {
			padding-top: 8rpx;
			input {
				height: 88rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
				border-bottom: 1px solid $uni-border-color;
			}
		}
		.tips{
			float: left;
			font-size: $uni-font-size-lg;
			color: $uni-color-warning;
			line-height: 56rpx;
			border-bottom: 1px solid $uni-bg-color;
		}
		
	}
	.submit {
		margin: 0 auto;
		width: 520rpx;
		height: 96rpx;
		background: $uni-color-primary;
		box-shadow: 0 50rpx 32rpx -36rpx rgba(255,228,49,0.4);
		border-radius: 48rpx;
		font-size: $uni-font-size-lg;
		font-weight: 500;
		color: $uni-text-color;
		line-height: 96rpx;
		text-align: center;
	}
</style>
