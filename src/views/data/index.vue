<template>
	<div id="box" style="width: 500px;height: 200px;background-color: #fff;margin: 10px;">
		
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}

		},
		mounted() {
			this.createEchart()
		},
		methods: {
			createEchart() {
				// 基于准备好的dom，初始化echarts实例
				var myChart = this.$echarts.init(document.getElementById("box"));
				var option = {
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [120, 200, 150, 80, 70, 110, 130],
						type: 'bar'
					}]
				};
				//使用刚指定的配置项和数据显示图表
				myChart.setOption(option)

			}
		}
	}
</script>

<style>
</style>
