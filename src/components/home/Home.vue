<template>
	<div id="home">
		<!--<div class="user-box">
			<div class="private-info"></div>
			<div class="policy"></div>
		</div>-->
		<user-info v-bind:userInfo="userInfo"></user-info>
		<index-get></index-get>
		<div class="box">
			<!--<fee-info></fee-info>-->
			<!--<index-get></index-get>-->
			<part-info></part-info>
			<assessment></assessment>
		</div>

		<!--<part-info></part-info>-->

		<div class="chart-box">
			<div class="justamark">本年：</div>
			<div class="title-box">
				<div class="detail">费用明细</div>
				<ul class="navs">
					<li class="nav" v-bind:class="{'active':selectName=='家用空调'}" @click="showDetaile('家用空调')">家用空调</li>
					<li class="nav" v-bind:class="{'active':selectName=='中央空调'}" @click="showDetaile('中央空调')">中央空调</li>
					<li class="nav" v-bind:class="{'active':selectName=='厨电'}" @click="showDetaile('厨电')">厨电</li>
					</li>
				</ul>
			</div>
			<div class="conditioner-types">
				<dl class="conditioner" @click="showStatus(1)" v-bind:class="{'select':newType==1}" >
					<dt class="conditioner-type">安装费</dt>
					<dd class="conditioner-count">
						<span class="conditioner-symbol">￥</span>{{countShow.Yearonyeara*1}}
					</dd>
					<dd class="trend">
						<span class="none" v-if="countShow.Yearonyeara*1 == 0">
							- -
						</span>
						<img src="../../assets/imgs/upper.png" v-if="countShow.Yearonyeara*1 >0" />
						<img src="../../assets/imgs/lower.png" v-if="countShow.Yearonyeara*1 <0"/>
					</dd>
				</dl>
				<dl class="conditioner" @click="showStatus(2)"  v-bind:class="{'select':newType==2}">
					<dt class="conditioner-type">维修费</dt>
					<dd class="conditioner-count">
						<span class="conditioner-symbol">￥</span>{{countShow.Yearonyearw*1}}
					</dd>
					<dd class="trend">
						<!--<img src="../../assets/imgs/upper.png" />-->
						<span class="none" v-if="countShow.Yearonyearw == 0">
							- -
						</span>
						<img src="../../assets/imgs/upper.png" v-if="countShow.Yearonyearw >0" />
						<img src="../../assets/imgs/lower.png" v-if="countShow.Yearonyearw <0"/>
					</dd>
				</dl>
				<dl class="conditioner">
					<dt class="conditioner-type">补贴额-0元装</dt>
					<dd class="conditioner-count">
						<span class="conditioner-symbol">￥</span>{{countShow.new_first_basicexpa*1}}
					</dd>
					<dd class="trend">
						<!--<img src="../../assets/imgs/lower.png" />-->
						<span class="none" v-if="countShow.new_first_basicexpa*1 == 0">
							- -
						</span>
						<img src="../../assets/imgs/upper.png" v-if="countShow.new_first_basicexpa*1 >0" />
						<img src="../../assets/imgs/lower.png" v-if="countShow.new_first_basicexpa*1 <0"/>
					</dd>
				</dl>
				<dl class="conditioner">
					<dt class="conditioner-type">补贴额-辅材补</dt>
					<dd class="conditioner-count">
						<span class="conditioner-symbol">￥</span>{{countShow.new_first_basicexpw*1}}
					</dd>
					<dd class="trend">
						<!--<img src="../../assets/imgs/lower.png" />-->
						<span class="none" v-if="countShow.new_first_basicexpw*1 == 0">
							- -
						</span>
						<img src="../../assets/imgs/upper.png" v-if="countShow.new_first_basicexpw*1 >0" />
						<img src="../../assets/imgs/lower.png" v-if="countShow.new_first_basicexpw*1 <0"/>
					</dd>
				</dl>
			</div>
			<div class="chart-container"></div>
		</div>
	</div>
</template>

