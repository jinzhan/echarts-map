# 基于echarts的中国地图

## 按需引入

```
// import echarts from 'echarts';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';
```


## 通过splitList参数填充各省份颜色

```

const splitList = guardListMapData.map((item, index) => {
        return {
            label: item.name,
            color: getColor(item.num),
            start: item.value,
            end: item.value
        };
    });

...

const mapOption = {
    dataRange : {
        splitList
    }
};

```


## 其他

### 文字对齐 (echarts文档中似乎没有写)

```
textStyle: {
	align: 'left'
}
```


### 地图文字位置的微调

```
// 地图文字位置在
echarts/map/json/china.json
```

控制地址位置文字信息位置 `properties.cp`

```
...
    "properties": {
        "cp": [114.502461, 38.045474],
        "name": "河北",
        "childNum": 3
    }
...
```


## Todo

rollup打包有报错(echarts中)，没有定位到原因。