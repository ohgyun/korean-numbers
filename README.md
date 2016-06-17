This is a javascript utility that parse "Korean Numbers"(like 백이십삼만) to a numeric value.

## Installation

You can install via npm:
```
$ npm install korean-numbers
```

or download [korean-numbers.js](https://raw.githubusercontent.com/ohgyun/korean-numbers/master/korean-numbers.js) directly.

korean-numbers.js is available in CommonJS and AMD module formats.


## Usage

Loading:
```
// In CommonJS module
var koreanNumbers = require('korean-numbers');

// In AMD module
require([
    'koreanNumbers'
], function (koreanNumbers) {
    ...
});
```

Parsing:
```
// Parse korean numbers
koreanNumbers.parse('백이십삼만'); //-> 1230000
koreanNumbers.parse('123만'); //-> 1230000

// Parse korean money
koreanNumbers.parseMoney('백이십삼만원'); //-> 1230000
koreanNumbers.parseMoney('123만원'); //-> 1230000
```


## Test

```
$ npm test
```


## License

korean-numbers.js is freely distributable under the terms of the [MIT license](https://github.com/ohgyun/korean-numbers/blob/master/LICENSE).