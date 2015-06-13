# 開発環境の使い方（Gulp Expert）
全てコマンドプロンプトから実行します。  
OSはWindowsを想定してます。

## 初期設定
###node.jsのインストール
インストールされていれば不要です。
コマンドプロンプトを開いて`node -v`と入力・実行し、バージョン表記が表示されればインストールされています。  
インストールされていない場合は <a href="https://nodejs.org/" target="_blank">node.js</a> 公式サイトからダウンロードしてインストールしてください。

###gulpのインストール
コマンドプロンプトで`npm install gulp -g`と入力・実行してください。

## モジュールのインストール
package.json があるフォルダで[Shift+右クリック]→[コマンドウィンドウでここを開く]を選択してコマンドプロンプトを開き、npm install と入力・実行してください。  
node_modules というフォルダが作成され、その中にインストールされます。
この操作は案件が変わり別のディレクトリなった場合にはもう一度必要になります。

## コマンド
<dl>
<dt>gulp clean</dt>
<dd>httpdocs を削除する。</dd>

<dt>gulp sass</dt>
<dd>src/assets/sass/ の中にある .sassファイルをcssファイルにコンパイルして httpdocs に書き出す。</dd>

<dt>gulp ejs</dt>
<dd>src/ の中にある.ejsファイルをhtmlファイルにコンパイルして httpdocs に書き出す。</dd>

<dt>gulp imagemin</dt>
<dd>src/assets/img/ の中にある画像ファイルを圧縮して httpdocs に書き出す。<br>
      デフォルトでは無効にしているので、使用する際は setting.imagemin.disable を false にする。</dd>

<dt>gulp cssminify</dt>
<dd>httpdocs/assets/css/ の中にある .css ファイルをミニファイして上書きする。<br>
      デフォルトでは無効にしているので、使用する際はsetting.minify.cssを true にする。</dd>

<dt>gulp jsminify</dt>
<dd>httpdocs/assets/js/ の中にある .js ファイルをミニファイして上書きする。<br>
      デフォルトでは無効にしているので、使用する際はsetting.minify.jsを true にする。</dd>

<dt>gulp cssbeautify</dt>
<dd>httpdocs/assets/css/ の中にある .css ファイルのコードを整形して上書きする。<br>
      デフォルトでは無効にしているので、使用する際は setting.cssbeautify.disabled を false にする。
      ※cssminify が有効な場合は使用できない。</dd>

<dt>gulp csscomb</dt>
<dd>httpdocs/assets/css/ の中にある .css ファイルのCSSプロパティをソートして上書きする。<br>
      デフォルトでは無効にしているので、使用する際は setting.csscomb.disabled を false にする。<br>
      cssminify が有効な場合は使用できない。</dd>

<dt>gulp build</dt>
<dd>src フォルダを元にコンパイルしたファイルを httpdocs フォルダに出力する。<br>
      すでに httpdocs がある場合は一度削除するため、httpdocs に直接ファイルを置かないように気をつける。<br>
      上記で紹介しているコマンドを一括で実行する。</dd>

<dt>gulp</dt>
<dd>httpdocsフォルダをルートにWebサーバを立ち上げる。<br>
      ローカルとイントラネット内で確認できるAccess URLsを発行してくれる。<br>
      PHPを使用する場合は、setting.browserSync.server をコメントアウトし、<br>
      setting.browserSync.proxyにxamppで作成したローカルテスト環境のドメインを指定する。</dd>
</dl>

## 主なパッケージの概要
<dl>
<dt>gulp-browserSync</dt>
<dd>gulpコマンドで立ち上げたWebサーバへのAccess URLにアクセスしているブラウザの挙動（スクロールやリロードなど）を同期する。<br>
xxx:3001 にアクセスすることで同期する挙動の制御などができる。</dd>

<dt>gulp-sass</dt>
<dd>scssファイルのコンパイル</dd>

<dt>gulp-imagemin</dt>
<dd>画像ファイルの圧縮（デフォルトでは無効）</dd>

<dt>gulp-autoprefixer</dt>
<dd>ベンダープレフィックスの付与</dd>

<dt>gulp-minify-css</dt>
<dd>CSSコードのミニファイ（デフォルトでは無効）</dd>

<dt>gulp-uglify</dt>
<dd>JSコードのミニファイ（デフォルトでは無効）</dd>

<dt>gulp-csscomb</dt>
<dd>CSSプロパティのソート（デフォルトでは無効）</dd>

<dt>gulp-cssbeautify</dt>
<dd>CSSコードの整形（デフォルトでは無効）</dd>

<dt>gulp-ejs</dt>
<dd>HTMLを作成するテンプレートエンジン。<br>
HTMLの記法はそのままに、テンプレートタグを使ってHTMLではできないことをやってくれる。</dd>
</dl>

##ディレクトリルール
<dl>
<dt>src</dt>
<dd>開発用のデータを入れるフォルダ。このフォルダに全てのデータを格納するようにする。</dd>
<dt>httpdocs</dt>
<dd>開発用のデータをコンパイルしたときに出力先となるフォルダ。Webサーバで確認するときのルートフォルダになる。</dd>
</dl>

src  
┣assets  
┃┠img     - jpg|png|gif|svg  
┃┠sass    - scss  
┃┠js      - js  
┃┠lib     - js単体ファイルでは済まずcssやimgをが含まれているjQuery Pluginなど  
┃┠include - includeするファイル  
┃┗etc     - 上記に含まれないもの全て  
┠sitemap.xml  
┗index.html|.php|.ejs

※外部ファイルは全てassetsフォルダに入れる。
※上記のフォルダ以外のフォルダに入ったファイルは全てコピーされます。
※複数のディレクトリにCSSや画像が入る場合にはgulpfile.jsのsetting変数の変更が必要です。

## 最後に
gulpfile.js で何を行っているのか、package.json にあるモジュールは何かを事前に把握して使用してください。  