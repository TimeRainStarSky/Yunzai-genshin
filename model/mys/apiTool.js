/**
 * 整合接口用于查询数据
 * 方便后续用于解耦
 * 临时处理，后续大概率重写 主要原因（懒）
 */
export default class apiTool {
   /**
    * 
    * @param {用户uid} uid 
    * @param {区服} server 
    * @param {是否为星穹铁道或其他游戏? type(bool or string)} isSr 
    */
    constructor(uid, server, isSr = false) {
        this.uid = uid
        this.isSr = isSr 
        this.server = server
        this.game='genshin'
        if(isSr) this.game='honkaisr'
        if(typeof isSr !== 'boolean'){
            this.game=isSr
        }
    }


    getUrlMap = (data = {}) => {
        let host, hostRecord, hostPublicData
        if (['cn_gf01', 'cn_qd01', 'prod_gf_cn','prod_qd_cn'].includes(this.server)) {
            host = 'https://api-takumi.mihoyo.com/'
            hostRecord = 'https://api-takumi-record.mihoyo.com/'
            hostPublicData = 'https://public-data-api.mihoyo.com/'
        } else if (['os_usa', 'os_euro', 'os_asia', 'os_cht'].includes(this.server)) {
            host = 'https://api-os-takumi.mihoyo.com/'
            hostRecord = 'https://bbs-api-os.mihoyo.com/'
        }
        let urlMap = {
            genshin: {
                /** captcha - olives */
                olives_shorten:{
                    url: 'https://captcha.olives.wiki/shorten',
                    query: `gt=${data.gt}&challenge=${data.challenge}`
                },
                olives_data:{
                    url: 'https://captcha.olives.wiki/data',
                    query: `challenge=${data.challenge}`
                },
                /** mys 验证界面*/
                createVerification: {
                    url: `${hostRecord}game_record/app/card/wapi/createVerification`,
                    query: 'is_high=true'
                },
                verifyVerification: {
                    url: `${hostRecord}game_record/app/card/wapi/verifyVerification`,
                    body: data
                },
                /** 原神 签到接口*/
                /** 签到信息 */
                bbs_sign_info: {
                    url: `${host}event/bbs_sign_reward/info`,
                    query: `act_id=e202009291139501&region=${this.server}&uid=${this.uid}`,
                    sign: true
                },
                /** 签到奖励 */
                bbs_sign_home: {
                    url: `${host}event/bbs_sign_reward/home`,
                    query: `act_id=e202009291139501&region=${this.server}&uid=${this.uid}`,
                    sign: true
                },
                /** 签到 */
                bbs_sign: {
                    url: `${host}event/bbs_sign_reward/sign`,
                    body: {act_id: 'e202009291139501', region: this.server, uid: this.uid},
                    sign: true
                },

                /** 首页宝箱 */
                index: {
                    url: `${hostRecord}game_record/app/genshin/api/index`,
                    query: `role_id=${this.uid}&server=${this.server}`
                },
                /** 深渊 */
                spiralAbyss: {
                    url: `${hostRecord}game_record/app/genshin/api/spiralAbyss`,
                    query: `role_id=${this.uid}&schedule_type=${data.schedule_type || 1}&server=${this.server}`
                },
                /** 角色详情 */
                character: {
                    url: `${hostRecord}game_record/app/genshin/api/character`,
                    body: { role_id: this.uid, server: this.server }
                },
                /** 树脂 */
                dailyNote: {
                    url: `${hostRecord}game_record/app/genshin/api/dailyNote`,
                    query: `role_id=${this.uid}&server=${this.server}`
                },
                /** 详情 */
                detail: {
                    url: `${host}event/e20200928calculate/v1/sync/avatar/detail`,
                    query: `uid=${this.uid}&region=${this.server}&avatar_id=${data.avatar_id}`
                },
                /** 札记 */
                ys_ledger: {
                    url: 'https://hk4e-api.mihoyo.com/event/ys_ledger/monthInfo',
                    query: `month=${data.month}&bind_uid=${this.uid}&bind_region=${this.server}`
                },
                /** 养成计算器 */
                compute: {
                    url: `${host}event/e20200928calculate/v2/compute`,
                    body: data
                },
                blueprintCompute: {
                    url: `${host}event/e20200928calculate/v1/furniture/compute`,
                    body: data
                },
                /** 养成计算器 */
                blueprint: {
                    url: `${host}event/e20200928calculate/v1/furniture/blueprint`,
                    query: `share_code=${data.share_code}&region=${this.server}`
                },
                /** 角色技能 */
                avatarSkill: {
                    url: `${host}event/e20200928calculate/v1/avatarSkill/list`,
                    query: `avatar_id=${data.avatar_id}`
                },
                /** 七圣召唤数据 */
                basicInfo: {
                    url: `${hostRecord}game_record/app/genshin/api/gcg/basicInfo`,
                    query: `role_id=${this.uid}&server=${this.server}`
                },
                /**使用兑换码 目前仅限国际服,来自于国服的uid请求已在myinfo.js的init方法提前拦截 */
                useCdk: {
                    url: 'PLACE_HOLDER',
                    query: null
                }
            },
            honkaisr: {
                /** captcha - olives */
                olives_shorten:{
                    url: 'https://captcha.olives.wiki/shorten',
                    query: `gt=${data.gt}&challenge=${data.challenge}`
                },
                olives_data:{
                    url: 'https://captcha.olives.wiki/data',
                    query: `challenge=${data.challenge}`
                },
                /** mys 验证界面*/
                createVerification: {
                    url: `${hostRecord}game_record/app/card/wapi/createVerification`,
                    query: 'is_high=true'
                },
                verifyVerification: {
                    url: `${hostRecord}game_record/app/card/wapi/verifyVerification`,
                    body: data
                },
                /** 星铁 签到接口*/
                /** 签到信息 */
                bbs_sign_info: {
                    url: `${host}event/luna/info`,
                    query: `act_id=e202304121516551&region=${this.server}&uid=${this.uid}`,
                    sign: true
                },
                /** 签到奖励 */
                bbs_sign_home: {
                    url: `${host}event/luna/home`,
                    query: `act_id=e202304121516551&region=${this.server}&uid=${this.uid}`,
                    sign: true
                },
                /** 签到 */
                bbs_sign: {
                    url: `${host}event/luna/sign`,
                    body: {act_id: 'e202304121516551', region: this.server, uid: this.uid},
                    sign: true
                },
                getFp: {
                    url: `${hostPublicData}device-fp/api/getFp`,
                    body: {
                        seed_id: `${generateSeed(16)}`,
                        // device_id: this.deviceId,
                        device_id: '3a254cb8-e576-697a-f2b7-dfbb7b8d9c28',
                        platform: '5',
                        seed_time: new Date().getTime() + '',
                        ext_fields: '{"userAgent":"Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/2.50.1","browserScreenSize":281520,"maxTouchPoints":5,"isTouchSupported":true,"browserLanguage":"zh-CN","browserPlat":"iPhone","browserTimeZone":"Asia/Shanghai","webGlRender":"Apple GPU","webGlVendor":"Apple Inc.","numOfPlugins":0,"listOfPlugins":"unknown","screenRatio":3,"deviceMemory":"unknown","hardwareConcurrency":"4","cpuClass":"unknown","ifNotTrack":"unknown","ifAdBlock":0,"hasLiedResolution":1,"hasLiedOs":0,"hasLiedBrowser":0}',
                        app_name: 'account_cn',
                        device_fp: '38d7ee834d1e9'
                    },
                    noDs: true
                },
                /** 首页宝箱 */
                index: {
                    url: `${hostRecord}game_record/app/hkrpg/api/index`,
                    query: `role_id=${this.uid}&server=${this.server}`
                },
                UserGame:{
                    url:`${host}common/badge/v1/login/account`,
                    body: { uid: this.uid, region: this.server,lang:'zh-cn',game_biz:'hkrpg_cn' }
                },
                /**
                 * 开拓阅历接口
                 */
                ys_ledger:{
                    url:`${host}/event/srledger/month_info`,
                    query:`region=${this.server}&uid=${this.uid}&month=${data.month}`
                },
                /** 角色详情 */
                character: {
                    url: `${hostRecord}game_record/app/hkrpg/api/avatar/info`,
                    body: { role_id: this.uid, server: this.server }
                },
                /** 树脂 */
                dailyNote: {
                    url: `${hostRecord}game_record/app/hkrpg/api/note`,
                    query: `role_id=${this.uid}&server=${this.server}`
                },
            }
        }

        if (this.server.startsWith('os')) {
            urlMap.genshin.detail.url = 'https://sg-public-api.hoyolab.com/event/calculateos/sync/avatar/detail'// 角色天赋详情
            urlMap.genshin.detail.query = `lang=zh-cn&uid=${this.uid}&region=${this.server}&avatar_id=${data.avatar_id}`
            urlMap.genshin.avatarSkill.url = 'https://sg-public-api.hoyolab.com/event/calculateos/avatar/skill_list'// 查询未持有的角色天赋
            urlMap.genshin.avatarSkill.query = `lang=zh-cn&avatar_id=${data.avatar_id}`
            urlMap.genshin.compute.url = 'https://sg-public-api.hoyolab.com/event/calculateos/compute'// 已支持养成计算
            urlMap.genshin.blueprint.url = 'https://sg-public-api.hoyolab.com/event/calculateos/furniture/blueprint'
            urlMap.genshin.blueprint.query = `share_code=${data.share_code}&region=${this.server}&lang=zh-cn`
            urlMap.genshin.blueprintCompute.url = 'https://sg-public-api.hoyolab.com/event/calculateos/furniture/compute'
            urlMap.genshin.blueprintCompute.body = { lang: 'zh-cn', ...data }
            urlMap.genshin.ys_ledger.url = 'https://hk4e-api-os.mihoyo.com/event/ysledgeros/month_info'// 支持了国际服札记
            urlMap.genshin.ys_ledger.query = `lang=zh-cn&month=${data.month}&uid=${this.uid}&region=${this.server}`
            urlMap.genshin.useCdk.url = 'https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey'
            urlMap.genshin.useCdk.query = `uid=${this.uid}&region=${this.server}&lang=zh-cn&cdkey=${data.cdk}&game_biz=hk4e_global`
          }
        return urlMap[this.game]
    }
}

export function generateSeed(length = 16) {
    const characters = '0123456789abcdef'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters[Math.floor(Math.random() * characters.length)]
    }
    return result
}