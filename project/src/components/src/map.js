import echarts from 'echarts';
import chinaMap from './lib/chinaMap.json';

/**
 * @param {string} elementId 地图容器元素id
 * @param {string} guardData 守护数据
 */
export default (elementId, {
	guardData
}) => {

	guardData = guardData.map(item => {
		item.name = item.area;
		item.value = item.count;
		return item;
	});

	let el = document.getElementById(elementId);

	let echart = echarts.init(el);

	// 初始化绘制全国地图配置
	let option = {
		backgroundColor: '#931b00',
		title: {
			text: '全国守护地图',
			show: false,
			top: 15
		},
		// TODO: [右侧区间部分的控制]核心地图
		visualMap: {
			min: 0,
			splitNumber: 6,
			pieces: [{
					min: 1000
				},
				// 不指定 max，表示 max 为无限大（Infinity）。
				{
					min: 500,
					max: 1000
				},
				{
					min: 100,
					max: 499
				},
				{
					min: 10,
					max: 99
				},
				{
					min: 1,
					max: 9
				},
				{
					max: 0
				}
			],
			color: ['red', 'yellow', 'blue'],
			textStyle: {
				color: '#fff'
			}
		}
	};

	function renderMap(map, data) {
		let isLabelShow = false;

		// TODO: 热度效果优化
		let pieces = [{
				// 不指定 max，表示 max 为无限大（Infinity）。
				min: 50
			},
			{
				min: 30,
				max: 49
			},
			{
				min: 20,
				max: 29
			},
			{
				min: 10,
				max: 19
			},
			{
				min: 1,
				max: 9
			},
			{
				max: 0
			}
		];
	
		let tooltip;
		
		if (map == 'china') {
			isLabelShow = true;
			pieces = [{
					min: 1000
				}, // 不指定 max，表示 max 为无限大（Infinity）。
				{
					min: 500,
					max: 1000
				},
				{
					min: 100,
					max: 499
				},
				{
					min: 10,
					max: 99
				},
				{
					min: 1,
					max: 9
				},
				{
					max: 0
				}
			]
			tooltip = {
				show: true,
				trigger: 'item',
				triggerOn: 'click',
				backgroundColor: 'rgba(27, 5, 0, 0.8)',
				textStyle: {
					color: '#ffcf62'
				},
				formatter(params) {
					let provName = params.name;
					let provFind = guardData.filter(item => item.area == provName)[0];
					let count = provFind.count;
					return `${params.name}<br/>
						守护数：${count}`;
				}
			}
		}

		option.visualMap.pieces = pieces;
		option.tooltip = tooltip;
		option.series = [{
			name: map,
			type: 'map',
			mapType: map,
			roam: false,
			nameMap: {
				'china': '中国'
			},
			label: {
				normal: {
					show: isLabelShow,
					textStyle: {
						color: '#200600',
						fontSize: 13
					}
				},
				// 高亮时候
				emphasis: {
					show: true,
					textStyle: {
						color: '#200600',
						fontSize: 13
					}
				}
			},
			itemStyle: {
				normal: {
					borderColor: '#801800',
					borderWidth: 1,
					areaColor22: '#ffe280',
					areaColor2: {
						colorStops: [{
							offset: 0.2,
							// 0% 处的颜色
							color: '#ffe280'
						}, {
							offset: 0.4,
							// 100% 处的颜色
							color: '#ffc557'
						},
						{
							offset: 0.8,
							// 0% 处的颜色
							color: '#ffae00'
						}, {
							offset: 0.8,
							// 100% 处的颜色
							color: '#fc5a22'
						},
						{
							offset: 1,
							// 0% 处的颜色
							color: '#f40000'
						},],
						// 缺省为 false
						globalCoord: false
					}
				},
				emphasis: {
					areaColor: '#20dafc',
					borderWidth: 0
				}
			},
			data: data,
			dataRange: {
				// 图例横轴位置
				x: '-10000 px',
				// 图例纵轴位置
				y: '-10000 px',
				// 各省地图颜色；
				// start：值域开始值；
				// end：值域结束值；
				// label：图例名称；
				// color：自定义颜色值；
				// 根据分位值，给出不同的颜色
                splitList: [
					{ 
						start: 8000, 
						end: 10000,
						label: '北京',
						color: '#f40000'
					},
					{ 
						start: 8000, 
						end: 10000,
						label: '北京',
						color: '#f40000'
					},
					{ 
						start: 8000, 
						end: 10000,
						label: '北京',
						color: '#f40000'
					},
					{ 
						start: 8000, 
						end: 10000,
						label: '北京',
						color: '#f40000'
					},
					{ 
						start: 8000, 
						end: 10000,
						label: '北京',
						color: '#f40000'
					}
                ]
            }
		}];

		echart.clear();
		echart.setOption(option);
	}

	// 注册地图
	echarts.registerMap('china', chinaMap);

	console.log(guardData);

	// 绘制地图
	renderMap('china', guardData);
};