import plugin from '../../../lib/plugins/plugin.js'
import Note from '../model/note.js'
import gsCfg from '../model/gsCfg.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'
import MysSign from '../model/mysSign.js'

gsCfg.cpCfg('mys', 'set')

export class dailyNote extends plugin {
  constructor () {
    super({
      name: '体力查询',
      dsc: '体力查询',
      event: 'message',
      priority: 300,
      rule: [{
        reg: '^#*(原神|星铁)?(体力|树脂|查询体力|tl)$',
        fnc: 'note'
      }, {
        reg: '^(#签到|#*米游社(自动)*签到)(force)*$',
        fnc: 'sign'
      }, {
        reg: '^#(全部签到|签到任务)(force)*$',
        permission: 'master',
        fnc: 'signTask'
      }, {
        reg: '^#*(开启|关闭|取消)(米游社|自动|原神)*签到$',
        fnc: 'signClose'
      }]
    })

    this.set = gsCfg.getConfig('mys', 'set')
  }

  /** #体力 */
  async note () {
    let data = await Note.get(this.e)
    if (!data) return

    /** 生成图片 */
    let img = await puppeteer.screenshot('dailyNote', data)
    if (img) await this.reply(img)
  }

  /** #签到 */
  async sign() {
    await MysSign.sign(this.e)
  }

  /** 签到任务 */
  async signTask() {
    let mysSign = new MysSign(this.e)
    await mysSign.signTask(!!this?.e?.msg)
  }

  async signClose() {
    let mysSign = new MysSign(this.e)
    await mysSign.signClose()
  }

}