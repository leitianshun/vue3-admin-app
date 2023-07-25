import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const messages = { en, zh }
const layoutStore = useLayoutStore()
// const messages = { en: { ...en }, zh: { ...zh } }

// function getLocal() {
//   // 如果缓存中存在，则直接返回
//   const myLocale = localStorage.getItem('my_locale')
//   if (myLocale) {
//     return myLocale
//   }
//   // 否则读取当前网页语言
//   const localName = navigator.language.indexOf('zh') !== -1 ? 'zh' : 'en'
//   // 设置缓存
//   localStorage.setItem('my_locale', localName)
//   return localName
// }

const language = (navigator.language || 'en').toLocaleLowerCase() // 获取当前浏览器的语言,转为小写
const i18n = createI18n({
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  locale: layoutStore.language || language.split('-')[0] || 'en',
  // locale: getLocal(),  //获取语言
  globalInjection: true, // 全局注册$t方法
  fallbackLocale: 'en', // 设置备用语言,
  messages,
})

export default i18n
