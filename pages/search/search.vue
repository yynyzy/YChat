<template>
	<view class="content">
		<view class="top-bar">
			<view class="search-div">
				<image src="../../static/search/search.png" class="search-img"></image>
				<input type="search" class="search" placeholder="搜索用户/群" placeholder-style="color:#aaa;font-weight:400;"
					@input="search" />
			</view>
			<view class="top-bar-right">
				<view class="text" @tap="backOne">取消</view>
			</view>
		</view>
		<view class="main">
			<view class="search-user result">
				<view class="title" v-if="userarr.length>0">用户</view>
				<view class="list user" v-for="(item,index) in userarr" :key="index">
					<navigator url="../userHome/userHome?id=aaa" hover-class="none">
					<image :src="item.imgurl"></image>
					</navigator>
					<view class=" names">
						<view class="name" v-html="item.name"></view>
						<view class="email" v-html="item.email"></view>
				</view>
				<view class="right-bt send" v-if="item.tip==1">发消息</view>
				<view class="right-bt add"  v-if="item.tip==0">加好友</view>
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
				userarr: []
			}
		},
		onLoad() {

		},
		methods: {
			search(e) {
				this.userarr = []
				let searchVal = e.detail.value
				if (searchVal.length > 0) {
					this.searchUser(searchVal)
				}
			},
			searchUser(e) {
				let arr = datas.getFrinedLists()
				let exp=eval("/"+e+"/g")
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].name.search(e) != -1 || arr[i].email.search(e) != -1) {
						this.isFriend(arr[i])
						arr[i].imgurl = "../../static/img/" + arr[i].imgurl
						arr[i].name =arr[i].name.replace(exp,"<span style='color:#4AAAFF'>"+e+"</span>")
						arr[i].email =arr[i].email.replace(exp,"<span style='color:#4AAAFF'>"+e+"</span>")
						this.userarr.push(arr[i])
					}
				}
			},
			isFriend(e){
				let tip=0;
				let arr =datas.isFriend();
				for(let i=0;i<arr.length;i++){
					if(arr[i].friend==e.id){
						tip=1
					}
				}
				e.tip =tip
			},
			backOne(){
				uni.navigateBack({
					detail:1
				})
			}
		}
	}
</script>

曰<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		background: rgba(255, 255, 255, 0.96);

		.search-div {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			padding: 14rpx 118rpx 14rpx $uni-spacing-col-base;
			box-sizing: border-box;
		}

		.search {
			padding: 0 60rpx 0 12rpx;
			height: 60rpx;
			background: $uni-bg-color-grey;
			border-radius: 10rpx;
		}

		.search-img {
			position: absolute;
			top: 22rpx;
			right: 130rpx;
			width: 40rpx;
			height: 40rpx;
		}
	}

	.main {
		padding: 18rpx $uni-spacing-col-base;

		.result {
			// padding-top: $uni-spacing-col-base;

			.title {
				font-size: 44rpx;
				font-weight: 600;
				color: $uni-text-color;
				line-height: 60rpx;
			}

			.list {
				width: 100%;
				height: 80rpx;
				padding: 20rpx 0;

				image {
					float: left;
					width: 80rpx;
					height: 80rpx;
					border-radius: $uni-border-radius-base;
				}
			}

			.names {
				float: left;
				padding-left: $uni-spacing-col-base;
			}

			.name {
				font-size: 36rpx;
				color: $uni-text-color;
				line-height: 50rpx;
			}

			.email {
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
				line-height: 28rpx;
			}

			.right-bt {
				float: right;
				width: 120rpx;
				height: 48rpx;
				border-radius: 24rpx;
				font-size: $uni-font-size-sm;
				line-height: 48rpx;
				margin-top: 16rpx;
				text-align: center;
				
			}
			.add{
				background: $uni-color-primary;
				color: $uni-text-color;
			}
			.send{
				background: rgba(74,170,255,0.1);
				color: $uni-color-success;
			}
		}
	}
</style>
