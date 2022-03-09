# Reactive in vue3

## Proxy/Reflect

vue3的响应式是基于Proxy/Reflect实现的，首先来了解下Proxy。

### Proxy

> IE不支持Proxy特性

Proxy可以理解为代理器，提供了拦截对象基本操作的能力，可以修改基本操作的默认行为，如属性查找，赋值，枚举，函数调用等等，功能非常之强大

> 这种操控语言层面的行为，可以称之为元编程

#### 语法

```js
var proxyObj = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver);
    }
});
```

`Proxy`作为构造器，接受两个参数。第一个参数是要代理的对象，代理器代理的就是对该对象的操作，该参数必须是一个对象；通过第二个参数去配置需要代理的操作及拦截操作后进行的处理行为，在上例中就拦截了`get`和`set`操作，然后就单纯打印了数据

通过`Proxy`，vue3可以提供比vue2强大的多的数据监控能力，最直观的感受，vue3不再需要重写一系列的数据函数（push、pop等等），也不再需要`$set`API兼容新增对象属性、直接通过索引操作数组的行为

### Reflect

> Reflect不是一个函数对象，它是不可构造的，跟Math类似，更像是一系列静态函数的挂载对象

Reflect提供了一系列静态函数，和Proxy所能提供的拦截操作一一对应，就像一对孪生兄弟一样；如Proxy可以拦截get操作，Reflect就提供了对应的`Reflect.get`操作。

> Reflect提供的有些函数和Object上挂载的函数行为是基本一致的，但有些会有[某些细微上的差别](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods)

为什么要实现Reflect以挂载拦截行为对应的一系列函数呢？有几个意义：

1. 最大的意义，就是还保留了一份基本操作的默认实现；不管怎么去更改对象的基本操作，依然能从Reflect上获得默认实现
2. 对于跟Object上挂载的相同行为的操作，Reflect的实现进行了细节上的优化
3. 将基础操作都统一为函数操作

## Map/WeakMap

vue3中使用Map和WeakMap用来存储数据和页面的依赖关系，我们首先来看下Map

### Map

实际上，普通的Object对象就是一个键值对的结构，但其键只能是字符串，在一些场景下使用会有一定的局限，因此ES6中推出了Map。Map类似于普通Object对象，但其键不再局限于字符串，任意类型的数据都可以作为键。Map是一种更为完善的Hash结构

如果键是对象，则只有指向同一个对象才会认为命中了这条键值对

Map有**size属性**、**set(key, value)**、**get(key)**、**has(key)**、**delete(key)**、**clear()**等API用于键值对数据的操作；还有keys()、values()、entries()、forEach()用于Map的遍历

Map和数组的转换，只需借助简单的扩展运算符即可实现

