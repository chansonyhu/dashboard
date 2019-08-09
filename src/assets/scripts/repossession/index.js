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
            $.getJSON('assets/static/data/reserve_apartment.json', function(data){
                var catelog = data['Set']["Chinese"];
                var time_series = [];
                time_series.push('product');
                for (var k in data) {
                    if(k !== 'Set')
                    time_series.push(k);
                }
                var num_of_months = time_series.length - 1;

                var values = [];
                for(var c in catelog) {
                    values[c] = []
                    values[c].push(catelog[c]);
                }

                for (var i = 1; i <= num_of_months; i++) {
                    var dataByMonth = data[time_series[i]]["Chinese"];
                    for(var k in catelog) {
                        var c = catelog[k];
                        values[k].push(dataByMonth[c]);
                    }
                }
                option = {
                    legend: {},
                    tooltip: {
                        trigger: 'axis',
                        showContent: true
                    },
                    dataset: {
                        source: [
                            time_series,
                            values[0],
                            values[1],
                            values[2],
                            values[3],
                            values[4]
                        ]
                    },
                    toolbox: {
                        orient: 'vertical',
                        feature: {
                            mark : {
                                show : true,
                                title : {
                                    mark : '辅助线开关',
                                    markUndo : '删除辅助线',
                                    markClear : '清空辅助线'
                                },
                                lineStyle : {
                                    width : 2,
                                    color : '#1e90ff',
                                    type : 'dashed'
                                }
                            },
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true},
                        }
                    },
                    xAxis: {type: 'category'},
                    yAxis: {gridIndex: 0},
                    grid: {top: '55%'},
                    series: [
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
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
                                formatter: '{b}: {@2018-08} ({d}%)'
                            },
                            encode: {
                                itemName: 'product',
                                value: '2018-08',
                                tooltip: '2018-08'
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
            
                console.log('option:', option);
                myChart.setOption(option);


            });
        
        });;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

        $(window).resize(debounce(myChart.resize, 150));
    }
};
    repossessionInit();

})();