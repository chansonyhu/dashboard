import * as $ from 'jquery';
import { debounce } from 'lodash';

export default (function () {
    const Main = () => {
        var data = $.parseJSON(sales_data);
        var raw_data = data['分布'];
        var keys = [];
        for(var key in raw_data) {
            keys.push(key);
        }
        // $.getJSON('assets/static/data/hotel.json', function(data){
        var total = keys.length;
        var option = [];
        var myChart = [];
        for(var i = 0; i < total; i++) {
            option.push(null);
            myChart.push(null);
        }
        console.log(total);
        for(var i = 0; i < total; i++) {
            $('#subsub' + i).remove();
            if ($('#main_pies').length > 0) {
                // This is a hack, as the .empty() did not do the work
                // $('#v_sub' + i).remove();
                $('#main_pies').append(`
                    <div class="masonry-item col-md-6" >
                        <div class="bd bgc-white">
                        <div class="layers">
                            <div class="layer w-100 pX-20 pT-20">
                            <h6 class="lh-1"></h6>
                            </div>
                            <div class="layer center w-100">
                            <div id="subsub`+i+`" style="
                            height: 500px;
                            position: relative;
                            overflow: hidden;
                            background-color: transparent;
                            "></div>
                            </div>
                        </div>
                        </div>
                    </div>
                `);
                var dom = document.getElementById("subsub" + i);
                //var dom = document.getElementsByClassName("coupon-app");
                myChart[i] = echarts.init(dom);

                key = keys[i];
                var main_data = raw_data[key];
                var subs = [];
                for(var sub in main_data) {
                    if(sub == 'total') {
                        continue;
                    }
                    subs.push(sub);
                }
                var series_data = [];
                for(var k in subs) {
                    var sub = subs[k];
                    var series = {};
                    series['value'] = main_data[sub];
                    series['name'] = sub;
                    series_data.push(series);
                }
                option[i] = {
                    title : {
                        text: key,
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: subs,
                        type: 'scroll',
                    },
                    toolbox: {
                        orient: 'vertical',
                        feature: {
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true},
                        }
                    },
                    series : [
                        {
                            name: key,
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data: series_data,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
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


                if (option[i] && typeof option[i] === "object") {
                    myChart[i].setOption(option[i], true);
                }
                $(window).resize(debounce(myChart[i].resize, 15));
            }
        }
        // });
        //////////////////////////////////////////////////////////////////  
    }
    Main();

    const Main1 = () => {
        var data = $.parseJSON(sales_data);
        var subtitle;
        for(var key in data['关联分析']) {
            subtitle = key;
            break;
        }
        var raw_data = data['关联分析'][subtitle];
        var keys = [];
        for(var key in raw_data) {
            keys.push(key);
        }
        // $.getJSON('assets/static/data/hotel.json', function(data){
        var total = keys.length;
        var option = [];
        var myChart = [];
        for(var i = 0; i < total; i++) {
            option.push(null);
            myChart.push(null);
        }
        for(var i = 0; i < total; i++) {
            $('#subsubsub' + i).remove();
            if ($('#main_pies').length > 0) {
                // This is a hack, as the .empty() did not do the work
                // $('#v_sub' + i).remove();
                $('#main_pies').append(`
                    <div class="masonry-item col-md-6" >
                        <div class="bd bgc-white">
                        <div class="layers">
                            <div class="layer w-100 pX-20 pT-20">
                            <h6 class="lh-1"></h6>
                            </div>
                            <div class="layer center w-100">
                            <div id="subsubsub`+i+`" style="
                            height: 500px;
                            position: relative;
                            overflow: hidden;
                            background-color: transparent;
                            "></div>
                            </div>
                        </div>
                        </div>
                    </div>
                `);
                var dom = document.getElementById("subsubsub" + i);
                console.log(dom);
                //var dom = document.getElementsByClassName("coupon-app");
                myChart[i] = echarts.init(dom);

                key = keys[i];
                var main_data = raw_data[key];
                var subs = [];
                for(var sub in main_data) {
                    if(sub == 'total') {
                        continue;
                    }
                    subs.push(sub);
                }
                var series_data = [];
                for(var k in subs) {
                    var sub = subs[k];
                    var series = {};
                    series['value'] = main_data[sub];
                    series['name'] = sub;
                    series_data.push(series);
                }
                option[i] = {
                    title : {
                        text: key,
                        subtext: subtitle,
                        x:'center'
                    },
                    
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        left: 'left',
                        data: subs
                    },
                    series : [
                        {
                            name: key,
                            label: {
                        normal: {
                            show: false,
                            position: 'center'
                        }
                },
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data: series_data,
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



                if (option[i] && typeof option[i] === "object") {
                    myChart[i].setOption(option[i], true);
                }
                $(window).resize(debounce(myChart[i].resize, 15));
            }
        }
        // });
        //////////////////////////////////////////////////////////////////  
    }
    Main1();
    
})();
