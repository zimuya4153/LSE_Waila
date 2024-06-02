// LiteLoader-AIDS automatic generated
/// <reference path="d:\dts/dts/helperlib/src/index.d.ts"/> 

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

/** 配置文件 @type {{AllBefore:ConfigItem[],Block:ConfigItem[],Entity:ConfigItem[],AllAfter:ConfigItem[],Bossbar:{ID:Number,Color:Number,Percent:Number,DefaultText:String},Hz:Number,maxDistance:Number}} */
const Config = require('./Waila/Config.js').Config;
const { PAPI } = require('./GMLIB-LegacyRemoteCallApi/lib/BEPlaceholderAPI-JS.js');
const { I18nAPI } = require('./GMLIB-LegacyRemoteCallApi/lib/GMLIB_API-JS.js');
const /** 玩家数据文件 */ Data = new JsonConfigFile('./plugins/Waila/Data.json');

setInterval(() => {
    mc.getOnlinePlayers().forEach(Player => {
        const /** @type {PlayerConfig} */ PlayerConfig = Data.get(Player.uuid, { 'Enabled': 1, 'Mode': 0 });
        if (
            Player.isSimulatedPlayer()
            || [null, true].includes(Player.isLoading)
            || !PlayerConfig.Enabled
        ) return;
        let ViewEntity = Player.getEntityFromViewVector(Config.maxDistance), ViewBlock = Player.getBlockFromViewVector(false, false, Config.maxDistance, false);
        let text = '';
        if ((!ViewBlock || ViewBlock?.pos?.toString().replace(/ /g, '').includes('(0,0,0)')) && !ViewEntity) {
            text += Config.Bossbar.DefaultText.replace(/&(.*)&/g, (_, key) => I18nAPI.get(key, [], Player.langCode));
        } else {
            const EvalGetText = (Items =>
                (typeof (Items.Conditions) === 'function' ? Items.Conditions(Player, PlayerConfig, ViewEntity ?? ViewBlock) : Items.Conditions)
                    ? (typeof (Items.Text) === 'string' ? Items.Text : Items.Text(Player, PlayerConfig, ViewEntity ?? ViewBlock)) ?? ''
                    : ''
            );
            text += Config.AllBefore.map(EvalGetText).join('');
            if (ViewEntity && (!ViewBlock || Player.distanceTo(ViewEntity) <= Player.distanceTo(ViewBlock.pos))) text += Config.Entity.map(EvalGetText).join(''); else {
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
        }
    });
}, Config.Hz * 1000);

// mc.listen('onBlockChanged', BeforeBlock => delete BlockCache[BeforeBlock.pos.toString()]);
mc.listen('onJoin', Player => {
    const /** @type {PlayerConfig} */ PlayerConfig = Data.get(Player.uuid, { 'Enabled': 1, 'Mode': 0 });
    if (PlayerConfig.Enabled && PlayerConfig.Mode === 0) Player.setBossBar(Config.Bossbar.ID, Config.Bossbar.DefaultText.replace(/&(.*)&/g, (_, key) => I18nAPI.get(key, [], Player.langCode)), Config.Bossbar.Percent, Config.Bossbar.Color);
});

mc.listen('onServerStarted', () => {
    I18nAPI.loadLanguageDirectory(`./plugins/Waila/Language`);
    
    mc.regPlayerCmd('waila', I18nAPI.get('plugins.Waila.command.description'), Player => {
        const /** @type {PlayerConfig} */ PlayerConfig = Data.get(Player.uuid, { 'Enabled': 1, 'Mode': 0 });
        const Form = mc.newCustomForm().setTitle(I18nAPI.get('plugins.Waila.gui.title'));
        Form.addSwitch(I18nAPI.get('plugins.Waila.gui.switch', [], Player.langCode), PlayerConfig['Enabled']);
        Form.addDropdown(I18nAPI.get('plugins.Waila.gui.dropdown', [], Player.langCode), ['bossbar', 'tell_popup', 'tell_tip', 'actionBar'].map(key => I18nAPI.get(`plugins.Waila.gui.dropdown.items.${key}`, [], Player.langCode)), PlayerConfig['Mode']);
        Player.sendForm(Form, (Player, FormData) => {
            if (!FormData) return Player.tell(I18nAPI.get('plugins.Waila.gui.cancel', [], Player.langCode));
            Data.set(Player.uuid, Object.assign({}, { Enabled: FormData[0], Mode: FormData[1] }));
            if (FormData[0] && FormData[1] === 0)
                Player.setBossBar(Config.Bossbar.ID, Config.Bossbar.DefaultText.replace(/&(.*)&/g, (_, key) => I18nAPI.get(key, [], Player.langCode)), Config.Bossbar.Percent, Config.Bossbar.Color);
            else
                Player.removeBossBar(Config.Bossbar.ID);
            Player.tell(I18nAPI.get('plugins.Waila.gui.succes', [], Player.langCode));
        });
    });
});