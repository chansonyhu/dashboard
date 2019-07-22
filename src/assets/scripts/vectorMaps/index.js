import * as $ from 'jquery';
// import 'jvectormap';
// import 'jvectormap/jquery-jvectormap.css';
import './jquery-jvectormap.css';
// import './jquery.jvectormap.min';
import './jquery-jvectormap-max';
import './jquery-jvectormap-world-mill.js';
import './common.js';
import { debounce } from 'lodash';

export default (function () {
  const vectorMapInit = () => {
    if ($('#world-map-marker').length > 0) {
      // This is a hack, as the .empty() did not do the work
      $('#vmap').remove();

      // we recreate (after removing it) the container div, to reset all the data of the map
      $('#world-map-marker').append(`
        <div
          id="vmap"
          style="
            height: 400px;
            position: relative;
            overflow: hidden;
            background-color: transparent;
          "
        >
        </div>
      `);
      $.getJSON('assets/static/data/APPuser.json', function(data){
        var entire_country_dist = data['Entire country distribute'];
        $('#vmap').vectorMap({
          map: 'world_mill',
          backgroundColor: '#fff',
          borderColor: '#fff',
          borderOpacity: 0.25,
          borderWidth: 0,
          color: '#e6e6e6',
          regionStyle : {
            initial : {
              fill : '#e4ecef',
            },
          },

          markerStyle: {
            initial: {
              r: 7,
              'fill': '#fff',
              'fill-opacity':1,
              'stroke': '#000',
              'stroke-width' : 2,
              'stroke-opacity': 0.4,
            },
          },

          // markers : [{
          //   latLng : [21.00, 78.00],
          //   name : 'INDIA : 350',
          // }, {
          //   latLng : [-33.00, 151.00],
          //   name : 'Australia : 250',
          // }, {
          //   latLng : [36.77, -119.41],
          //   name : 'USA : 250',
          // }, {
          //   latLng : [55.37, -3.41],
          //   name : 'UK   : 250',
          // }, {
          //   latLng : [25.20, 55.27],
          //   name : 'UAE : 250',
          // }],
          series: {
            regions: [{
              values: entire_country_dist,
              scale: ['#C8EEFF', '#0071A4'],
              normalizeFunction: 'polynomial',
            }],
          },
          onRegionTipShow: function(event, label, code){
            if (typeof(entire_country_dist[code]) === "undefined") {
              label.html(
                '<b>'+label.html()+'</b></br>'+
                '<b>登录数: </b>'+ 0
                );
            } else {
              label.html(
                '<b>'+label.html()+'</b></br>'+
                '<b>登录数: </b>'+ entire_country_dist[code] 
              );
            }
          },
          onRegionClick: function(event, code) {
            console.log('code:', code)
          },
          hoverOpacity: null,
          normalizeFunction: 'linear',
          zoomOnScroll: true,
          scaleColors: ['#b6d6ff', '#005ace'],
          selectedColor: '#c9dfaf',
          selectedRegions: [],
          enableZoom: true,
          hoverColor: '#fff',
        });
      });
    }
  };

  vectorMapInit();
  //$(window).resize(debounce(vectorMapInit, 150));

})();
$.getJSON('assets/static/data/APPuser.json', function(data){
  var entire_country_dist = data['Entire country distribute'];
  $('#cn_user').append(entire_country_dist['CN']);
  $('#my_user').append(entire_country_dist['MY']);
  var total_login = 0;
  for (var key in entire_country_dist) {
    total_login += entire_country_dist[key];
  }
  $('#total_login').append(total_login);

  var other_user;
  other_user = total_login - entire_country_dist['CN'] - entire_country_dist['MY'];
  $('#other_user').append(other_user);

  var cn_prop = (entire_country_dist['CN']/total_login * 100).toFixed(1);
  var my_prop = (entire_country_dist['MY']/total_login * 100).toFixed(1);
  var other_prop = (other_user/total_login * 100).toFixed(1);
  $('#cn_prop').append(cn_prop + '%');
  $('#my_prop').append(my_prop + '%');
  $('#other_prop').append(other_prop + '%');

  $('#cn_progress').append(`
  <div class="progress mT-10">
  <div class="progress-bar bgc-deep-purple-500" role="progressbar" aria-valuenow="`
  + cn_prop +`" aria-valuemin="0" aria-valuemax="100" style="width:` + cn_prop + `%;"> <span class="sr-only">` + cn_prop + `% Complete</span></div>
  </div>
  `);
  $('#my_progress').append(`
  <div class="progress mT-10">
  <div class="progress-bar bgc-green-500" role="progressbar" aria-valuenow="`
  + my_prop +`" aria-valuemin="0" aria-valuemax="100" style="width:` + my_prop + `%;"> <span class="sr-only">` + my_prop + `% Complete</span></div>
  </div>
  `);
  $('#other_progress').append(`
  <div class="progress mT-10">
  <div class="progress-bar bgc-light-blue-500" role="progressbar" aria-valuenow="`
  + other_prop +`" aria-valuemin="0" aria-valuemax="100" style="width:` + other_prop + `%;"> <span class="sr-only">` + other_prop + `% Complete</span></div>
  </div>
  `);
});