<template>
	<div id="serviceNotice">
		<ul class="serviceNotice-notices">
			<li class="download">
				<img src="../../assets/imgs/qrcode.png" />App下载
				<span class="dowloadcode">
					<img src="../../assets/imgs/qrcode-big.png" />
				</span>
			</li>
			<!--<li class="serviceNotice-notice"><span class="serviceNotice-icon worklist"></span>服务单</li>-->
			<li class="serviceNotice-notice" @click="showPasswordDialog"><span class="serviceNotice-icon lock"></span>修改密码</li>
			<li class="serviceNotice-notice" @click="logout"><span class="serviceNotice-icon exit"></span>注销</li>
		</ul>
		<change-avatar-dialog ref="dlgAvatar"></change-avatar-dialog>
		<change-password-dialog ref="dlgPassword"></change-password-dialog>
	</div>
</template>

<script>
	import defaultAvatar from '../../assets/imgs/default_avatar.png';
	import LanguageComponent from '../Language'
	import ChangePasswordDialog from '../ChangePasswordDialog'
	import ChangeAvatarDialog from '../ChangeAvatarDialog'
	export default {
		data() {
			return {

			}
		},
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
		components: {
			'language': LanguageComponent,
			'change-avatar-dialog': ChangeAvatarDialog,
			'change-password-dialog': ChangePasswordDialog
		},
		methods: {
			logout() {
				this.$auth.logout();
			},
			showAvatarDialog() {
				this.$refs.dlgAvatar.show();
			},
			showPasswordDialog() {
				this.$refs.dlgPassword.show();
			},
		}
	}
</script>

<style lang="scss">
	#serviceNotice {
		height: 30px;
		background: #2C3033;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.serviceNotice-notices {
			margin-right: 36px;
			display: flex;
			font-size: 12px;
			color: #888888;
			cursor: pointer;
		}
		.serviceNotice-notice {
			display: flex;
			align-items: center;
		}
		.serviceNotice-notice:after {
			content: "";
			display: inline-block;
			margin: 0 16px;
			width: 1px;
			height: 16px;
			background: #555555;
		}
		.serviceNotice-notice:last-child:after {
			display: none;
		}
		.serviceNotice-icon {
			width: 9px;
			height: 9px;
			background: #f90;
			margin-right: 4px;
		}
		.worklist {
			background: url(../../assets/imgs/myworklist.png) no-repeat center;
			background-size: 100% 100%;
		}
		.lock {
			background: url(../../assets/imgs/lock.png) no-repeat center;
			background-size: 100% 100%;
		}
		.exit {
			background: url(../../assets/imgs/exit.png) no-repeat center;
			background-size: 100% 100%;
		}
		.notices-count {
			width: 21px;
			height: 16px;
			background: #03ccbb;
		}
		.download {
			display: flex;
			align-items: center;
			position: relative;
			img {
				width: 12px;
				height: 12px;
				margin-right: 2px;
			}
		}
		.download:hover {
			.dowloadcode {
				display: block;
				animation: getOut .3s;
			}
		}
		.dowloadcode {
			position: absolute;
			display: inline-block;
			width: 156px;
			height: 156px;
			top: 100%;
			left: 0;
			z-index: 21;
			display: none;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.download:after {
			content: "";
			display: inline-block;
			margin: 0 16px;
			width: 1px;
			height: 16px;
			background: #555555;
		}
		@keyframes getOut {
			from {
				top: -150px;
				opacity: 0;
			}
			to {
				top: 100%;
				opacity: 1;
			}
		}
	}
</style>