const getAuth = async () => {
    const clientID = '62ae7086c3de439597771d3f7223267f';
    const clientSecret = '590a0b43700d4534875239c9e42ec7f4';
    const encodedString = btoa(clientID + ':' + clientSecret)
    const response = await fetch('https://accounts.spotify.com/api/token', 
        {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${encodedString}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        }
    );
    let token = await response.json();
    console.log(token)
    return token.access_token
}

const loadToken = async () => {
    const token = await getAuth();
    console.log(token);
    return token 
}

const getSong = async () => {
    const token = await loadToken();
    let data = await fetch(`https://api.spotify.com/v1/search?type=track&q=track:anemone+artist:slenderbodies&limit=1`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    data = await data.json();
    // use that preview url to create a new HTML Audio object
    let audioobj = new Audio(data.tracks.items[0].preview_url);
    audioobj.play();
    

    console.log(data.tracks.items[0].album.images[1].url)

}



let playbutton = document.querySelector('#pbtn')
playbutton.addEventListener('click', ()=> {getSong();});
let stopbutton = document.querySelector('#sbtn')
stopbutton.addEventListener('click',() => audioobj.pause());