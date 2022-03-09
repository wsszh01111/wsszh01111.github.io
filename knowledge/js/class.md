# class

CLASS是ES6中提出的基于原型继承的对象构造语法糖，但以往好像没有总结过，在此总结下

## 类声明

### 特点

- 构造函数是可选的
- 类声明体中的代码在严格模式下运行

### 限制

- 同一类声明在相关的作用域下不能被多次声明
- 类声明在其作用域下不会被提升，因此要在声明之后访问该类
- `super()`只能在构造函数中调用，且必须在调用`this`之前被调用

## 类表达式

类表达式和类声明基本一致，但取决于类表达式所赋值变量的不同声明（var/let/const），类表达式是有可能被变量提升的（var），其实本质上还是变量提升导致的

##语法

### 构造函数

构造函数不是必须的，默认会有空的构造函数

```javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

构造函数默认会返回当前创建的对象实例（this），也可以返回一个其他的值以改变该构造函数的行为

类名所指向的函数实际上就是构造函数

```js
class Point {
}
const p = new Point()

typeof Point === 'function' // true
p.__proto__.constructor === Point // true
```

### new调用

虽然实际上类名所指向变量依然是个函数（该函数就是ES5中原型函数的封装），但该函数依然只能使用`new`操作符调用，不能跟普通函数一样直接调用

### 静态函数

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就是静态函数；核心来说就是具有`static`关键字的类不会被加入到实例的原型对象上，会直接挂在构造函数上

### new.target 属性

`new`是从构造函数生成实例对象的命令。ES6 为`new`命令引入了一个`new.target`属性，该属性一般用在构造函数之中，返回`new`命令作用于的那个构造函数。如果构造函数不是通过`new`命令或`Reflect.construct()`调用的，`new.target`会返回`undefined`，因此这个属性可以用来确定函数是怎么调用的。

```js
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}
```

实际上类的构造函数在解释器在执行层面已经做了检测，即类不能作为普通函数调用，只能通过`new`操作符调用；因此`new.target`的更大的实际意义是应对一般函数，既可以作为普通函数调用，也可以作为构造函数调用

> new.target不能用在函数外部

##继承

之所以说`class`是语法糖，是因为其并没有改变JS语言仅能基于原型实现继承的本质，只是在语法上更接近传统认识里的类编写方式，但最终还是会以原型的方式进行执行，

### extends

`class`可以通过`extends`关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。虽然是很大的进步，但是依然只有类的继承而没有`interface`的实现，`interface`的实现只有在typescript中支持了

### super指向父类

super关键字指向了父类的构造函数，用来构造父类的对象实例

子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到`this`对象。

ES5 的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（`Parent.apply(this)`）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到`this`上面（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。

所以其实现继承的核心原理还是所谓的寄生构造+原型的方式，再一次证明了`class`是个语法糖并没有改变js底层继承逻辑

> super作为构造函数调用只能放在constructor中

### super作为对象

`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```javascript
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
```

上面代码中，子类`B`当中的`super.p()`，就是将`super`当作一个对象使用。这时，`super`在普通方法之中，指向`A.prototype`，所以`super.p()`就相当于`A.prototype.p()`。注意这里是指向了父类的原型对象，即`Function.prototype`，所以定义在父类实例上的方法或属性，是无法通过`super`调用的。

ES6 规定，在子类普通方法中通过`super`调用父类的方法时，方法内部的`this`指向当前的子类实例。

```javascript
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```

上面代码中，`super.print()`虽然调用的是`A.prototype.print()`，但是`A.prototype.print()`内部的`this`指向子类`B`的实例，导致输出的是`2`，而不是`1`。也就是说，实际上执行的是`super.print.call(this)`。

由于`this`指向子类实例，所以如果通过`super`对某个属性赋值，这时`super`就是`this`，赋值的属性会变成子类实例的属性。

### 继承的默认构造函数

```javascript
// 当子类没有构造函数时 下面的构造函数将会被加入
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

### 子类继承静态函数

父类的静态方法，也会被子类继承。

```javascript
class A {
  static hello() {
    console.log('hello world');
  }
}

class B extends A {
}

B.hello()  // hello world
```

## 参考

1. [class | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/class)
2. [Class 的基本语法 | 阮一峰](https://es6.ruanyifeng.com/#docs/class)