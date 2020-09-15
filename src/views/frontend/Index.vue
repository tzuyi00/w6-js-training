<template>
  <div class="container-fluid px-0">
    <header :style="{backgroundImage: `url(${img.header})` }">
      <div class="bannerTxt text-center">
        <div class="txts wow animate__animated animate__fadeInUp">午後閒暇，放下一切束縛</div>
        <div class="txts wow animate__animated animate__fadeInUp" data-wow-delay="1s">不用去遠方，在家就能優雅渡假</div>
        <router-link to="/products">
          <div class="bannerBtn btn btn-info mt-3 shadow-sm wow animate__animated animate__jello" data-wow-delay="1.8s">
            選購去
            <i class="fas fa-hand-point-up"></i>
          </div>
        </router-link>
      </div>
      <div @click="arrowDown()" class="arrow text-center">
        <i class="fas fa-angle-double-down"></i>
      </div>
    </header>
    <div id="arrowDown" class="container text-center">
      <div class="aboutUs row mt-5" :style="{backgroundImage: `url(${img.flower})` }">
        <div class="order-md-2 aboutUsTxt col-12 col-md-6 align-self-center">
          <div class="wow animate__animated animate__fadeInUp" data-wow-delay="0.5s">
            <h2 class="title">About Us</h2>
            <div class="line mx-auto"></div>
          </div>
          <div class="h4 mt-4 wow animate__animated animate__fadeInUp" data-wow-delay="0.8s">相信 家會更貼心</div>
          <div class="h5 mt-3 wow animate__animated animate__fadeInUp" data-wow-delay="1s">
            我們的初衷
            <br />是為您打造一個有格調的家
            <br />簡約而不簡單的造型設計
            <br />讓家居回歸真摯的美好
            <br />
          </div>
          <div class="h5 mt-3 wow animate__animated animate__fadeInUp" data-wow-delay="1s">
            款式多樣 價格透明
            <br />專業人員為您現場丈量規劃
            <br />幫您以最少預算
            <br />打造出濃濃鄉村氣息的幸福居家
          </div>
        </div>
        <div class="order-md-1 col-12 col-md-6 wow animate__animated animate__fadeInLeft">
          <img class="aboutUsImg" :src="img.aboutUs" alt />
        </div>
      </div>
      <div class="arrival">
        <div class="wow animate__animated animate__fadeInUp">
          <h2 class="title text-center">New Arrival</h2>
          <div class="line mx-auto"></div>
        </div>
        <div class="row mt-4">
          <div class="col-12 col-md-4 mt-4 px-sm-0 wow animate__animated animate__fadeInUp">
            <div class="arrWrap">
              <router-link to="/product/YQf9MNfIPFcjKNXdaKYZWSigm5ioJvsOXxuTpYm7rB4vFIr9a6zNvPrXi9mwHBJq">
                <div class="arrImg" :style="{backgroundImage: `url(${img.arr1})` }"></div>
              </router-link>
            </div>
            <div class="arrTxt">
              <div class="arrInner">
                <h4>桌子</h4>
                <p class="text-left mt-3">依照你的需求，挑選可調整桌面高度、活動桌板的書桌或工作桌，讓你讀書、工作都更有效率。</p>
                <router-link to="/products">
                  <div class="btn btn-info">View Detail</div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 mt-4 px-sm-0 d-flex flex-column wow animate__animated animate__fadeInUp" data-wow-delay="0.5s">
            <div class="arrWrap order-md-2">
              <router-link to="/product/bmbWYKRkF9YeGFDPVQqBo1HEv6pX0vCoUpkNuLn08VP3btszYfAoymUNxEMF2cbj">
                <div class="arrImg" :style="{backgroundImage: `url(${img.arr2})` }"></div>
              </router-link>
            </div>
            <div class="arrTxt order-md-1">
              <div class="arrInner">
                <h4>燈飾</h4>
                <p class="text-left mt-3">不管是窩在沙發上看電視或是準備晚餐的溫馨過程，點盞燈都可以讓氣氛更舒適，空間更明亮！</p>
                <router-link to="/products">
                  <div class="btn btn-info">View Detail</div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 mt-4 px-sm-0 wow animate__animated animate__fadeInUp" data-wow-delay="1s">
            <div class="arrWrap">
              <router-link to="/product/35Fp3amsAeRN7IupNYykoHYbr8dl8fDoQfXVZfvgqi9tgCxBmfKd05RBnWL81D9U">
                <div class="arrImg" :style="{backgroundImage: `url(${img.arr3})` }"></div>
              </router-link>
            </div>
            <div class="arrTxt">
              <div class="arrInner">
                <h4>椅子</h4>
                <p class="text-left mt-3">我們知道你有時只想抓本書，享受一個人的時光，因此提供多功能性的椅子，久坐依然舒適。</p>
                <router-link to="/products">
                  <div class="btn btn-info">View Detail</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="middleBg" :style="{backgroundImage: `url(${img.middleBg})` }">
      <div class="middleTxt text-center text-sm-left">
        <div class="txts wow animate__animated animate__bounceInLeft">尚未獲得周年慶優惠大獎嗎？</div>
        <div class="text-center d-sm-flex align-items-center justify-content-end">
          <div class="txts d-block d-sm-inline wow animate__animated animate__bounceInRight" data-wow-delay="1s">快來刮出你的專屬優惠券</div>
          <router-link to="/coupon">
            <div class="middleBtn btn btn-info ml-sm-3 mt-3 mt-sm-0 shadow-sm wow animate__animated animate__backInUp" data-wow-delay="2s">
              領獎去
              <i class="fas fa-hand-point-up"></i>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="container hotSale">
      <div class="wow animate__animated animate__fadeInUp">
        <h2 class="title text-center">Hot Sale</h2>
        <div class="line mx-auto"></div>
      </div>

      <div class="row mt-4">
        <div class="col-12 col-md-6 mt-4 wow animate__animated animate__fadeInUp">
          <router-link to="/product/C0ctzEP4vsNjXCjPxVeE8Mw61nGu1kBJBSju4Qxa7kCxY1tG2NwcVB20JAEKMkXJ">
            <div class="goodWrap" :style="{backgroundImage: `url(${img.good1})` }">
              <div class="goodTitle">珍愛雙人布沙發</div>
              <div class="goodDetail">
                <h4>珍愛雙人布沙發</h4>
                <p>
                  溫暖、舒適、整潔又時尚
                  <br />椅墊套質感柔軟
                  <br />線條貼合沙發形狀
                  <br />賦予實用和美觀完美的平衡
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-12 col-md-6 mt-4 wow animate__animated animate__fadeInUp" data-wow-delay="1s">
          <router-link to="/product/EUySZ1dDkRzOn7EKKUK1YWGQIHD7nvFfcWvHsYGkmY9mo6MU2Eo3V00Wp7swZWiG">
            <div class="goodWrap" :style="{backgroundImage: `url(${img.good2})` }">
              <div class="goodTitle">手工唯美桌燈</div>
              <div class="goodDetail">
                <h4>手工唯美桌燈</h4>
                <p>
                  靈感來自傳統煤油燈
                  <br />柔和、溫暖的氣氛照明
                  <br />轉動圓鈕，就能調整燈光
                  <br />增添柔和舒適的光線
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="goShopBtn">
      <hr />
      <router-link to="/products">
        <button class="btn btn-info wow animate__animated animate__jello" data-wow-delay="1s">購物去</button>
      </router-link>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'Index',
  components: {},
  data () {
    return {
      img: {
        header:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/965WJvjXtivbDm2fB6MjvgFvWT6FSpDGIaMpFHPvoGVm0nWCQ1JEfEK3tcCk5X26TsBWiKOrM5zddvaXKgB6AhEz3tQewtGsMqu7AcpcPRTzRRjDPcydPvSMpsWcBVNH.jpg',
        aboutUs:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/M0A1F1XQUAbr2E4Qpuy132rD1Mmj6RBnzbAjeFL1GsBTdcA5ltZwz7hwzYJTuLPl9Otp6n9hwRxThnovGxnwpSJkfj6kul0xL0MYBQ1O30stkps6MplKsiXfaxYeNaJB.jpg',
        arr1:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/dvVxvM1M4MYdXOwO3bwBigWaoIIuKmuuGtAoK15dgHpmhJm8K2WRASUlmrhTFxuEvI1xUECD6ku1wc7zgb5Yy74lqFfMrjcxhuJ6773w0JBkWSSHT1eJZIGSNvEPrCHE.jpg',
        arr2:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Tw31KMK9orIPzNAlx2mP0t8nR9bqe1unz9a75Ooc6V4nsT5pzDGMDUCJnkJFB5pMZOQYEBmpvGfQeoB3mtXJs2yEaA3bETai9P0Wi817DOgQgy8SbUNOY9PQO8EWbcRU.jpg',
        arr3:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/5avzNHhiaukMHhN6v5xtPxrFp21zVw0v5mTETAjoU0IIu7sFDDIlqEQvnKW2NkYHdpWPOkW8jrV5puN09yuaACkHkhf1RpWT5IECLkv8oDckcgepoxOhCIxAVNDCnVBw.jpg',
        middleBg:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/APyH4hoonnPFz55P2cdhuIEG7CGJhNT59P4F5WhXD3rhlkywYxCPLNbNxGRmX2KCKbppKiZmnr8rB6j0kH0qzJ0D6tOv5G2a5ZBYsZdrFgcL7vQjd321Nr5yjh1Qk1oa.jpg',
        good1:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/zFVVWbhJ6Gbphym6yHXfxQ0QIYWbL89d8RVxiodwuCFhryhlIgIgCReG7SDDBxZuCkwX55l2hBiA3lT1sdYTcWK5WqSxELBAy8XIjDsul9OSyC7ErhR4RVyRoZaekK5J.jpg',
        good2:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/xnWf5lJ4Ecm4KDTPSCmzIOal1VYSlGUQmJ5f3SAMlMf7PjE1ksL5yEhEfFmoym2eO3TCS2XE2Bd183nMKzxKJoAyL3YyzDrRytXjCsHFto9HXPpYii5zswrdsrpkv9mk.jpg',
        flower:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/i741reDciHoKdI2bG8kglvbsTK3H6SvlXRVOOU9zPldewURJrWVOHXtFDBewj4d46FNswd3sPB2SZnU6OaLldX0HCmdcC3cDMZPz1e1CKUwkkR7PP4p38I1FI0brMIqm.png'
      }
    }
  },
  methods: {
    arrowDown () {
      $('body,html').animate(
        {
          scrollTop: $('#arrowDown').offset().top - 80
        },
        800
      )
    }
  }
}
</script>
