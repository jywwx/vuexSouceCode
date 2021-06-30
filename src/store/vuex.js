let Vue;


class Store {
    constructor(options) {
        console.log(options)
            /// 创建vue 实例 将state 的状态 进行监听 以便 数据变更时  视图进行响应式更新
        this.vm = new Vue({
                data: {
                    state: options.state
                }
            })
            // for getters
        let getters = options.getters || {}
        this.getters = {} //Store 当前实例 创建getter对象
        Object.keys(getters).forEach(getterName => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    return getters[getterName](this.state)
                }
            })
        })

        // for mutations 
        let mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach(mutationName => {
            this.mutations[mutationName] = payload => {
                mutations[mutationName](this.state, payload)
            }
        })

        let actions = options.actions || {}
        this.actions = {}
        Object.keys(actions).forEach(actionName => {
            this.actions[actionName] = payload => {
                actions[actionName](this, payload)
            }
        })
    }
    commit = (type, payload) => {
        console.log(type, payload, this, "type, payload")
        this.mutations[type](payload)
    }
    dispatch(type, payload) {
        this.actions[type](payload)
    }
    get state() {
        return this.vm.state
    }
}

const install = (v) => {
    Vue = v
    Vue.mixin({ // 通过混合器 给每个vue 组件添加$store
        beforeCreate() { // 在给个组件调用beforeCreate 钩子函数的时候 进行属性的混合操作
            console.log(this.$options.name)
            if (this.$options && this.$options.store) { // 找到根节点
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}
export default { install, Store }