// LiteLoader-AIDS automatic generated
/// <reference path="d:\dts/dts/helperlib/src/index.d.ts"/>

const { I18nAPI, Minecraft, UserCache } = require('./../GMLIB-LegacyRemoteCallApi/lib/GMLIB_API-JS.js');

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
            {// 硬度
                Conditions: (_Player, Block) => !Block.isUnbreakable,
                Text: (Player, Block) => '\n' + I18nAPI.get('plugins.Waila.block.hardness', [Block.getBlockDestroySpeed().toFixed(1).toString()], Player.langCode)
            },
            {// 是否可以采集
                Conditions: (_Player, Block) => !Block.isUnbreakable,
                Text: (Player, Block, Cache) => '\n' + I18nAPI.get('plugins.Waila.block.destroy', [(!(Player.isAdventure && !Cache['HandItem'].canDestroy(Block)) && (Block.isAlwaysDestroyable() || Cache['HandItem'].canDestroySpecial(Block))) ? '§a✔' : '§c✘'], Player.langCode)
            },
            {// 蛋糕
                Conditions: (_Player, Block) => Block.type === 'minecraft:cake',
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get('plugins.Waila.block.cake.status', [(7 - Cache['BlockNbt'].getTag('states').getData('bite_counter')).toString()], Player.langCode)
            },
            {// 箱子容量
                Conditions: (_Player, Block) => Block.hasContainer(),
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get('plugins.Waila.block.chest.size', [Cache['BlockContainer'].getAllItems().filter(Item => !Item.isNull()).length.toString(), Cache['BlockContainer'].size.toString(), Cache['BlockContainer'].getAllItems().map(Item => Item.count).reduce((acc, curr) => acc + curr).toString(), (Cache['BlockContainer'].size * 64).toString()], Player.langCde)
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
                Conditions: (_Player, Block, Cache) => ['minecraft:repeating_command_block', 'minecraft:command_block', 'minecraft:chain_command_block'].includes(Block.type) && Cache['BlockEntityNbt']?.getData('Command') !== '' && Cache['BlockEntityNbt'].getData('Command').length < 100,
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
            {// 钟摆动时间
                Conditions: (_Player, Block, Cache) => Block.type === 'minecraft:bell' && Cache['BlockEntityNbt'].getData('Ringing'),
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.RingingTime`, [((50 - Cache['BlockEntityNbt'].getData('Ticks')) / 20)?.toString()], Player.langCode)
            },
            {// 酿造剩余时间
                Conditions: (_Player, Block, Cache) => Block.type === 'minecraft:brewing_stand' && Cache['BlockEntityNbt'].getData('CookTime') > 0,
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.BrewingStand.cookTime`, [(Cache['BlockEntityNbt'].getData('CookTime') / 20)?.toString()], Player.langCode)
            },
            {// 酿造剩余燃料
                Conditions: (_Player, Block, Cache) => Block.type === 'minecraft:brewing_stand' && Cache['BlockEntityNbt'].getData('FuelAmount') > 0,
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.BrewingStand.Fuel`, [Cache['BlockEntityNbt'].getData('FuelAmount').toString(), Cache['BlockEntityNbt'].getData('FuelTotal').toString()], Player.langCode)
            },
            {// 信标
                Conditions: (_Player, Block, Cache) => Block.type === 'minecraft:beacon' && ![0, null].includes(Cache['BlockEntityNbt']?.getData('primary')),
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.beacon`, [I18nAPI.get(`potion.${Cache['BuffKeyID'][Cache['BlockEntityNbt'].getData('primary')]}`, [], Player.langCode) + ' ' + (Cache['BlockEntityNbt'].getData('secondary') !== 0 ? I18nAPI.get(`potion.${Cache['BuffKeyID'][Cache['BlockEntityNbt'].getData('secondary')]}`, [], Player.langCode) : '')], Player.langCode)
            },
            {// 炼药锅药水效果
                Conditions: (_Player, Block, Cache) => Block.type === 'minecraft:cauldron' && Cache['BlockEntityNbt']?.getData('PotionId') !== -1,
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.cauldron`, [I18nAPI.get(`potion.${Cache['BuffKeyID'][Cache['BlockEntityNbt'].getData('PotionId')]}`, [], Player.langCode), I18nAPI.get(`itemGroup.name.${['potion', 'splashPotion', 'lingeringPotion'][Cache['BlockEntityNbt'].getData('PotionType')]}`)], Player.langCode)
            },
            {// 红石比较器信号强度
                Conditions: (_Player, Block) => Block.type === 'minecraft:powered_comparator',
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.powered_comparator`, [Cache['BlockEntityNbt'].getData('OutputSignal').toString()], Player.langCode)
            },
            {// 末地折跃门
                Conditions: (_Player, Block) => Block.type === 'minecraft:end_gateway' && Block.pos.dimid === 2,
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.end_gateway`, [Cache['BlockEntityNbt'].getData('ExitPortal').toArray().map(item => item.toString()).join(' ')], Player.langCode)
            },
            {// 熔炼存储经验
                Conditions: (_Player, Block, Cache) => ['minecraft:furnace', 'minecraft:lit_furnace'].includes(Block.type) && Cache['BlockEntityNbt']?.getData('StoredXPInt') > 0,
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.furnace.StoredXPInt`, [Cache['BlockEntityNbt'].getData('StoredXPInt').toString()], Player.langCode)
            },
            {// 熔炼熔炼进度
                Conditions: (_Player, Block, Cache) => ['minecraft:furnace', 'minecraft:lit_furnace'].includes(Block.type) && Cache['BlockEntityNbt']?.getData('CookTime') > 0,
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.furnace.CookTime`, [(Cache['BlockEntityNbt'].getData('CookTime') / 2).toString()], Player.langCode)
            },
            {// 熔炼剩余燃料
                Conditions: (_Player, Block, Cache) => ['minecraft:furnace', 'minecraft:lit_furnace'].includes(Block.type) && Cache['BlockEntityNbt']?.getData('BurnTime') > 0,
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.furnace.Burn`, [Cache['BlockEntityNbt']?.getData('BurnTime').toString(), Cache['BlockEntityNbt']?.getData('BurnDuration').toString()], Player.langCode)
            },
            {// 最后编辑告示牌的玩家
                Conditions: (_Player, Block, Cache) => Block.type.includes('_sign') && Cache['BlockEntityNbt']?.getTag('FrontText')?.getData('TextOwner') !== '',
                Text: (Player, _Block, Cache) => '\n' + I18nAPI.get(`plugins.Waila.block.sign`, [UserCache.getNameByXuid(Cache['BlockEntityNbt'].getTag('FrontText').getData('TextOwner'))], Player.langCode)
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
            {// 繁殖冷却时间
                Conditions: (_Player, _Entity, Cache) => Cache['EntityNbt'].getData('BreedCooldown') > 0,
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.breedcooldown', [(Cache['EntityNbt']?.getData('BreedCooldown') / 20)?.toFixed(1)?.toString()], Player.langCode)
            },
            {// 成年所需时间
                Conditions: (_Player, Entity) => Entity.isBaby,
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.age', [(Math.abs(Cache['EntityNbt']?.getData('Age')) / 20)?.toFixed(1)?.toString()], Player.langCode)
            },
            {// 跳跃高度
                Conditions: (_Player, Entity) => ['minecraft:horse', 'minecraft:skeleton_horse', 'minecraft:zombie_horse', 'minecraft:donkey', 'minecraft:mule', 'minecraft:llama', 'minecraft:trader_llama'].includes(Entity.type),
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.jump', [(Cache['EntityNbt'].getTag('Attributes').toArray().find(Attribute => Attribute.Name === 'minecraft:horse.jump_strength')['Current'] / 0.2724275).toFixed(1).toString()], Player.langCode)
            },
            {// 村民职业
                Conditions: (_Player, Entity) => Entity.type === 'minecraft:villager_v2' && !Entity.isBaby,
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.village.profession', [I18nAPI.get(`entity.villager.${({ 'armorer': 'armor', 'weaponsmith': 'weapon', 'leatherworker': 'leather', 'toolsmith': 'tool', 'undefined': 'unskilled' })[Cache['EntityNbt'].getData('PreferredProfession')] ?? Cache['EntityNbt'].getData('PreferredProfession')}`, [], Player.langCode)], Player.langCode)
            },
            {// 无敌时间
                Conditions: (_Player, _Entity, Cache) => Cache['EntityNbt'].getData('HurtTime') > 0,
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.Invincible_time', [(Cache['EntityNbt'].getData('HurtTime') / 20).toFixed(1).toString()], Player.langCode)
            },
            {// 玩家游戏模式
                Conditions: (_Player, Entity) => Entity.isPlayer(),
                Text: (Player, Entity) => '\n' + I18nAPI.get('plugins.Waila.entity.gamemode', [I18nAPI.get(`gameMode.${['survival', 'creative', 'adventure', null, null, null, 'spectator'][Entity.toPlayer().gameMode]}`, [], Player.langCode)], Player.langCode)
            },
            {// 末影螨剩余存在时间
                Conditions: (_Player, Entity) => Entity.type === 'minecraft:endermite',
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.endermite.Lifetime', [((2400 - Cache['EntityNbt'].getData('Lifetime')) / 20).toFixed(1).toString()], Player.langCode)
            },
            {// 山羊羊角数量
                Conditions: (_Player, Entity) => Entity.type === 'minecraft:goat',
                Text: (Player, _Entity, Cache) => '\n' + I18nAPI.get('plugins.Waila.entity.goat.GoatHornCount', [Cache['EntityNbt'].getData('GoatHornCount').toString()], Player.langCode)
            },
            {// 村民
                Conditions: (_Player, Entity, Cache) => Entity.type === 'minecraft:villager_v2' && Cache['EntityNbt']?.getTag('Offers')?.getTag('Recipes') != null,
                Text: (Player, _Entity, Cache) => {
                    let /** @type {NbtList} */OffersNbts = Cache['EntityNbt'].getTag('Offers').getTag('Recipes'),/** @type {String[]} */ OffersTexts = [];
                    for (let index = 0; index < OffersNbts.getSize(); index++) {
                        const /** @type {NbtCompound} */OffersNbt = OffersNbts.getData(index);
                        if (OffersNbt.getData('tier') > Cache['EntityNbt'].getData('TradeTier')) continue;
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
 *  BuffKeyID:String[]
 * },PlayerConfig): boolean | boolean} Conditions - 条件函数  
 * @property {(string | function(Player, Block|Entity, 
 * {
 *  HandItem:Item
 *  BlockNbt:NbtCompound|null,
 *  BlockEntityNbt:NbtCompound|null,
 *  BlockContainer:Container|null,
 *  EntityNbt:NbtCompound|null
 *  BuffKeyID:String[]
 * },PlayerConfig): string)} Text - 文本内容  
 */