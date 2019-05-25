# 后台部分
## 下载：从仓库中将所有东西clone
```
git clone ...
```

# 安装依赖包
```
npm install 
```

### 运行
```
npm start
```


# 汉字识别模型部分
## 训练
```python
python3 chinese_rec.py --mode=train --max_steps=16002 --eval_steps=100 --save_steps=500
```
## 模型评估
```python
python3 chinese_rec.py --mode=validation
```
## 测试
```python
python3 chinese_rec.py --mode=inference
```

## 训练日志查看
```
tensorboard --logdir="log/"
```

## 已经解析好的数据和训练好的模型下载链接
链接: https://pan.baidu.com/s/1hcp947GHYJAXYqD7mzz8ew 提取码: 644s 

#目录结构
|————bin  --------------------- 可执行脚本目录
| |————build.sh --------------- 构建脚本
| |————start.sh --------------- 启动脚本
|————config ------------------- 配置文件目录
| |————config.js  ------------- 代码打包后自动生成
| |————config_default.js  ----- 所有环境的默认配置项
| |————index.js --------------- 配置项合并逻辑，(生产环境会去读取 /opt/conf/${projectName}/config.js)
|————common ------------------- 公共代码
| |————util.js  --------------- 常规工具类函数
| |————mysql.js  -------------- mysql连接初始化
| |————baidu_api.js  -------------- 百度API调用接口封装
| |————constant.js ------------ 常量存储
| |————log.js ----------------- 日志模块初始化
|————controller --------------- 业务逻辑，控制层目录
| |————article.js ------------- 文章操作
| |————chinese.js  ------------ 汉字识别
|———— service ----------------- 连接controller，调用model进行数据操作
| |————user.js ---------------- 微信用户存储
| |————article.js ------------- 文章操作
| |————reptile.js ------------- 相关文章的爬取储存
|————model  ------------------- 数据模型层
| |————user.js ---------------- 微信用户存储
| |————article.js ------------- 文章操作
| |————reptile.js ------------- 相关文章的爬取储存
|————middleware --------------- 自定义中间件目录
|————reptile ------------- 文章爬取
|————write ------------- 文章爬取
| |————checkpoint --------------- 模型存储
| |————chinese_rec.py --------------- 模型训练
| |————chinese.py --------------- 模型调用
|————router ------------------- 路由目录
| |————index.js --------------- 负责路由加载
|————test --------------------- 单元测试目录
|————CHANGELOG.md ------------- 项目发布版本历史记录
|————Makefile ----------------- makefile，执行安装，打包等操作
|————README.md  --------------- 项目描述文件
|————.eslintrc  --------------- eslint静态检查配置文件
|————.eslintignore  ----------- eslint静态检查忽略的文件
|————.gitignore --------------- 排除上传git的文件
|————package-lock.json  ------- npm包版本锁定文件, 确保每个环境安装的版本一致
|————package.json ------------- npm包依赖配置
|————app.js ------------------- 程序启动入口文件


