//数据源
let vm = {
    value:0
}

// 用于管理watcher的Dep 对象
let Dep = function() {
    this.list = []
    this.add = function(watcher){
        this.list.push(watcher)
    },
    this.notify = function(newValue){
        this.list.forEach(function(fn){
            fn(newValue)
        })
    }
}

//模拟compile,通过对Html的解析生成一系列订阅者（watcher）
function renderInput (newValue){
    let el = document.getElementById('input1')
    if(el){
        el.innerHTML = newValue
    }
}
function renderTitle (newValue){
    let el = document.getElementById('div1')
    if(el){
        el.innerHTML = newValue
    }
}
// 将解析出来的watcher 存入Dep 中待用
let dep = new Dep()
dep.add(renderInput)
dep.add(renderTitle)
// 定义一个Observer
function observer(vm,key,value){
    Object.defineProperty(vm,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            console.log('get')
            return value
        },
        set:function(newValue){
            if(value !== newValue){
                value = newValue
                console.log('updated')
                //将变动通知相关的订阅者
                dep.notify(newValue)
            }
        }
    })
}


// 页面引用的方法
function inputChange (ev){
    let value = Number.parseInt(ev.target.value)
    vm.value = (Number.isNaN(value))? 0:value
}
function btnAdd(){
    vm.value = vm.value +1;
}

// 数据初始化
function initMvvm(vm){
    Object.keys(vm).forEach(function(key){
        observer(vm,key,vm[key])
    })
}

initMvvm(vm)
dep.notify(vm.value)