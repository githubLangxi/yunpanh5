//element-ui多语言
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

//portal平台多语言
import rten from '../components/locale/lang/en'
import rtzh from '../components/locale/lang/zh-CN'

//自定义多语言
import portalen from '../module/locale/lang/en'
import portalzh from '../module/locale/lang/zh-CN'


//CRM实体、字段多语言
import crm_en from '../module/locale/langForCrm/crmMetadata_1033'
import crm_zh from '../module/locale/langForCrm/crmMetadata_2052'

//设置需要支持的语言种类
export const locales = [
    {
        value: 'zh-CN',
        name: 'Chinese',
        native: '简体中文',
    },
    {
        value: 'en-US',
        name: 'English',
        native: 'English',
    }
]

//翻译的文字
export const messages = {
    "zh-CN": {
        ...rtzh,
        ...zhLocale,
        ...portalzh,
        ...crm_zh
    },
    "en-US": {
        ...rten,
        ...enLocale,
        ...portalen,
        ...crm_en
    },
}