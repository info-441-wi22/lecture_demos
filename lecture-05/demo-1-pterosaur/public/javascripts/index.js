
async function getPterosaurs(){
    let response = await fetch("api/getPterosaurs")
    let pterosaurInfo = await response.json()

    let pterosaurHtml = pterosaurInfo.map(onePterosaur => {
        return `
        <div>
            <p>${onePterosaur.Genus}</p>
            <img src="${onePterosaur.img}" />
        </div>
        `
    }).join("")

    document.getElementById("results").innerHTML = pterosaurHtml
}