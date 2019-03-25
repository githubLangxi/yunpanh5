export const productLines = [{
	pid: 1124,
	pName: "厨电",
	value: '厨电'
}, {
	pid: 1122,
	pName: "股份-家用",
	value: '家用空调'
}, {
	pid: 1120,
	pName: "宁波奥克斯电气股份有限公司",
	value: '中央空调'
}]

export const conditions = [{
		key: 'new_serviceitem',
		name: '服务项目',
		value: null,
		selected: false,
	}, {
		key: 'new_logisticsstatus',
		name: '物流状态',
		value: null,
		selected: false,
	}, {
		key: 'new_deliverydate',
		name: '妥投/物流签收日期',
		value: '',
		selected: false,
	}, {
		key: 'new_retreatnumber',
		name: '退单次数',
		value: null,
		selected: false,
	}, {
		key: 'new_trace_warningtimes',
		name: '跟踪警告次数(大于等于)',
		value: null,
		selected: false,
	}, {
		key: 'new_supervise_warningtimes',
		name: '督办预警次数(大于等于)',
		value: null,
		selected: false,
	}, {
		key: 'new_supervise',
		name: '督办次数',
		value: null,
		selected: false,
	}, {
		key: 'new_rechargecycles',
		name: '重电次数(大于等于)',
		value: null,
		selected: false,
	}, {
		key: 'new_speicaltype',
		name: '特殊类型',
		value: null,
		selected: false,
	}, {
		key: 'new_overduereasons',
		name: '超期原因',
		value: null,
		selected: false,
	}, {
		key: 'new_csi',
		name: "用户好评率",
		value: null,
		selected: false,
	}, {
		key: 'new_iscomplain',
		name: '是否差评',
		value: null,
		selected: false,
	}, {
		key: 'new_servicelength2',
		name: '总时长',
		value: null,
		selected: false,
	}, {
		key: 'new_servicelength1',
		name: '网点时长(小时)',
		value: null,
		selected: false,
	}, {
		key: 'engineer_mine',
		name: '工程师预约',
		value: null,
		selected: false,
	},
	/*,
	{
		key: 'new_worker_code',
		name: '派往工程师编码',
		value: '',
		selected: false,
	}*/
	/*, {
		key: 'new_worker_name',
		name: '派往工程师名称',
		value: '',
		selected: false,
	}*/
	{
		key: 'new_dealstage',
		name: '处理阶段',
		value: null,
		selected: false,
	}, {
		key: 'new_dealstatus',
		name: '处理状态',
		value: null,
		selected: false,
	}, {
		key: 'new_productmodel_id',
		name: '产品类型',
		value: 'obj',
		selected: false,
	}, {
		key: 'new_source',
		name: '来源途径',
		value: null,
		selected: false,
	}, {
		key: 'new_viplevel',
		name: 'VIP等级',
		value: null,
		selected: false,
	}, {
		key: 'dateFrom',
		name: '受理时间起',
		value: '',
		selected: false,
	}, {
		key: 'dateTo',
		name: '受理时间止',
		value: '',
		selected: false,
	}, {
		key: 'new_deallevel',
		name: '处理级别',
		value: null,
		selected: false,
	}, {
		key: 'new_content',
		name: '跟单内容',
		value: null,
		selected: false,
	}, {
		key: 'new_auditpoint',
		name: '网点完工结果',
		value: null,
		selected: false,
	}, {
		key: 'new_auditcentrality',
		name: '中心完工结果',
		value: null,
		selected: false,
	}, {
		key: 'new_audithq',
		name: '总部完工结果',
		value: null,
		selected: false,
	}, {
		key: 'new_status',
		name: '回访状态',
		value: null,
		selected: false,
	}, {
		key: 'new_requiretime',
		name: '预约上门时间',
		value: '',
		selected: false,
	}, {
		key: 'new_timequantum',
		name: '预约上门时间段',
		value: '',
		selected: false,
	}, {
		key: 'new_confirmtime1',
		name: '网点完工时间段',
		value: '',
		selected: false,
	}, {
		key: 'new_confirmtime1From',
		name: '网点完工日期起',
		value: '',
		selected: false,
	}, {
		key: 'new_confirmtime1To',
		name: '网点完工日期止',
		value: '',
		selected: false,
	}, {
		key: 'new_statement',
		name: '派工说明',
		value: '',
		selected: false,
	}, {
		key: 'new_reassignment',
		name: '改派原因',
		value: null,
		selected: false,
	}, {
		key: 'new_ownstation_id',
		name: '原安装网点',
		value: 'obj',
		selected: false,
	}, {
		key: 'new_province_id',
		name: '省份',
		value: 'obj',
		selected: false,
	}, {
		key: 'new_city_id',
		name: '城市',
		value: 'obj',
		selected: false,
	}, {
		key: 'new_county_id',
		name: '区县',
		value: 'obj',
		selected: false,
	}, {
		key: 'new_town_id',
		name: '街道',
		value: 'obj',
		selected: false,
	}, {
		key: 'new_engineeringcode',
		name: '工程工单',
		value: '',
		selected: false,
	}, {
		key: 'new_coolanttype',
		name: '制冷剂',
		value: null,
		selected: false,
	},
	/*{
		key: 'new_systemuser_id',
		name: '受理人',
		value: 'obj',
		selected: false,
	}*/
]

export const color = ['#5A98F3', '#81B4FF', '#FDBA42'];
export const color1 = ['#5A98F3', '#FDBA42'];

export function getProductName(type) {
	let obj = productLines.filter((item, index, arr) => {
		return item.pName == type;
	})
	return obj[0].value ? obj[0].value : '';
}

export function transformNum(data) {
	let arr = [];
	for (let i = 0; i < data.length; i++) {
		arr.push(data[i] * 1)
	}
	return arr;
}


export function getOption(data, type) {
	let option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		color: type ? color1 : color,
		legend: {
			data: []
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: data.date
		}],
		yAxis: [{
			type: 'value',
			splitLine: {
				show: false
			}
		}],
		series: []
	};
	if (data.data) {
		data.data.map((item, index, arr) => {
			option.legend.data.push(item.name);
			let obj = {
				name: item.name,
				type: item.name == '去年结算金额' || item.name.indexOf("去年") >= 0 ? 'line' : 'bar',
				stack: '销量',
				barWidth: 44,
				data: transformNum(item.data)
			};
			option.series.push(obj);
		});
	} else {
		return option
	}
	return option;
}
