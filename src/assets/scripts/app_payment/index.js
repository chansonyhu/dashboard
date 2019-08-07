import * as $ from 'jquery';
import { debounce } from 'lodash';

export default (function () {
    const app_paymentInit = () => {

        if ($('#mainContent_app_payment').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_app_payment').remove();
            $('#mainContent_app_payment').append(`
                <div
                    id="v_app_payment"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_app_payment");
            var myChart = echarts.init(dom);
            var app = {};
            var option = null;
            
            setTimeout(function () {
                $.getJSON('assets/static/data/pay_data.json', function(data){
                    var loupan = data['loupan']['Chinese'];
                    var catelog = [];
                    for(var key in loupan) {
                        catelog.push(key);
                    }

                    var date = data['date'];
                    var time_series = [];
                    time_series.push('product');
                    for(var d in date){
                        time_series.push(d);
                    }
                    var num_of_months = time_series.length - 1;

                    var values = [];

                    for(var c in catelog) {
                        values[c] = []
                        values[c].push(catelog[c]);
                    }

                    var monthData = data['month'];
                    for (var i = 1; i <= num_of_months; i++) {
                        console.log(time_series[i]);
                        var dataByMonth = monthData[time_series[i]]["Chinese"];
                        for(var k in catelog) {
                            var c = catelog[k];
                            values[k].push(dataByMonth[c]);
                        }
                    }
                    var src_data = [];
                    src_data.push(time_series);
                    for(var i = 0; i < values.length; i++) {
                        src_data.push(values[i]);
                    }

                    setTimeout(function () {

                        option = {
                            legend: {},
                            tooltip: {
                                trigger: 'axis',
                                showContent: false
                            },
                            dataset: {
                                source: src_data
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
                                        formatter: '{b}: {@2019-05} ({d}%)'
                                    },
                                    encode: {
                                        itemName: 'product',
                                        value: '2019-05',
                                        tooltip: '2019-05'
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

                        
                    });
                
                });
            
            });

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
            $(window).resize(debounce(myChart.resize, 150));

        }
    };
    app_paymentInit();

})();