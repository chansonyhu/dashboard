const styleInit = () => {
  //var exports = {"__esModule": true};
  if ($('#common-style').length > 0) {
    // $('#vstyle').remove();
    $('#common-style').append(`<style>
    #loader {
      transition: all 0.01s ease-in-out;
      opacity: 1;
      visibility: visible;
      position: fixed;
      height: 100vh;
      width: 100%;
      background: #fff;
      z-index: 90000;
    }

    #loader.fadeOut {
      opacity: 0;
      visibility: hidden;
    }



    .spinner {
      width: 40px;
      height: 40px;
      position: absolute;
      top: calc(50% - 20px);
      left: calc(50% - 20px);
      background-color: #333;
      border-radius: 100%;
      -webkit-animation: sk-scaleout 0.1s infinite ease-in-out;
      animation: sk-scaleout 0.1s infinite ease-in-out;
    }

    @-webkit-keyframes sk-scaleout {
      0% { -webkit-transform: scale(0) }
      100% {
        -webkit-transform: scale(1.0);
        opacity: 0;
      }
    }

    @keyframes sk-scaleout {
      0% {
        -webkit-transform: scale(0);
        transform: scale(0);
      } 100% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
        opacity: 0;
      }
    }
    .ShaShiDi{
    width:500px;
    height:70px;
    display:flex;
    align-items:center;
    justify-content:center;
          /*为了效果明显，可以将如下边框打开，看一下效果*/
    // border:1px solid black;
    }

    .ShaShiDi img{
      width:100%;
      height:auto;
    }
  </style>`);
  }
};

const sidebarInit = () => {
  if ($('#common-sidebar').length > 0) {
    // $('#vside').remove();
    $('#common-sidebar').append(`
    <div class="sidebar">
      <div class="sidebar-inner">
      <div class="sidebar-logo">
      <div class="peers ai-c fxw-nw">
        <div class="peer peer-greed">
          <a class="sidebar-link td-n" href="index.html">
            <div class="peer peer-greed">
            <h5 class="lh-1 mB-0 logo-text">&nbsp;</h5>
            </div>
            <div class="peers ai-c fxw-nw">
              <div class="peer">
                <div class="logo ShaShiDi">
                  <img src="assets/static/images/logo.png" alt="">
                </div>
                <br />
              </div>
              <div class="peer peer-greed">
                <h5 class="lh-1 mB-0 logo-text">智慧运营看板系统</h5>
              </div>
            </div>
            <div class="peer peer-greed">
            <!-- <h5 class="lh-1 mB-0 logo-text">&nbsp;</h5> -->
            </div>
          </a>    
        </div>
        <div class="peer">
          <div class="mobile-toggle sidebar-toggle">
            <a href="" class="td-n">
              <i class="ti-arrow-circle-left"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

        <!-- ### $Sidebar Menu ### -->
        <ul class="sidebar-menu scrollable pos-r">
          <li class="nav-item mT-30 actived">
            <a class="sidebar-link" href="00-app_info.html">
              <span class="icon-holder">
                <i class="c-blue-500 ti-apple"></i>
                <!--<i class="c-blue-500 fab fa-app-store"></i>-->
              </span>
              <span class="title">App情况</span>
            </a>
          </li>
          <li class="nav-item">
            <a class='sidebar-link' href="01-coupon.html">
              <span class="icon-holder">
                <i class="c-brown-500 ti-gift"></i>
              </span>
              <span class="title">收楼优惠券</span>
            </a>
          </li>
          <li class="nav-item">
            <a class='sidebar-link' href="02-repossession.html">
              <span class="icon-holder">
                <i class="c-blue-500 ti-share"></i>
              </span>
              <span class="title">预约收楼</span>
            </a>
          </li>
          <li class="nav-item">
            <a class='sidebar-link' href="03-app_payment.html">
              <span class="icon-holder">
                <i class="c-deep-orange-500 ti-money"></i>
              </span>
              <span class="title">App支付</span>
            </a>
          </li>
          <li class="nav-item">
            <a class='sidebar-link' href="03-app_payment.html">
              <span class="icon-holder">
                <i class="c-deep-purple-500 ti-home"></i>
              </span>
              <span class="title">酒店数据</span>
            </a>
          </li>
        </ul>
      </div>
    </div>`);
  }
};

const topbarInit = () => {
  if ($('#common-topbar').length > 0) {
    // $('#vtopbar').remove();
    $('#common-topbar').append(`<div class="header navbar">
    <script>
    console.log('upload');
    $("#btn_upload").click(function(){
      console.log('upload');
      window.location.href="http://" + document.domain + ':8086/uploadform';
    });
    $("#btn_logout").click(function(){
      console.log('upload');
      window.location.href="http://" + document.domain + ':3001';
    });
    </script>
    <div class="header-container">
      <ul class="nav-left">
        <li>
          <a id='sidebar-toggle' class="sidebar-toggle" href="javascript:void(0);">
            <i class="ti-menu"></i>
          </a>
        </li>
        <!--
        <li class="search-box">
          <a class="search-toggle no-pdd-right" href="javascript:void(0);">
            <i class="search-icon ti-search pdd-right-10"></i>
            <i class="search-icon-close ti-close pdd-right-10"></i>
          </a>
        </li>
        -->
        <li class="search-input">
          <input class="form-control" type="text" placeholder="Search...">
        </li>
      </ul>
      <ul class="nav-right">
        <li class="dropdown">
          <a href="" class="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-toggle="dropdown">
            <div class="peer mR-10">
              <i class="ti-user"></i>
              <!--<img class="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/10.jpg" alt="">-->
            </div>
            <div class="peer">
              <span id="usr_name" class="fsz-sm c-grey-900">欢迎您！</span>
            </div>
          </a>
          <ul class="dropdown-menu fsz-sm">
            <li>
              <a id="btn_upload" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                <i class="ti-upload mR-10"></i>
                <span>上传</span>
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a id='btn_logout' class="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                <i class="ti-power-off mR-10"></i>
                <span>退出</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>`);
  }
};

const footerInit = () => {
  $('footer').append(`<span>Copyright © 2019 Powered by <a href="https://colorlib.com" target='_blank' title="Colorlib">Colorlib</a>. All rights reserved.</span>`);
};

styleInit();
sidebarInit();
topbarInit();
footerInit();