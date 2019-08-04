import * as $ from 'jquery';
import { debounce } from 'lodash';

export default (function () {
    const couponInit = () => {

        if ($('#mainContent_coupon').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_coupon').remove();
            $('#mainContent_coupon').append(`
                <div
                    id="v_coupon"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_coupon");
            //var dom = document.getElementsByClassName("coupon-app");
            var myChart = echarts.init(dom);
            var app = {};
            var option = null;

            var dayCount = 30;
            var categoryCount = 10;

            var xAxisData = [];
            var customData = [];
            var legendData = [];
            var dataList = [];

            legendData.push('走势');
            var encodeY = [];
            for (var i = 0; i < dayCount; i++) {
                legendData.push((1 + i) + '日');
                dataList.push([]);
                encodeY.push(1 + i);
            }

            for (var i = 0; i < categoryCount; i++) {
                var val = Math.random() * 1000;
                xAxisData.push('P' + i);
                var customVal = [i];
                customData.push(customVal);

                var data = dataList[0];
                for (var j = 0; j < dataList.length; j++) {
                    var value = j === 0
                        ? echarts.number.round(val, 2)
                        : echarts.number.round(Math.max(0, dataList[j - 1][i] + (Math.random() - 0.5) * 200), 2);
                    dataList[j].push(value);
                    customVal.push(value);
                }
            }

            function renderItem(params, api) {
                var xValue = api.value(0);
                var currentSeriesIndices = api.currentSeriesIndices();
                var barLayout = api.barLayout({
                    barGap: '30%', barCategoryGap: '20%', count: currentSeriesIndices.length - 1
                });

                var points = [];
                for (var i = 0; i < currentSeriesIndices.length; i++) {
                    var seriesIndex = currentSeriesIndices[i];
                    if (seriesIndex !== params.seriesIndex) {
                        var point = api.coord([xValue, api.value(seriesIndex)]);
                        point[0] += barLayout[i - 1].offsetCenter;
                        point[1] -= 20;
                        points.push(point);
                    }
                }
                var style = api.style({
                    stroke: api.visual('color'),
                    fill: null
                });

                return {
                    type: 'polyline',
                    shape: {
                        points: points
                    },
                    style: style
                };
            }

            option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: legendData
                },
                dataZoom: [{
                    type: 'slider',
                    start: 50,
                    end: 70
                }, {
                    type: 'inside',
                    start: 50,
                    end: 70
                }],
                xAxis: {
                    // data: xAxisData
                    data: ["麻辣香锅", "优品超市", "中国餐厅四川菜", "万香饼家", "全满福", "怡宝鱼头炉", "凤凰滨海酒店华莱西餐厅", "烨辉家电", "Droptop 咖啡厅", "寺库"]
                },
                yAxis: {},
                series: [{
                    type: 'custom',
                    name: '走势',
                    renderItem: renderItem,
                    itemStyle: {
                        normal: {
                            borderWidth: 2
                        }
                    },
                    encode: {
                        x: 0,
                        y: encodeY
                    },
                    data: customData,
                    z: 100
                }].concat(echarts.util.map(dataList, function (data, index) {
                    return {
                        type: 'bar',
                        animation: false,
                        name: legendData[index + 1],
                        itemStyle: {
                            normal: {
                                opacity: 0.5
                            }
                        },
                        data: data
                    };
                }))
            };;
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        }

        if ($('#pie_coupon').length > 0) {
            //This is a hack, as the .empty() did not do the work
            $('#p_coupon').remove();
                $('#pie_coupon').append(`
                    <div
                        id="p_coupon"
                        style="
                        height: 300px;
                        width: 750px;
                        position: relative;
                        overflow: hidden;
                        background-color: transparent;
                        "
                    >
                    </div>
                `);
            var option = null;
            var dom = document.getElementById('p_coupon');
            console.log(dom);
            var myChart = echarts.init(dom);
            var app = {};
            app.title = '';
            var data = genData(10);

            option = {
                title : {
                    text: '',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: data.legendData,

                    selected: data.selected
                },
                series : [
                    {
                        name: '商家',
                        type: 'pie',
                        radius : '55%',
                        center: ['40%', '50%'],
                        data: data.seriesData,
                        //data: ["麻辣香锅", "优品超市", "中国餐厅四川菜", "万香饼家", "全满福", "怡宝鱼头炉", "凤凰滨海酒店华莱西餐厅", "烨辉家电", "Droptop 咖啡厅", "寺库"],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            function genData(count) {
                var nameList = [
                    '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
                ];
                var legendData = [];
                var seriesData = [];
                var selected = {};
                var NAME = ["麻辣香锅", "优品超市", "中国餐厅四川菜", "万香饼家", "全满福", "怡宝鱼头炉", "凤凰滨海酒店华莱西餐厅", "烨辉家电", "Droptop 咖啡厅", "寺库"];
                for (var i = 0; i < 10; i++) {
                    name = Math.random() > 0.65
                        ? makeWord(4, 1) + '·' + makeWord(3, 0)
                        : makeWord(2, 1);
                    legendData.push(NAME[i]);
                    seriesData.push({
                        name: NAME[i],
                        value: Math.round(Math.random() * 100000)
                    });
                    selected[name] = i < 6;
                }

                return {
                    legendData: legendData,
                    seriesData: seriesData,
                    selected: selected
                };

                function makeWord(max, min) {
                    var nameLen = Math.ceil(Math.random() * max + min);
                    var name = [];
                    for (var i = 0; i < nameLen; i++) {
                        name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
                    }
                    return name.join('');
                }
            }

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            };

        }
    };


    couponInit();
    // $(window).resize(debounce(couponInit, 150));

})();


