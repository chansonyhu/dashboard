import * as $ from 'jquery';
import { debounce } from 'lodash';

var myChart0 = null;
var myChart1 = null;
var myChart = null;
var option0 = null;
var option1 = null;
var option = null;

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
            var myChart0 = echarts.init(dom);
            var app = {};

            $.getJSON('assets/static/data/coupon.json', function(data){
                var month_data = data['sale in last month'];

                var option0 = null;
                var series_group = [];
                var legend_data = [];
                for(var key in month_data) {
                    var series_item = {};
                    series_item['name'] = key;
                    legend_data.push(key); 
                    series_item['type'] = 'line';
                    //series_item['stack'] = '总量';
                    var series_data = [];
                    var xAxis_data = [];
                    var original_data = month_data[key]['independent'];
                    for(var d in original_data) {
                        xAxis_data.push(d);
                        series_data.push(original_data[d]);
                    }
                    series_item['data'] = series_data;
                    series_group.push(series_item);
                }
                option0 = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: legend_data
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxis_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: series_group,
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
                    dataZoom : {
                        show : true,
                        realtime : true,
                        start : 20,
                        end : 80
                    }
                };
                if (option0 && typeof option0 === "object") {
                    myChart0.setOption(option0, true);
                }
                $(window).resize(debounce(myChart0.resize, 150));
            });
        }

        if ($('#mainContent_coupon_accu').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_coupon_accu').remove();
            $('#mainContent_coupon_accu').append(`
                <div
                    id="v_coupon_accu"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_coupon_accu");
            //var dom = document.getElementsByClassName("coupon-app");
            myChart1 = echarts.init(dom);
            var app = {};

            $.getJSON('assets/static/data/coupon.json', function(data){
                var month_data = data['sale in last month'];

                option1 = null;
                var series_group = [];
                var legend_data = [];
                for(var key in month_data) {
                    var series_item = {};
                    series_item['name'] = key;
                    legend_data.push(key);
                    series_item['type'] = 'line';
                    // series_item['stack'] = '总量';
                    var series_data = [];
                    var xAxis_data = [];
                    var original_data = month_data[key]['accu'];
                    for(var d in original_data) {
                        xAxis_data.push(d);
                        series_data.push(original_data[d]);
                    }
                    series_item['data'] = series_data;
                    series_group.push(series_item);
                }
                
                option1 = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: legend_data
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
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
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxis_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: series_group,
                    dataZoom : {
                        show : true,
                        realtime : true,
                        start : 20,
                        end : 80
                    }
                };
                if (option1 && typeof option1 === "object") {
                    myChart1.setOption(option1, true);
                }

                $(window).resize(debounce(myChart1.resize, 150));
            });
        }
    };

    couponInit();

    const couponByMonth = () => {
        if ($('#pie_coupon').length > 0) {
            //This is a hack, as the .empty() did not do the work
            $('#p_coupon').remove();
                $('#pie_coupon').append(`
                    <div
                        id="p_coupon"
                        style="
                        height: 600px;
                        width: 750px;
                        position: relative;
                        overflow: hidden;
                        background-color: transparent;
                        "
                    >
                    </div>
                `);
            option = null;
            var dom = document.getElementById('p_coupon');
            // console.log(dom);
            myChart = echarts.init(dom);
            var app = {};
            app.title = '';
            $.getJSON('assets/static/data/coupon.json', function(data){
                var dataByMonth = data['coupon by month'];
                var months = [];
                months.push('product');
                var merchants = [];

                console.log('lala');
                var m = 'sale_pro';
                console.log('dataByMonth', dataByMonth);
                var monthData = dataByMonth[m]['Chinese'];
                if(m === 'sale_pro') {
                    monthData = dataByMonth[m];
                }
                console.log('lala');
                for(var merchant in monthData){
                    merchants.push(merchant);
                }
                console.log('lala');
                var dataByMerchant = {};
                for(var i in merchants){
                    var merchant = merchants[i];
                    dataByMerchant[merchant] = [];
                    dataByMerchant[merchant].push(merchant);
                }
                for(var m in dataByMonth){
                    if( m ==='Set'){
                        continue;
                    }
                    months.push(m);
                }
                for(var m in dataByMonth){
                    if( m ==='Set'){
                        continue;
                    }
                    var monthData = dataByMonth[m]['Chinese'];
                    if(m === 'sale_pro') {
                        monthData = dataByMonth[m];
                    }
                    for(var i in merchants){
                        var merchant = merchants[i];
                        dataByMerchant[merchant].push(monthData[merchant]);
                    }
                }

                var series_data = [];
                series_data.push(months);
                for(var m in dataByMerchant) {
                    series_data.push(dataByMerchant[m]);
                }
                option = {
                    title : {
                        text: '',
                        subtext: '',
                        x:'left'
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/> {c} ({d}%)"
                    },
                    dataset: {
                        source: series_data
                    },
                    toolbox: {
                        orient: 'vertical',
                        feature: {
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true},
                        }
                    },
                    series: [{
                        name: months[1],
                        label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                        },
                        type: 'pie',
                        radius: 80,
                        center: ['15%', '30%']
                        // No encode specified, by default, it is '2012'.
                    }, {
                        name: months[2],
                        label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                        },
                        type: 'pie',
                        radius: 80,
                        center: ['55%', '30%'],
                        encode: {
                            itemName: 'product',
                            value: months[2]
                        }
                    }, {
                        name: months[3],
                        label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                        },
                        type: 'pie',
                        radius: 80,
                        center: ['15%', '78%'],
                        encode: {
                            itemName: 'product',
                            value: months[3]
                        }
                    }, {
                        name: '前三个月',
                        label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                        },
                        type: 'pie',
                        radius: 80,
                        center: ['55%', '78%'],
                        encode: {
                            itemName: 'product',
                            value: months[4]
                        }
                    }]
                };

                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                };
                $(window).resize(debounce(myChart.resize, 150));
            });
        }
    }
    couponByMonth();
    // $(window).resize(debounce(couponInit, 150));

})();