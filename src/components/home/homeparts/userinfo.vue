<template>
	<div class="user-box" id="userinfo">
		<div class="userinfo-title">个人资料</div>
		<div class="private-info">
			<div class="userinfo-info">
				<dl class="userinfo-user">
					<dt class="userinfo-headpic">
						<img :src="avatarUrl || defaultAvatar"/>
					</dt>
					<dt class="user-name">
						{{$store.state.user.userName}}
					</dt>
					<dd class="userinfo-tags">
						<span class="product-line">
							配件押金、保证金打款帐户：
						</span>
						<span class="product-line" @click="showAccount(1)">
							<img src="../../../assets/imgs/familyconditon.png" />
							<span class="product-name">家用空调</span> （39402001040027700）
						</span>
						<span class="product-line" @click="showAccount(0)">
							<img src="../../../assets/imgs/airconditioner.png" />
							<span class="product-name">中央空调</span> （3901020019000060010）
						</span>
						<span class="product-line" @click="showAccount(2)">
							<img src="../../../assets/imgs/ketch.png" />
							<span class="product-name">厨电</span> （39402001040028823）
						</span>
					</dd>
				</dl>
			</div>
			<div class="worker-info">
				<div class="worker-num">
					<span class="worker-count">25</span>
					<span class="dashed-line"></span>
					<span class="worker-count">30</span>
				</div>
				<div class="worker-types">
					<span class="worker-type">当前活跃工人数<img src="../../../assets/imgs/arrow-up-fff.png" /></span>
					<span class="worker-type">工人总数<img src="../../../assets/imgs/arrows.png"/></span>
				</div>
			</div>
		</div>
		<!--<div class="policy"></div>-->
		<policy></policy>
		<div class="mask" v-if="flag">
			<div class="dialog">
				<div class="title">
					<div class="title-left">
						<span class="title-icon"></span>
						<span>{{selectDta.title}}</span>
					</div>
					<button class="close el-icon-close" @click.stop="closeMask"></button>
				</div>
				<ul class="account">
					<li class="infobox"><span class="head">名称：</span><span class="account-content">{{selectDta.name}}</span></li>
					<li class="infobox"><span class="head">纳号：</span><span class="account-content">{{selectDta.nahao}}</span></li>
					<li class="infobox"><span class="head">地址：</span><span class="account-content">{{selectDta.address}}</span></li>
					<li class="infobox"><span class="head">电话：</span><span class="account-content">{{selectDta.phone}}</span></li>
					<li class="infobox"><span class="head">开户行：</span><span class="account-content">{{selectDta.bank}}</span></li>
					<li class="infobox"><span class="head">账号：</span><span class="account-content">{{selectDta.account}}</span></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import defaultAvatar from '../../../assets/imgs/default_avatar.png';
	import policy from "./policy"
	export default {
		data() {
			return {
				flag:false,
				defaultAvatar: defaultAvatar,
				dataLists:[{
					title:'商用空调公司配件押金打款账号：',
					name:'宁波市奥克斯电气股份有限公司',
					nahao:'91330200750364874C',
					address:'宁波市鄞州区姜山镇明光北路1166号',
					phone:'0574-88072461',
					bank:'中国工商银行宁波市分行营业部',
					account:'3901020019000060010',
					bannum:'102332002006'
				},{
					title:'家用空调公司配件押金打款账号：',
					name:'奥克斯空调股份有限公司',
					nahao:'91330200MA283665X6',
					address:'浙江省宁波市鄞州区姜山镇明光北路1166号',
					phone:'0574-88072685',
					bank:'中国农业银行股份有限公司宁波鄞州分行营业部',
					account:'39402001040027700',
					bannum:''
				},{
					title:'厨电公司配件押金打款账号：',
					name:'宁波奥克斯厨房电器有限公司',
					nahao:'91330201MA292M0F2G',
					address:'浙江省宁波市江北区慈城镇随园街98弄16号255幢2+1-2-58室',
					phone:'0574-88072541',
					bank:'农行鄞州分行营业部',
					account:'39402001040028823',
					bannum:''
				},],
				selectDta:{}
			}
		},
		components: {
			policy
		},
		props: ["userInfo"],
			computed: {
					user() {
						return this.$store.state.user;
					},
					avatarUrl() {
						var avatarUrl = this.$store.state.user.avatarUrl;
						if(rt.isNullOrWhiteSpace(avatarUrl)) {
							return null;
						}
		
						return rt.getBaseUrl() + avatarUrl;
					}
				},
		created() {

		},
		mounted() {

		},
		methods:{
			showAccount(index){
				let body = document.getElementsByTagName("body")[0];
				body.style.overflow = "hidden";
				this.selectDta = this.dataLists[index];
				this.flag = true;
			},
			closeMask(){
				let body = document.getElementsByTagName("body")[0];
				body.style.overflow = "auto";
				this.flag = false;
			}
		}
	}
