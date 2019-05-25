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

已经训练好的模型可以从百度云盘下载：下载完之后放在 `write` 目录下就可以：
  下载地址： 链接: https://pan.baidu.com/s/1hcp947GHYJAXYqD7mzz8ew 提取码: 644s 

#目录结构
![屏幕快照 2019-05-23 19.16.11](http://ww1.sinaimg.cn/large/006tNc79ly1g3dd6clwilj30u0136ti0.jpg)

