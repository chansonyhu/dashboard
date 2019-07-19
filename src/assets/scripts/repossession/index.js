import * as $ from 'jquery';
import { debounce } from 'lodash';

export default (function () {
    const repossessionInit = () => {

    if ($('#mainContent_repossession').length > 0) {
        // This is a hack, as the .empty() did not do the work
        $('#v_repossession').remove();
        $('#mainContent_repossession').append(`
            <div
                id="v_repossession"
                style="
                height: 600px;
                position: relative;
                overflow: hidden;
                background-color: transparent;
                "
            >
            </div>
        `);

        var dom = document.getElementById("v_repossession");
        var myChart = echarts.init(dom);
        var app = {};
        var option = null;
        
        setTimeout(function () {
        
            option = {
                legend: {},
                tooltip: {
                    trigger: 'axis',
                    showContent: false
                },
                dataset: {
                    source: [
                        ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                        ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                        ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                        ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                        ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                    ]
                },
                xAxis: {type: 'category'},
                yAxis: {gridIndex: 0},
                grid: {top: '55%'},
                series: [
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                    {
                        type: 'pie',
                        id: 'pie',
                        radius: '30%',
                        center: ['50%', '25%'],
                        label: {
                            formatter: '{b}: {@2012} ({d}%)'
                        },
                        encode: {
                            itemName: 'product',
                            value: '2012',
                            tooltip: '2012'
                        }
                    }
                ]
            };
        
            myChart.on('updateAxisPointer', function (event) {
                var xAxisInfo = event.axesInfo[0];
                if (xAxisInfo) {
                    var dimension = xAxisInfo.value + 1;
                    myChart.setOption({
                        series: {
                            id: 'pie',
                            label: {
                                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                            },
                            encode: {
                                value: dimension,
                                tooltip: dimension
                            }
                        }
                    });
                }
            });
        
            myChart.setOption(option);
        
        });;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }
};
    repossessionInit();
    $(window).resize(debounce(repossessionInit, 150));

})();