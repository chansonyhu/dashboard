import * as $ from 'jquery';
import { debounce } from 'lodash';

export default (function () {
    const propertyInit = () => {

    if ($('#mainContent_property').length > 0) {
        // This is a hack, as the .empty() did not do the work
        $('#v_property').remove();
        $('#mainContent_property').append(`
            <div
                id="v_property"
                style="
                height: 600px;
                position: relative;
                overflow: hidden;
                background-color: transparent;
                "
            >
            </div>
        `);

        var dom = document.getElementById("v_property");
        //var dom = document.getElementsByClassName("property-app");
        var myChart = echarts.init(dom);
        var app = {};
        var option = null;

        var monthCount = 7;
        var categoryCount = 30;

        var xAxisData = [];
        var customData = [];
        var legendData = [];
        var dataList = [];

        legendData.push('走势');
        var encodeY = [];
        for (var i = 0; i < monthCount; i++) {
            legendData.push((2013 + i) + '');
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
                data: xAxisData
            },
            yAxis: {},
            series: [{
                type: 'custom',
                name: 'trend',
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
};
    propertyInit();
    $(window).resize(debounce(propertyInit, 150));

})();