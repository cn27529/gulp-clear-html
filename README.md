# gulp-clear-html

-用於純靜態的網頁處理項目
-壓縮css, js, images, html
-產生dist包
-交付dist包內的產品
---

## 安裝方式

- 初次使用方式：

    * 安裝全域 **gulp**及**node-sass**

        ```
        $> npm install -g gulp
        $> npm install -g node-sass

        ```

- 安裝套件方式：

    ```
    $> npm install
    ```

---

## 執行gulp開發任務：

    ```
    //執行build動作，產生dist包
    $> gulp build

    //執行local server 開發環境，預設http://localhost:8080
    $> gulp server

    //清除dist包內容
    $> gulp clean
    ```