<script>
import defaultAvatar from '../../assets/imgs/default_avatar.png';
import userInfo from './homeparts/userinfo';
import partInfo from './homeparts/parts-info';
import feeInfo from './homeparts/feeInfo';
import indexView from './homeparts/indexView';
import indexGet from './homeparts/index-get';
import assessment from './homeparts/assessment';
import { getOption } from '../../store/publicFucs';
const http = 'http://47.96.95.146:8055/';
export default {
    data() {
        return {
            defaultAvatar: defaultAvatar,
            UserName: '',
            userInfo: {},
            showFlag: false,
            productLine: [],
            selectName: '家用空调',
            countShow: {},
			newType:1,
        };
    },
    components: {
        userInfo,
        partInfo,
        feeInfo,
        indexView,
        indexGet,
        assessment
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        avatarUrl() {
            var avatarUrl = this.$store.state.user.avatarUrl;
            if (rt.isNullOrWhiteSpace(avatarUrl)) {
                return null;
            }

            return rt.getBaseUrl() + avatarUrl;
        }
    },
    created() {
        /* console.log(Base64,123) */
        this.userInfo = {
            UserName: this.$store.state.user.nickName,
            headPic: this.defaultAvatar || this.avatarUrl()
        };
        this.showDetaile(this.selectName);
        this.getChartData(this.selectName);
        
    },
    mounted: function() {
        this.UserName = this.$store.state.user.nickName;
    },
    methods: {
        errorAvatar() {
            this.avatarUrl = null;
            this.$store.commit('UPDATE_USER_AVATAR', null);
        },
        drawLine(option) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementsByClassName('chart-container')[0]);
            // 绘制图表
            myChart.setOption(option);
        },
        showDetaile(name) {
            let params = {
                name: name,
            };
            this.selectName = name;
            rt.get('../api/Index/getmoneydata', params)
                .then(res => {
                    this.countShow = res;
                })
                .catch(err => {});
            this.getChartData(name);
        },
		showStatus(item){
			this.newType = item;
			this.getChartData(this.selectName);
		},
        getChartData(name) {
            let params = {
                name: name,
				new_type: this.newType
            };
            rt.get('../api/Index/Databoard', params)
                .then(res => {
                    let option = getOption(res);
                    this.drawLine(option);
                })
                .catch(err => {});
        }
    }
};
</script>

