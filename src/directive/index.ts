export function hasButton(app: any,) {
    const userStore = useUserStore()
    app.directive('has', {
        mounted(el: any, options: any) { // el代表使用这个指令的dom，options可以拿到指令中传递的值
            // 代表使用这个全局指令的dom的组件挂载后会执行，v-has
            // console.log(el.parentNode)
            if (!userStore.buttons.includes(options.value))// 如果当前按钮的权限没有出现在已有的权限中，那么就从父节点的dom树上删除节点
                el.parentNode.removeChild(el) // 拿到当前节点的父节点，然后将自子节点删除，即可
        },
    })
}
