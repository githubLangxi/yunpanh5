<template>
	<div id="policy">
		<div class="tabs">
			<span class="tab1">政策公告</span>
			<!--<span class="tab2">最新文件</span>-->
			<!-- <span class="el-icon-arrow-right"></span> -->
		</div>
		<div class="headtip">2018年11月28日 家用空调 通知开票 ¥2000</div>
		<div class="policy-lists" @click="parentClick">
			<!--<vue-seamless-scroll :data="listData" class="seamless-warp" :class-option="classOption">
				<ul class="item">
					<li class="policy-list tip" :key="index" v-for="(item,index) in listData" @click="goPolicy(item)"><span class="point"></span>{{item.title}}</li>
				</ul>
			</vue-seamless-scroll>-->
			
			<ul class="item">
					<li class="policy-list tip" :key="index" v-for="(item,index) in listData" @click="goPolicy(item)"><span class="point"></span>{{item.title}}</li>
				</ul>
		</div>
		<!-- <div class="file">
			<span class="file-name">
				上岗培训通知
				<img src="../../../assets/imgs/hasdownload.png"/>
				<img src="../../../assets/imgs/download1.png" />
			</span>
		</div> -->
	</div>
</template>

<script>
import vueSeamless from 'vue-seamless-scroll';
export default {
    data() {
        return {
            listData: [
                {
                    title: '关于UI设计-奥克斯家用空调portal端正式上线...'
                },
                {
                    title: '系统试点推广通知'
                },
                {
                    title: '促销通知'
                },
                {
                    title: '123123'
                },
                {
                    title: '促销33333通知'
                }
            ],
            classOption: {
                step: 1,
                limitMoveNum: 2,
                direction: 1,
                openWatch: true,
                singleHeight: 280, //单条数据高度有值hoverStop关闭
                waitTime: 1000 //单步停止等待时间
            }
        };
    },

    components: {
        vueSeamless
    },
    methods: {
        goPolicy(item) {
            //console.log(item)
        },
        parentClick(e) {
            console.log(e.target.innerText);
        }
    },
    created() {},
    mounted() {}
};
</script>

<style lang="scss">
#policy {
    display: block;
    width: 30.8%;
    flex-direction: column;
    height: 100%;
    background: white;
    flex: 1;
    .headtip {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #468ff9;
		text-indent: 31px;
		margin-top: 19px;
    }
    .tabs {
        height: 27px;
        width: 100%;
        margin-top: 12px;
        position: relative;
    }
    .tab1,
    .tab2 {
        display: inline-block;
        font-size: 16px;
        height: 100%;
        line-height: 27px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #888888;
        box-sizing: border-box;
    }
    .tab1 {
        margin-left: 30px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #222222;
    }
    .tab2 {
        margin-left: 25px;
    }
    .active {
        color: #222;
        border-bottom: 2px solid #468ff9;
    }
    .el-icon-arrow-right {
        font-size: 12px;
        position: absolute;
        top: 8.5px;
        right: 30px;
        color: #888;
        cursor: pointer;
    }
    .policy-lists {
        height: calc(100% - 74px);
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        overflow: auto;
    }
    .policy-list {
        display: block;
        height: 33%;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #555555;
        line-height: 39px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .point {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #468ff9;
        position: relative;
        top: -2px;
        margin-right: 6px;
    }
    .file {
        color: #468ff9;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        text-indent: 30px;
    }
    .file-name {
        display: flex;
        align-items: center;
        img {
            width: 16px;
            height: 13px;
            margin-left: 8px;
        }
    }
}
</style>
