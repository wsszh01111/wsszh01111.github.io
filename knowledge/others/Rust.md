# Rust

Rust是一门静态编译语言，具有内存安全的特性，且拥有更好的并发性能

## 变量

- 变量使用`let`定义，默认不可变；使用`mut`标识为可变

  ```rust
  let test = 1;
  test = 2; // cannot assign twice to immutable variable
  
  let mut test2 = 1;
  test2 = 2 // ok
  ```

- 常量使用`const`定义，需要注明类型，只能被常量表达式赋值（所谓常量表达式应该就是指表达式中只有字面量或常量的表达式）

  ```rust
  const test = 1; // missing type for `const` item
  
  let test2 = 1;
  const test3 = test2 + 1; // attempt to use a non-constant value in a constant
  
  const test4: i32 = 123; // ok
  ```
  
- shadowing，变量可同名，新声明的变量将会遮盖（shadow）原有同名变量

## 数据类型

由于Rust是静态语言，在编译时需要知晓变量类型，其编译器在很多情况下能够推断出变量类型，但有些情况下变量类型会有多义性，需要主动声明

### 标量类型

#### 整数

- 整数类型有有符号整数i8/i16/i32/i64/i128，无符号整数

### 复合类型

#### Tuple

`Tuple`元组是长度固定且可以承载任意类型的集合，可以使用解构读取元组中的值，也可以使用点标记法读取Tuple中的元素

```rust
let test = (1, '2', 23.11); // 编译器推断Tuple中每个值的类型
let test2: (i32, char, f64) = (1, '2', 23.11); // 显式声明元组元素类型

let (x, y, z) = test2; // 解构

println!('{}', test2.1)
```

#### Array

`Array`数组是长度固定且必须类型一致的集合，其数据存放在栈内存上，使用索引进行访问；与其类似的有`Vector`，`Vector`由标准库提供，更加灵活

```rust
let test = [1, 2, 3, 4]; // 编译器推断Array中每个值的类型
let test2: [i32, 4] = [1, 2, 3, 4]; // 显式声明

let test3 = [1; 4]; // 批量初始化Array相同值

println!('{}', test3[1])
```

## 函数



## 控制流

### if表达式

Rust中的if与其他语言有一些差异

1. Rust的if表达式中，跟判断逻辑相关的表达式返回的必须是Boolean类型的值，不像其他语言会对判断逻辑做隐式转换
2. Rust中的if表达式，if后面跟着的判断逻辑不需要小括号包裹
3. Rust中的if是个表达式，因此其可以出现在赋值语句的右边

```rust
let test = 1;
let if_result = if test > 1 { 5 } else { 6 }

println!('{}', if_result);
```

### loop表达式

loop表达式在执行到`break`时才会停止，其也是表达式因此也可以作为表达式放在赋值语句右侧使用；`break`后的值也会作为loop表达式的值返回

```rust
let count = 1;
let loop_result = loop {
    let count = count + 1; // shadowing
    if count == 10 {
      break count * 2;
    }
};
println!('{}', loop_result);
```

### while

```rust
let mut number = 3;
while number > 0 {
    number = number - 1;
}
println!('{}', number);
```

### for

遍历集合元素

```rust
let array = [i32; 5];

for element in array.iter() {
    println!("{}", element);
}
```

#### range

由标准库提供的范围生成器，还提供了`rev()`对范围进行反转

```rust
for number in (1..4).rev() {
    println!("{}", number)
}
```

# 4.1所有权

Rust的核心特性，Rust推出的第三种管理内存的方式

> 其余两种管理内存的方式
>
> 1. GC垃圾回收，程序运行的同时回收不再使用的内存
> 2. 程序员显式的分配和释放内存

Rust中的内存是通过所有权系统进行管理，所有权系统中还包含了一组编译器在编译时会进行检查的规则（也就意味着没有运行时开销）

## Stack Memory/Heap Memory

