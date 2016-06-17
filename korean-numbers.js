;(function() {
    var numberSmallUnitMap = {
        '일': 1,
        '이': 2,
        '삼': 3,
        '사': 4,
        '오': 5,
        '육': 6,
        '칠': 7,
        '팔': 8,
        '구': 9
    };

    var numberMediumUnitMap = {
        '십': 10,
        '백': 100,
        '천': 1000
    };

    var numberBigUnitMap = {
        '만': 10000,
        '억': 100000000
    };

    var rNumber = /^[0-9]$/;
    var rKoreanNumbers = /^[일이삼사오육칠팔구십백천만억0-9]+$/;

    var koreanNumbers = {
        parse: function(text) {
            if (!rKoreanNumbers.test(text)) {
                return parseInt(text) || 0;
            }

            var total = 0;
            var split = text.split('');
            var numberBuffer = [];

            var getBuffered = function() {
                var buffered = 0;
                var i = 0;
                while (numberBuffer.length) {
                    buffered += (numberBuffer.pop() * Math.pow(10, i++));
                }
                return buffered;
            };

            for (var i = 0; i < split.length; i++) {
                var value = split[i];

                if (numberBigUnitMap[value]) {
                    if (total) {
                        total = (total * numberBigUnitMap[value]) + (getBuffered() * numberBigUnitMap[value]);
                    } else {
                        total = (getBuffered() || 1) * numberBigUnitMap[value];
                    }

                } else if (numberMediumUnitMap[value]) {
                    total += (getBuffered() || 1) * numberMediumUnitMap[value];

                } else {
                    if (rNumber.test(value)) {
                        numberBuffer.push(Number(value));
                    } else {
                        numberBuffer.push(numberSmallUnitMap[value]);
                    }
                }
            }

            total += getBuffered();

            return total;
        }
    };

    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = koreanNumbers;
        }
        exports.koreanNumbers = koreanNumbers;
    } else {
        root.koreanNumbers = koreanNumbers;
    }

    if (typeof define == 'function' && define.amd) {
        define('koreanNumbers', [], function() {
            return koreanNumbers;
        });
    }
}());