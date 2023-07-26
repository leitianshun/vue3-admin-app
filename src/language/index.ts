import { createI18n } from 'vue-i18n'

// import elcn from 'element-plus/lib/locale/lang/zh-cn'
// import elen from 'element-plus/dist/locale/en.mjs'
import zh from './zh'
import en from './en'

// import { useI18n } from 'vue-i18n'
// const {t, locale } = useI18n()  这种写法适合setup
// local.value = 'zh'
// t('login.userName')

// import i18n from '@/language'
// i18n.global.locale = 'zh'
// 如果关闭了legacy 可以使用i18n.global.locale.value = 'zh'

// const messages = { en: { ...en, ...elen }, zh: { ...zh, ...elcn } }
const messages = { en, zh }
// const messages = { en: { ...en }, zh: { ...zh } }

// function getLocal() {
//   // 如果缓存中存在，则直接返回
//   // const myLocale = localStorage.getItem('my_locale')
//   const myLocale = layoutStore.language
//   if (myLocale)
//     return myLocale

//   // 否则读取当前网页语言
//   const localName = navigator.language.includes('zh') ? 'zh' : 'en'
//   layoutStore.language = localName
//   // 设置缓存
//   // localStorage.setItem('my_locale', localName)
//   return localName
// }

// const language = (navigator.language || 'en').toLocaleLowerCase() // 获取当前浏览器的语言,转为小写
const i18n = createI18n({
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  locale: localStorage.getItem('language') || 'zh',
  // locale: getLocal(),  //获取语言
  globalInjection: true, // 全局注册$t方法
  fallbackLocale: 'en', // 设置备用语言,
  messages,
})

export default i18n
