declare module '*.vue' {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'lodash/cloneDeep'
declare module 'vue-i18n'
declare module 'element-plus/dist/locale/en.mjs'
// declare module 'element-plus/lib/locale/lang/zh-cn'
// declare module 'element-plus/lib/locale/lang/en'