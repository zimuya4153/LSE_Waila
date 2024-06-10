// LiteLoader-AIDS automatic generated
/// <reference path="d:\dts/dts/helperlib/src/index.d.ts"/> 

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

LLSE_Player.prototype.updateBossBarTitle =
    /**
     * 更新玩家BossBar标题
     * @param {Number} uid 生物的uniqueId
     * @param {String} name 更新后的标题
     * @returns {Boolean}
     */
    function (uid, name) {
        const bs = new BinaryStream();
        bs.writeVarInt64(uid);
        bs.writeUnsignedVarInt(0x5);
        bs.writeString(name);
        return this.sendPacket(bs.createPacket(0x4A));
    }

/** 配置文件 @type {{AllBefore:ConfigItem[],Block:ConfigItem[],Entity:ConfigItem[],AllAfter:ConfigItem[],Bossbar:{ID:Number,Color:Number,Percent:Number},DefaultText:String,DefaultMode:0|1|2|3,Hz:Number,maxDistance:Number}} */
const Config = require('./Waila/Config.js').Config;
const { PAPI } = require('./GMLIB-LegacyRemoteCallApi/lib/BEPlaceholderAPI-JS.js');
const { I18nAPI, Minecraft } = require('./GMLIB-LegacyRemoteCallApi/lib/GMLIB_API-JS.js');
const /** 玩家数据文件 */ Data = new JsonConfigFile('./plugins/Waila/Data.json');
Minecraft.setFixI18nEnabled();// 修复Mojang的i18n问题

/** 报错记录，防刷屏 @type {String[]} */
let ErrorList = [];

setInterval(() => {
    mc.getOnlinePlayers().forEach(Player => {
        const /** @type {PlayerConfig} */ PlayerConfig = Data.get(Player.uuid, { 'Enabled': 1, 'Mode': Config.DefaultMode });
        if (
            Player.isSimulatedPlayer()
            || [null, true].includes(Player.isLoading)
            || !PlayerConfig.Enabled
        ) return;
        let ViewEntity = Player.getEntityFromViewVector(Config.maxDistance), ViewBlock = Player.getBlockFromViewVector(false, false, Config.maxDistance, false);
        let text = '';
        if ((!ViewBlock || ViewBlock?.pos?.toString().replace(/ /g, '').includes('(0,0,0)')) && !ViewEntity) {
            text += Config.DefaultText.replace(/&(.*)&/g, (_, key) => I18nAPI.get(key, [], Player.langCode));
        } else {
            let TempCache = {
                'HandItem': Player.getHand(),
                'BlockNbt': ViewBlock ? ViewBlock.getNbt() : null,
                'BlockEntityNbt': ViewBlock.hasBlockEntity() ? ViewBlock.getBlockEntity().getNbt() : null,
                'BlockContainer': ViewBlock.hasContainer() ? ViewBlock.getContainer() : null,
                'EntityNbt': ViewEntity ? ViewEntity.getNbt() : null,
                'BuffKeyID': [null, 'moveSpeed', 'moveSlowdown', 'digSpeed', 'digSlowDown', 'damageBoost', 'heal', 'harm', 'jump', 'confusion', 'regeneration', 'resistance', 'fireResistance', 'waterBreathing', 'invisibility', 'blindness', 'nightVision', 'hunger', 'weakness', 'poison', 'wither', 'healthBoost', 'absorption', 'saturation', 'levitation', 'poison', 'conduitPower', 'slowFalling'],
            }
            const EvalGetText =
                /**
                 * @param {ConfigItem} Items 
                 * @returns {String}
                 */
                Items => {
                    const ErrorLog = (text,error) => {
                        const ErrorText = `\n${text}报错:${error.message}\n文本条件:${Items.Conditions.toString()}\n文本结果:${Items.Text.toString()}\n堆栈:\n${error.stack}`
                        if (ErrorList.includes(ErrorText)) return;
                        ErrorList.push(ErrorText);
                        logger.error(ErrorText);
                    }
                    try {
                        if (!(typeof (Items.Conditions) === 'function' ? Items.Conditions(Player, ViewEntity ?? ViewBlock, TempCache, PlayerConfig) : Items.Conditions)) return '';
                    } catch (error) { ErrorLog('条件判断',error) }
                    try {
                        return typeof (Items.Text) === 'string' ? Items.Text : Items.Text(Player, ViewEntity ?? ViewBlock, TempCache, PlayerConfig);
                    } catch (error) { ErrorLog('返回文本结果',error) }
                    return ''
                };
            text += Config.AllBefore.map(EvalGetText).join('');
            if (ViewEntity && (!ViewBlock || Player.distanceTo(ViewEntity) <= Player.distanceTo(ViewBlock.pos)))
                text += Config.Entity.map(EvalGetText).join('');
            else {
                ViewEntity = null;
                text += Config.Block.map(EvalGetText).join('');
            }
            text += Config.AllAfter.map(EvalGetText).join('')
            text = PAPI.translateString(text, Player).replace(/&(.*)&/g, (_, key) => I18nAPI.get(key, [], Player.langCode));
        }
        switch (PlayerConfig.Mode) {
            case 0: return Player.updateBossBarTitle(Config.Bossbar.ID, text);
            case 1: return Player.tell(text, 4);
            case 2: return Player.tell(text, 5);
            case 3: return Player.setTitle(text, 4);
            case 4: {
                Player.removeSidebar();
                Player.setSidebar(I18nAPI.get('plugins.Waila.sidebar.title', [], Player.langCode), text.split('\n').reduce((acc, val, index) => {
                    acc[val] = index + 1;
                    return acc;
                }, {}),0);
            }
        }
    });
}, Config.Hz * 1000);

