#!/usr/bin/env sh

# 發生錯誤時執行終止指令
set -e

# 打包編譯
npm run build

# 移動到打包資料夾下，若你有調整的話打包後的資料夾請務必調整
cd dist

# 部署到自定義網域
# echo 'www.example.com' > CNAME

git init
git add .
git commit -m "update `date +'%Y-%m-%d %H:%M:%S'`";

# 部署到 https://<USERNAME>.github.io

git push -f https://github.com/tzuyi00/HomeTown.git master:gh-pages

cd -

# 用Git Bash執行
# sh deploy.sh