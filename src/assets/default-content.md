使用时，你得把默认的 Markdown 内容换成你自己的内容。

关于本工具的介绍请看[这篇公众号文章](https://mp.weixin.qq.com/s/pn0LzyfgUj6rGUfVHUksjg)。


## 一级标题

这是一级标题


### 二级标题

上面是二级标题

## 文字样式

### 基本样式

你好，我是一个来自地球的人。

我是一个[智人](https://zh.wikipedia.org/wiki/智人 "学名：Homo sapiens，意为“有智慧的人”")，
我喜欢穿新衣服，都是**黑衣服**。

我最大的*爱好*是拆汽车，我拆了很多汽车，宝马、奔驰、劳斯莱斯和特斯拉，但是都没装回去。

上面表现了链接和加重两种样式，公众号以外的链接会被转换为脚注。


### 注音符号

[注音符号 W3C 定义](http://www.w3.org/TR/ruby/)。支持日语注音假名，小夜時雨【さ・よ・しぐれ】 和 汉语拼音 上海【Shàng・hǎi】

用法有以下几种：

```
世界【せかい】
世界{せかい}
```

世界{せかい}

```
小夜時雨【さ・よ・しぐれ】
```

小夜時雨【さ・よ・しぐれ】

```
食べる【たべる】
食べる{たべる}
```

食べる{たべる}\n\n english【英文】 will not translated{fan yi}'


## 段落、列表、引用

[Markdown](https://sspai.com/post/25137 "认识与入门 Markdown") 是一种写文章用的语法。

我们日常写文章用的工具，比如说 Word，提供了大量排版格式样式相关的选项。

在写作之外，大量的时间都在处理这些排版、格式、样式、字体、图片位置等等。这不但是耗时耗力的事情，而且还会打乱里写作时的思绪，影响你的工作。

列表项：

- 一个列表项
- 另一个列表项
- 第三个列表项

托 [Neko](https://github.com/nekocode) 的福，有序的列表项支持了。

1. 一个列表项
2. 另一个列表项
3. 第三个列表项

使用 Markdown 最大的意义在于可以让你关注写作本身，不需要花费精力在别的事情上。无论是严肃写作还是随手记，Markdown 都是最佳形式。

> 引用：使用 Markdown 最大的意义在于可以让你关注写作本身 —— Lyric

好。

## 代码块、表格、图片

接下来是一张图片。你可以用自己图床，也可以上传到微信媒体库再把图片 URL 粘贴回来，或者编辑好以后，在公众号里插入图片。

![](https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/login/loginpage/images/bg_banner4273fb.png)

代码块，使用微信官方的高亮配色，在代码块标示语言即可。粘贴到公众号后，需要用鼠标点一下代码块，完成高亮。


    ```cpp
    你的代码
    ```



```cpp
#include <stdio.h>

const int MAX = 10;
int cache[MAX] = {0};

int fib(int x) {
  if (x == 1) return 1;
  if (x == 0) return 0;
  if (cache[x] == 0) {
    int ret = fib(x - 1) + fib(x - 2);
    cache[x] = ret;
  }
  return cache[x];
}

int main() {
    int i;
    printf("fibonacci series:\n");
    for (i = 0; i < MAX; ++i) {
        printf("%d ", fib(i));
    }
    return 0;
}
```

然后是一个内联代码： a paragraphg with inline code `{code: 0}`。

接下来是表格示例：

| Header 1 | Header 2 |
| --- | --- |
| Key 1 | Value 1 |
| Key 2 | Value 2 |
| Key 3 | Value 3 |

