# HomeTown Furniture
![index](https://user-images.githubusercontent.com/42172767/93883609-62623d00-fd14-11ea-8c4b-34e180ecba08.jpg)

## Demo
https://tzuyi00.github.io/HomeTown/

## 使用技術
* Vue CLI
* Vue Router
* Vue Components
* Webpack
* API
* axios
* JavaScript (ES6)
* ESlint
* Bootstrap 4
* RWD
* SCSS
* Canvas

## 使用插件
* [vue-router](https://www.npmjs.com/package/vue-router)
* [vue-axios](https://www.npmjs.com/package/vue-axios)
* [vue-loading-overlay](https://www.npmjs.com/package/vue-loading-overlay)
* [vee-validate](https://www.npmjs.com/package/vee-validate)
* [bootstrap 4](https://getbootstrap.com/)
* [wow.js](https://wowjs.uk/docs.html)
* [clipboard.js](https://clipboardjs.com/)
* [Google Font](https://fonts.google.com/)
* [Font Awesome](https://fontawesome.com/)

## 網頁架構
以 Vue.js 實作模擬購物網站，功能區分為前、後台：
* 前台
  * 首頁 - 關於我們簡介、產品導覽
  * 產品列表 - 切換分類、加入購物車
  * 產品詳細 - 選擇產品數量加入購物車、推薦相關產品
  * 優惠活動 - 刮刮樂遊戲獲得優惠碼
  * 購物車結帳 - 確認購物車產品項目、優惠碼套用、填寫訂單
  * 下單 - 完成結帳
* 後台
  * 管理者登入
  * 產品管理 - 新增、刪除、編輯產品
  * 優惠券管理 - 新增、刪除、編輯優惠券
  * 訂單管理 - 查看、修改訂單
  * 圖片管理 - 新增、刪除圖片
  
## 前台介紹
### 首頁
* 關於我們簡介、產品導覽
* 使用 wow.js 製作動畫效果

![首頁](https://user-images.githubusercontent.com/42172767/93671806-acf77580-fad8-11ea-8561-b982dccafa93.gif)


### 產品列表
* 切換分類、加入購物車
* 右上角購物車於未選擇產品時，導向至產品列表，有選擇產品時，導向至購物車結帳頁面，在此也可直接做刪除的動作

![產品列表](https://user-images.githubusercontent.com/42172767/93671039-5dae4680-fad2-11ea-94a3-9efb95d9bfd5.gif)

### 產品詳細
* 選擇產品數量加入購物車
* 推薦同分類相關產品

![產品詳細](https://user-images.githubusercontent.com/42172767/93671323-9b13d380-fad4-11ea-8069-a807e1e292bb.gif)

### 優惠活動
* 使用 Canvas 實現刮刮樂效果
* 內有三種獎項做隨機顯示
* 使用 clipboard.js 複製優惠碼

![優惠活動](https://user-images.githubusercontent.com/42172767/93671380-1bd2cf80-fad5-11ea-88cf-a52c3abde9e2.gif)

### 購物車結帳
* 確認購物車產品項目，可做產品數量的加減以及刪除
* 優惠碼套用

![購物車頁面](https://user-images.githubusercontent.com/42172767/93671454-b3d0b900-fad5-11ea-9a99-b3d84c0a91dc.gif)

* 使用 vee-validate 做表單驗證，建立訂單

![填寫訂單](https://user-images.githubusercontent.com/42172767/93671546-73256f80-fad6-11ea-9f4c-4d3d5a73df97.gif)

### 下單
* 確認訂單，完成結帳，結帳成功後導向至產品列表

![下單](https://user-images.githubusercontent.com/42172767/93671578-b253c080-fad6-11ea-913e-8a34cda83122.gif)


## 後台介紹
* 管理員登入及登出
* 商品管理、優惠券管理、訂單管理及圖片管理

![後台介紹](https://user-images.githubusercontent.com/42172767/93671677-a61c3300-fad7-11ea-84c2-232092eb2eb0.gif)

## 聲明
* 圖片來源： [Unsplash](https://unsplash.com/)
* 本作品內的圖片和文字內容，僅個人作品練習，無任何商業用途