在栈内存上进行压栈/出栈操作，且数据必须具有已知大小；堆内存的组织性差一些，在堆内存上进行数据**分配**，操作系统会分配一块内存区域并返回地址。本质上是两种不同的管理内存的方式，读取和存储操作在栈内存上更快，堆内存的扩展性更强。实际运行时，调用函数，值被传递给函数（包括指向堆内存位置的指针）。函数本地声明的变量被压入栈内存，在函数结束时弹出栈

## 所有权解决的问题

管理Heap Memory中的数据

1. 追踪代码的哪些部分正在使用Heap Memory
2. 最小化Heap Memory上的数据重复
3. 清理Heap Memory上的无用数据

## 所有权规则

- 每个值都对应一个变量，该变量是该值的所有者
- 每个值同时只能有一个所有者
- 当变量（所有者）超出作用域时，该值将会被删除（从Stack Memory中弹出/从Heap Memory中清理掉），内存将会释放（drop函数）

## 变量与数据交互的两种方式

> String类型是在堆上分配内存的类型

```rust
let test = "asdf"; // 字符串字面量 赋值后字符串内容就不可变
let mut test2 = String::from(test); // 创建String类型
test2.push_str("asdf"); // 为什么push_str要求test2是mut的
```

> 为什么String可以修改而字符串字面值不行？
>
> 字符串字面值在编译时已知，会被硬编码到可执行文件中，运行时会压入栈内存，因为其不可变性而变得快速高效；String需要在Heap Memory上分配编译时未知的可变字符串内容

### move

在栈内存中复制，在Heap Memory中的数据只有同一份，基本行为类似于浅拷贝

```rust
let test = 1;
let test2 = test; // 在Stack Memory上进行的数据复制

let test3 = String::from("rust");
let test4 = test3; // 栈内存上的len/capacity/ptr指针会进行复制 ptr指向的Heap Memory上的实际字符串数据是同一份

println!(test3); // borrow of moved value: `test3` 从字面上理解 这里就是说test3已经移动了 在移动后不可以再使用（借用？）
```

但又与常见的有所不同，在引用传递时，Rust为了让保证内存安全，避免**double free bug**重复释放相同的内存（上述test3和test4引用的Heap Memory上的字符串内容是同一块内存），会让上述test3失效，**从字面上理解，就是将test3变量对值的所有权移动（move）到了test4的位置**

### copy

会把Heap Memory上的数据也进行拷贝，也就是深拷贝

```rust
let test = String::from("rust");
let test2 = test.clone();

println!("{}", test); //ok bacause test2 is cloned from test
```

### copy trait/drop trait

copy trait可以用于像是整数等直接可以放到栈内存的类型，如果一个类型实现了copy trait，则在赋值新变量后旧变量依然可以操作（即在赋值新变量时是copy操作深拷贝，而不是move操作浅拷贝）

copy trait和drop trait互斥，一个类型或该类型的一部分实现了drop trait，则不能再实现copy trait

### 具有copy trait的类型

- 简单标量类型，整数、bool、char、所有元素均可copy的元组（像(i32, String)则不是）

## 所有权与函数

**语义上将参数传递给函数或函数将值返回，和变量赋值一样，均会有move或copy操作，在所有权的体系下来讲，是变量对于值的所有权的转移**

> 一个变量的所有权遵循相同的模式
>
> - 把值赋值给其他变量时所有权就会发生变动
> - 如果变量对Heap Memory上的数据有所有权，当变量离开作用域，则数据会被drop函数清理

# 4.2引用和借用

引用的意思是允许使用某些值但不取得其所有权，引用用`&`表示；引用的值不会在引用超出其作用域时被清除，因为引用并没有其所引用值的所有权

把引用作为函数参数的形式被称为**借用**

## 可变引用

默认情况下引用不可变，需要使用`mut`关键字使其可变

```rust
fn main() {
    let mut s1 = String::from("hello");
    let len = ccc(&mut s1);
}

fn ccc(s: &mut String) -> usize {
    s.push_str(", world");
    s.len();
}
```

