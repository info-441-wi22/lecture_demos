//function that takes time before resolving
function resolveAfterNSeconds(n){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("timer finished after " + n + " seconds")
        }, 1000 *n);
    });
}


async function testAwait(){
    console.log("start of testAwait function");
    var result = await resolveAfterNSeconds(3);
    console.log("result of testAwait was: " + result);
    var result2 = await resolveAfterNSeconds(3);
    console.log("another result of testAwait was: " + result);
}

testAwait();

async function test2() {
    console.log("start of test2 function");
    var result = await resolveAfterNSeconds(5);
    console.log("result of test2 was: " + result);
}

test2();

