<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/common/back.png" class="back-img"></image>
			</view>
			<view class="top-bar-center">
				<view class="title">
					详情
				</view>
			</view>
			<view class="top-bar-right">
				<view class="pice">

				</view>
			</view>
		</view>
		<view class="main">
			<view class="column heads">
				<view class="row head">
					<view class="title">头像</view>
					<view class="user-head">
						<image :src="imgurl" class="user-img"></image>
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">
						签名
					</view>
					<view class="cont">
						一个大大就是那里拿到了卡死你都看到了看来你打没打开了吗
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">
						注册
					</view>
					<view class="cont">
						2020-10-11 23:23:10
					</view>
				</view>
			</view>

			<view class="column">
				<view class="row">
					<view class="title">
						昵称
					</view>
					<view class="cont">
						严致远
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">
						性别
					</view>
					<view class="cont">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">
						生日
					</view>
					<view class="cont">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="column">
				<view class="row head">
					<view class="title">
						电话
					</view>
					<view class="cont">
						13818944586
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">
						邮箱
					</view>
					<view class="cont">
						1601530253@qq.com
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">
						密码
					</view>
					<view class="cont">
						******
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="btn2">
				退出应用
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			 const currentDate = this.getDate({
			            format: true})
			return {
				imgurl: "../../static/img/three.png",
				array: ["男", "女", "未知"],
				index: 0,
				date: currentDate
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			backOne() {
				uni.navigateBack({
					detail: 1
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		background: rgba(255, 255, 255, 0.96);

	}

	.main {
		padding-top: 118rpx;
		display: flex;
		flex-direction: coloum;

		.column {
			display: flex;
			flex-direction: column;
			padding-top: 12rpx;
			width: 100%;
			border-bottom: 1px solid $uni-border-color;

			.heads {}

			.row {
				display: flex;
				flex-direction: row;
			}

			.title {
				flex: none;
				padding: 0 $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 112rpx;
			}

			.head {
				height: 148rpx;
				display: flex;
				align-items: center;
			}

			.user-head {
				flex: auto;
			}

			.user-img {
				margin-top: 22rpx;
				width: $uni-img-size-lg;
				height: $uni-img-size-lg;
				border-radius: $uni-border-radius-base;
			}

			.cont {

				flex: auto;
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey;
				line-height: 112rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.more {
				flex: none;
				height: 112rpx;
				display: flex;
				align-items: center;

				image {
					width: 80rpx;
					height: 28rpx;
				}
			}
		}
	}

	.btn2 {
		margin-top: 160rpx;
		text-align: center;
		font-size: $uni-font-size-lg;
		color: $uni-color-warning;
		line-height: 88rpx;
	}
</style>
