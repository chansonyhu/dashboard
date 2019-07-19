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
      $.getJSON('assets/static/data/login_country.json', function(data){
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
              values: data,
              scale: ['#C8EEFF', '#0071A4'],
              normalizeFunction: 'polynomial',
            }],
          },
          onRegionTipShow: function(event, label, code){
            console.log('label: ', label)
            if (typeof(data[code]) === "undefined") {
              label.html(
                '<b>'+label.html()+'</b></br>'+
                '<b>登录数: </b>'+ 0
                );
            } else {
              label.html(
                '<b>'+label.html()+'</b></br>'+
                '<b>登录数: </b>'+ data[code] 
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
