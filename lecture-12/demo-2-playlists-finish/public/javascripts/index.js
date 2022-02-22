async function addUser(){
    let name = 
        document.getElementById("name_input")
        .value;

    await fetch("/users", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: name})
    })

    loadUsers();
}


async function loadUsers(){
    document.getElementById("allusersdiv").innerHTML = "Loading...";

    //TODO: load users from server
    let response = await fetch("/users")
    let userJson = await response.json()


    //display users
    let usersHTML = userJson.map(userInfo => {
        return `
        <hr>
        <div>
            <h3>Username: ${userInfo.username} <button onclick="deleteUser('${userInfo._id}')">Delete</button></h3>
            
            <strong>Favorite Bands: </strong>${userInfo.favorite_bands.join(", ")}<br>
            <strong>Add Band:</strong> <input type="text" id="add_band_text_${userInfo._id}" /> 
            <button onclick="addBand('${userInfo._id}')">Add Band</button><br>
            <h3>Playlists</h3>
            <div id="playlist_div_${userInfo._id}"></div>
            <br>
            <h3>Add Playlist:</h3>
            <strong>Title: </strong> <input type="text" id="add_playlist_title_text_${userInfo._id}" /><br>
            <strong>Songs: </strong> <input type="text" id="add_playlist_songs_text_${userInfo._id}" /><br>
            <button onclick="addPlaylist('${userInfo._id}')">Add Playlist</button><br>
        </div>`
    }).join("<hr>")

    document.getElementById("allusersdiv").innerHTML = usersHTML;

    userJson.forEach(userInfo => {
        loadPlaylists(userInfo._id);
    })
}


async function loadPlaylists(userID){
    
    //TODO: Load Playlist from server
    let response = await fetch("/users/playlists?userID=" + userID)
    let playlists_info = await response.json()


    let playlistHTML = playlists_info.map(playlistInfo => {
        return `
        <div>
            <h4>Playlist: ${playlistInfo.title}</h3>
            <strong>Songs:</strong> ${playlistInfo.songs}
        </div>`
    }).join("<br>")

    document.getElementById(`playlist_div_${userID}`).innerHTML = playlistHTML;
}

async function addBand(userID){
    let bandToAdd = document.getElementById('add_band_text_' + userID).value
    await fetch("users/addBand", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userID: userID,
            band: bandToAdd
        })
    })
}

async function addPlaylist(userID){
    let title = document.getElementById("add_playlist_title_text_" + userID).value
    let songs = document.getElementById("add_playlist_songs_text_" + userID).value

    await fetch('users/playlists', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userID: userID,
            title: title,
            songs: songs
        })
    })
}

async function deleteUser(userID){
    await fetch('/users', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID: userID})
    })
    loadUsers();
}