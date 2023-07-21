declare module '*.vue' {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'lodash/cloneDeep'
// declare module 'element-plus/lib/locale/lang/zh-cn'
// declare module 'element-plus/lib/locale/lang/en'