### 可变引用的限制

1. 在特定的作用域范围内，对某一块数据只能有一个可变的引用。这样可以在编译时防止数据竞争

   > 数据竞争：
   >
   > 1. xxx
   > 2. xxx
   > 3. Xxx

   可以通过创建新的作用域，来允许**非同时**的创建多个可变引用

   ```rust
   fn main() {
       let mut s = String::from("hello");
       {
           let s1 = &mut s;
       }
       let s2 = &mut s;
   }
   ```

2. 可以有多个不可变引用，但不可以同时拥有一个可变引用和一个不可变引用，

   ```rust
   fn main() {
       let mut s = String::from("hello");
       let r1 = &s;
       let r2 = &s;
       let r3 = &mut s; // wrong
   }
   ```

## Dangling References（悬空引用）

> Dangling References：一个指针引用了内存中的某个地址，而这个地址已经被释放并分配给其他人了

在Rust中编译器能够保证引用**永远都不是悬空引用**，如果引用了某些数据，编译器将保证在引用离开作用域之前数据不会离开作用域

```rust
fn dangle() -> &String { // missing lifetime specifier
    let s = String::from("hello");
  	&s
}
```

## 引用的作用域

一个引用的作用域从声明的地方开始一直持续到最后一次使用为止

## 引用总结

1. 在特定作用域内（即最早被定义的作用域），引用只能满足下列条件之一
   1. 一个可变引用
   2. 多个不可变引用

2. 引用必须一直有效（防止悬空引用）
3. 引用的作用域在其声明到最后一次使用截止

# 4.3Slice（切片）

Slice是Rust中另外一种不持有所有权的数据类型（也可以理解是是另一种创建引用的方式？）

## 字符串切片

指向字符串中一部分内容的引用

```rust
let s = String::from("Hello World");

let hello = &s[0..5]; // [起始索引, 终止索引)
// let hello = &s[..5];
let world = &s[6..11];
// let world = &s[6..];
let whole = &s[..]
```

### 字符串切片能解决的一个问题

字符串长度、位置等信息跟字符串绑定，随时变化

## 字符串字面值实际也是切片

### 在设计函数参数时使用字符串切片作为参数类型更合适

## 其他类型的切片

```rust
let a = [1,2,3];
let slice = &a[1..3]
```

# 5struct

结构体

```rust
struct User {
    username: String,
    email: String,
    sign_count: u64,
    active: bool,
}

let mut user1 = User { // mutable则所有字段均mutable
    username: String::from("asdf"),
    email: String::from("asdf"),
    sign_count: 123,
    active: false,
}
```

简写语法

```rust
fn test(email: String) -> User {
    User {
        username: String::from("asdf"),
        email,
        sign_count: 123,
        active: false,
    }
}
```

更新语法

# 6枚举

 枚举中的值被称为枚举中的变体

```rust
enum IP_TYPE {
    IPV4,
  	IPV6,
}
let a = IP_TYPE::IPV4;

struct T {
    type: IP_TYPE
}

enum IP_TYPE {
    IPV4(u8, u8, u8, u8), // 附加类型数据
  	IPV6(String),
}

T {
    type: IP_TYPE::IPV4(127, 0, 0, 0),
}
```

和`stuct`类型，可以使用`impl`为枚举定义方法

```rust
impl IP_TYPE {
    fn test_enum_method(&self) {
        
    }
}

let a = IP_TYPE::IPV4(123,0,0,0);
a.test_enum_method()
```

## Option

> Rust中没有null

Null意味着因为某种原因无效或缺失的值，由于Rust中没有Null，因此类似于Null功能的`Option<T>`

```rust
// Option在预导入模块中的定义
enum Option<T> {
    Some(T),
    None,
}

let num = Some(56);
let string = Some("asdf");

let nothing: Option<i32> = None;
```

