# LSE_Waila - LSE高亮显示
## 简单介绍
Waila是一个LSE高亮显示插件，他集成了许多原版信息的具体化显示，可以更好的方便玩家对方块或生物的信息进行查看
## 如何正确加载Waila
### 所需环境
需要在Bedrock Dedicated Server(BDS)服务端下装载前置:  
- LeviLamina
- legacy-script-engine-quickjs
- GMLIB
- GMLIB-LegacyRemoteCallApi≥v0.12.8
### 如何装载
下载释放文件，解压插件文件夹至BDS服务端plugins文件夹内，并加载
## 使用方法
游戏内玩家可输入/waila来设置自己的Waila开关及样式  
![表单](http://www.gwbbs.top/img/Wailaform.png)  
ps:如果装了我们的UI包，那活动栏将是一个非常好的选择
## 语言文件[zh_CN.lang](https://github.com/zimuya4153/LSE_Waila/blob/main/zh_CN.lang)  
>如果遇到原版未翻译的或者你有自己的个性都可以去访问这个文件  
切记如果你没有基础请按照规律来修改，修改错误可能导致你无法使用Waila
## 特别操作
这里是WuHuiZhang6902(合作者)，教你点东西，看到Config.js文件没，如果你觉着名称后面的英文id显示太长，你可以将以下代码替换第19行，那么这type就变成短短的整数id了  
```javascript
Text: (Player, PlayerConfig, Block) => I18nAPI.get('plugins.Waila.block.name', [Block.getTranslateName(Player.langCode), Block.id.toString()], Player.langCode)
```
什么，你还要再学点小操作？  
如果你不想让他在不瞄准任何东西情况下提示文字，那么你只需要将下面代码替换Config.js文件的149行
```javascript
DefaultText: "",
```
## 配置文件介绍
**Config.js**
```javascript
// LiteLoader-AIDS automatic generated
/// <reference path="d:\dts/dts/helperlib/src/index.d.ts"/>

const { I18nAPI, Minecraft } = require('./../GMLIB-LegacyRemoteCallApi/lib/GMLIB_API-JS.js');

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
            {// 方块名字
                Conditions: true,
                Text: (Player, PlayerConfig, Block) => I18nAPI.get('plugins.Waila.block.name', [Block.getTranslateName(Player.langCode), Block.id.toString()], Player.langCode)
            },
            {// 挖掘时间
                Conditions: (_Player, _PlayerConfig, Block) => !Block.isUnbreakable,
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get('plugins.Waila.block.destroytime', [((Block.getBlockDestroySpeed() * 1.5) / Player.getHand().getDestroyBlockSpeed(Block)).toFixed(2).toString()], Player.langCode)
            },
            {// 是否可以采集
                Conditions: (_Player, _PlayerConfig, Block) => !Block.isUnbreakable,
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get('plugins.Waila.block.destroy', [(Block.isAlwaysDestroyable() || Player.getHand().canDestroySpecial(Block)) ? '§a✔' : '§c✘'], Player.langCode)
            },
            {// 蛋糕
                Conditions: (_Player, _PlayerConfig, Block) => Block.type === 'minecraft:cake',
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get('plugins.Waila.block.cake.status', [(7 - Block.getNbt().getTag('states').getData('bite_counter')).toString()], Player.langCode)
            },
            {// 箱子容量
                Conditions: (_Player, _PlayerConfig, Block) => Block.hasContainer(),
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get('plugins.Waila.block.chest.size', [Block.getContainer().getAllItems().filter(Item => !Item.isNull()).length.toString(), Block.getContainer().size.toString()], Player.langCde)

            },
            {// 农作物成熟程度数值
                Conditions: (_Player, _PlayerConfig, Block) => Block.isCropBlock,
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get('plugins.Waila.block.Cropnum', [Block.variant.toString()], Player.langCode)
            },
            {// 红石粉等级
                Conditions: (_Player, _PlayerConfig, Block) => Block.type === 'minecraft:redstone_wire',
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get('plugins.Waila.block.redstonelv', [Block.variant.toString()], Player.langCode)
            },
            {// 开关状态
                Conditions: (_Player, _PlayerConfig, Block) => Block.getNbt()?.getTag('states')?.getData('open_bit') != null,
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get(`plugins.Waila.block.open_status.${Block.getNbt()?.getTag('states')?.getData('open_bit') ? 'open' : 'close'}`, [], Player.langCode)
            },
            {// 唱片机
                Conditions: (_Player, _PlayerConfig, Block) => Block.type === 'minecraft:jukebox' && Block?.getBlockEntity()?.getNbt()?.getTag('RecordItem')?.getData('Name') != null,
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get(`plugins.Waila.block.jukebox`, [I18nAPI.get(`item.record_${Block.getBlockEntity().getNbt().getTag('RecordItem').getData('Name').slice(21)}.desc`, [], Player.langCode)], Player.langCode)
            },
            {// 花盆
                Conditions: (_Player, _PlayerConfig, Block) => Block.type === 'minecraft:flower_pot' && Block?.getBlockEntity()?.getNbt()?.getTag('PlantBlock') !== null,
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get(`plugins.Waila.block.flower_pot`, [I18nAPI.get(Minecraft.getBlockTranslateKeyFromName(Block?.getBlockEntity().getNbt().getTag('PlantBlock').getData('name')), [], Player.langCode)], Player.langCode)
            },
            {// 命令方块
                Conditions: (_Player, _PlayerConfig, Block) => ['minecraft:repeating_command_block', 'minecraft:command_block', 'minecraft:chain_command_block'].includes(Block.type) && Block?.getBlockEntity()?.getNbt()?.getData('Command') !== '',
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get(`plugins.Waila.block.commandblock.command`, [Block?.getBlockEntity().getNbt().getData('Command')], Player.langCode)
            },
            {// 刷怪笼
                Conditions: (_Player, _PlayerConfig, Block) => Block.type === 'minecraft:mob_spawner' && ![null, ''].includes(Block?.getBlockEntity()?.getNbt()?.getData('EntityIdentifier')),
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get(`plugins.Waila.block.mob_spawner`, [Block?.getBlockEntity().getNbt().getData('EntityIdentifier')], Player.langCode)
            },
            {// 信标
                Conditions: (_Player, _PlayerConfig, Block) => Block.type === 'minecraft:beacon' && ![0, null].includes(Block?.getBlockEntity()?.getNbt()?.getData('primary')),
                Text: (Player, _PlayerConfig, Block) => {
                    const BuffID = [null, 'moveSpeed', 'moveSlowdown', 'digSpeed', 'digSlowDown', 'damageBoost', 'heal', 'harm', 'jump', 'confusion', 'regeneration', 'resistance', 'fireResistance', 'waterBreathing', 'invisibility', 'blindness', 'nightVision', 'hunger', 'weakness', 'poison', 'wither', 'healthBoost', 'absorption', 'saturation', 'levitation', 'poison', 'conduitPower', 'slowFalling'];
                    const BlockEntityNbt = Block.getBlockEntity().getNbt();
                    return '\n' + I18nAPI.get(`plugins.Waila.block.beacon`, [I18nAPI.get(`potion.${BuffID[BlockEntityNbt.getData('primary')]}`, [], Player.langCode) + ' ' + (BlockEntityNbt.getData('secondary') !== 0 ? I18nAPI.get(`potion.${BuffID[BlockEntityNbt.getData('secondary')]}`, [], Player.langCode) : '')], Player.langCode);
                }
            },
            {// 方块坐标
                Conditions: true,
                Text: (Player, _PlayerConfig, Block) => '\n' + I18nAPI.get('plugins.Waila.block.pos', [Block.pos.x.toString(), Block.pos.y.toString(), Block.pos.z.toString()], Player.langCode)
            },
        ],
        /** 指向实体时显示 @type {ConfigItem[]} */
        Entity: [
            {// 名字
                Conditions: true,
                Text: (Player, PlayerConfig, Entity) => I18nAPI.get('plugins.Waila.entity.name', [Entity.getTranslateName() === Entity.name ? Entity.getTranslateName(Player.langCode) : Entity.name, Entity.type], Player.langCode)
            },
            {// 血量
                Conditions: (_Player, _PlayerConfig, Entity) => Entity.maxHealth !== 0,
                Text: (Player, _PlayerConfig, Entity) => '\n' + I18nAPI.get('plugins.Waila.entity.health', [Entity.health.toString(), Entity.maxHealth.toString()], Player.langCode)
            },
            {// 盔甲架
                Conditions: (_Player, _PlayerConfig, Entity) => Entity.type === 'minecraft:armor_stand',
                Text: (Player, _PlayerConfig, Entity) => '\n' + I18nAPI.get('plugins.Waila.entity.pose', [Entity.getNbt().getTag('Pose').getData('PoseIndex').toString()], Player.langCode)
            },
            {// 画
                Conditions: (_Player, _PlayerConfig, Entity) => Entity.type === 'minecraft:painting',
                Text: (Player, _PlayerConfig, Entity) => '\n' + I18nAPI.get('plugins.Waila.entity.painting', [Entity.getNbt().getData('Motif')], Player.langCode)
            },
            {// 史莱姆大小
                Conditions: (_Player, _PlayerConfig, Entity) => Entity.type === 'minecraft:slime',
                Text: (Player, _PlayerConfig, Entity) => '\n' + I18nAPI.get('plugins.Waila.entity.slime.size', [Entity.getNbt().getData('Size').toString()], Player.langCode)
            },
            {// 下路方块
                Conditions: (_Player, _PlayerConfig, Entity) => Entity.type === 'minecraft:falling_block',
                Text: (Player, _PlayerConfig, Entity) => '\n' + I18nAPI.get('plugins.Waila.entity.falling_block', [I18nAPI.get(Minecraft.getBlockTranslateKeyFromName(Entity.getNbt().getTag('FallingBlock').getData('name')), [], Player.langCode)], Player.langCode)
            },
            {// TNT爆炸时间
                Conditions: (_Player, _PlayerConfig, Entity) => Entity.type === 'minecraft:tnt',
                Text: (Player, _PlayerConfig, Entity) => '\n' + I18nAPI.get('plugins.Waila.entity.tnt', [Entity.getNbt()?.getData('Fuse')?.toString() ?? '0'], Player.langCode)
            },
            {// 村民
                Conditions: (_Player, _PlayerConfig, Entity) => Entity.type === 'minecraft:villager_v2' && Entity.getNbt()?.getTag('Offers')?.getTag('Recipes') != null,
                Text: (Player, _PlayerConfig, Entity) => {
                    let EntityNbt = Entity.getNbt(),/** @type {NbtList} */OffersNbts = EntityNbt.getTag('Offers').getTag('Recipes'),/** @type {String[]} */ OffersTexts = [];
                    for (let index = 0; index < OffersNbts.getSize(); index++) {
                        const /** @type {NbtCompound} */OffersNbt = OffersNbts.getData(index);
                        if (EntityNbt.getTag('Offers').getTag('TierExpRequirements').getData(OffersNbt.getData('tier')).getData(OffersNbt.getData('tier').toString()) > EntityNbt.getData('Riches')) continue;
                        const BuyItemA = mc.newItem(OffersNbt.getTag('buyA').getData('Name'), OffersNbt.getData('buyCountA'));
                        OffersTexts[index] = I18nAPI.get('plugins.Waila.entity.village.offers.item1', [BuyItemA.getTranslateName(Player.langCode), BuyItemA.count.toString()], Player.langCode);
                        if (OffersNbt.getTag('buyB')) {
                            const BuyItemB = mc.newItem(OffersNbt.getTag('buyB').getData('Name'), OffersNbt.getData('buyCountB'));
                            OffersTexts[index] += I18nAPI.get('plugins.Waila.entity.village.offers.item2', [BuyItemB.getTranslateName(Player.langCode), BuyItemB.count.toString()], Player.langCode);
                        }
                        const SellItem = mc.newItem(OffersNbt.getTag('sell').getData('Name'), OffersNbt.getTag('sell').getData('Count'));
                        OffersTexts[index] += I18nAPI.get('plugins.Waila.entity.village.offers.item3', [SellItem.getTranslateName(Player.langCode), SellItem.count.toString()], Player.langCode);
                    }
                    return '\n' + I18nAPI.get('plugins.Waila.entity.village.offers', [], Player.langCode) + OffersTexts.join('\n');
                }
            },
            {// 实体坐标
                Conditions: true,
                Text: (Player, _PlayerConfig, Entity) => '\n' + I18nAPI.get('plugins.Waila.entity.pos', [Entity.pos.x.toFixed(2).toString(), Entity.pos.y.toFixed(2).toString(), Entity.pos.z.toFixed(2).toString()], Player.langCode)
            },
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

/**
 * @typedef {Object} PlayerConfig
 * @property {Boolean} Enabled 开启状态
 * @property {0|1|2|3} Mode - 0:Bossbar栏
 *                          - 1:tell.4 音符盒提示
 *                          - 2:tell.5 物品栏上方
 *                          - 3:title.4 actionBar
 */

/**  
 * @typedef {Object} ConfigItem  
 * @property {function(Player, PlayerConfig, Block|Entity): boolean | boolean} Conditions - 条件函数  
 * @property {(string | function(Player, PlayerConfig, Block|Entity): string)} Text - 文本内容  
 */
```
>注意:如果你没有编程基础，请不要随意修改
