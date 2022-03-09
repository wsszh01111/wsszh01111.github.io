# Reactive in vue2

聊聊Vue2的响应式

## 什么是响应式

数据响应式是Vue的一大特点，甚至可以说是其核心。通过初始化时定义响应式数据，Vue会自动监听响应式数据的变动，进而自动触发视图的更新。即，页面自动响应数据变化进行更新。

## 响应式的意义

响应式最大的意义，或者可以说是Vue最大的意义，就是屏蔽了操作DOM更新页面的具体细节，帮助开发者聚焦在业务逻辑实现上

在Vue和React出现之前，常规的前端开发方式都是编写业务逻辑或读取后端接口获得数据，通过JQuery或浏览器原生提供的DOM接口将数据渲染到页面；在需要监听页面变动时，需要在对应元素上注册事件监听器。随着业务体量的增加，这种操作DOM的方式会将业务逻辑和页面渲染愈发的耦合，造成逻辑混乱难以维护

Vue的数据响应式为开发者提供了一种新的开发方式。对于开发者而言，不再需要直接操作DOM对页面进行处理，只需要聚焦于业务逻辑本身的实现，对数据进行更新，数据更新后由框架负责页面的渲染。使得整体代码将更加清晰、易于维护。特别是面对大型项目或有大量的UI交互时，业务逻辑和页面渲染的分离可以在一定程度上保证代码的复杂度不会随着代码量的增加而增加。

## 响应式原理

Vue的数据响应式，其本质上是一种观察者模式的实践。数据属性是被观察者（Observable），视图是观察者（Observer），其间具有一对多的依赖关系。视图在初始化渲染或更新渲染的过程中注册其依赖的数据属性，数据属性在变动时通知跟它具有依赖关系的视图进行更新。

