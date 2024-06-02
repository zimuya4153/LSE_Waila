# LSE_Waila - LSE 高亮显示

## 简单介绍

Waila 是一个 LSE 高亮显示插件，他集成了许多原版信息的具体化显示，可以更好的方便玩家对方块或生物的信息进行查看

## 图骗展示
<details>  
  <summary>展开</summary>  
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_1.png?raw=true" alt="基础演示">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_2.png?raw=true" alt="破坏时长和采集演示">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_3.png?raw=true" alt="蛋糕状态">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_4.png?raw=true" alt="箱子容量">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_5.png?raw=true" alt="农作物状态">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_6.png?raw=true" alt="红石等级">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_7.png?raw=true" alt="开关状态">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_8.png?raw=true" alt="播放唱片">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_9.png?raw=true" alt="花盆种植">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_10.png?raw=true" alt="命令方块的命令">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_11.png?raw=true" alt="刷怪笼刷新生物">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_12.png?raw=true" alt="信标效果">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_13.png?raw=true" alt="盔甲架姿势">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_14.png?raw=true" alt="画的主题">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_15.png?raw=true" alt="史莱姆大小">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_16.png?raw=true" alt="下落方块的实际方块">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_17.png?raw=true" alt="TNT剩余爆炸时间">
  <img src="https://github.com/zimuya4153/LSE_Waila/blob/main/src/image_18.png?raw=true" alt="村民交易">
</details>

## 如何正确加载 Waila

### 所需环境

需要在 Bedrock Dedicated Server(BDS)服务端下装载前置:

-   LeviLamina
-   legacy-script-engine-quickjs
-   GMLIB
-   GMLIB-LegacyRemoteCallApi`≥v0.12.8`

### 如何装载

下载释放文件，解压插件文件夹至 BDS 服务端 plugins 文件夹内，并加载

## 使用方法

游戏内玩家可输入/waila 来设置自己的 Waila 开关及样式  
![表单](http://www.gwbbs.top/img/Wailaform.png)  
ps:如果装了我们的 UI 包，那活动栏将是一个非常好的选择

## 语言文件[zh_CN.lang](https://github.com/zimuya4153/LSE_Waila/blob/main/src/form.png?raw=true)

> 如果遇到原版未翻译的或者你有自己的个性都可以去访问这个文件  
> 切记如果你没有基础请按照规律来修改，修改错误可能导致你无法使用 Waila

## 特别操作

这里是 WuHuiZhang6902(合作者)，教你点东西，看到 Config.js 文件没，如果你觉着名称后面的英文 id 显示太长，你可以将以下代码替换第 19 行，那么这 type 就变成短短的整数 id 了

```javascript
Text: (Player, PlayerConfig, Block) => I18nAPI.get('plugins.Waila.block.name', [Block.getTranslateName(Player.langCode), Block.id.toString()], Player.langCode)
```

什么，你还要再学点小操作？  
如果你不想让他在不瞄准任何东西情况下提示文字，那么你只需要将下面代码替换 Config.js 文件的 149 行

```javascript
DefaultText: "",
```

## 配置文件介绍

**Config.js**

> 注意:如果你没有编程基础，请不要随意修改

```javascript
module.exports = {
    Config: {
        /** 无论如何都会显示(方块和实体前面) @type {ConfigItem[]} */
        AllBefore: [
            {// Boss栏换行
                Conditions: (Player, PlayerConfig, ViewVector) => PlayerConfig["Mode"] === 0,
                Text: "\n\n",
            },
        ],
        /** 指向为方块时显示 @type {ConfigItem[]} */
        Block: [
            // 省略
        ],
        /** 指向实体时显示 @type {ConfigItem[]} */
        Entity: [
            // 省略
        ],
        /** 无论如何都会显示(方块和实体后面) @type {ConfigItem[]} */
        AllAfter: [
            {// 物品栏上方和actionbar换行（防止领地挡住）
                Conditions: (Player, PlayerConfig, ViewVector) => [2, 3].includes(PlayerConfig["Mode"]),
                Text: "\n",
            },
        ],
        /** Boss栏配置*/
        Bossbar: {
            /** BossBarID @type {Number} */
            ID: -2183124,
            /** 颜色 @type {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8} */
            Color: 0,
            /** 进度值 @type {Number} */
            Percent: 100,
            /** 默认文本 @type {String} */
            DefaultText: "\n\n&plugins.Waila.get.error&",
        },
        /** 刷新时间(秒) @type {Number} */
        Hz: 0.1,
        /** 查找最大距离 @type {Number} */
        maxDistance: 10,
    },
};
```