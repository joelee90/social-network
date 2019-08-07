// Generator Functions

function *genFunc() {
    console.log('hi');
    const val = yield 5;
    console.log('hi');
    return 10;
}

const iterator = genFunc();

console.log(
    iterator.next()
);

console.log(
    iterator.next('yo')
);


for (const val of 'hi') {
    console.log(val);
}

... on anything that is iterable.
...obj
...arr
...'string'

proxy - 
