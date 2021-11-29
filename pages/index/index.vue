<template>
	<view class="content">
		<view class="top-bar">
			<navigator url="../userHome/userHome?id=aaa" hover-class="none" class="top-bar-left">
				<image src="../../static/img/four.png" class="my-img"></image>
			</navigator>
			<view class="top-bar-center">
				<image class="logo" src="../../static/index/logo.png"></image>
			</view>
			<view class="top-bar-right">
				<view class="search" @tap="toSearch">
					<image src="../../static/index/search.png"></image>
				</view>
				<view class="add">
					<image src="../../static/index/add.png"></image>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="apply"></view>
			<view class="friends">
				<view class="friend-list" v-for="(item,index) in friends" :key="item.id">
					<view class="friend-list-l">
						<text class="tip" v-if="item.tip>0">{{item.tip<99?item.tip:"99+"}}</text>
						<image :src="item.img"></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">{{item.name}}</view>
							<view class="time">{{changeTime(item.time)}}</view>
						</view>
						<view class="news">{{item.news}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import datas from "../../commons/js/datas.js"
	import myfun from "../../commons/js/myfun.js"
	export default {
		data() {
			return {
				friends: []
			}
		},
		onLoad() {
			this.getFriends()
		},
		methods: {
			changeTime: function(data) {
				return myfun.dateTime(data)
			},
			getFriends: function() {
				this.friends = datas.getFrinedLists()
				for (let i = 0; i < this.friends.length; i++) {
					this.friends[i].img = "../../static/img/" + this.friends[i].imgurl
				}
				// console.log(this.friends)
			},
			toSearch: function() {
				uni.navigateTo({
					url: "../search/search"
				})
			}
		}
	}
</script>

曰<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
	background: rgba(255, 255, 255, 0.96);	
		border-bottom:1px solid $uni-border-color;

	}

	.main {
		padding-top: 104rpx;
		padding-bottom: $uni-spacing-col-base
	}

	.friend-list {
		height: 96rpx;
		padding: 16rpx $uni-spacing-col-base;

		&:active {
			background-color: $uni-bg-color-grey;
		}

		.friend-list-l {
			position: relative;
			float: left;

			image {
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
				background-color: $uni-color-primary
			}

			.tip {
				position: absolute;
				z-index: 10;
				top: -6rpx;
				left: 68rpx;
				min-width: 36rpx;
				height: 36rpx;
				background: $uni-color-warning;
				border-radius: $uni-border-radius-circle;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-inverse;
				line-height: 36rpx;
				text-align: center;
			}

		}

		.friend-list-r {
			padding-left: 128rpx;

			.top {
				height: 50rpx;

				.name {
					float: left;
					font-size: 36rpx;
					font-weight: 400;
					color: $uni-text-color;
					line-height: 50rpx;
				}

				.time {
					// display: none;
					float: right;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-disable;
					line-height: 50rpx;
				}
			}

			.news {
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				line-height: 40rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}
	}
</style>
