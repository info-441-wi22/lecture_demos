
async function pluralizeWord(){
    let word = document.getElementById("wordInput").value

    let results = await fetch("/api/pluralize?word=" + word)
    let resultText = await results.text();
    document.getElementById("results").innerHTML = resultText
}