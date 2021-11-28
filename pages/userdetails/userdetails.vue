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
						<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
						<image :src="cropFilePath" @tap="upload" class="user-img"></image>
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row" @tap="modify('签名',dataArr.sign,false)" :animation="animationData">
					<view class="title">
						签名
					</view>
					<view class="cont">
						{{dataArr.sign}}
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
						{{timeChange(dataArr.zhuce)}}
					</view>
				</view>
			</view>
			<view class="column">
				<view class="row" @tap="modify('昵称',dataArr.name,false)">
					<view class="title">
						昵称
					</view>
					<view class="cont">
						{{dataArr.name}}
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
				<view class="row">
					<view class="title">
						电话
					</view>
					<view class="cont">
						{{dataArr.tell}}
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
						{{dataArr.email}}
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
		<view class="modify" :style="{bottom:-+widHeight+'px'}" :animation="animationData">
			<view class="modify-header">
				<view class="close" @tap="modify()">
					取消
				</view>
				<view class="title">
					签名
				</view>
				<view class="define" @tap="modifySubmit()">
					确定
				</view>
			</view>
			<view class="modify-main">
				<input type="text" v-model="pwd" class="modify-pwd" placeholder="请输入原密码"
					placeholder-style="color:#aaa;font-weight:400;" v-show="isPwd" />
				<textarea v-model="data" class="modify-content" />
			</view>
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	import myFun from "../../commons/js/myfun.js"
	export default {
		components: {
			ImageCropper,
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				dataArr:{
					name:"小明",
					sign:"加油努力姐姐哈哈哈哈哈啊啊啊啊啊啊啊",
					zhuce:new Date(),
					sex:"男",
					birth:"1998-04-12",
					tell:'12345678978',
					email:"1601530255@qq.com"
				},
				modifyType:"",
				cropFilePath: "../../static/img/three.png",
				array: ["男", "女", "未知"],
				index: 0,
				date: currentDate,
				tempFilePath: '',
				data: "修改的内容",
				animationData: {},
				isModify: false,
				pwd: "",
				widHeight: "",
				isPwd:false
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
		onReady() {
			this.getElementStyle()
		},
		methods: {
			backOne() {
				uni.navigateBack({
					detail: 1
				})
			},
			timeChange(date){
				return myFun.detailTime(date)
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
			},
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift()
					}
				});
			},
			confirm(e) {
				this.tempFilePath = "";
				this.cropFilePath = e.detail.tempFilePath;
				uni.uploadFile({
					url: "后端地址上传图片接口地址",
					filePath: this.cropFilePath,
					name: "file",
					fileType: "image",
					//formData:{},传递参数
					success: (uploadFileRes) => {
						var backstr = uploadFileRes.data;
						//自定义操作
					},
					fail(e) {
						console.log("this is errormes " + e.message);
					},
				});
			},
			cancel() {
				console.log('canceled')
			},
			getElementStyle() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => {
					console.log("得到布局位置信息" + JSON.stringify(data));
					console.log("节点离页面顶部的距离为" + data.top);
					this.widHeight = data.height
					console.log(this.widHeight)
				}).exec();
			},
			modify(type,data,isPwd) {
				this.modifyType = type
				this.data = data
				this.isPwd = isPwd
				this.isModify = !this.isModify
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: "ease"
				})
				if (this.isModify) {
					animation.bottom(0).step()
				} else {
					animation.bottom(-this.widHeight).step()

				}
				this.animationData = animation.export()

			},
			modifySubmit() {
				this.modify()
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
		padding-top: 28rpx;
		// display: flex;
		// flex-direction: column;

		.column {
			display: flex;
			flex-direction: column;
			padding-top: 12rpx;
			width: 100%;
			// border-bottom: 1px solid $uni-border-color;
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
				margin-right: 10rpx;

				image {
					width: 28rpx;
					height: 28rpx;
				}
			}
		}
	}

	.btn2 {
		margin-top: 130rpx;
		text-align: center;
		font-size: $uni-font-size-lg;
		color: $uni-color-warning;
		line-height: 88rpx;
	}

	.modify {
		position: fixed;
		z-index: 1003;
		// top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #fff;

		.modify-header {
			border-bottom: 1px solid $uni-border-color;
			width: 100%;
			height: 88rpx;
			padding-top: var(--status-bar-height);
			display: flex;
			flex-direction: row;
			align-items: center;

			.close {
				padding-left: 32rpx;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 44px;
			}

			.title {
				flex: auto;
				text-align: center;
				font-size: 40rpx;
				color: $uni-text-color;
				line-height: 88rpx;
			}

			.define {
				padding-right: $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-color-success;
				line-height: 44px;
			}
		}

		.modify-main {
			display: flex;
			padding: $uni-spacing-col-base;
			flex-direction: column;

			.modify-pwd {
				padding: 0 20rpx;
				margin-bottom: $uni-spacing-col-base;
				height: 88rpx;
				background: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 88rpx;
			}

			.modify-content {
				padding: 16rpx 20rpx;
				flex: auto;
				width: 100%;
				box-sizing: border-box;
				height: 386px;
				background: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 44rpx;
			}
		}
	}
</style>
