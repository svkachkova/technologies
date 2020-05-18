## Assert

- `assert.typeOf(foo, 'string')`
- `assert.typeOf(foo, 'string', 'foo is a string')`
- `assert.equal(foo, 'bar', 'foo equal "bar"');`
- `assert.lengthOf(foo, 3, 'foos value has a length of 3')`
- `assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea')`

## Expect

- `expect(foo).to.be.a('string')`
- `expect(foo).to.equal('bar')`
- `expect(foo).to.have.lengthOf(3)`
- `expect(beverages).to.have.property('tea').with.lengthOf(3)`

## Should 

- `foo.should.be.a('string')`
- `foo.should.equal('bar')`
- `foo.should.have.lengthOf(3)`
- `beverages.should.have.property('tea').with.lengthOf(3)`


# Expect and Should

Цепочки для улучшения читаемости: `to`, `be`, `been`, `is`, `that`, `which`, `and`, `has`, `have`, `with`, `at`, `of`, `same`, `but`, `does`, `still`.

- `.not` - не
- `.empty`- пустой
- `.equal(val[, msg])` - строгое равенство
- `.within(start, finish[, msg])` - в пределах
- `.instanceof(constructor[, msg]`
- `.property(name[, val[, msg]])` - есть свойство
- `.lengthOf(n[, msg])` - длина
- `.match(re[, msg])` - соответствует регулярному выражению
- `.string(str[, msg])` - содержит строку

# Assert

- `.fail([message])` бросит неудачу
- `.isOk(object, [message])` true
- `.isNotOk(object, [message])` false
- `.equal(actual, expected, [message])` ==
- `.notEqual(actual, expected, [message])` !=
- `.strictEqual(actual, expected, [message])` ===
- `.notStrictEqual(actual, expected, [message])` !==
- `.isAbove(valueToCheck, valueToBeAbove, [message])` > 
- `.isAtLeast(valueToCheck, valueToBeAtLeast, [message])` >=
- `.isBelow(valueToCheck, valueToBeBelow, [message])` <
- `.isAtMost(valueToCheck, valueToBeAtMost, [message])` <=
- `.isTrue/isNotTrue/isFalse/isNotFalse(value, [message])`
- `.isNull/isNaN/exists/isUndefined`
- `.isFunction/isObject/isArray/isString/isNumber/isBoolean`
- `.typeOf/instanceOf`
- `.include(haystack, needle, [message])` включает
- `.match(value, regexp, [message])`
- `.property(object, property, [message])`
- `.lengthOf(object, length, [message])`
