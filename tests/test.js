var koreanNumbers = require('../korean-numbers');

var _testList = [];
var _testOnlyList = [];
function test(text, result) {
    _testList.push({
       text: text,
       result: result 
    });
}

// If function has 'v' prefix, run only these tests.
function vtest(text, result) {
    _testOnlyList.push({
       text: text,
       result: result
    });
}

function runTests() {
    let runTest = function (text, expected) {
        let result = koreanNumbers.parse(text);
        if (expected !== result) {
            console.error('Failed: %s / Expected:%s / Result :%s', text, expected, result);
            process.exit(1);
        }
    };
    
    if (_testOnlyList.length) {
        _testOnlyList.forEach(function (item) {
            runTest(item.text, item.result);
        });
        return;
    }

    _testList.forEach(function (item) {
        runTest(item.text, item.result);
    });
}

test('백', 100);
test('100', 100);
test('이백', 200);
test('삼백', 300);
test('사백', 400);
test('오백', 500);
test('육백', 600);
test('칠백', 700);
test('팔백', 800);
test('구백', 900);
test('천', 1000);
test('천삼백이십', 1320);
test('이천육백', 2600);
test('팔천팔백삼', 8803);
test('이천삼백', 2300);
test('오천육백', 5600);
test('칠천이백', 7200);
test('팔만', 80000);
test('구만', 90000);
test('십만이천', 102000);
test('십이만삼천', 123000);
test('십구만칠천', 197000);
test('오십이만삼천', 523000);
test('백삼십이만칠천', 1327000);
test('삼백사십만', 3400000);
test('일십팔만', 180000);
test('일십만이백', 100200);
test('십팔억', 1800000000);
test('팔억구천삼백이', 800009302);
test('12만8천', 128000);
test('10만', 100000);
test('14', 14);
test('18천2백', 18200);
test('18천2', 18002);
test('만', 10000);
test('만천', 11000);
test('만백', 10100);
test('만일', 10001);
test('십일', 11);
test('천만일', 10000001);

runTests();