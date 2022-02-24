const Mock = require("mockjs");
const content = require("./content");
console.log(content);
let data = Mock.mock({
  "data|8": [
    //生成10条数据 数组
    {
      "shopId|+1": 1, //生成商品id，自增1
      username: "moody", //name，长度为5个汉字
      title: "@ctitle(10)",
      imgUrl: [require("@/assets/baise.jpeg"), require("@/assets/flowers.png"), require("@/assets/hai.jpg.jpeg"), require("@/assets/3.jpg"), require("@/assets/4.jpg"), require("@/assets/10.jpg"), require("@/assets/11.jpg"), require("@/assets/12.jpg"), require("@/assets/14.jpg"), require("@/assets/16.jpg"), require("@/assets/22.jpg")], //生成随机图片，大小/背景色/字体颜色/文字信息
      "overhead|0-1": 100,
      "likes|992-10000": 100, // 生成 随机数
      "comments|992-10000": 100, // 生成 随机数
      time: "2022-1-20"
    }
  ],
  "datas|33": [
    //生成10条数据 数组
    {
      "shopId|+1": 1, //生成商品id，自增1
      username: "@ctitle(5)", //name，长度为5个汉字
      title: "@ctitle(10)",
      "overhead|0": 100,
      imgUrl: [require("@/assets/baise.jpeg"), require("@/assets/flowers.png"), require("@/assets/hai.jpg.jpeg"), require("@/assets/mianju.jpg")], //生成随机图片，大小/背景色/字体颜色/文字信息
      "likes|992-10000": 100, // 生成 随机数
      "comments|992-10000": 100, // 生成 随机数
      time: "2022-1-20"
    }
  ],
  "article|1": [
    //生成10条数据 数组
    {
      "shopId|+1": 1, //生成商品id，自增1
      username: "@ctitle(5)", //name，长度为5个汉字
      content: content.contents,
      "likes|992-10000": 100, // 生成 随机数
      "comments|992-10000": 100, // 生成 随机数
      time: "2022-1-20"
    }
  ],
  "tabs|5": [
    //生成5条数据 数组
    {
      "shopId|+1": 1, //生成商品id，自增1
      name: "@ctitle(10)", //生成商品信息，长度为10个汉字
      "released|10-100": 100, // 生成 随机数
      imgUrl: "@Image(\"200x200\",\"#fff\")" //生成随机图片，大小/背景色/字体颜色/文字信息
    }
  ],
  "userComments|4": [
    //生成4条数据 数组
    {
      "shopId|+1": 1, //生成商品id，自增1
      username: "@ctitle(5)", //username，长度为5个汉字
      content: "@ctitle(10)",
      imgUrl: "@Image(\"200x200\",\"#fff\")" //生成随机图片，大小/背景色/字体颜色/文字信息
    }
  ],
  "pic|6": [
    {
      "shopId|+1": 1, //生成商品id，自增1
      imgUrl: "@Image(\"600x600\",\"#fff\")" //生成随机图片，大小/背景色/字体颜色/文字信息
    }
  ],
  "steam|300": [
    {
      "shopId|+1": 1, //生成商品id，自增1
      "appid|34453563-94453563": 100,
      "playtime|10-500": 500,
      "gamePrice|10-500": 500,
      gameName: "@ctitle(5)",
      gameImgUrl: "@Image(\"400x600\",\"#ccc\")" //生成随机图片，大小/背景色/字体颜色/文字信息
    }
  ]
});
Mock.mock(/api\/mock/, "post", () => {
  //三个参数。第一个路径，第二个请求方式post/get，第三个回调，返回值
  return data;
});