使用`Option<T>`比直接使用`Null`的好处：Option\<T\>和T不是同一个类型，若想使用Option\<T\>中的T，则需要将Option\<T\>转化为T，即T一定有值，只有Option\<T\>才有可能为空

## match

强大的控制流表达式`match`，其将一个值与一系列模式进行匹配，并执行匹配的模式相对应的代码

```rust
enum Coin {
    a,
    b,
  	c,
}

fn test(coin: Coin) -> u8 {
    match coin {
        Coin::a => 1,
      	Coin::c => {
            println!("asdf")
        }
        Coin::b => 3,
    }
}
```

绑定值的模式

```rust
enum Coin {
    a,
    b,
  	c(u32),
}

fn test(coin: Coin) -> u8 {
    match coin {
        Coin::a => 1,
      	Coin::c(value) => {
            println!("asdf, {}", value)
        }
        Coin::b => 3,
    }
}
```

匹配`Option<T>`

```rust
fn match_option(x: Option<u32>) -> Option<u32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}
```

match匹配必须穷举所有可能，但也可以使用_替代其他情况

```rust
match coin {
    Coin::a => 1,
    Coin::c(value) => {
      println!("asdf, {}", value)
    }
    _ => 3,
}
```

## if let

简单的控制流，只关心一种匹配；但同时也放弃了穷举的可能性

```rust
if let Some(3) = v {
     println!("hhhh")
}
```

搭配else

```rust
if let Some(3) = v {
     println!("hhhh")
} else {
     println!("not hhhh")
}
```

# 7.1Package、Crate、Module

## Package

- 包含一个Cargo.toml，其描述了如何构建这些Crate
- 只能包含0-1个*library crate*
- 可以包含0-1个*binary crate*

## Crate

Crate有*binary*和*library*两种类型

### Crate Root

Crate Root是一个源代码文件，是组成Crate的根Module，编译器从此文件开始编译

### Crate惯例

- src/main.rs是*binary crate*的*crate root*
- src/lib.rs是*library crate*的*crate root*
- src/main.rs所代表的*binary crate*和src/lib.rs所代表*library crate*的名均与*package*名相同
- src/bin下的每个文件都是一个独立的*library crate*

## Module

在*Crate*中将代码进行分组，使用`mod`关键字定义且可嵌套，其内可包含其他（`struct`、`enum`、常量、`trait`、`fn`等）定义

src/main.rs和src/lib.rs作为整个*crate root*隐式生成了名为crate的模块，作为*crate*内部整个模块树的根模块

# 7.2路径

为了在Rust的模块中找到条目（Item，即`fn`、`struct`、`enum`、`mod`、`const`等等），需要使用路径

两种形式：

1. 绝对：从*crate root*开始使用*crate*名或字面量*crate*
2. 相对：从当前模块开始使用`self`、`super`或当前模块的标识符

路径至少由一个标识符组成，标识符之间使用`::`连接

### privacy boundary（私有边界）

模块不仅可以组织代码，还能定义*privacy boundary*；Rust中的条目（Item，即`fn`、`struct`、`enum`、`mod`、`const`等等）默认是私有的

父级模块无法访问子模块中的私有条目，但子模块中可以使用所有祖先模块的条目

### pub关键字

`pub`将条目变成公有的

根级的模块不论私有公有都可相互调用

```rust
mod test1() {
    pub fn test() {}
}
pub fn test2() {
    test1::test()
}
```

### super关键字

```rust
fn test() {}

mod test2 {
    fn test3() {
        super::test();
    }
}
```

### pub struct

公共结构体，但字段默认是私有，同样是使用`pub`关键字将其变成公有

```rust
// todo restaurant
```

### pub enum

公共枚举且其所有变体也是公共的

# 7.3use

使用`use`将条目引入到当前作用域内，其仍然遵守私有性原则

在使用`use`引入函数时，将函数的父级模块引入作用域；引入`struct`、`enum`等指定完整路径

## as

`as`为引入的条目指定本地的别名

## pub use

