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
      imgUrl: [
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/10.28edaaf5.jpg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/11.970a5960.jpg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/12.e62dbdf3.jpg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/14.1c37268a.jpg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/16.568d736e.jpg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/22.3982a9d4.jpg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/3.8066c187.jpg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/4.970a5960.jpg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/baise.e2cba4a0.jpeg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/flowers.253ae0b0.png",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/mianju.be5d08a3.jpg"], //生成随机图片，大小/背景色/字体颜色/文字信息
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
      imgUrl: [
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/hai.jpg.de084b57.jpeg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/16.568d736e.jpg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/22.3982a9d4.jpg",
        "http://rboa9eje7.hb-bkt.clouddn.com/assets/12.e62dbdf3.jpg"], //生成随机图片，大小/背景色/字体颜色/文字信息
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
