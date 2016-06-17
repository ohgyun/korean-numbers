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

    var numberCountMap = {
        '하나': 1,
        '둘': 2,
        '셋': 3,
        '넷': 4,
        '다섯': 5,
        '여섯': 6,
        '일곱': 7,
        '여덟': 8,
        '아홉': 9,
        '열': 10,
        '열하나': 11,
        '열둘': 12,
        '열셋': 13,
        '열넷': 14,
        '열다섯': 15,
        '열여섯': 16,
        '열일곱': 17,
        '열여덟': 18,
        '열아홉': 19,
        '스물': 20,
        '일': 1,
        '이': 2,
        '삼': 3,
        '사': 4,
        '오': 5,
        '육': 6,
        '칠': 7,
        '팔': 8,
        '구': 9,
        '십': 10,
        '십일': 11,
        '십이': 12,
        '십삼': 13,
        '십사': 14,
        '십오': 15,
        '십육': 16,
        '십칠': 17,
        '십팔': 18,
        '십구': 19,
        '이십': 20,
        '한명': 1,
        '두명': 2,
        '세명': 3,
        '네명': 4,
        '다섯명': 5,
        '여섯명': 6,
        '일곱명': 7,
        '여덟명': 8,
        '아홉명': 9,
        '열명': 10,
        '열한명': 11,
        '열두명': 12,
        '열세명': 13,
        '열네명': 14,
        '열다섯명': 15,
        '열여섯명': 16,
        '열일곱명': 17,
        '열여덟명': 18,
        '열아홉명': 19,
        '스무명': 20
    };

    var MONEY_SUFFIX = '원';
    var rNumber = /^[0-9]$/;
    var rKoreanNumbers = /^[일이삼사오육칠팔구십백천만억0-9]+$/;

    function ensureText(text) {
        text = text || '';
        return text.replace(/(^\s+|\s+$)/g, '');
    }

    function parse(text) {
        text = ensureText(text);

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

    function parseCount(text) {
        text = ensureText(text);

        if (typeof numberCountMap[text] != 'undefined') {
            return numberCountMap[text];
        }

        return 0;
    }

    function parseMoney(text) {
        text = ensureText(text);

        if (text.indexOf(MONEY_SUFFIX) === text.length - 1) {
            text = text.substring(0, text.length - 1);
        }
        return parse(text);
    }
        
    var koreanNumbers = {
        parse: parse,
        parseMoney: parseMoney,
        parseCount: parseCount
    };

    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = koreanNumbers;
        }
        exports.koreanNumbers = koreanNumbers;
    }

    if (typeof define == 'function' && define.amd) {
        define('koreanNumbers', [], function() {
            return koreanNumbers;
        });
    }
}());