![响应式原理](https://cn.vuejs.org/images/data.png)

![Vue数据响应式原理-模型关系图 (1)](/Users/admin/Downloads/Vue数据响应式原理-模型关系图 (1).png)

其基本思路如上图。每个组件均有一个对应的Watcher实例。组件初始化时，Vue通过`Object.defineProperty`代理数据对象的每个属性，拦截属性的读取和写入操作，使得每个数据属性获得读取函数（getter）和写入函数（setter）。很巧妙的利用了视图在渲染时需要读取属性值，在组件渲染视图读取某个属性时（Touch），在读取函数（getter）中建立当前组件和该数据对象属性的依赖关系（Collect as Dependency）。对数据属性的更新本质上是一种写入操作，在写入时通知（Notify）跟当前属性具有依赖关系的组件更新视图（re-render）。

> Object.defineProperty是无法被shim的（即无法替代实现），这也是Vue不支持IE8的原因。

总的来说，Vue的数据响应系统在具体实现上，可以分成**初始化响应式数据**、**依赖收集**、**通知更新**三个部分

### 将普通数据变成响应式数据

JS中的属性可以根据属性特性分为值属性和访问器属性两种（有value和writable的就是值属性，有getter和setter的就是访问器属性）。`Object.defineProperty`功能之一就是可以设置这两类属性，而Vue就是在初始化时候，利用`Object.defineProperty`将所有属性转化为访问器属性以实现对数据属性读取/写入操作的拦截，并在读取函数（getter）和写入函数（setter）中实现响应式逻辑

以下结合代码进行深入的分析

#### initData

`initData`是组件数据初始化入口，将数据对象挂载在Vue实例的`_data`属性上，之后遍历对象的所有属性，对属性名是否重复进行判断（重复了就可能造成业务逻辑异常）；然后进入核心逻辑`observe`

```js
// src/core/instance/state.js

// initData是组件数据初始化入口
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {}
  // 获得数据对象data
  // Vue组件最终获得的data数据应该是个普通对象
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    // 判断属性是否和函数重名
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    // 判断属性是否和props重名
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) { // 判断属性是否和保留字重名
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}
```

#### observe()

进入核心逻辑`observe`后，除了一些必要的逻辑判断外，主要就干了两件事：

1. 为数据对象生成`Observer`实例并将其挂载在数据对象的`__ob__`属性上（挂载过程是在Observer类的构造函数中完成的），即每一个响应式数据对象都有一个对应的`Observer`实例
2. 如果该数据对象是根数据对象，对vmCount计数加一

需要注意下实例化前的判断逻辑。其中的`(Array.isArray(value) || isPlainObject(value)) `判断，说明只有数组和普通对象可以转化为响应式对象，也就意味着`Set`等数据结构无法作为响应式数据使用，但从实际页面渲染上来说，普通对象和数组已经能够支持绝大部分情况，就像JSON可以适应绝大多数情况一样；`Object.isExtensible`拦截了不可扩展的数据；`!value._isVue`拦截了Vue实例。

```js
// src/core/observer/index.js

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe (value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
```

#### Observer

每个响应式对象都有一个对应的`Observer`实例，其中主要是针对数组做了一些特殊处理：

1. 如果数组对象的原型链可控（即拥有\_\_proto\_\_属性，通过hasProto判断，chrome等是支持的，IE等不支持），则直接中断原有原型链指向新的原型链（通过protoAugment）；否则在数组对象上新增一系列的操作函数覆盖原型链上的原有操作函数。这样做，主要还是因为JS中的数组无法使用对象的方式拦截读取/写入操作，因此Vue在原生操作函数的基础上封装了一层，保证在使用一系列操作函数更新数组时能触发视图更新
2. 遍历数组每一项进行响应式处理observeArray

具体每个对象属性的响应式转化，实际都是在`walk`函数中的`defineReactive`中完成的

```js
// src/core/observer/index.js

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**	
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```

#### Dep

在上面`Observer`构造函数中注意到还生成一个`Dep`实例，每个`Dep`实例实际就代表了一个数据对视图的一对多的依赖关系，即一个数据被零个一个或多个视图依赖；不仅每个`Observer`实例会有一个对应的`Dep`实例，下面还会看到在`defineReactive` 中也会定义`Dep`实例，这也就是说，每个数据对象（一个数据对象对应有一个`Observer`实例）和数据对象的每个属性，均会有一个对应的`Dep`实例用于管理数据和视图的依赖关系。

注意`Dep`构造函数中除了设定id外，就是初始化了一个类型为数组的subs属性，从观察者模式的角度理解，这个subs就是该数据的观察者列表，即依赖该数据的视图（所对应的Watcher）都是存放在这里的

此外，`Dep`还有个静态属性`Dep.target`非常关键，下面在**依赖收集**的章节再仔细介绍

```js
// src/core/observer/dep.js

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = [] // 观察者列表
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = []

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

```

#### defineReactive()

在`defineReactive`中实际完成每个对象属性的响应式转化

首先注意到在`defineReactive`中生成了一个`Dep`实例，代表了该对象属性的依赖关系，具体对于依赖关系的操作在下面的`reactiveGetter`函数和`reactiveSetter`函数中完成。这里又一次比较巧妙的利用了闭包来维护每个对象属性的`Dep`实例

然后通过`Object.getOwnPropertyDescriptor`获取属性描述符，根据属性描述符做了两件事：

1. 判断该属性是否`configurable`，这也就意味着是否可以将其转换成响应式属性（是否可以为属性添加getter和setter函数），如果不行，则直接返回了
2. 由于属性可能本来就是访问器属性（即本来就拥有getter和setter函数），因此尝试读取原有的getter和setter函数，保留原有的数据读取/写入逻辑（`const value = getter ? getter.call(obj) : val`），在此之上添加响应式逻辑

之后的`observe(val)`，就是递归调用属性值的关键。设想一下，如果键为key的属性值仍然是一个对象，那么同样的也需要将该对象转化成响应式对象，调用`observe`，再从头走一遍之前的所有逻辑获取属性值的`Observer`实例（如果有的话）

在读取（`reactiveGetter`）该属性时，调用`dep.depend()`进行依赖收集，在更新（`reactiveSetter`）该属性时，调用`dep.notify()`通知视图更新，关于**依赖收集**和**通知视图更新**将在下面的章节详述

```js
// src/core/observer/index.js

/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```

#### 数据初始化后生成的模型关系

将数据转成响应式的阶段基本到这里就结束了，总体而言就是为数据对象生成和挂载`Observer`实例，将每个对象属性转换成响应式，为数据对象和对象属性生成`Dep`实例用于后续维护依赖关系。

一张简单的模型关系图如下：

![Vue数据响应式原理-模型关系图](/Users/admin/Downloads/Vue数据响应式原理-模型关系图.png)

### 依赖收集

依赖收集的基本原理，就是Vue会读取数据对视图进行渲染，当数据被读取时，会调用响应式数据的`reactiveGetter`函数，如上述的解释，在`reactiveGetter`内部会调用`dep.depend()`进行依赖收集。下面就分成几个重点讲解一下

#### 组件渲染

实际的页面渲染都是细分成组件级别的，毕竟日常的开发都是以组件进行划分，Vue的视图模板也是通过组件进行拼接。组件渲染实际是在mount生命周期阶段进行的，具体看眼代码

```js
// src/core/instance/lifecycle.js

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag =   `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```

可以看到在`mountComponent`中分别用`callHook`回调了beforeMount和mounted这两个生命周期（`callHook(vm, 'beforeMount')`和`callHook(vm, 'mounted')`），分别表示进入mount之前和mount之后，但核心代码实际上是`updateComponent`和`new Watcher`。

`updateComponent`是视图进行更新的逻辑，视图的首次渲染实际上也可以看做是特殊的页面更新，从无节点到有节点的一种更新，因此这里不管是初始化视图渲染，还是后续的视图更新，都走相同的`updateComponent`逻辑即可。这里`updateComponent`的主体逻辑主要是渲染相关的，跟响应式的关系不是非常密切，因此这里不过多分析；只需要记住在`updateComponent`逻辑中会读取数据，并建立依赖，同时数据更新时，会重新触发`updateComponent`逻辑并重新建立依赖，完成整个响应式逻辑的闭环。

#### reactiveGetter

TODO

#### Watcher

上述组件初始化阶段说到，每个数据对象和对象属性都有个`Dep`实例，每个`Dep`实例实际就代表了一个数据对应视图的一对多的依赖关系；但与之相对的，每个视图都会依赖非常多的数据，一个视图和多个数据也会形成一对多的依赖关系，因此视图和数据的实际关系是个多对多的关系，一个数据可以对应多个视图，一个视图也可以对应多个数据。

在Vue中，就使用Watcher去管理每个视图对应的数据依赖关系，即每个组件实例都对应一个Watcher实例

```js
// src/core/observer/watcher.js

import { queueWatcher } from './scheduler'
import Dep, { pushTarget, popTarget } from './dep'

import type { SimpleSet } from '../util/index'

let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  vm: Component;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    ...
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      ...
    }
    this.value = this.lazy ? undefined : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }
      
  /**
   * Add a dependency to this directive.
   */
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }
}

