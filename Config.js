// LiteLoader-AIDS automatic generated
/// <reference path="d:\dts/dts/helperlib/src/index.d.ts"/>

const { I18nAPI, Minecraft } = require('./../GMLIB-LegacyRemoteCallApi/lib/GMLIB_API-JS.js');

module.exports = {
    Config: {
        /** 无论如何都会显示(方块和实体前面) @type {ConfigItem[]} */
        AllBefore: [
            {// Boss栏换行
                Conditions: (_Player, _ViewVector, _Cache, PlayerConfig) => PlayerConfig["Mode"] === 0,
                Text: "\n\n",
            },
        ],
        /** 指向为方块时显示 @type {ConfigItem[]} */
        Block: [
            {// 方块名字
                Conditions: true,
                Text: (Player, Block) => I18nAPI.get('plugins.Waila.block.name', [Block.getTranslateName(Player.langCode), Block.type], Player.langCode)
            },
            {// 挖掘时间
                Conditions: (_Player, Block) => !Block.isUnbreakable,
                Text: (Player, Block) => '\n' + I18nAPI.get('plugins.Waila.block.hardness', [Block.getBlockDestroySpeed().toFixed(1).toString()], Player.langCode)
            },
            {// 是否可以采集
                Conditions: (_Player, Block) => !Block.isUnbreakable,
                Text: (Player, Block,Cache) => '\n' + I18nAPI.get('plugins.Waila.block.destroy', [(!(Player.isAdventure && !Cache['HandItem'].canDestroy(Block)) && (Block.isAlwaysDestroyable() || Cache['HandItem'].canDestroySpecial(Block))) ? '§a✔' : '§c✘'], Player.langCode)
            },
            {// 蛋糕
                Conditions: (_Player, Block) => Block.type === 'minecraft:cake',
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get('plugins.Waila.block.cake.status', [(7 - Cache['BlockNbt'].getTag('states').getData('bite_counter')).toString()], Player.langCode)
            },
            {// 箱子容量
                Conditions: (_Player, Block) => Block.hasContainer(),
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get('plugins.Waila.block.chest.size', [Cache['BlockContainer'].getAllItems().filter(Item => !Item.isNull()).length.toString(), Cache['BlockContainer'].size.toString()], Player.langCde)

            },
            {// 农作物成熟程度数值
                Conditions: (_Player, Block) => Block.isCropBlock,
                Text: (Player, Block) => '\n' + I18nAPI.get('plugins.Waila.block.Cropnum', [Block.variant.toString()], Player.langCode)
            },
            {// 红石粉等级
                Conditions: (_Player, Block) => Block.type === 'minecraft:redstone_wire',
                Text: (Player, Block) => '\n' + I18nAPI.get('plugins.Waila.block.redstonelv', [Block.variant.toString()], Player.langCode)
            },
            {// 开关状态
                Conditions: (_Player, _Block, Cache) => Cache['BlockNbt']?.getTag('states')?.getData('open_bit') != null,
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.open_status.${Cache['BlockNbt'].getTag('states')?.getData('open_bit') ? 'open' : 'close'}`, [], Player.langCode)
            },
            {// 唱片机
                Conditions: (_Player, Block, Cache) => Block.type === 'minecraft:jukebox' && Cache['BlockEntityNbt']?.getTag('RecordItem')?.getData('Name') != null,
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.jukebox`, [I18nAPI.get(`item.record_${Cache['BlockEntityNbt'].getTag('RecordItem').getData('Name').slice(21)}.desc`, [], Player.langCode)], Player.langCode)
            },
            {// 花盆
                Conditions: (_Player, Block, Cache) => Block.type === 'minecraft:flower_pot' && Cache['BlockEntityNbt']?.getTag('PlantBlock')?.getData('name') != null,
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.flower_pot`, [I18nAPI.get(Minecraft.getBlockTranslateKeyFromName(Cache['BlockEntityNbt'].getTag('PlantBlock').getData('name')), [], Player.langCode)], Player.langCode)
            },
            {// 命令方块
                Conditions: (_Player, Block, Cache) => ['minecraft:repeating_command_block', 'minecraft:command_block', 'minecraft:chain_command_block'].includes(Block.type) && Cache['BlockEntityNbt']?.getData('Command') !== '',
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.commandblock.command`, [Cache['BlockEntityNbt'].getData('Command')], Player.langCode)
            },
            {// 刷怪笼
                Conditions: (_Player, Block, Cache) => Block.type === 'minecraft:mob_spawner' && ![null, ''].includes(Cache['BlockEntityNbt']?.getData('EntityIdentifier')),
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.mob_spawner`, [Cache['BlockEntityNbt'].getData('EntityIdentifier')], Player.langCode)
            },
            {// 音符盒
                Conditions: (_Player, Block) => Block.type === 'minecraft:noteblock',
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.noteblock`, [Cache['BlockEntityNbt'].getData('note').toString()], Player.langCode)
            },
            {// 堆肥桶
                Conditions: (_Player, Block) => Block.type === 'minecraft:composter',
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.composter`, [Cache['BlockNbt']?.getTag('states')?.getData('composter_fill_level')?.toString()], Player.langCode)
            },
            {// 信标
                Conditions: (_Player, Block, Cache) => Block.type === 'minecraft:beacon' && ![0, null].includes(Cache['BlockEntityNbt']?.getData('primary')),
                Text: (Player, _Block, Cache) => {
                    const BuffID = [null, 'moveSpeed', 'moveSlowdown', 'digSpeed', 'digSlowDown', 'damageBoost', 'heal', 'harm', 'jump', 'confusion', 'regeneration', 'resistance', 'fireResistance', 'waterBreathing', 'invisibility', 'blindness', 'nightVision', 'hunger', 'weakness', 'poison', 'wither', 'healthBoost', 'absorption', 'saturation', 'levitation', 'poison', 'conduitPower', 'slowFalling'];
                    return '\n' + I18nAPI.get(`plugins.Waila.block.beacon`, [I18nAPI.get(`potion.${BuffID[Cache['BlockEntityNbt'].getData('primary')]}`, [], Player.langCode) + ' ' + (Cache['BlockEntityNbt'].getData('secondary') !== 0 ? I18nAPI.get(`potion.${BuffID[Cache['BlockEntityNbt'].getData('secondary')]}`, [], Player.langCode) : '')], Player.langCode);
                }
            },
            {// 方块坐标
                Conditions: true,
                Text: (Player, Block) => '\n' + I18nAPI.get('plugins.Waila.block.pos', [Block.pos.x.toString(), Block.pos.y.toString(), Block.pos.z.toString()], Player.langCode)
            },
        ],
        /** 指向实体时显示 @type {ConfigItem[]} */
        Entity: [
            {// 名字
                Conditions: true,
                Text: (Player, Entity) => I18nAPI.get('plugins.Waila.entity.name', [Entity.getTranslateName() === Entity.name ? Entity.getTranslateName(Player.langCode) : Entity.name, Entity.type], Player.langCode)
            },
            {// 血量
                Conditions: (_Player, Entity) => Entity.maxHealth !== 0,
                Text: (Player, Entity) => '\n' + I18nAPI.get('plugins.Waila.entity.health', [Entity.health.toString(), Entity.maxHealth.toString()], Player.langCode)
            },
            {// 盔甲架
                Conditions: (_Player, Entity) => Entity.type === 'minecraft:armor_stand',
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.pose', [Cache['EntityNbt'].getTag('Pose').getData('PoseIndex').toString()], Player.langCode)
            },
            {// 画
                Conditions: (_Player, Entity) => Entity.type === 'minecraft:painting',
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.painting', [Cache['EntityNbt'].getData('Motif')], Player.langCode)
            },
            {// 史莱姆大小
                Conditions: (_Player, Entity) => Entity.type === 'minecraft:slime',
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.slime.size', [Cache['EntityNbt'].getData('Size').toString()], Player.langCode)
            },
            {// 下路方块
                Conditions: (_Player, Entity) => Entity.type === 'minecraft:falling_block',
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.falling_block', [I18nAPI.get(Minecraft.getBlockTranslateKeyFromName(Cache['EntityNbt'].getTag('FallingBlock').getData('name')), [], Player.langCode)], Player.langCode)
            },
            {// TNT爆炸时间
                Conditions: (_Player, Entity) => Entity.type === 'minecraft:tnt',
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.tnt', [Cache['EntityNbt']?.getData('Fuse')?.toString() ?? '0'], Player.langCode)
            },
            {// 村民
                Conditions: (_Player, Entity, Cache) => Entity.type === 'minecraft:villager_v2' && Cache['EntityNbt']?.getTag('Offers')?.getTag('Recipes') != null,
                Text: (Player, _Entity, Cache) => {
                    let /** @type {NbtList} */OffersNbts = Cache['EntityNbt'].getTag('Offers').getTag('Recipes'),/** @type {String[]} */ OffersTexts = [];
                    for (let index = 0; index < OffersNbts.getSize(); index++) {
                        const /** @type {NbtCompound} */OffersNbt = OffersNbts.getData(index);
                        if (Cache['EntityNbt'].getTag('Offers').getTag('TierExpRequirements').getData(OffersNbt.getData('tier')).getData(OffersNbt.getData('tier').toString()) > Cache['EntityNbt'].getData('Riches')) continue;
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
                Text: (Player, Entity) => '\n' + I18nAPI.get('plugins.Waila.entity.pos', [Entity.pos.x.toFixed(2).toString(), Entity.pos.y.toFixed(2).toString(), Entity.pos.z.toFixed(2).toString()], Player.langCode)
            },
        ],
        /** 无论如何都会显示(方块和实体后面) @type {ConfigItem[]} */
        AllAfter: [
            {// 物品栏上方和actionbar换行（防止领地挡住）
                Conditions: (_Player, _ViewVector, _Cache, PlayerConfig) => [2, 3].includes(PlayerConfig["Mode"]),
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
        },
        /** 默认文本 @type {String} */
        DefaultText: "",
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
 * @property {function(Player, Block|Entity,
 * {
 *  HandItem:Item
 *  BlockNbt:NbtCompound|null,
 *  BlockEntityNbt:NbtCompound|null,
 *  BlockContainer:Container|null,
 *  EntityNbt:NbtCompound|null
 * },PlayerConfig): boolean | boolean} Conditions - 条件函数  
 * @property {(string | function(Player, Block|Entity, 
 * {
 *  HandItem:Item
 *  BlockNbt:NbtCompound|null,
 *  BlockEntityNbt:NbtCompound|null,
 *  BlockContainer:Container|null,
 *  EntityNbt:NbtCompound|null
 * },PlayerConfig): string)} Text - 文本内容  
 */