<style lang="scss">
#home {
    width: 100%;
    .parts-info {
        height: 164px;
        background: white;
        position: relative;
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
    }
    .part-title {
        position: absolute;
        top: 19px;
        left: 30px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #222222;
    }
    .part-first {
        margin-left: 60px;
    }
    .part-icon {
        width: 49px;
        height: 49px;
        background: url(../../assets/imgs/first-capital.png) no-repeat center;
        background-size: 100% 100%;
    }
    dl.border {
        height: 70px;
        border-right: 1px dashed #dddddd;
        margin: 0 10px;
    }
    .moneycount {
        color: #468ff9;
        font-size: 24px;
        font-weight: 400;
    }
    .money-icon {
        font-size: 18px;
    }
    .money-describe {
        font-size: 12px;
        color: #888888;
        text-align: center;
        margin-top: 16px;
    }
    .getmorebtn {
        width: 150px;
        height: 34px;
        background: #468ff9;
        border-radius: 2px;
        border: 0;
        color: white;
        font-size: 14px;
        cursor: pointer;
        margin-right: 50px;
    }
    .hascolor {
        color: #ffa604;
    }
    .box {
        width: 100%;
        height: 164px;
        margin-top: 10px;
        background: #f1f2f6;
        display: flex;
    }
    .feeinfo {
        position: relative;
        width: 32.7%;
        height: 100%;
        background: white;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
    }
    .feeinfo:first-child {
        margin-right: 10px;
    }
    .assessment {
        margin-left: 10px;
    }
    .top {
        position: relative;
        height: 56px;
    }
    .subsidy,
    .arrow-right {
        position: absolute;
        top: 20px;
        right: 35px;
        color: #468ff9;
        font-size: 14px;
        span {
            font-size: 12px;
        }
    }
    .arrow-right {
        color: #888888;
    }
    .middle {
        display: flex;
        justify-content: space-between;
        width: calc(100% - 40px);
        margin: 0 auto;
    }
    .status1,
    .status2 {
        font-size: 14px;
        color: #888888;
        text-align: center;
        font-weight: 400;
        margin: 16px 0;
    }
    .status-money {
        font-size: 24px;
        font-family: MicrosoftYaHei;
        text-align: center;
        font-weight: 400;
        color: #222222;
        margin-bottom: 20px;
    }
    .money-symbol {
        font-size: 18px;
    }
    .bottom {
        display: flex;
        flex: 1;
        width: calc(100% - 60px);
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #222222;
    }
    .invoice,
    .sendtype {
        font-size: 12px;
    }
    .sendtype {
        color: #ffba00;
    }
    .assessment-index {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .assessment-index:first-child {
        border-right: 1px dashed #dddddd;
    }
    .reward {
        color: #888888;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
    }
    .arrows {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 11px;
            height: 16px;
        }
    }
    .half {
        width: 50%;
        padding-top: 20px;
    }
    .index-querry {
        display: flex;
        flex: 1;
        flex-direction: column;
        border-radius: 2px;
        background: white;
        position: relative;
    }
    .user-info {
        display: flex;
        padding-top: 56px;
        flex: 1;
        align-items: center;
        justify-content: center;
        background: white;
        .el-icon-star-on {
            color: #ffa604;
            margin-right: 6px;
        }
    }
    .head-portrait {
        width: 78px;
        height: 78px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .score-info {
        height: 78px;
        margin-left: 10px;
        align-items: stretch;
        p {
            margin-top: 8px;
        }
    }
    .person-name {
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #222222;
        margin-right: 8px;
    }
    .score {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #888888;
    }
    .remaining-score {
        color: #ffa604;
    }
    .hardwork {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #555555;
    }
    .negative-info {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #ff0000;
    }
    .negative1,
    .negative2 {
        background: rgba(255, 0, 0, 0.1);
        padding: 2px 6px;
        border-radius: 10px;
        cursor: pointer;
    }
    .negative2 {
        background: rgba(236, 114, 24, 0.1);
        color: #ec7218;
    }
    .icon-font {
        font-size: 10px;
        margin-left: 4px;
    }
    .chart-box {
        height: 596px;
        margin-top: 10px;
        background: white;
        position: relative;
    }
    .justamark {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #888888;
        position: absolute;
        top: 115px;
        left: 116px;
    }
    .index-chart {
        position: relative;
    }
    .chart-title {
        height: 56px;
        width: 100%;
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 18;
    }
    .conditioner-types {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 257px;
    }
    .conditioner {
        width: 191px;
        height: 137px;
		padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        cursor: pointer;
        border-radius: 2px;
    }
    .conditioner:last-child {
        .trend {
            margin-top: 12px;
        }
    }
	.conditioner.select{
        background: #f6f7fb;
    }
    .conditioner:hover {
        background: #f6f7fb;
    }
    .none {
        display: block;
        height: 16px;
        color: #888888;
    }
    .conditioner-type {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        font-size: #888;
    }
    .conditioner-count,
    .trend {
        margin-top: 20px;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        font-size: #222;
    }
    .trend {
        img {
            width: 11px;
            height: 16px;
        }
    }
    .conditioner-symbol {
        font-size: 18px;
    }
    .chart-container {
        width: calc(100% - 60px);
        height: 298px;
        margin: 0 auto;
        background: #f6f7fb;
    }
    .index-get {
        display: flex;
        justify-content: space-between;
        width: calc(100% - 40px);
        margin: 0 auto;
        margin-top: 18px;
        .negative1 {
            color: #ff0000;
            font-size: 14px;
        }
        .negative2 {
            font-size: 14px;
        }
        img {
            width: 11px;
            height: 16px;
        }
    }
    .index-title {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #888888;
        display: flex;
        align-items: flex-end;
    }
    .low-season,
    .busy-season {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #222;
    }
    .percent {
        font-size: 18px;
    }
    .percent-bar {
        height: 20px;
        background: #f1f2f6;
        overflow: hidden;
        border-radius: 10px;
        display: flex;
        position: relative;
        .percent1 {
            display: flex;
            border-radius: 10px;
            background: #ffba00;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: white;
        }
        .pecent-line {
            width: 1px;
            height: 100%;
            position: absolute;
            background: #ffba00;
            top: 0;
            left: 85%;
        }
    }
    .percent-blue {
        .percent1 {
            background: #468ff9;
        }
        .pecent-line {
            background: white;
        }
    }
    .resolution-rate {
        margin-left: 10px;
    }
    .percent-count {
        margin-right: 10px;
    }
    .lower {
        margin-right: 20px;
    }
    #parts-info,
    #index-get,
    .chart-box {
        display: flex;
        flex-direction: column;
        .title-box {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 56px;
            position: relative;
        }
        .content {
            display: flex;
            flex: 1;
            justify-content: space-between;
            box-sizing: border-box;
            width: 100%;
            padding: 0 80px;
            box-sizing: border-box;
            padding-top: 23px;
        }
        .detail {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #222222;
            margin-left: 30px;
            margin-right: 21px;
        }
        .nvas {
        }
        .nav {
            float: left;
            width: 120px;
            height: 34px;
            border: 1px solid #e5e5e5;
            background: white;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #5a98f3;
            text-align: center;
            line-height: 34px;
            border-right: none;
            cursor: pointer;
        }
        .nav:hover {
            background: #5a98f3;
            color: white;
            border-color: #5a98f3;
        }
        .nav.active {
            background: #5a98f3;
            color: white;
            border-color: #5a98f3;
        }
        .nav:first-child {
            border-radius: 2px 0 0 2px;
        }
        .nav:last-child {
            border-right: 1px solid #e5e5e5;
            border-radius: 0 2px 2px 0;
        }
        .getSaftyInfo {
            color: #888888;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            cursor: pointer;
            background: none;
            border: none;
            outline: none;
            position: absolute;
            right: 30px;
            top: 21px;
            .el-icon-arrow-right {
                font-size: 11px;
                color: #535353;
                margin-left: 10px;
            }
        }
    }
    .ifo {
        display: inline-block;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        font-size: 18px;
        background: #dddddd;
        font-family: '宋体';
        font-weight: 600;
        line-height: 24px;
        text-align: center;
        color: #555555;
        position: relative;
        background: url(../../assets/imgs/ifo.png) no-repeat center;
        left: 0;
        top: 0;
    }
    .ifo:hover {
        .showstatus {
            display: block;
        }
    }
    .showstatus {
        position: absolute;
        color: white;
        top: 100%;
        left: 0;
        text-align: left;
        white-space: nowrap;
        font-size: 14px;
        font-weight: 400;
        font-family: '微软雅黑';
        background: rgba(0, 0, 0, 0.4);
        padding: 10px 20px;
        display: none;
        border-radius: 4px;
    }
}
/*库存和费用信息样式*/

