<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<view class="text" @tap="back">
					取消
				</view>
			</view>
			<view class="top-bar-center">
				<view class="title">
					创建群聊
				</view>
			</view>
			<view class="top-bar-right">
				<view class="pice">
				</view>
			</view>
		</view>
		<view class="main">
			<view class="top">


				<view class="group-img">
					<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
					<image src="../../static/group/change.png" class="pan" @tap="upload"></image>
					<image :src="cropFilePath" @tap="upload" class="img"></image>
				</view>

				<view class="group-name">
					<input class="group-name-input" type="text" placeholder="为群取个名字"
						placeholder-style="color:#aaa;font-weight:400;" v-model="name" />
				</view>
				<view class="title">
					用户
				</view>
			</view>
			<view class="friends">

				<view class="user" v-for="(item,index) in user" :key="index" @tap="selectFriend(index)">
					<view class="selected" :class="{isselected:item.selected}">
						<image src="../../static/group/choose.png" v-if="item.selected" class="selected-img"></image>
					</view>
					<image :src="item.imgurl" class="user-img"></image>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="bottom-btn btn1" :class="{noselecte:selec}">
				创建（{{selectedn}}）
			</view>
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	export default {
		components: {
			ImageCropper,
		},
		data() {
			return {
				tempFilePath: '',
				cropFilePath: "../../static/group/group.png",
				user: [{
						selected: false,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: true,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: true,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: false,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: false,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: true,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: true,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: false,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					}, {
						selected: false,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: true,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: true,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: false,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: false,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: true,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: true,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					},
					{
						selected: false,
						imgurl: '../../static/img/one.png',
						name: '这里哪里'
					}
				],
				selectedn: 0,
				name:''
			}
		},
		computed: {
			selec() {
				if (this.selectedn > 0&& this.name.length>0) {
					
					return false
				} else {
				return true
				}

			}
		},
		onLoad() {
			this.selectedNumber()
		},
		methods: {
			selectedNumber() {
				for (let i = 0; i < this.user.length; i++) {
					if (this.user[i].selected) {
						this.selectedn++
					}
				}
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
				console.log('cancel')
			},
			selectFriend(e) {
				if (this.user[e].selected) {
					this.user[e].selected = false
					this.selectedn--
				} else {
					this.user[e].selected = true
					this.selectedn++
				}
			}

		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		background: rgba(255, 255, 255, 1);
		border-bottom: 1px solid $uni-border-color;
	}

	.main {

		display: flex;
		flex-direction: column;

		.top {
			padding-top: 148rpx;
			position: fixed;
			background-color: #fff;
			width: 100%;
			z-index: 100;
		}

		.group-img {
			margin: 0 auto;
			width: 196rpx;
			height: 196rpx;
			background: $uni-color-primary;
			box-shadow: 0 36rpx 40rpx 0 rgba(39, 40, 50, 0.1);
			border-radius: 40rpx;
			overflow: hidden;

			position: relative;

			.img {
				width: 196rpx;
				height: 196rpx;
			}

			.pan {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				width: 56rpx;
				height: 56rpx;
				margin: auto;
			}
		}

		.group-name {
			padding: 62rpx $uni-spacing-col-base 0;
		}

		.group-name-input {
			text-align: center;
			height: 92rpx;
			background: $uni-bg-color-grey;
			border-radius: 46rpx;
			font-size: 32rpx;
			color: $uni-text-color;
		}

		.title {
			padding: $uni-spacing-col-base $uni-spacing-row-base 20rpx;
			font-size: 44rpx;
			font-weight: 600;
			color: $uni-text-color;
			line-height: 60rpx;
		}

		.friends {
			padding: 600rpx $uni-spacing-row-base 100rpx;

			.title {
				padding-top: $uni-spacing-row-base;
				font-size: 44rpx;
				font-weight: 600;
				color: $uni-text-color;
				line-height: 60rpx;
			}

			.user {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 120rpx;

				.selected {
					flex: none;
					width: 48rpx;
					height: 48rpx;
					background: rgba(255, 228, 49, 0.5);
					border-radius: 24rpx;
					margin-right: 30rpx;
					position: relative;

					.selected-img {
						width: 30rpx;
						height: 20rpx;
						position: absolute;
						left: 10rpx;
						top: 16rpx;
					}
				}

				.isselected {
					background: rgba(255, 228, 49, 1);
				}

				.user-img {
					width: 80rpx;
					height: 80rpx;
					border-radius: $uni-border-radius-base;
				}

				.name {
					padding-left: 32rpx;
					font-size: 36rpx;
					font-weight: 400;
					color: $uni-text-color;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}
		}


	}

	.group-img {
		margin: 0 auto;
		width: 196rpx;
		height: 196rpx;
		background: #FFE431;
		box-shadow: 0 36rpx 40rpx 0 rgba(39, 40, 50, 0.1);
		border-radius: 40rpx;
	}

	.bottom-bar {
		background: rgba(250, 250, 250, 0.9);
		box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.25);

		.bottom-btn {
			background: $uni-color-primary;
			margin: 0 $uni-spacing-col-base;
		}

		.noselecte {
			background: $uni-bg-color-grey;
		}
	}
</style>
