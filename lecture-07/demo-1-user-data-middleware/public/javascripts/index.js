
async function uploadData(){
    // get the data that the user typed in
    let myData = {}
    
    myData.first_name = document.getElementById("first_name_input").value

    myData.last_name = document.getElementById("last_name_input").value

    myData.favorite_ice_cream = document.getElementById("favorite_ice_cream_input").value

    // send the data to the server
    let response = await fetch("users/addUserData", {
        method: "POST",
        body: JSON.stringify(myData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // see what the server said
    let responseText = await response.text()

    document.getElementById("uploadResponse").innerHTML = responseText
}


async function loadUsers() {
    let response = await fetch("users/getUsers")
    let usersData = await response.json();

    let html = usersData.map(userInfo => {
        return `
        User Info: ${userInfo.first_name} 
        ${userInfo.last_name} - ${userInfo.favorite_ice_cream}
        `
    }).join("<br>")

    document.getElementById("results").innerHTML = html
}