<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/common/back1.png" class="back-img"></image>
			</view>
			<view class="top-bar-center">
			</view>
			<view class="top-bar-right">
				<image src="../../static/group/more1.png"></image>
			</view>
		</view>
		<view class="bg">
			<image :src="gimg" class="bg-img" mode="aspectFill"></image>
		</view>
		<view class="main">
			<view class="main-inner">
				<view class="inf">
					<view class="name">今天很好</view>
					<view class="time">2020/11/1</view>
					<view class="notice">dasdsadasdasdsadsad案发时发生方法</view>
				</view>
				<view class="member">
					<view class="top">
						<view class="title">群成员</view>
						<view class="more">管理群成员</view>
						<image src="../../static/common/more.png" mode="aspectFill" class="more-img"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from "../../commons/js/datas.js"
	export default {
		data() {
			return {
				uid: '',
				gid:"",
				token: '',
				gimg: "",
				gid: "",
				groupmember:[]
			}
		},
		onLoad(e) {
			this.gid =e.gid;
			this.gimg=e.gimg;
			this.getMember()
		},
		methods: {
			backOne() {
				uni.navigateBack({
					detail: 1
				})
			},
			getStorages: function() {
				try {
					const value = uni.getStorageSync('user')
					if (value) {
						this.uid = value.id
						this.imgurl = this.serverUrl + value.imgurl
						this.token = value.token
						this.uname = value.name

					} else {
						uni.navigateTo({
							url: '../signin/signin'
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			//获取群成员
			getMember:function(){
				let members =datas.getFrinedLists()
				for(let i =0;i<members.length;i++){
					members[i].imgurl="../../static/img/"+members[i].imgurl
					this.groupmember.push(members[i])
				}
			}
		}
	}
	
	let a =[
		{id:{},name:"item1"},
		{id:5,name: "item2"},
		{id:"2",name:"item3"},
		{id:3,name:"item4"},
		{id:1,name:"item5"},
	]
	console.log(a)
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar-center {
		z-index: -100;
	}

	.bg {
		width: 100%;
		height: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;

		.bg-img {
			width: 100%;
			height: 750rpx;
		}
	}

	.main {
		padding-top: 360rpx;

		.main-inner {
			width: 100%;
			background-color: #fff;
			border-radius: 40rpx 40rpx 0 0;


			.inf {
				padding: $uni-spacing-row-base $uni-spacing-col-base 0;
				padding-bottom: 40rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;

				.name {
					float: left;
					font-size: 48rpx;
					font-weight: 600;
					color: #272832;
					line-height: 66rpx;
				}

				.time {
					float: right;
					font-size: 28rpx;
					color: rgba(39, 40, 50, 0.5);
					line-height: 66rpx;
				}

				.notice {
					padding-top: 20rpx;
					font-size: 28rpx;
					color: #272832;
					line-height: 40rpx;
					clear: both;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}

		.member {
			border-bottom: 1px solid #eee;

			.top {
				padding: $uni-spacing-row-base $uni-spacing-col-base 0;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.title {
					flex: 1;
					font-size: 36rpx;
					font-weight: 600;
					color: #272832;
				}

				.more {
					float: right;
					padding-right: 20rpx;
					font-size: 32rpx;
					font-weight: 400;
					color: rgba(39, 40, 50, 0.6);
				}
				.more-img{
					
				}
			}
		}
	}
</style>
