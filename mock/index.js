const Mock = require("mockjs");
let data = Mock.mock({
  "data|100": [
    //生成10条数据 数组
    {
      "shopId|+1": 1, //生成商品id，自增1
      username: "@ctitle(5)", //name，长度为5个汉字
      title: "@ctitle(10)",
      "overhead|0-1": 100,
      "likes|992-10000": 100, // 生成 随机数
      "comments|992-10000": 100, // 生成 随机数
      time: "2022-1-20"
    }
  ],
  "datas|10": [
    //生成10条数据 数组
    {
      "shopId|+1": 1, //生成商品id，自增1
      username: "@ctitle(5)", //name，长度为5个汉字
      title: "@ctitle(10)",
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
      content:
        "## md-editor-v3\n" +
        "\n" +
        "Markdown 编辑器，基于 react，使用 jsx 和 typescript 语法开发，支持切换主题、prettier 美化文本等。\n" +
        "\n" +
        "### 基本演示\n" +
        "\n" +
        "**加粗**，<u>下划线</u>，_斜体_，~删除线~，上标<sup>26</sup>，下标<sub>[1]</sub>，`inline code`，[超链接](https://imbf.cc)\n" +
        "\n" +
        "> 引用：世界上没有绝对，只有相对\n" +
        "\n" +
        "## 代码演示\n" +
        "\n" +
        "```js\n" +
        "import { defineComponent, ref } from \"vue\";\n" +
        "import MdEditor from \"md-editor-v3\";\n" +
        "import \"md-editor-v3/lib/style.css\";\n" +
        "\n" +
        "\n" +
        "export default defineComponent({\n" +
        "  name: \"MdEditor\",\n" +
        "  setup() {\n" +
        "    const text = ref(\"\");\n" +
        "    return () => (\n" +
        "      <MdEditor modelValue={text.value} onChange={(v: string) => (text.value = v)} />\n" +
        "    );\n" +
        "  }\n" +
        "});\n" +
        "```\n" +
        "\n" +
        "## 文本演示\n" +
        "\n" +
        "依照普朗克长度这项单位，目前可观测的宇宙的直径估计值（直径约 930 亿光年，即 8.8 × 10<sup>26</sup> 米）即为 5.4 × 10<sup>61</sup>倍普朗克长度。而可观测宇宙体积则为 8.4 × 10<sup>184</sup>立方普朗克长度（普朗克体积）。\n" +
        "\n" +
        "## 表格演示\n" +
        "\n" +
        "| 昵称 | 猿龄（年） | 来自      |\n" +
        "| ---- | ---------- | --------- |\n" +
        "| 之间 | 3          | 中国-重庆 |\n" +
        "\n" +
        "## 公式\n" +
        "\n" +
        "$$\n" +
        "\\sqrt[3]{x}\n" +
        "$$\n" +
        "\n" +
        "## ️占个坑",
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
