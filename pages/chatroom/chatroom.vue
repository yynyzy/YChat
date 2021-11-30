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
		<scroll-view scroll-y="true" class="chat" scroll-with-animation="true" :scroll-into-view="scrollToView">
			<view class="chat-main">
				<view class="chat-ls" v-for="(item,index) in msgs" :key="index" :id ="'msg'+ item.tip">
					<view class="chat-time" v-if="item.time !==''">
					{{changeTime(item.time)}}
					</view>
					<view class="msg-m msg-left" v-if="item.id !='b'">
						<image :src="item.imgurl" class="user-img"></image>
						<view class="message" v-if="item.types==0">
							<view class="msg-text" >
									{{item.message}}
							</view>
						</view>
						<view class="message"  v-if="item.types==1">
							<image :src="item.message" mode="widthFix" class="msg-img" @tap="previewImage"></image>
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.id =='b'">
						<image :src="item.imgurl"  class="user-img"></image>
						<view class="message" v-if="item.types==0">
							<view class="msg-text" >
									{{item.message}}
							</view>
						</view>
						<view class="message"  v-if="item.types==1">
							<image :src="item.message" mode="widthFix" class="msg-img" @tap="previewImage(item.message)"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="padbt">
				
			</view>
		</scroll-view>
		<submit></submit>
	</view>
</template>

<script>
	import datas from "../../commons/js/datas.js"
	import myfun from "../../commons/js/myfun.js"
	
	import submit from "../../components/submit/submit.vue"
	export default {
		data() {
			return {
				msgs: [],
				imgMsg:[],
				oldTime:new Date(),
				scrollToView:''
			}
		},
		onLoad() {
			this.getMsg()
		},
		comments:{
			submit
		},
		methods: {
			backOne() {
				uni.navigateBack({
					detail: 1
				})
			},
			changeTime(date){
				return myfun.dateTime1(date)
			},
			getMsg(){
				let msg = datas.message()
				for(let i =0;i<msg.length;i++){
					msg[i].imgurl='../../static/img/'+msg[i].imgurl
					if(i<msg.length-1){
						let t =myfun.spaceTime(this.oldTime,msg[i].time)
						if(t){
							this.oldTime =t
						}
						msg[i].time =t
					}
					if(msg[i].types==1){
						msg[i].message='../../static/img/'+msg[i].message
						this.imgMsg.unshift(msg[i].message)
					}
					this.msgs.unshift(msg[i])
				}
				this.$nextTick(function(){
					let len = this.msgs.length
					this.scrollToView='msg'+this.msgs[len-1].tip
				})
			},
			previewImage(currentUrl){
				uni.previewImage({
					current:currentUrl,
				           urls: this.imgMsg,
				           longPressActions: {
				               itemList: ['发送给朋友', '保存图片', '收藏'],
				               success: function(data) {
				                   console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				               },
				               fail: function(err) {
				                   console.log(err.errMsg);
				               }
				           }
				       });
			}
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
.padbt{
	height: var(--status-bar-height);
	width: 100%;
}
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
				.msg-img{
					max-width: 400rpx;
				border-radius: $uni-border-radius-base;
				}
			}

			.msg-left {
				flex-direction: row;

				.msg-text {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}
				.msg-img{
					margin-left: 16rpx;
				}
			}

			.msg-right {
				flex-direction: row-reverse;

				.msg-text {
					margin-right: 16rpx;
					background-color: #fff260;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}
				.msg-img{
				margin-right: 16rpx;
				}
			}
		}
	}
</style>
