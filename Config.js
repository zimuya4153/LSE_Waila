/// <reference path="d:/dts/dts/helperlib/src/index.d.ts"/> 
/// <reference path="../GMLIB-LegacyRemoteCallApi/lib/BEPlaceholderAPI-JS.d.ts"/> 
/// <reference path="../GMLIB-LegacyRemoteCallApi/lib/GMLIB_API-JS.d.ts"/>

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
                Text: (Player, Block) => tr("plugins.Waila.block.name", Player.langCode, Block.getTranslateName(Player.langCode), Block.type)
            },
            {// 挖掘速度
                Conditions: (Player, Block) => !Player.isCreative && !Block.isUnbreakable,
                Text: (Player, Block) => "\n" + tr("plugins.Waila.block.destroyTime", Player.langCode, 0.1 / Player.getDestroyProgress(Block))
            },
            {// 是否可以采集
                Conditions: (Player, Block) => !Player.isCreative && !Block.isUnbreakable,
                Text: (Player, Block, Cache) => "\n" + tr("plugins.Waila.block.destroy", Player.langCode, (!(Player.isAdventure && !Cache["HandItem"].canDestroy(Block)) && (Block.isAlwaysDestroyable() || Cache["HandItem"].canDestroySpecial(Block))) ? "§a✔" : "§c✘")
            },
            {// 蛋糕
                Conditions: (_Player, Block) => Block.type === "minecraft:cake",
                Text: (Player, _Block, Cache) => "\n" + tr("plugins.Waila.block.cake.status", Player.langCode, 7 - Cache["BlockNbt"].getTag("states").getData("bite_counter"))
            },
            {// 箱子容量
                Conditions: (_Player, Block) => Block.hasContainer(),
                Text: (Player, _Block, Cache) => "\n" + tr("plugins.Waila.block.chest.size", Player.langCde, Cache["BlockContainer"].getAllItems().filter(Item => !Item.isNull()).length, Cache["BlockContainer"].size, Cache["BlockContainer"].getAllItems().map(Item => Item.count).reduce((acc, curr) => acc + curr), Cache["BlockContainer"].size * 64, Player.langCde)
            },
            {// 农作物成熟程度数值
                Conditions: (_Player, Block) => Block.isCropBlock,
                Text: (Player, Block) => "\n" + tr("plugins.Waila.block.Cropnum", Player.langCode, Block.variant)
            },
            {// 红石粉等级
                Conditions: (_Player, Block) => Block.type === "minecraft:redstone_wire",
                Text: (Player, Block) => "\n" + tr("plugins.Waila.block.redstonelv", Player.langCode, Block.variant)
            },
            {// 开关状态
                Conditions: (_Player, _Block, Cache) => Cache["BlockNbt"]?.getTag("states")?.getData("open_bit") != null,
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.open_status.${Cache["BlockNbt"].getTag("states")?.getData("open_bit") ? "open" : "close"}`, Player.langCode)
            },
            {// 唱片机
                Conditions: (_Player, Block, Cache) => Block.type === "minecraft:jukebox" && Cache["BlockEntityNbt"]?.getTag("RecordItem")?.getData("Name") != null,
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.jukebox`, Player.langCode, `item.record_${Cache["BlockEntityNbt"].getTag("RecordItem").getData("Name").slice(21)}.desc`)
            },
            {// 花盆
                Conditions: (_Player, Block, Cache) => Block.type === "minecraft:flower_pot" && Cache["BlockEntityNbt"]?.getTag("PlantBlock")?.getData("name") != null,
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.flower_pot`, Player.langCode, Minecraft.getBlockTranslateKeyFromName(Cache["BlockEntityNbt"].getTag("PlantBlock").getData("name")))
            },
            {// 命令方块
                Conditions: (_Player, Block, Cache) => ["minecraft:repeating_command_block", "minecraft:command_block", "minecraft:chain_command_block"].includes(Block.type) && Cache["BlockEntityNbt"]?.getData("Command") !== "" && Cache["BlockEntityNbt"].getData("Command").length < 100,
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.commandblock.command`, Player.langCode, Cache["BlockEntityNbt"].getData("Command"))
            },
            {// 刷怪笼
                Conditions: (_Player, Block, Cache) => Block.type === "minecraft:mob_spawner" && ![null, ""].includes(Cache["BlockEntityNbt"]?.getData("EntityIdentifier")),
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.mob_spawner`, Player.langCode, Cache["BlockEntityNbt"].getData("EntityIdentifier"))
            },
            {// 音符盒
                Conditions: (_Player, Block) => Block.type === "minecraft:noteblock",
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.noteblock`, Player.langCode, Cache["BlockEntityNbt"].getData("note"))
            },
            {// 堆肥桶
                Conditions: (_Player, Block) => Block.type === "minecraft:composter",
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.composter`, Player.langCode, Cache["BlockNbt"]?.getTag("states")?.getData("composter_fill_level"))
            },
            {// 钟摆动时间
                Conditions: (_Player, Block, Cache) => Block.type === "minecraft:bell" && Cache["BlockEntityNbt"].getData("Ringing"),
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.RingingTime`, Player.langCode, (50 - Cache["BlockEntityNbt"].getData("Ticks")) / 20)
            },
            {// 酿造剩余时间
                Conditions: (_Player, Block, Cache) => Block.type === "minecraft:brewing_stand" && Cache["BlockEntityNbt"].getData("CookTime") > 0,
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.BrewingStand.cookTime`, Player.langCode, (Cache["BlockEntityNbt"].getData("CookTime") / 20))
            },
            {// 酿造剩余燃料
                Conditions: (_Player, Block, Cache) => Block.type === "minecraft:brewing_stand" && Cache["BlockEntityNbt"].getData("FuelAmount") > 0,
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.BrewingStand.Fuel`, Player.langCode, Cache["BlockEntityNbt"].getData("FuelAmount"), Cache["BlockEntityNbt"].getData("FuelTotal"))
            },
            {// 信标
                Conditions: (_Player, Block, Cache) => Block.type === "minecraft:beacon" && ![0, null].includes(Cache["BlockEntityNbt"]?.getData("primary")),
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.beacon`, Player.langCode, Cache["BuffKeyID"][Cache["BlockEntityNbt"].getData("primary")], Cache["BlockEntityNbt"].getData("secondary") !== 0 ? Cache["BuffKeyID"][Cache["BlockEntityNbt"].getData("secondary")] : "")
            },
            {// 炼药锅药水效果
                Conditions: (_Player, Block, Cache) => Block.type === "minecraft:cauldron" && Cache["BlockEntityNbt"]?.getData("PotionId") !== -1,
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.cauldron`, Player.langCode, `potion.${Cache["BuffKeyID"][Cache["BlockEntityNbt"].getData("PotionId")]}`, `itemGroup.name.${["potion", "splashPotion", "lingeringPotion"][Cache["BlockEntityNbt"].getData("PotionType")]}`)
            },
            {// 红石比较器信号强度
                Conditions: (_Player, Block) => Block.type === "minecraft:powered_comparator",
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.powered_comparator`, Player.langCode, Cache["BlockEntityNbt"].getData("OutputSignal"))
            },
            {// 末地折跃门
                Conditions: (_Player, Block) => Block.type === "minecraft:end_gateway" && Block.pos.dimid === 2,
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.end_gateway`, Player.langCode, Cache["BlockEntityNbt"].getData("ExitPortal").toArray().map(item => item.toString()).join(" "))
            },
            {// 熔炼存储经验
                Conditions: (_Player, Block, Cache) => ["minecraft:furnace", "minecraft:lit_furnace", "minecraft:blast_furnace", "minecraft:lit_blast_furnace", "minecraft:smoker", "minecraft:lit_smoker"].includes(Block.type) && Cache["BlockEntityNbt"]?.getData("StoredXPInt") > 0,
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.furnace.StoredXPInt`, Player.langCode, Cache["BlockEntityNbt"].getData("StoredXPInt"))
            },
            {// 熔炼熔炼进度
                Conditions: (_Player, Block, Cache) => ["minecraft:lit_furnace", "minecraft:lit_blast_furnace", "minecraft:lit_smoker"].includes(Block.type) && Cache["BlockEntityNbt"]?.getData("CookTime") > 0,
                Text: (Player, Block, Cache) => "\n" + tr(`plugins.Waila.block.furnace.CookTime`, Player.langCode, (Cache["BlockEntityNbt"].getData("CookTime") / (Block.type === "minecraft:lit_furnace" ? 2 : 1)))
            },
            {// 熔炼剩余燃料
                Conditions: (_Player, Block, Cache) => ["minecraft:lit_furnace", "minecraft:lit_blast_furnace", "minecraft:lit_smoker"].includes(Block.type) && Cache["BlockEntityNbt"]?.getData("BurnTime") > 0,
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.furnace.Burn`, Player.langCode, Cache["BlockEntityNbt"]?.getData("BurnTime"), Cache["BlockEntityNbt"]?.getData("BurnDuration"))
            },
            {// 最后编辑告示牌的玩家
                Conditions: (_Player, Block) => Block.type.includes("_sign"),
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.sign`, Player.langCode, UserCache.getNameByXuid(Cache["BlockEntityNbt"].getTag("FrontText").getData("TextOwner") || "小小的子沐呀~") || "无", UserCache.getNameByXuid(Cache["BlockEntityNbt"].getTag("BackText").getData("TextOwner") || "小小的子沐呀~") || "无")
            },
            {// 磁石ID
                Conditions: (_Player, Block, Cache) => Block.type === "minecraft:lodestone" && Cache["BlockEntityNbt"]?.getTag("trackingHandle") != null,
                Text: (Player, _Block, Cache) => "\n" + tr(`plugins.Waila.block.lodestone`, Player.langCode, Cache["BlockEntityNbt"]?.getTag("trackingHandle"))
            },
            {// 装饰罐
                Conditions: (_Player, Block, Cache) => Block.type === "minecraft:decorated_pot" && Cache["BlockEntityNbt"]?.getTag("item")?.getData("Name"),
                Text: (Player, _Block, Cache) => {
                    const item = mc.newItem(Cache["BlockEntityNbt"].getTag("item"));
                    return "\n" + tr(`plugins.Waila.block.decorated_pot`, Player.langCode, item.getTranslateName(Player.langCode), item.count);
                }
            },
        ],
        /** 指向实体时显示 @type {ConfigItem[]} */
        Entity: [
            {// 名字
                Conditions: true,
                Text: (Player, Entity) => tr("plugins.Waila.entity.name", Player.langCode, Entity.isPlayer() ? Entity.toPlayer().realName : Entity.getNameTag() || Entity.getTranslateName(Player.langCode), Entity.type)
            },
            {// 血量
                Conditions: (_Player, Entity) => Entity.maxHealth !== 0,
                Text: (Player, Entity, Cache) => "\n" + tr("plugins.Waila.entity.health", Player.langCode, Cache["EntityNbt"].getTag("Attributes").toArray().find(Attribute => Attribute.Name === "minecraft:health")["Current"], Entity.maxHealth)
            },
            {// 盔甲架
                Conditions: (_Player, Entity) => Entity.type === "minecraft:armor_stand",
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.pose", Player.langCode, Cache["EntityNbt"].getTag("Pose").getData("PoseIndex"))
            },
            {// 画
                Conditions: (_Player, Entity) => Entity.type === "minecraft:painting",
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.painting", Player.langCode, Cache["EntityNbt"].getData("Motif"))
            },
            {// 史莱姆大小
                Conditions: (_Player, Entity) => Entity.type === "minecraft:slime",
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.slime.size", Player.langCode, Cache["EntityNbt"].getData("Size"))
            },
            {// 下路方块
                Conditions: (_Player, Entity) => Entity.type === "minecraft:falling_block",
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.falling_block", Player.langCode, Minecraft.getBlockTranslateKeyFromName(Cache["EntityNbt"].getTag("FallingBlock").getData("name")), Player.langCode)
            },
            {// TNT爆炸时间
                Conditions: (_Player, Entity) => Entity.type === "minecraft:tnt",
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.tnt", Player.langCode, Cache["EntityNbt"]?.getData("Fuse"))
            },
            {// 繁殖冷却时间
                Conditions: (_Player, _Entity, Cache) => Cache["EntityNbt"].getData("BreedCooldown") > 0,
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.breedcooldown", Player.langCode, Cache["EntityNbt"]?.getData("BreedCooldown") / 20)
            },
            {// 成年所需时间
                Conditions: (_Player, Entity, Cache) => Entity.isBaby && Cache["EntityNbt"]?.getData("Age") < 0,
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.age", Player.langCode, (Math.abs(Cache["EntityNbt"]?.getData("Age")) / 20))
            },
            {// 跳跃高度
                Conditions: (_Player, Entity) => ["minecraft:horse", "minecraft:skeleton_horse", "minecraft:zombie_horse", "minecraft:donkey", "minecraft:mule"].includes(Entity.type),
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.jump", Player.langCode, Cache["EntityNbt"].getTag("Attributes").toArray().find(Attribute => Attribute.Name === "minecraft:horse.jump_strength")["Current"] / 0.2724275)
            },
            {// 当前移动速度
                Conditions: (_Player, Entity) => Entity.isMoving && Entity.speed >= 1,
                Text: (Player, Entity) => "\n" + tr("plugins.Waila.entity.speed", Player.langCode, Entity.speed)
            },
            {// 村民职业
                Conditions: (_Player, Entity, Cache) => Entity.type === "minecraft:villager_v2" && !Entity.hasFamily("nitwit") && !Entity.isBaby && Cache["EntityNbt"].getData("PreferredProfession") != null,
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.village.profession", Player.langCode, `entity.villager.${({ "armorer": "armor", "weaponsmith": "weapon", "leatherworker": "leather", "toolsmith": "tool", "undefined": "unskilled" })[Cache["EntityNbt"].getData("PreferredProfession")] ?? Cache["EntityNbt"].getData("PreferredProfession")}`)
            },
            {// 燃烧时间
                Conditions: (_Player, Entity, Cache) => Entity.isOnFire && Cache["EntityNbt"]?.getTag("internalComponents")?.getTag("OnFireComponent")?.getTag("OnFireTicksRemaining") != null,
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.fire_time", Player.langCode, Cache["EntityNbt"].getTag("internalComponents").getTag("OnFireComponent").getTag("OnFireTicksRemaining") / 20)
            },
            {// 无敌时间
                Conditions: (_Player, _Entity, Cache) => Cache["EntityNbt"].getData("HurtTime") > 0,
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.Invincible_time", Player.langCode, Cache["EntityNbt"].getData("HurtTime") / 20)
            },
            {// 玩家游戏模式
                Conditions: (_Player, Entity) => Entity.isPlayer(),
                Text: (Player, Entity) => "\n" + tr("plugins.Waila.entity.gamemode", Player.langCode, tr(`gameMode.${["survival", "creative", "adventure", null, null, null, "spectator"][Entity.toPlayer().gameMode]}`, Player.langCode))
            },
            {// 末影螨剩余存在时间
                Conditions: (_Player, Entity) => Entity.type === "minecraft:endermite",
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.endermite.Lifetime", Player.langCode, 2400 - Cache["EntityNbt"].getData("Lifetime"))
            },
            {// 山羊羊角数量
                Conditions: (_Player, Entity) => Entity.type === "minecraft:goat",
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.goat.GoatHornCount", Player.langCode, Cache["EntityNbt"].getData("GoatHornCount"))
            },
            {// 拥有BUFF
                Conditions: (_Player, Entity) => Entity.getAllEffects().length !== 0,
                Text: (Player, /** @type {Entity} */Entity, Cache) =>
                    "\n" + tr("plugins.Waila.entity.buffs", Player.langCode,
                        Entity.getAllEffectsInfo().map(effectInfo =>
                            [
                                "plugins.Waila.entity.buffs.items",
                                Cache["BuffKeyID"][effectInfo.Id],
                                effectInfo.Amplifier == 255 ? "plugins.Waila.entity.buffs.maxLevel" : effectInfo.Amplifier + 1
                            ]
                        )
                    )
            },
            {// 朝向
                Conditions: true,
                Text: (Player, Entity) => "\n" + tr("plugins.Waila.entity.direction", Player.langCode, tr(`plugins.Waila.entity.direction.${["north", "east", "south", "west"][Entity.direction.toFacing()]}`, Player.langCode))
            },
            {// 命令方块矿车
                Conditions: (_Player, Entity, Cache) => Entity.type === "minecraft:command_block_minecart" && Cache["EntityNbt"].getData("Command") !== "" && Cache["EntityNbt"].getData("Command").length < 100,
                Text: (Player, _Entity, Cache) => "\n" + tr("plugins.Waila.entity.commandblock.command", Player.langCode, Cache["EntityNbt"].getData("Command"))
            },
            {// 村民
                Conditions: (_Player, _Entity, Cache) => Cache["EntityNbt"]?.getTag("Offers")?.getTag("Recipes") != null,
                Text: (Player, _Entity, Cache) => {
                    let /** @type {NbtList} */OffersNbts = Cache["EntityNbt"].getTag("Offers").getTag("Recipes"),/** @type {String[]} */ OffersTexts = [];
                    for (let index = 0; index < OffersNbts.getSize(); index++) {
                        const /** @type {NbtCompound} */OffersNbt = OffersNbts.getData(index);
                        if (OffersNbt.getData("tier") > Cache["EntityNbt"].getData("TradeTier")) continue;
                        const BuyItemA = mc.newItem(OffersNbt.getTag("buyA").getData("Name"), OffersNbt.getData("buyCountA"));
                        OffersTexts[index] = tr("plugins.Waila.entity.village.offers.item1", Player.langCode, BuyItemA.getTranslateName(Player.langCode), BuyItemA.count);
                        if (OffersNbt.getTag("buyB")?.getTag("Name")) {
                            const BuyItemB = mc.newItem(OffersNbt.getTag("buyB").getData("Name"), OffersNbt.getData("buyCountB"));
                            OffersTexts[index] += tr("plugins.Waila.entity.village.offers.item2", Player.langCode, BuyItemB.getTranslateName(Player.langCode), BuyItemB.count);
                        }
                        const SellItem = mc.newItem(OffersNbt.getTag("sell").getData("Name"), OffersNbt.getTag("sell").getData("Count"));
                        OffersTexts[index] += tr("plugins.Waila.entity.village.offers.item3", Player.langCode, SellItem.getTranslateName(Player.langCode), SellItem.count);
                    }
                    return "\n" + tr("plugins.Waila.entity.village.offers", Player.langCode) + OffersTexts.join("\n");
                }
            },
        ],
        /** 无论如何都会显示(方块和实体后面) @type {ConfigItem[]} */
        AllAfter: [
            {// 距离
                Conditions: true,
                Text: (Player, Vein) => "\n" + tr("plugins.Waila.distance", Player.langCode, Player.distanceTo(Vein.pos))
            },
            {// 坐标
                Conditions: true,
                Text: (Player, Vein) => "\n" + tr("plugins.Waila.pos", Player.langCode, Vein.pos.x, Vein.pos.y, Vein.pos.z)
            },
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
        /** 默认显示位置 @type {0 | 1 | 2 | 3 | 4} */
        DefaultMode: 0,
        /** 刷新时间(秒) @type {Number} */
        Hz: 0.1,
        /** 查找最大距离 @type {Number} */
        maxDistance: 10,
        // https://www.minebbs.com/resources/information-bar.5208/
        /** 是否换行(用于适配材质包) @type {boolean} */
        NewLine: true,
    },
};

/** 翻译字符串 @type {function(string,string,...string):string} */
const tr = (key, language, ...args) =>
    Array.isArray(key)
        ? tr(key[0], language, ...key.slice(1), ...args)
        : I18nAPI.get(key, args.map(str => {
            if (Array.isArray(str)) return tr(str[0], language, ...str.slice(1));
            if (typeof str !== "number") return I18nAPI.get(str?.toString() ?? "", [], language);
            str = str.toFixed(2).toString().replace(/\.?0+$/, "");
            if (/.[0-9]0/i.test(str.slice(-1))) str = str.slice(0, -1);
            return str;
        }), language);

/**
 * @typedef {Object} PlayerConfig
 * @property {Boolean} Enabled 开启状态
 * @property {0|1|2|3|4} Mode - 0:Bossbar栏
 *                          - 1:tell.4 音符盒提示
 *                          - 2:tell.5 物品栏上方
 *                          - 3:title.4 actionBar
 *                          - 4:Sidebar 侧边栏
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