#parts-info,
#feeinfo {
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        z-index: 20;
        opacity: 0.3;
        display: none;
    }
    .show {
        display: block;
    }
}
/*弹窗样式*/

#feeDialog,
#partdialog {
    position: fixed;
    width: 960px;
    height: 654px;
    left: calc(50% - 480px);
    top: calc(50% - 327px);
    background: white;
    z-index: 21;
    display: none;
    border-radius: 2px;
    .title {
        height: 68px;
        box-sizing: border-box;
        padding-left: 10px;
        padding-right: 17px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        display: flex;
        align-items: center;
        position: relative;
    }
    .partdialog-icon {
        display: inline-block;
        width: 4px;
        height: 20px;
        background: #468ff9;
        border-radius: 2px;
        margin-right: 27px;
    }
    .close {
        width: 40px;
        height: 40px;
        color: #888888;
        background: #f3f3f3;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        position: absolute;
        top: calc(50% - 20px);
        right: 12px;
        cursor: pointer;
    }
    .parts-section {
        height: calc(100% - 132px);
        overflow: auto;
        box-sizing: border-box;
        padding-left: 39px;
        padding-right: 40px;
    }
    .parts-table {
        width: 100%;
    }
    .part-infomation {
        height: 73px;
        border-bottom: 1px solid #f0f0f0;
    }
    .part-infomation:nth-child(even) {
        background: #f8f9fc;
    }
    .part-infomation:hover {
        background: #f8f9fc;
    }
    .part-name {
        width: 50%;
        vertical-align: middle;
        color: #468ff9;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
    }
    .now-has,
    .safty-has {
        width: 17%;
        vertical-align: middle;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #555555;
    }
    .has-color {
        color: #ffba00;
        font-size: 18px;
    }
    .has-color,
    .btn-td {
        width: 16%;
        vertical-align: middle;
    }
    .has-apply,
    .go-apply {
        display: inline-block;
        width: 120px;
        height: 34px;
        background-color: #468ff9;
        color: white;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        text-align: center;
        line-height: 34px;
        border-radius: 17px;
        box-sizing: border-box;
    }
    .go-apply {
        border: 1px solid #468ff9;
        color: #468ff9;
        background: #ecf4fe;
    }
    .btns {
        height: 64px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .reset,
    .quick-apply {
        height: 44px;
        width: 366px;
        background: #f8f8f8;
        color: #cccccc;
        border: none;
        margin-right: 39px;
        border-radius: 2px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        cursor: pointer;
    }
    .quick-apply {
        margin-right: 40px;
        width: 535px;
        background: #468ff9;
        color: white;
    }
}
</style>
