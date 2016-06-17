This is a javascript utility that parse "Korean Numbers"(like 백이십삼만) to a numeric value.

## Installation

You can install via npm:
```
$ npm install korean-numbers
```

or download `korean-numbers.js`.

korean-numbers.js is available in Common JS and AMD module formats.


## Usage

```
var koreanNumbers = require('korean-numbers');

koreanNumbers.parse('백이십삼만'); //-> 1230000
koreanNumbers.parse('123만'); //-> 1230000
```


## License

korean-numbers.js is freely distributable under the terms of the [MIT license](https://github.com/ohgyun/korean-numbers/blob/master/LICENSE).