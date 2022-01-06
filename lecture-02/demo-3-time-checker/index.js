
async function checktime(){
    let results = await fetch("/api/getTime")
    let resultText = await results.text();
    document.getElementById("results").innerHTML = resultText
}