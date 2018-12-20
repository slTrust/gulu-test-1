### 测试

### BDD 行为驱动开发

behavior driven development

- 用自然语言描述需求

### TDD 测试驱动开发

test driven development

### ASSERT 断言

> 我主观认为的

chrome里的开发者工具里默认有的

```
console.assert(1===1) //什么都不会发生

console.assert(1===2) // 报错 你的断言失败了

意思是 如果值为真什么都不发生，如果是假的，就抛出一个错
```

#### 我们目前暂时使用比较弱的测试库

- [https://www.chaijs.com/](https://www.chaijs.com/)

安装

```
npm install chai
```

> Should 应该
 

```
chai.should();

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
tea.should.have.property('flavors')
  .with.lengthOf(3);
```

> Expect 期望

```
var expect = chai.expect;

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(tea).to.have.property('flavors')
  .with.lengthOf(3);
```

> Assert

```
var assert = chai.assert;

assert.typeOf(foo, 'string');
assert.equal(foo, 'bar');
assert.lengthOf(foo, 3)
assert.property(tea, 'flavors');
assert.lengthOf(tea.flavors, 3);
```