```javascript
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
[...myMap] // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

### WeakMap

WeakMap也是一组键值对的集合，跟Map不同的是，其键只能是对象（除了null），不能使用基础数据类型作为键。WeakMap主要是为了避免Map键为对象时存在的内存泄漏问题而存在的。

Map为什么容易造成内存泄漏？这个实际跟Map底层实现有关，Map的底层是通过双数组实现的，一个数组存放键，一个数组存放值；对Map存值时将键数据和值数据插入相同的索引位上，通过相同的索引位置来建立键和值之间的关联。当读取键值时，会遍历存放键的数组进行匹配获取索引位置，在存放值的数组中根据索引位置读取值数据，这种实现方式就会带来两个问题：

1. 读取数据的时间复杂度是O(n)
2. 数组会一直引用着键数据和值数据，即便这些数据已经不再被使用，也无法被垃圾回收，容易造成内存泄漏

而WeakMap的键是对对象的弱（所以叫Weak）引用，这种引用是不在垃圾回收的考虑范围内的，因此有助于避免内存泄漏；也就是键对象没有别的引用的情况下就会被垃圾回收清理，WeakMap中的该条键值对也就不存在了

但也正是由于这种弱引用，WeakMap的键是不可枚举的（即没有`keys`方法读取所有的键），否则读取到的键列表会受到垃圾回收机制的影响从而产生不确定性（个人理解就是用着用着就被垃圾回收删掉了）

因为WeakMap的这种特性，其比较适合键对象可能会在未来消失的情况，比如将DOM元素作为键对象

## Set/WeakSet

跟Map/WeakMap非常相似，还存在Set/WeakSet组合，先看下Set

### Set

Set是一个集合，其中的每个值都唯一

Set有add(value)、delete(value)、has(value)、clear()等API用于数据的操作；还有keys()、values()、entries()、forEach()用于Set的遍历，Set的遍历顺序就是插入顺序，和Map一样

### WeakSet

WeakSet和WeakMap出现的意义非常相似，WeakMap是为了解决Map的内存泄漏问题，而WeakSet是为了解决Set的内存泄漏问题，这也同样意味着WeakSet的成员只能是对象，WeakSet不能被遍历，适合对象可能随时会被垃圾回收的场景

## Vue3的响应式原理

终于到了正题，vue3中的响应式原理本质上和vue2一样，依然是观察者模式的应用，但实际实现上有了比较大的变化，下面会详细描述；vue3中的响应式，有一个非常值的提的点就是做到了最大程度的解耦，响应式模块是一个独立模块，甚至可以在react中进行使用，不再像vue2中跟Watcher（可以理解为页面）有比较强的耦合。包括vue3整体的实现，以及目录结构，都能看出vue3在初期设计的时候，就将解耦作为了比较重要的考量点；这也是vue2项目后期遇到的比较大的问题之一，随着项目增大，耦合不断加深，对于项目的维护、后期新功能的开发、测试等都是个比较大的挑战。

因为本质上一样，因此也可以分为三部分对其进行理解，即将数据变成响应式、依赖收集和派发更新。

> vue3是使用TypeScript写的

### 将数据变为响应式

将数据变成响应式，也就是为数据提供收集相关依赖页面、触发页面更新的能力。vue2中是基于`Object.defineProperty`实现的，vue3中基于`Proxy`，提供了全面的数据变动拦截能力，给人感觉这才是完全体。在数据变为响应式的阶段，通过Proxy的包裹，拦截了读取属性（get）、对属性赋值（set）、删除属性（deleteProperty）、通过in操作符判断某个属性是否存在（has）、获取对象所有属性键数组（ownKeys）五种操作，对不同的操作做了不同的处理。

`reactive`是将数据变成响应式的主入口，实际调用`createReactiveObject`使用`Proxy`对数据代理，之所以还要封装一层`createReactiveObject`，是因为响应式对象是有多种类型的，如下面的`shallowReactive`生成“浅的”响应式数据、`readonly`生成只读的响应式数据，相当于这里对主流程做了一个封装，通过调整参数的方式最终确定生成的响应式数据的类型

区分一下vue3中四种类型的响应式对象

- 普通的响应式对象：会递归将对象中的所有数据变成响应式，监听数据变动触发页面更新
- 浅的（shallowReactive）响应式对象：对监听当前对象的数据变动，但是不会递归处理子对象（该对象的属性也是对象的情况）；这种情况主要是为了性能或是一些特殊场景服务
- 只读（readonly）响应式对象：注意这里的只读不是传统上理解的数据只能读取不能写入，这里的只读是在vue的体系内定义的，意味着这个数据不会被作为依赖收集，比如页面读取到这个值，但数据变动将不会触发页面更新。其实个人感觉，这个类型的意义不是很大（至少现在没有看到很大的价值），如果不能作为依赖收集，那么就失去了用Proxy对对象进行代理的最大的意义；用Proxy代理最主要的目的就是为了提供订阅数据和发布订阅的功能，现在订阅了，但不提供订阅数据的功能，也就是虽然包装了但不是响应式数据，如果是为了性能考虑，那直接不用Proxy包装岂不是性能更好，因此感觉这个设定比较神奇，有待后面更深入全面的了解之后看有没有适用场景。
- 浅只读（shallowReadonly）响应式对象：即上述浅的和只读的结合

```js
// packages/reactivity/src/reactive.ts
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (target && (target as Target)[ReactiveFlags.isReadonly]) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers
  )
}

// Return a reactive-copy of the original object, where only the root level
// properties are reactive, and does NOT unwrap refs nor recursively convert
// returned properties.
export function shallowReactive<T extends object>(target: T): T {
  ...
}

