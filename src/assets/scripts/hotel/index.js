import * as $ from 'jquery';
import { debounce } from 'lodash';

var myChart0 = null;
var myChart1 = null;
var myChart = null;
var option0 = null;
var option1 = null;
var option = null;

export default (function () {
    const BarLine01 = () => {

        if ($('#bar_line_01').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_bar_line_01').remove();
            $('#bar_line_01').append(`
                <div
                    id="v_bar_line_01"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_bar_line_01");
            //var dom = document.getElementsByClassName("coupon-app");
            var myChart0 = echarts.init(dom);
            var app = {};

            console.log('start');
            $.getJSON('assets/static/data/hotel.json', function(data){
                app.title = '';
                var sales_data = data['经营情况'];

                var months = [];
                var legend_data = [];
                for(var m in sales_data) {
                    months.push(m);
                }
                var first_month = sales_data[months[0]];

                for(var l in first_month) {
                    legend_data.push(l);
                }

                var series_data = [];

                var max_num = -1;

                for(var i  = 0; i < legend_data.length; i++) {
                    var single = {};
                    single.name = legend_data[i];
                    single.type = 'bar';
                    var raw_data = [];
                    for(var j  = 0; j < months.length; j++) {
                        var this_month = sales_data[months[j]];
                        if(this_month[legend_data[i]] > max_num) {
                            max_num = this_month[legend_data[i]];
                        }
                        raw_data.push(this_month[legend_data[i]]);
                    }
                    single.data = raw_data;
                    series_data.push(single);
                }

                var completion_single = series_data[2];

                series_data[2]['yAxisIndex'] = 1;
                series_data[2]['type'] = 'line';
                var completion_single_data = completion_single['data'];
                for(var i  = 0; i < completion_single_data.length; i++) {
                    completion_single_data[i] = 100 * completion_single_data[i];
                }
                series_data[2]['data'] = completion_single_data;

                option0 = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: legend_data
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: months,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '万元',
                            min: 0,
                            max: Math.round(max_num * 1.2),
                            interval: 50,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            name: '完成率',
                            min: 0,
                            max: 120,
                            interval: 10,
                            axisLabel: {
                                formatter: '{value}%'
                            }
                        }
                    ],
                    series: series_data,
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

    };

    BarLine01();

    const BarLine02 = () => {
        if ($('#bar_line_02').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_bar_line_02').remove();
            $('#bar_line_02').append(`
                <div
                    id="v_bar_line_02"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_bar_line_02");
            //var dom = document.getElementsByClassName("coupon-app");
            var myChart = echarts.init(dom);
            var app = {};

            $.getJSON('assets/static/data/hotel.json', function(data){
                app.title = '';
                var sales_data = data['开房情况'];

                var months = [];
                var legend_data = [];
                for(var m in sales_data) {
                    months.push(m);
                }
                var first_month = sales_data[months[0]];

                for(var l in first_month) {
                    legend_data.push(l);
                }

                var series_data = [];

                var max_num = -1;

                for(var i  = 0; i < legend_data.length; i++) {
                    var single = {};
                    single.name = legend_data[i];
                    single.type = 'bar';
                    var raw_data = [];
                    for(var j  = 0; j < months.length; j++) {
                        var this_month = sales_data[months[j]];
                        if(this_month[legend_data[i]] > max_num) {
                            max_num = this_month[legend_data[i]];
                        }
                        raw_data.push(this_month[legend_data[i]]);
                    }
                    single.data = raw_data;
                    series_data.push(single);
                }

                var completion_single = series_data[2];

                series_data[2]['yAxisIndex'] = 1;
                series_data[2]['type'] = 'line';
                var completion_single_data = completion_single['data'];
                for(var i  = 0; i < completion_single_data.length; i++) {
                    completion_single_data[i] = 100 * completion_single_data[i];
                }
                series_data[2]['data'] = completion_single_data;

                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: legend_data
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: months,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '万元',
                            min: 0,
                            max: Math.round(max_num * 1.2),
                            interval: 1000,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            name: '完成率',
                            min: 0,
                            max: 120,
                            interval: 10,
                            axisLabel: {
                                formatter: '{value}%'
                            }
                        }
                    ],
                    series: series_data,
                    dataZoom : {
                        show : true,
                        realtime : true,
                        start : 20,
                        end : 80
                    }
                };

                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
                $(window).resize(debounce(myChart.resize, 150));
            });
        }
    }
    BarLine02();

    const BarLine03 = () => {
        if ($('#bar_line_03').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_bar_line_03').remove();
            $('#bar_line_03').append(`
                <div
                    id="v_bar_line_03"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_bar_line_03");
            //var dom = document.getElementsByClassName("coupon-app");
            var myChart = echarts.init(dom);
            var app = {};

            $.getJSON('assets/static/data/hotel.json', function(data){
                app.title = '';
                
                var dataByMonth = data['住客类型'];
                var months = [];
                months.push('product');
                var merchants = [];

                var m = 'YTD';
                console.log('dataByMonth', dataByMonth);
                var monthData = dataByMonth[m];
                if(m === 'YTD') {
                    monthData = dataByMonth[m];
                }

                for(var merchant in monthData){
                    merchants.push(merchant);
                }

                var dataByMerchant = {};
                for(var i in merchants){
                    var merchant = merchants[i];
                    dataByMerchant[merchant] = [];
                    dataByMerchant[merchant].push(merchant);
                }
                // for(var m in dataByMonth){
                //     months.push(m);
                // }
                var tmp_months = [];
                for(var m in dataByMonth) {
                    tmp_months.push(m);
                }
                months.push(tmp_months[tmp_months.length - 2]);
                months.push(tmp_months[tmp_months.length - 1]);

                var tmp_monthData;

                for(var i in merchants){
                    var merchant = merchants[i];
                    dataByMerchant[merchant].push(dataByMonth[months[1]][merchant]);
                }
                for(var i in merchants){
                    var merchant = merchants[i];
                    dataByMerchant[merchant].push(dataByMonth[months[2]][merchant]);
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
                    series: [{
                        name: months[1],
                        type: 'pie',
                        radius: 60,
                        center: ['20%', '50%']
                        // No encode specified, by default, it is '2012'.
                    }, {
                        name: months[2],
                        type: 'pie',
                        radius: 60,
                        center: ['55%', '50%'],
                        encode: {
                            itemName: 'product',
                            value: months[2]
                        }
                    }]
                };

                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
                $(window).resize(debounce(myChart.resize, 150));
            });
        }
    }
    BarLine03();
    
    const Sub01 = () => {
        if ($('#sub01').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_sub01').remove();
            $('#sub01').append(`
                <div
                    id="v_sub01"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_sub01");
            //var dom = document.getElementsByClassName("coupon-app");
            var myChart = echarts.init(dom);
            var app = {};

            $.getJSON('assets/static/data/hotel.json', function(data){
                app.title = '';
                
                var energy_type = 'GAS';
                var act_type = [];
                var month = 'YTD';
                var departments = [];
                var max_num = -1;

                var raw_data = data['能耗统计'];

                for(var act in raw_data) {
                    act_type.push(act);
                }
                var tmp_act = act_type[0];
                var tmp_energy_data = ((raw_data[tmp_act])[energy_type])['YTD'];
                for(var m in tmp_energy_data) {
                    departments.push(m);
                }

                var energy_data = [];
                for(var i in act_type) {
                    var act = act_type[i];
                    console.log('act:', act);
                    var single_type_energy_data = (raw_data[act])[energy_type][month];
                    console.log('single_type_energy_data:', single_type_energy_data);
                    var single_raw_data = [];
                    for(var i in departments) {
                        var m = departments[i];
                        var item = single_type_energy_data[m];
                        if(item > max_num) {
                            max_num = item;
                        }
                        single_raw_data.push(item);
                    }
                    energy_data.push(single_raw_data);
                }

                option = {
                    title : {
                        text: '',
                        subtext: 'YTD'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:act_type
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : departments,
                            axisLabel : {interval : 0}
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            max: Math.round(max_num * 1.2)
                        }
                    ],
                    series : [
                        {
                            name:act_type[0],
                            type:'bar',
                            data:energy_data[0],
                        },
                        {
                            name:act_type[1],
                            type:'bar',
                            data:energy_data[1],
                        },
                        {
                            name:act_type[2],
                            type:'bar',
                            data:energy_data[2],
                        }
                    ]
                };


                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
                $(window).resize(debounce(myChart.resize, 150));
            });
        }
    }
    Sub01();

    const Sub02 = () => {
        if ($('#sub02').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_sub02').remove();
            $('#sub02').append(`
                <div
                    id="v_sub02"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_sub02");
            //var dom = document.getElementsByClassName("coupon-app");
            var myChart = echarts.init(dom);
            var app = {};

            $.getJSON('assets/static/data/hotel.json', function(data){
                app.title = '';
                
                var energy_type = 'GAS';
                var act_type = [];
                var month = 'YTD';
                var departments = [];
                var max_num = -1;

                var raw_data = data['能耗统计'];

                for(var act in raw_data) {
                    act_type.push(act);
                }
                var tmp_act = act_type[0];
                var tmp_energy_data = ((raw_data[tmp_act])[energy_type])['YTD'];
                for(var m in tmp_energy_data) {
                    departments.push(m);
                }

                var tmp1_energy_data = ((raw_data[tmp_act])[energy_type]);
                var tmp_months = [];
                for(var m in tmp1_energy_data) {
                    tmp_months.push(m);
                }
                month = tmp_months[tmp_months.length - 2];

                var energy_data = [];
                for(var i in act_type) {
                    var act = act_type[i];
                    console.log('act:', act);
                    var single_type_energy_data = (raw_data[act])[energy_type][month];
                    console.log('single_type_energy_data:', single_type_energy_data);
                    var single_raw_data = [];
                    for(var i in departments) {
                        var m = departments[i];
                        var item = single_type_energy_data[m];
                        if(item > max_num) {
                            max_num = item;
                        }
                        single_raw_data.push(item);
                    }
                    energy_data.push(single_raw_data);
                }

                option = {
                    title : {
                        text: '',
                        subtext: '当月'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:act_type
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : departments,
                            axisLabel : {interval : 0}
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            max: Math.round(max_num * 1.2)
                        }
                    ],
                    series : [
                        {
                            name:act_type[0],
                            type:'bar',
                            data:energy_data[0],
                        },
                        {
                            name:act_type[1],
                            type:'bar',
                            data:energy_data[1],
                        },
                        {
                            name:act_type[2],
                            type:'bar',
                            data:energy_data[2],
                        }
                    ]
                };


                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
                $(window).resize(debounce(myChart.resize, 150));
            });
        }
    }
    Sub02();

    const Sub03 = () => {
        if ($('#sub03').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_sub03').remove();
            $('#sub03').append(`
                <div
                    id="v_sub03"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_sub03");
            //var dom = document.getElementsByClassName("coupon-app");
            var myChart = echarts.init(dom);
            var app = {};

            $.getJSON('assets/static/data/hotel.json', function(data){
                app.title = '';
                
                var energy_type = 'WATER';
                var act_type = [];
                var month = 'YTD';
                var departments = [];
                var max_num = -1;

                var raw_data = data['能耗统计'];

                for(var act in raw_data) {
                    act_type.push(act);
                }
                var tmp_act = act_type[0];
                var tmp_energy_data = ((raw_data[tmp_act])[energy_type])['YTD'];
                for(var m in tmp_energy_data) {
                    departments.push(m);
                }

                var energy_data = [];
                for(var i in act_type) {
                    var act = act_type[i];
                    console.log('act:', act);
                    var single_type_energy_data = (raw_data[act])[energy_type][month];
                    console.log('single_type_energy_data:', single_type_energy_data);
                    var single_raw_data = [];
                    for(var i in departments) {
                        var m = departments[i];
                        var item = single_type_energy_data[m];
                        if(item > max_num) {
                            max_num = item;
                        }
                        single_raw_data.push(item);
                    }
                    energy_data.push(single_raw_data);
                }

                option = {
                    title : {
                        text: '',
                        subtext: 'YTD'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:act_type
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : departments,
                            axisLabel : {interval : 0}
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            max: Math.round(max_num * 1.2)
                        }
                    ],
                    series : [
                        {
                            name:act_type[0],
                            type:'bar',
                            data:energy_data[0],
                        },
                        {
                            name:act_type[1],
                            type:'bar',
                            data:energy_data[1],
                        },
                        {
                            name:act_type[2],
                            type:'bar',
                            data:energy_data[2],
                        }
                    ]
                };


                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
                $(window).resize(debounce(myChart.resize, 150));
            });
        }
    }
    Sub03();

    const Sub04 = () => {
        if ($('#sub04').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_sub04').remove();
            $('#sub04').append(`
                <div
                    id="v_sub04"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_sub04");
            //var dom = document.getElementsByClassName("coupon-app");
            var myChart = echarts.init(dom);
            var app = {};

            $.getJSON('assets/static/data/hotel.json', function(data){
                app.title = '';
                
                var energy_type = 'WATER';
                var act_type = [];
                var month = 'YTD';
                var departments = [];
                var max_num = -1;

                var raw_data = data['能耗统计'];

                for(var act in raw_data) {
                    act_type.push(act);
                }
                var tmp_act = act_type[0];
                var tmp_energy_data = ((raw_data[tmp_act])[energy_type])['YTD'];
                for(var m in tmp_energy_data) {
                    departments.push(m);
                }

                var tmp1_energy_data = ((raw_data[tmp_act])[energy_type]);
                var tmp_months = [];
                for(var m in tmp1_energy_data) {
                    tmp_months.push(m);
                }
                month = tmp_months[tmp_months.length - 2];

                var energy_data = [];
                for(var i in act_type) {
                    var act = act_type[i];
                    console.log('act:', act);
                    var single_type_energy_data = (raw_data[act])[energy_type][month];
                    console.log('single_type_energy_data:', single_type_energy_data);
                    var single_raw_data = [];
                    for(var i in departments) {
                        var m = departments[i];
                        var item = single_type_energy_data[m];
                        if(item > max_num) {
                            max_num = item;
                        }
                        single_raw_data.push(item);
                    }
                    energy_data.push(single_raw_data);
                }

                option = {
                    title : {
                        text: '',
                        subtext: '当月'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:act_type
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : departments,
                            axisLabel : {interval : 0}
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            max: Math.round(max_num * 1.2)
                        }
                    ],
                    series : [
                        {
                            name:act_type[0],
                            type:'bar',
                            data:energy_data[0],
                        },
                        {
                            name:act_type[1],
                            type:'bar',
                            data:energy_data[1],
                        },
                        {
                            name:act_type[2],
                            type:'bar',
                            data:energy_data[2],
                        }
                    ]
                };


                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
                $(window).resize(debounce(myChart.resize, 150));
            });
        }
    }
    Sub04();

    const Sub05 = () => {
        if ($('#sub05').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_sub05').remove();
            $('#sub05').append(`
                <div
                    id="v_sub05"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_sub05");
            //var dom = document.getElementsByClassName("coupon-app");
            var myChart = echarts.init(dom);
            var app = {};

            $.getJSON('assets/static/data/hotel.json', function(data){
                app.title = '';
                
                var energy_type = 'electricity';
                var act_type = [];
                var month = 'YTD';
                var departments = [];
                var max_num = -1;

                var raw_data = data['能耗统计'];

                for(var act in raw_data) {
                    act_type.push(act);
                }
                var tmp_act = act_type[0];
                var tmp_energy_data = ((raw_data[tmp_act])[energy_type])['YTD'];
                for(var m in tmp_energy_data) {
                    departments.push(m);
                }
                var energy_data = [];
                for(var i in act_type) {
                    var act = act_type[i];
                    console.log('act:', act);
                    var single_type_energy_data = (raw_data[act])[energy_type][month];
                    console.log('single_type_energy_data:', single_type_energy_data);
                    var single_raw_data = [];
                    for(var i in departments) {
                        var m = departments[i];
                        var item = single_type_energy_data[m];
                        if(item > max_num) {
                            max_num = item;
                        }
                        single_raw_data.push(item);
                    }
                    energy_data.push(single_raw_data);
                }

                option = {
                    title : {
                        text: '',
                        subtext: 'YTD'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:act_type
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : departments,
                            axisLabel : {interval : 0}
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            max: Math.round(max_num * 1.2)
                        }
                    ],
                    series : [
                        {
                            name:act_type[0],
                            type:'bar',
                            data:energy_data[0],
                        },
                        {
                            name:act_type[1],
                            type:'bar',
                            data:energy_data[1],
                        },
                        {
                            name:act_type[2],
                            type:'bar',
                            data:energy_data[2],
                        }
                    ]
                };


                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
                $(window).resize(debounce(myChart.resize, 150));
            });
        }
    }
    Sub05();

    const Sub06 = () => {
        if ($('#sub06').length > 0) {
            // This is a hack, as the .empty() did not do the work
            $('#v_sub06').remove();
            $('#sub06').append(`
                <div
                    id="v_sub06"
                    style="
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                    "
                >
                </div>
            `);

            var dom = document.getElementById("v_sub06");
            //var dom = document.getElementsByClassName("coupon-app");
            var myChart = echarts.init(dom);
            var app = {};

            $.getJSON('assets/static/data/hotel.json', function(data){
                app.title = '';
                
                var energy_type = 'electricity';
                var act_type = [];
                var month = 'YTD';
                var departments = [];
                var max_num = -1;

                var raw_data = data['能耗统计'];

                for(var act in raw_data) {
                    act_type.push(act);
                }
                var tmp_act = act_type[0];
                var tmp_energy_data = ((raw_data[tmp_act])[energy_type])['YTD'];
                for(var m in tmp_energy_data) {
                    departments.push(m);
                }

                var tmp1_energy_data = ((raw_data[tmp_act])[energy_type]);
                var tmp_months = [];
                for(var m in tmp1_energy_data) {
                    tmp_months.push(m);
                }
                month = tmp_months[tmp_months.length - 2];

                var energy_data = [];
                for(var i in act_type) {
                    var act = act_type[i];
                    console.log('act:', act);
                    var single_type_energy_data = (raw_data[act])[energy_type][month];
                    console.log('single_type_energy_data:', single_type_energy_data);
                    var single_raw_data = [];
                    for(var i in departments) {
                        var m = departments[i];
                        var item = single_type_energy_data[m];
                        if(item > max_num) {
                            max_num = item;
                        }
                        single_raw_data.push(item);
                    }
                    energy_data.push(single_raw_data);
                }

                option = {
                    title : {
                        text: '',
                        subtext: '当月'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:act_type
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : departments,
                            axisLabel : {interval : 0}
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            max: Math.round(max_num * 1.2)
                        }
                    ],
                    series : [
                        {
                            name:act_type[0],
                            type:'bar',
                            data:energy_data[0],
                        },
                        {
                            name:act_type[1],
                            type:'bar',
                            data:energy_data[1],
                        },
                        {
                            name:act_type[2],
                            type:'bar',
                            data:energy_data[2],
                        }
                    ]
                };


                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
                $(window).resize(debounce(myChart.resize, 150));
            });
        }
    }
    Sub06();
})();