`use`导入之后，对外部作用域来说，导入的条目依然是私有的不可见；`pub use`重新导出名称

```rust
pub use crate::front_of_house::hosting; // 这里的crate是跟crate同名的根模块
```

## 使用外部Package

1. Cargo.toml添加依赖包
2. 使用`use`引入特定作用域

标准库std也被作为外部Package，但不需要在Cargo.toml中定义

### 使用嵌套路径清理在引入相同包时导致的大量use语句

```rust
use std::{cmp::Ordering, io};

// use std::io;
// use std::io:Write;
use std::io::{self, Write};

use std::io::*;
```

# 7.4将模块拆分到其他文件

Rust会从模块同名文件加载内容

```rust
mod test; // src/test.rs
```

# 8.1Vector

Vec\<T\>，由标准库提供的存储多个相同类型的值的类型；使用`vec!`宏在创建的同时声明初始值

# 10.5-10.8生命周期

生命周期是引用有效的作用域，每个引用都有自己的生命周期；大多数情况下生命周期是隐式可推断的，少数情况下需要手动标注生命周期

生命周期存在主要是为了防止悬空引用

> Rust：借用检查器通过比较作用域来判断所有借用是否合法

## 生命周期标注

- 生命周期的标注不会改变引用的生命周期长度
- 当指定了生命周期参数，函数可以接收带有任何生命周期的引用
- 生命周期的标注：描述了多个引用的生命周期间的关系，但不影响生命周期

```rust
&i32 // 引用
&'a i32 // 带有显式生命周期的引用
&'a mut i32 // 带有显式生命周期的可变引用

fn test<'a>(x: &'a str, y: &'a str) -> &'a str { // 泛型生命周期
    // 泛型生命周期的意思是x、y、返回值都要有相同的生命周期，'a的生命周期是x、y生命周期的交集
}
```

本质上，生命周期标注就是手动对引用作用域进行约束，最大保证安全原则

是否指定生命周期参数依赖于函数所做的事情

# 15.3Drop trait

实现Drop trait以自定义值离开作用域时的行为

## std::mem:drop

使用`std::mem:drop`提前drop值



# 个人总结

## good reference

https://www.jianshu.com/p/707385771ad1

https://zhuanlan.zhihu.com/p/109285917

## good example

1. 为啥不行

   https://learnku.com/rust/t/48233

   ```rust
   let mut s1 = String::from("hello");
   let s2 = &mut s1;
   println!("{} ", s1);
   println!("{} ", s2);
   
   fn bar(x: &mut i32) {}
   fn foo(a: &mut i32) {
       let y = &a; // a is borrowed as immutable.
       bar(a); // error: cannot borrow `*a` as mutable because `a` is also borrowed
               //        as immutable
       println!("{}", y);
   }
   ```

   ```rust
   let mut origin = 1234;
   let aa: &u16 = &mut origin;
   println!("{}", origin);
   println!("{} ", aa)
   ```

2. 为啥不行

   ```rust
   let origin = 1234;
   
   let mut aa: &u16 = &mut origin;
   ```


## 堆栈

堆栈都是程序运行时可供使用的内存，对应不同的数据管理方式；栈是先进先出且数据大小已知，堆是随机分配一块足够大的空间

## 变量和值交互的两种范式

### move

### clone

## 引用

引用规则

1. 同一时间，给定作用域内只能有一个可变引用（防止出现数据竞争data race）/一个或多个不可变引用
2. 引用必须总是有效的（防止出现悬空引用[Dangling References](https://kaisery.github.io/trpl-zh-cn/ch04-02-references-and-borrowing.html#悬垂引用dangling-references)）

不可变引用实现了`copy trait`，因此赋值时是copy行为，可变引用没有实现`copy trait`，因此赋值时是move行为

slice切片是引用集合中的一段连续元素，是一种特殊引用，是没有所有权的数据类型

## 所有权

1. 任意时刻值有且只有一个owner（变量）
2. owner离开作用域，则值将会被销毁（drop）