export function readonly<T extends object>(
  target: T
): Readonly<UnwrapNestedRefs<T>> {
  ...
}

// Return a reactive-copy of the original object, where only the root level
// properties are readonly, and does NOT unwrap refs nor recursively convert
// returned properties.
// This is used for creating the props proxy object for stateful components.
export function shallowReadonly<T extends object>(
  target: T
): Readonly<{ [K in keyof T]: UnwrapNestedRefs<T[K]> }> {
  ...
}
```

在`createReactiveObject`主要做了几个事

1. 判断是不是对象，对象才响应式
2. 判断是不是一个`Proxy`实例，如果是直接返回
3. 判断是不是已经是一个响应式数据，即有关联的`Proxy`实例，有则直接返回已有的`Proxy`实例
4. 是属于可变成响应式的对象类型，通过`canObserve`进行判断，只有Object,Array,Map,Set,WeakMap,WeakSet类型可以进行响应式处理
5. `new Proxy`生成代理实例，这个代理实例将成为`createReactiveObject`函数最终的返回结果
6. 通过`def`将对象和它的代理对象相关联

这里有一个比较有意思的点，就是如何判断是不是`Proxy`实例。

`Proxy`实例会对读取操作进行拦截，因此读取到的任何数据都是其代理的数据；也不能使用`instanceof`，因为Proxy还可以代理设置对象原型和读取对象原型的操作，也就意味着获取的原型也是其代理的对象的原型，并且`Proxy`作为一个特殊的构造函数，是没有prototype的，而`instanceof`的原理是判断某个构造函数的原型对象是否在实例的原型链上，`Proxy`既没有原型对象，Proxy实例所获取的实例也是其代理的对象的，因此不能通过`instanceof`判断。vue3中使用了很巧妙的方式，在后面会看到，在拦截读取操作的过程中，会进行一个`ReactiveFlags.raw`值的判断；因为如果是`Proxy`实例，说明已经完成了拦截操作的设置，读取`ReactiveFlags.raw`值时，就会触发读取拦截的逻辑，在读取拦截中对键进行匹配，如果键是`ReactiveFlags.raw`，说明是来判断是否是`Proxy`实例，则一定是`Proxy`实例

```js
// packages/reactivity/src/reactive.ts
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>
) {
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object
  if (target[ReactiveFlags.raw] && !(isReadonly && target[ReactiveFlags.isReactive])) {
    return target
  }
  // target already has corresponding Proxy
  if (hasOwn(target, isReadonly ? ReactiveFlags.readonly : ReactiveFlags.reactive)) {
    return isReadonly ? target[ReactiveFlags.readonly] : target[ReactiveFlags.reactive]
  }
  // only a whitelist of value types can be observed.
  if (!canObserve(target)) {
    return target
  }
  const observed = new Proxy(
    target,
    collectionTypes.has(target.constructor) ? collectionHandlers : baseHandlers
  )
  def(
    target,
    isReadonly ? ReactiveFlags.readonly : ReactiveFlags.reactive,
    observed
  )
  return observed
}
```

下面先来看下get的实现，也就是拦截了数据的读取之后会干些什么；

其中有两个知识点需要提前讲下：

1. 对于`track`的理解，暂时只需要记住是进行依赖收集的入口
2. Ref，Ref是vue3中对于基础数据类型的包装，使得一个基础数据类型也可以支持响应式了。之前vue2要求响应式的一定是对象，直接定义一个值为基础类型的变量，这个变量是无法变成响应式的，但vue3中可以。个人理解，这是因为vue3中引入了Composition API，基于Composition API复用逻辑时一定有监听值为基础类型的变量的需求。vue3中的解决方式就是使用对象将这个基础值进行包裹以支持响应式的能力

具体逻辑如下

1. 第一段的if判断，对一些判断情况做了处理，是不是响应式、是不是只读、以及读取代理对象所代理的对象
2. 对于数组的'includes', 'indexOf', 'lastIndexOf'三个函数做了代理，arrayInstrumentations中装了这三个函数，感觉以后也有可能增加
3. 使用`Reflect.get`读取数据了，这里算是一条分界线，上面的部分可以理解为在框架层面对读这个操作做了处理和过滤，返回的都不是原始值了；下面的部分是拿到了值做后续操作
4. 键是Symbol或\_\_proto\_\_，直接返回
5. 非readonly，调用`track`进行依赖收集
6. shallow的，直接返回了，不进行下面的递归
7. 值是Ref，进行解包返回原始值
8. 递归将子对象变成响应式，这里vue3和vue2也有很大的区别，vue2中是在初始化时就递归完成，将所有数据变成响应式；但vue3中只有读取到时才进行响应式初始化，进一步提升了性能，降低了初始化时的性能损耗。总体上的性能消耗应该是一致的，是减少了初始化阶段或初次渲染阶段没用到的数据响应式转换的成本

```js
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: object, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.isReactive) {
      // 只读的就不是响应式的了
      // 只读不只读都会被Proxy代理 主要区别是是否会执行依赖收集的过程
      return !isReadonly
    } else if (key === ReactiveFlags.isReadonly) {
      return isReadonly
    } else if (
      key === ReactiveFlags.raw &&
      receiver ===
        (isReadonly
          ? (target as any).__v_readonly
          : (target as any).__v_reactive)
    ) {
      return target
    }

    const targetIsArray = isArray(target)
    if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }

    const res = Reflect.get(target, key, receiver)

    if ((isSymbol(key) && builtInSymbols.has(key)) || key === '__proto__') {
      return res
    }

    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }

    if (shallow) {
      return res
    }

    if (isRef(res)) {
      // ref unwrapping, only for Objects, not for Arrays.
      return targetIsArray ? res : res.value
    }

    if (isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}