```

Watcher的构造函数中，主要干了三件事：

1. 将组件与Watcher实例建立关联（`this.vm = vm`）
2. 初始化`deps`、`depIds`、`newDeps`、`newDepIds`等属性，这些属性用来存储依赖关系和依赖关系ID，是Watcher管理的关键数据
3. 初始化getter函数并调用`get`，在`get`内部调用getter进行依赖收集。

其中第三步最为注意在这里这个`getter`就是mount阶段传入的`updateComponent`，也就是视图初始化和更新的逻辑；在Watcher内部命名为`getter`，意即对于Watcher来说这个只是个依赖收集的过程。

随后调用的`get()`，`get()`中也主要干了三件事：

1. 调用`pushTarget`和对应的`popTarget`，将该Watcher实例压入和弹出Watcher栈

    思考一个问题，在渲染视图时，读取到数据要进行依赖收集逻辑时，怎么能找到当前视图对应的Watcher进行关联？因为读取数据时调用`reactiveGetter`是个浏览器层面的操作，无法通过代码进行干预（比如通过向`reactiveGetter`传参），这里Vue的实现就非常的巧妙（又一次的巧妙）。得益于JS的单线程特性，视图的渲染逻辑是一个一个执行的，也就是说在同一时刻只会有一个视图在渲染，即只会有一个当前活跃视图，也只会有一个活跃Watcher。Vue中构建了一个Watcher栈`targetStack`来维护页面渲染流程中的Watcher，视图渲染时对应的Watcher入栈成为当前活跃Watcher，存放在`Dep`的静态属性`target`中，假如当前视图渲染还未完成，但进入了子组件视图的渲染流程，则子组件视图对应的Watcher入栈；视图完成渲染，对应的Watcher。
    
    再回过头来看`dep.depend()`内部的处理逻辑就能恍然大悟，`dep.depend()`内部的逻辑非常的简单，判断是否有活跃的Watcher，有的话就调用Watcher实例的`addDep`，而`addDep`内部就是进行了依赖的关联，即，在Watcher实例中存储`Dep`实例，在`Dep`实例中存储Watcher实例
    
2. 调用`getter`完成依赖收集逻辑，注意这里用了try/catch了，因为本质上这里调用的是开发者编写的视图渲染逻辑，潜在出错的可能性大大提升，为了维护依赖关系和Watcher栈的正确性，必然要进行容错处理

3. 调用`cleanupDeps`清理旧依赖关系。每一次渲染都可能会导致依赖关系的变动（比如初始化时依赖关系从无到有，比如v-if导致部分数据不再需要被依赖）。这也是为什么会有`deps`、`depIds`、`newDeps`、`newDepIds`等新旧两套数据

由于视图渲染的逻辑实际是在Watcher的构造函数中被调用的，因此Watcher实例的初始化结束之后，视图的渲染也就基本完成了

### Notify派发更新

在响应式数据和依赖收集完毕的基础上，就可以在数据更新时，通知相应的Watcher实例进而触发视图更新

#### reactiveSetter

```js
set: function reactiveSetter (newVal) {
    const value = getter ? getter.call(obj) : val
    /* eslint-disable no-self-compare */
    if (newVal === value || (newVal !== newVal && value !== value)) {
        return
    }
    /* eslint-enable no-self-compare */
    if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
    }
    // #7981: for accessor properties without setter
    if (getter && !setter) return
    if (setter) {
        setter.call(obj, newVal)
    } else {
        val = newVal
    }
    childOb = !shallow && observe(newVal)
    dep.notify()
}
```

数据的更新直接会触发相应属性的`reactiveSetter`函数，`reactiveSetter`函数主要做了四件事：

1. 获得旧值，判断新旧值是否完全一致。个人感觉这算是一种优化，通常肯定是数据产生变化，才会进行数据更新，基本都是误操作才会导致赋值相同的情况。另外注意`newVal !== newVal && value !== value`，实际是对`NaN`的特殊判断
2. 处理有`getter`却没有`setter`的极端情况，即指定了当前属性是只读的，数据只读不能更新自然不能触发视图重渲染，直接返回即可
3. 设置新值，有`setter`的调用`setter`设置，没有的直接赋值即可
4. 派发更新，最核心的步骤，调用`dep.notify()`触发更新

下面我们看看中做了什么

```js
notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
        // subs aren't sorted in scheduler if not running async
        // we need to sort them now to make sure they fire in correct
        // order
        subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
        subs[i].update()
    }
}
```

核心就一句，`subs[i].update()`，之前我们提到`subs`就是订阅者列表，也就是依赖该数据的视图对应的Watcher实例列表，所以这里实际就是遍历每一个依赖的Watcher实例，调用其`update()`函数

```js
/**
* Subscriber interface.
* Will be called when a dependency changes.
*/
update () {
    /* istanbul ignore else */
    if (this.lazy) {
        this.dirty = true
    } else if (this.sync) {
        this.run()
    } else {
        queueWatcher(this)
    }
}
```

或延迟执行，或同步执行，这两种情况都不是普遍情况，最核心的还是`queueWatcher`，要需要更新的Watcher实例推入异步任务队列进行更新

#### 异步更新队列

Vue在更新视图时是异步执行的。需要更新的Watcher实例会被推入到队列中，如果同一个 watcher 被多次通知（notify），只会被推入到队列中一次。在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的，而且本质上视图重渲染会渲染所有数据，即便watcher被多次触发的数据是不同的，只将Watcher实例推入队列一次在逻辑上也没有问题。

 然后，在下一个的事件循环中，Vue 刷新队列并执行实际渲染工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替

```js
const queue: Array<Watcher> = [] // 异步更新

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue()
        return
      }
      nextTick(flushSchedulerQueue)
    }
  }
}
```

`queueWatcher`的具体逻辑如下

- 通过`has`判断watcher是否已经被推入到队列中了
- 通过`flushing`判断是否队列是否正在进行派发更新，如果没有，则直接推入队列即可，如果正在派发，则按照顺序插入对应位置
- 通过`waiting`判断派发更新是否已经进入浏览器的异步事件循环中，如果没有，则进入，毕竟已经有更新需要开始派发了。通过`nextTick`将派发逻辑推送到异步任务中，也就是`flushSchedulerQueue`，下面看看`flushSchedulerQueue`做了些什么

```js
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true
  let watcher, id

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort((a, b) => a.id - b.id)

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()
    }
    id = watcher.id
    has[id] = null
    watcher.run()
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? `in watcher with expression "${watcher.expression}"`
              : `in a component render function.`
          ),
          watcher.vm
        )
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  resetSchedulerState()

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue)
  callUpdatedHooks(updatedQueue)

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush')
  }
}
```

首先对`queue`进行了排序，这个排序极为重要，排序主要有三个目的

- 组件的更新由父到子；因为父组件的创建过程是先于子的，所以 watcher 的创建也是先父后子，执行顺序也应该保持先父后子。
- 用户的自定义 watcher 要优先于渲染 watcher 执行；因为用户自定义 watcher 是在渲染 watcher 之前创建的。
- 如果一个组件在父组件的 watcher 执行期间被销毁，那么它对应的 watcher 执行都可以被跳过，所以父组件的 watcher 应该先执行。

```js
/**
* Scheduler job interface.
* Will be called by the scheduler.
* 由scheduler调度器调用，实际去触发依赖收集的执行
*/
run () {
    if (this.active) {
        const value = this.get()
        if (
            value !== this.value ||
            // Deep watchers and watchers on Object/Arrays should fire even
            // when the value is the same, because the value may
            // have mutated.
            isObject(value) ||
            this.deep
        ) {
            // set new value
            const oldValue = this.value
            this.value = value
            if (this.user) {
                try {
                    this.cb.call(this.vm, value, oldValue)
                } catch (e) {
                    handleError(e, this.vm, `callback for watcher "${this.expression}"`)
                }
            } else {
                this.cb.call(this.vm, value, oldValue)
            }
        }
    }
}
```

排序之后执行`watcher.run()`，`watcher.run()`首先会执行`get()`，也就是说跟初始化时执行了相同的逻辑，触发视图更新。之后根据一定的判断规则，执行相应的回调函数`cb`。

至此，数据的更新派发也通知到了各个组件，对应的视图需要进行相应的更新渲染，重新依赖收集，准备着下一次的更新渲染

## 原理总结

通过上述的代码及原理分析，可以看到为了实现监听数据动态变化来进行对应的视图渲染及其他操作，Vue为每一个数据对象及对象属性都闭包了一个Dep实例用于管理数据与视图的一对多依赖关系，为每一个组件都创建了一个Watcher实例作为订阅者订阅所有依赖的数据。渲染时通过数据中的`reactiveGetter`属性方法来收集依赖，数据更新时通过其`reactiveSetter`属性方法来通知到对应的Watcher实例去做相应的更新操作或执行某个回调函数，从而实现整个数据响应式的完整闭环逻辑，厉害！
