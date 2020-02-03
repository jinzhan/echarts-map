/**
 * @file 地图图标
 * 
 * 3.1.    色块：按省级展示区域数据，从弱到强分5级颜色，计算颜色规则为
 * 3.1.1.    各省的参与数占总数的占比：1级<1%; 2级1~2%; 3级2~5%; 4级5~8%;5级>8%
 * 3.2.    标注：按省级展示区域数据，展示TopN（以UE设计为准）的省级名称和数量，规则为
 * 3.2.1.    各省的参与数占总数的占比topN的省，展示省名+数量，例如：北京：110万
 * 3.2.2.    数字的省略规则：小于1万显示数字，大于1万显示XX.X万（小数点后1位）
 * 3.3.    更新：热度地图的数字和颜色，希望可以实时更新（2秒钟1次）
 */
import echarts from 'echarts';
import chinaMap from './lib/chinaMap.json';

/**
 * @param {string} elementId 地图容器元素id
 * @param {string} guardData 守护数据
 */
export default (elementId, {
	guardList,
	guardNum
}) => {
	const guardListSort = guardList.slice(0).sort((a, b) => a.num - b.num);
	const guardListMapData = guardListSort.map((item, index) => {
			let {
				num,
				display
			} = item;
			return {
				name: item.title,
				value: index,
				num,
				display
			};
		});

	console.log({
		guardListMapData
	});

	const backgroundColor = '#931b00';

	// 地图区域色值
	const colors = [
		'#ffe280',
		'#ffc557',
		'#ffae00',
		'#fc5a22',
		'#f40000'
	];

	// 各省的参与数占总数的占比：1级<1%; 2级1~2%; 3级2~5%; 4级5~8%;5级>8%
	let rate = [0.01, 0.02, 0.05, 0.08, 1];

	let splitListMap = rate.map(r => Math.round(r * guardNum));

	console.log({
		splitListMap
	});

	const getColor = num => {
		let i = 0;
		while (num > splitListMap[i]) {
			i = i + 1;
		}
		return colors[i];
	};

	/**
	 * 各省地图颜色
	 * 
	 * start：值域开始值
	 * end：值域结束值
	 * label：图例名称
	 * color：自定义颜色值
	 */
	// const splitList = colors.map((color, index) => {
	// 	return {
	// 		color,
	// 		start: splitListMap[index],
	// 		end: splitListMap[index + 1]
	// 	};
	// });

	const splitList = guardListMapData.map((item, index) => {
		return {
			label: item.name,
			color: getColor(item.num),
			start: item.value,
			end: item.value
		};
	});

	console.log({
		splitList
	});

	const el = document.getElementById(elementId);

	// 地图实例
	let echart = echarts.init(el);

	// 初始化绘制全国地图配置
	let option = {
		backgroundColor,
		title: {
			text: '全国守护地图',
			show: false,
			top: 15
		},
		// TODO: [右侧区间部分的控制]核心地图
		visualMap: {
			min: 10,
			splitNumber: 34,
			// color: [
			// 	'#f40000',
			// 	'#fc5a22',
			// 	'#ffae00',
			// 	'#ffc557',
			// 	'#ffe280'
			// ],
			textStyle: {
				color: '#fff'
			}
		}
	};

	function renderMap(mapName, data) {
		let isLabelShow = true;
		let tooltip = {
			show: true,
			trigger: 'item',
			triggerOn: 'click',
			backgroundColor: 'rgba(27, 5, 0, 0.8)',
			textStyle: {
				color: '#ffcf62',
				align: 'left'
			},
			formatter(params) {
				let name = params.name;
				let item = guardListMapData.filter(item => item.name == name)[0];
				let displayNum = item.display;
				return `${params.name}<br/>
						守护数：${displayNum}`;
			}
		};

		// option.visualMap.pieces = pieces;
		option.tooltip = tooltip;
		option.series = [{
			name: mapName,
			type: 'map',
			mapType: mapName,
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
					areaColor2: {
						colorStops: [{
							offset: 0.2,
							// 0% 处的颜色
							color: '#ffe280'
						}, {
							offset: 1,
							// 100% 处的颜色
							color: '#ffc557'
						}],
						// 缺省为 false
						globalCoord: false
					}
				},
				emphasis: {
					areaColor: '#20dafc',
					borderWidth: 0
				}
			},
			data,
			dataRange: {
				splitList
			}
		}];

		echart.clear();
		echart.setOption(option);
	}

	// 注册地图
	echarts.registerMap('china', chinaMap);

	// 绘制地图
	renderMap('china', guardListMapData);
};