```

对应的是set实现，由`createSetter`产生，分为shallow和普通的两种Setter

分为以下几个步骤：

1. 读取了旧数据
2. 对非shallow模式下的Ref数据做了特殊处理，如果新数据不是Ref，但旧数据是，则设置后直接返回
3. hasOwn是`Object.prototype.hasOwnProperty`的缩写，用来判断key是不是target自身的对象，如果是则返回true，不管key在其原型链上或是没有改属性，则返回false
4. 调用`Reflect.set`原生设置，`Reflect.set`和`Reflect.get`调用方式还是非常相似的，只是set需要设置值，多了value参数
5. 通过上面调用`hasOwn`的判断，主要目的是为了知晓当前的set到底是属于新增的情况还是修改的情况。为什么要这么做呢？这里考虑一种情况，数组使用push新增一个值，比如[0,1].push(3)，此时set会被调用两次，一次是在索引位2上新增3，一次是将数组的length值设置为3，本质上只是新增了一个值，但却会触发两遍trigger，显然是不合理的。因此这里区分新增和设置，分类型触发trigger

```js
function createSetter(shallow = false) {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    const oldValue = (target as any)[key]
    if (!shallow) {
      value = toRaw(value)
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value
        return true
      }
    } else {
      // in shallow mode, objects are set as-is regardless of reactive or not
    }

    const hadKey = hasOwn(target, key)
    const result = Reflect.set(target, key, value, receiver)
    // don't trigger if target is something up in the prototype chain of original
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) {
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    return result
  }
}
```

#### 小节

总的来说，在将数据响应式化的阶段，使用Proxy对数据进行包装，监听数据的读写等操作；可响应式的数据相比vue2中增加了set/map/weakset/weakmap，对于数据的响应式化也是延迟执行的，只有第一次被读取时才会执行。

## 总结

1. 数据响应式实现底层依赖变成了Proxy/Reflect
2. 更多的使用了ES6数据类型，set、weakmap
3. 数据依赖收集、触发更新有了更加明确的入口，track/trigger，track依赖收集，trigger触发更新
4. 数据对象的依赖关系有统一的存储位置targetMap，vue2中是通过闭包维护每个对象属性的依赖关系

疑惑

1. 是怎么判断proxy实例 又为什么exception: calling readonly() on a reactive object

```js
if (target[ReactiveFlags.raw] && !(isReadonly && target[ReactiveFlags.isReactive])) {
    return target
}
```

2. 为什么'includes', 'indexOf', 'lastIndexOf'
3. 为什么键是Symbol或\_\_proto\_\_直接返回
4. 为什么有ref
5. 为什么ref unwrapping, only for Objects, not for Arrays.
6. 什么情况下会出现receiver和接受参数调用不相同的情况