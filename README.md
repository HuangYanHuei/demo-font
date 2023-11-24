# font-demo-app

這是模擬美食點餐的 web app 專案

## Live demo

[線上連結]()

[本專案協同後端](https://github.com/HuangYanHuei/demo-back)

<img src="https://github.com/HuangYanHuei/demo-font/blob/master/public/demo1.png" width=300/>
<img src="https://github.com/HuangYanHuei/demo-font/blob/master/public/demo2.png" width=300/>
<img src="https://github.com/HuangYanHuei/demo-font/blob/master/public/demo3.png" width=300/>
<img src="https://github.com/HuangYanHuei/demo-font/blob/master/public/demo4.png" width=300/>

<style>
  img {
    margin: 10px; 
  }
</style>

## 功能

- 註冊/登入/登出
  - 除了註冊和登入頁，使用者一定要登入才能使用網站
  - 當使用者尚未註冊便試圖登入時，會有錯誤提示
  - 當使用者輸入錯誤或不符合輸入規範時，會有錯誤提示
  - 使用者能編輯自己的 name、email、image、address
  - 註冊時，email 不能與其他人重複，若有重複會跳出錯誤提示

- 使用者
  - 使用者能瀏覽所有的餐廳
  - 使用者點擊餐廳時，能查看該餐廳介紹及美食
  - 使用者能編輯自己的名稱、大頭照
  - 使用者能搜尋餐廳、篩選餐廳分類
  - 使用者能查看搜尋歷史
  - 使用者能在個別餐廳頁面搜尋、篩選美食類別
  - 使用者能將美食加入購物車並結算
  - 使用者能點選餐廳左下角購物車圖示做選擇或清空
  - 使用者能在列表中查看所有未結帳的訂單
  - 使用者能在列表中查看所有已結算的訂單



## 環境設置

### 開發與框架
```
"vue": "^3.2.13",
"vue-router": "^4.0.3",
"vuex": "^4.0.0"
```

## 安裝與使用  
1. 使用cmd，clone專案
```
git clone git@github.com:HuangYanHuei/demo-font.git
```
```
權限不足時改用下面一個指令

git clone https://github.com/HuangYanHuei/demo-font.git
```
2. 進入專案資料夾
```
 cd demo-font
```
3. 安裝套件
```
npm install
```
4. 開發模式下執行
```
npm run serve
```

雲端、本地種子資料操作帳號

|    role    | account | password |
| ---------- | ------- | -------- |
| root | root@example.com | 12345678 |


