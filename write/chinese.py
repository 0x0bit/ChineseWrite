import chinese_rec
from flask import Flask, request
import json
import numpy as np
import cv2
import os
import shutil

# --------------- 图片处理 ----------------------
def get_image(path):
    # 获取图片
    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    return img, gray

def Gaussian_Blur(gray):
    # 高斯去噪
    blurred = cv2.GaussianBlur(gray, (9, 9), 0)
    return blurred

def Sobel_gradient(blurred):
    # 索比尔算子来计算x、y方向梯度
    gradX = cv2.Sobel(blurred, ddepth=cv2.CV_32F, dx=1, dy=0)
    gradY = cv2.Sobel(blurred, ddepth=cv2.CV_32F, dx=0, dy=1)

    gradient = cv2.subtract(gradX, gradY)
    gradient = cv2.convertScaleAbs(gradient)

    return gradX, gradY, gradient

def Thresh_and_blur(gradient):
    blurred = cv2.GaussianBlur(gradient, (9, 9), 0)
    (_, thresh) = cv2.threshold(blurred, 90, 255, cv2.THRESH_BINARY)

    return thresh

def image_morphology(thresh):
    # 建立一个椭圆核函数
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25))
    # 执行图像形态学, 细节直接查文档，很简单
    closed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    closed = cv2.erode(closed, None, iterations=4)
    closed = cv2.dilate(closed, None, iterations=4)

    return closed

def findcnts_and_box_point(closed):
    # 这里opencv3返回的是二个参数
    (cnts, _) = cv2.findContours(closed.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    boxs = []
    for i in cnts:
        rect = cv2.minAreaRect(i)
        box = np.int0(cv2.boxPoints(rect))
        boxs.append(box)
    for j in range(len(boxs)):
        for i in range(len(boxs) - 1):
            j = i + 1
            if boxs[i][0][0] > boxs[j][0][0]:
                temp = boxs[i]
                boxs[i] = boxs[j]
                boxs[j] = temp
    print(boxs)
    return boxs

def drawcnts_and_cut(original_img, boxs):
    cutImgs = []

    for box in boxs:
        Xs = [i[0] for i in box]
        Ys = [i[1] for i in box]
        x1 = min(Xs)
        x2 = max(Xs)
        y1 = min(Ys)
        y2 = max(Ys)
        hight = y2 - y1
        width = x2 - x1
        crop_img = original_img[y1:y1 + hight, x1:x1 + width]
        cutImgs.append(crop_img)
    return cutImgs

def walk(path):
    img_path = r'{}'.format(path)
    original_img, gray = get_image(img_path)
    blurred = Gaussian_Blur(gray)
    gradX, gradY, gradient = Sobel_gradient(blurred)
    thresh = Thresh_and_blur(gradient)
    closed = image_morphology(thresh)
    box = findcnts_and_box_point(closed)
    crop_img = drawcnts_and_cut(original_img, box)
    shutil.rmtree('images')
    os.mkdir('images')
    for i in range(len(crop_img)):
        cv2.imwrite('images/img{}.png'.format(i), crop_img[i])

# --------------- 图片处理结束 --------------------

# --------------- 路由列表 --------------------
app = Flask(__name__)

'''
识别一个字
'''
@app.route('/one', methods=["GET"])
def get_One():
    walk('./data/image.png')
    path = 'images/img0.png'
    label_dict = chinese_rec.get_label_dict()
    candidate, final_predict_val = chinese_rec.inferenceOne(path)
    data = {
        "word": [label_dict[int(candidate[0])], label_dict[int(candidate[1])], label_dict[int(candidate[2])]],
        "score": [str(final_predict_val[0][0]), str(final_predict_val[0][1]), str(final_predict_val[0][2])]
    }
    return json.dumps(data, ensure_ascii=False)


# --------------- 读取图片 --------------------
def get_file_list(path):
    list_name=[]
    files = os.listdir(path)
    files.sort()
    for file in files:
        file_path = os.path.join(path, file)
        list_name.append(file_path)
    return list_name
# --------------- 读取图片结束 --------------------
'''
识别多个字
'''
@app.route('/more', methods=["GET"])
def get_More():
    walk('./data/image.png')
    name_list = get_file_list('images')
    result = chinese_rec.inferenceMore(name_list)
    return json.dumps(result, ensure_ascii=False)

if __name__ == '__main__':
    app.run()