</script>

<style lang="scss">
	#userinfo {
		position: relative;
		height: 180px;
		background: #F1F2F6;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		.mask {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 20;
			background: rgba(0, 0, 0, .4);
		}
		.dialog {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 611px;
			height: 351px;
			background: white;
		}
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 85px;
		}
		.title-left {
			display: flex;
			align-items: center;
			margin-left: 10px;
			font-size: 16px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #222222;
		}
		.title-icon {
			width: 4px;
			height: 20px;
			background: #468FF9;
			margin-right: 16px;
		}
		.close {
			width: 40px;
			height: 40px;
			background: #F3F3F3;
			border-radius: 50%;
			color: #888888;
			font-size: 13px;
			border: none;
			outline: none;
			margin-right: 17px;
			cursor: pointer;
		}
		.account {
			width: 551px;
			margin: 0 auto;
			background: #F6F7FB;
		}
		.infobox {
			width: calc(100% - 50px);
			margin: 0 auto;
			height: 40px;
			border-bottom: 1px solid #EBEBEB;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.infobox:last-child{
			border: none;
		}
		.head {
			width: 56px;
			color: #888888;
			font-size: 14px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			text-align: right;
		}
		.account-content {
			width: calc(100% - 56px);
			font-size: 14px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #222222;
			text-indent: 16px;
		}
		.user-name {
			display: flex;
			align-items: center;
			font-size: 16px;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #555555;
			padding: 0 20px;
			border-right: 1px dashed #D6E9F9;
		}
		.userinfo-title {
			position: absolute;
			top: 19px;
			left: 30px;
			font-size: 16px;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #222222;
		}
		.private-info {
			width: 68.3%;
			height: 100%;
			margin-right: 10px;
			background: white;
			box-sizing: border-box;
			padding-top: 64px;
			display: flex;
			justify-content: space-between;
		}
		.userinfo-user {
			margin-left: 48px;
			display: flex;
		}
		.userinfo-headpic {
			width: 78px;
			height: 78px;
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
		span.product-name {
			color: #468FF9;
			margin: 0 3px;
		}
		span.product-line {
			display: flex;
			align-items: center;
			cursor: pointer;
		}
		span.product-line:first-child{
			cursor: default;
		}
		.user-tag {
			background: rgba(70, 143, 249, .1);
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: #468FF9;
			padding: 5.5px 16px;
			margin-left: 17px;
		}
		.userinfo-tags {
			margin-left: 20px;
			font-size: 12px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #888888;
			display: flex;
			flex-direction: column;
			justify-content: center;
			/*.product-line:nth-child(2) {
				margin: 8px 0;
			}*/
			.product-line{
				margin-top: 10px;
			}
			.product-line:nth-child(1){
				margin: 0;
			}
		}
		.userinfo-tag {
			margin-top: 16px;
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
		}
		.enterprise-name {
			color: #054994;
		}
		.worker-num {
			display: flex;
			justify-content: center;
			align-items: center;
			.worker-count {
				display: inline-block;
				width: 36px;
				height: 36px;
				border-radius: 50%;
				background: #468FF9;
				text-align: center;
				line-height: 36px;
				font-size: 20px;
				font-family: HYXiaoBoDunHeiW;
				font-weight: 400;
				color: white;
			}
			.worker-count:nth-child(3) {
				background: rgba(70, 143, 249, .2);
			}
		}
		.dashed-line {
			width: 82px;
			border-bottom: 1px dashed #DDDDDD;
			margin: 0 40px;
		}
		.worker-type {
			display: inline-block;
			width: 125px;
			height: 32px;
			background: #468FF9;
			border-radius: 16px;
			font-size: 12px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				height: 6px;
				margin-left: 4px;
			}
		}
		.worker-type:nth-child(2) {
			background: white;
			color: #468FF9;
			box-sizing: border-box;
			border: 1px solid #DAE9FE;
			margin-left: 80px;
		}
		.worker-types {
			display: flex;
			margin-top: 6px;
		}
		.worker-info {
			margin-right: 40px;
		}
	}
</style>