mc.listen('onServerStarted', () => {
    setInterval(() => {
        mc.getOnlinePlayers().forEach(Player => {
            const /** @type {PlayerConfig} */ PlayerConfig = Data.get(Player.uuid, { 'Enabled': 1, 'Mode': Config.DefaultMode });
            if (!(
                Player.isSimulatedPlayer()
                || [null, true].includes(Player.isLoading)
                || !PlayerConfig.Enabled
                || PlayerConfig.Mode !== 0
            )) Player.setBossBar(Config.Bossbar.ID, Config.DefaultText.replace(/&(.*)&/g, (_, key) => I18nAPI.get(key, [], Player.langCode)), Config.Bossbar.Percent, Config.Bossbar.Color);
        });
    }, 5 * 1000);
    I18nAPI.loadLanguageDirectory(`./plugins/Waila/Language`);
    mc.regPlayerCmd('waila', I18nAPI.get('plugins.Waila.command.description'), (Player, args) => {
        if (args[1] != null && Player.isOP()) {
            const ViewBlock = Player.getBlockFromViewVector(false, false, Config.maxDistance, false);
            if (ViewBlock.name !== ViewBlock.getTranslateKey()) return Player.tell(I18nAPI.get('plugins.Waila.command.translators.error', [ViewBlock.type, ViewBlock.getTranslateName()], Player.langCode));
            if (!I18nAPI.getSupportedLanguages().includes(args[0])) return Player.tell(I18nAPI.get('plugins.Waila.command.language.error', [args[0]], Player.langCode));
            File.writeLine(`./plugins/Waila/Language/${args[0]}.lang`, `${ViewBlock.getTranslateKey()}=${args[1]}`);
            I18nAPI.loadLanguageDirectory(`./plugins/Waila/Language`);
            return Player.tell(I18nAPI.get('plugins.Waila.command.translators.succes', [ViewBlock.type, args[1]], Player.langCode));
        }
        const /** @type {PlayerConfig} */ PlayerConfig = Data.get(Player.uuid, { 'Enabled': 1, 'Mode': Config.DefaultMode });
        const Form = mc.newCustomForm().setTitle(I18nAPI.get('plugins.Waila.gui.title', [], Player.langCode));
        Form.addSwitch(I18nAPI.get('plugins.Waila.gui.switch', [], Player.langCode), PlayerConfig['Enabled']);
        Form.addDropdown(I18nAPI.get('plugins.Waila.gui.dropdown', [], Player.langCode), ['bossbar', 'tell_popup', 'tell_tip', 'actionBar','sidebar'].map(key => I18nAPI.get(`plugins.Waila.gui.dropdown.items.${key}`, [], Player.langCode)), PlayerConfig['Mode']);
        Player.sendForm(Form, (Player, FormData) => {
            if (!FormData) return Player.tell(I18nAPI.get('plugins.Waila.gui.cancel', [], Player.langCode));
            Data.set(Player.uuid, Object.assign({}, { Enabled: FormData[0], Mode: FormData[1] }));
            if(PlayerConfig.Mode===4&&FormData[1]!==4) Player.removeSidebar();
            if (FormData[0] && FormData[1] === 0)
                Player.setBossBar(Config.Bossbar.ID, Config.DefaultText.replace(/&(.*)&/g, (_, key) => I18nAPI.get(key, [], Player.langCode)), Config.Bossbar.Percent, Config.Bossbar.Color);
            else
                Player.removeBossBar(Config.Bossbar.ID);
            Player.tell(I18nAPI.get('plugins.Waila.gui.succes', [], Player.langCode));
        });
    });
});