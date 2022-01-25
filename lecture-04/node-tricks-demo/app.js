let title = "This page"
let subtitle = "this is an example page"
let description = undefined

let html = "<html><body>" +
            "<h1>" + title + "</h1>" +
            "<h2>" + subtitle + "</h2>" +
            "<p>" + description + "</p>" +
            "</body></html>"

console.log(html)

let html2 = `
<html>
  <body>
    <h1>${title}</h2>
    <h2>${subtitle}</h2>
    <p>${(description ? description : "")}</p>
  </body>
</html>
`
console.log(html2)


function descriptionHtml(description){
    if(description){
        return `<p>${description}</p>`
    } else {
        return ""
    }
}

let html3 = `
<html>
  <body>
    <h1>${title}</h2>
    <h2>${subtitle}</h2>
    ${descriptionHtml(description)}
  </body>
</html>
`
console.log(html3)

// iterators
let arr = [
    "first name : Kyle",
    "last name : Thayer",
    "age : 38",
    "glasses : yes"
]

//for each (doing something with each item)
let values = {}
arr.forEach(item => {
    let split_item = item.split(" : ")
    values[split_item[0]] = split_item[1]
})
console.log(values)

// map (modifying each item)
let modifiedArr = arr.map(item => {
    return item.replace(":", "=")
})
console.log(modifiedArr)

let modifiedArr2 = arr.map(item => {
    let split_item = item.split(" : ")
    return split_item[0]
})
console.log(modifiedArr2)

// filter, select only some things from an array
let filteredArr = arr.filter(item => {
    if(item.includes("name")){
        return true
    } else {
        return false
    }
})
console.log(filteredArr)