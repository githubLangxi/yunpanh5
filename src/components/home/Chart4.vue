<template>
    <div id="chart4" style="width:100%;height:100%;">
        This is home.
    </div>
</template>


<script>
    var echarts = require('echarts');
    
    
    export default {
        data() {
            return {}
        },
        mounted: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart4'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    }
</script>