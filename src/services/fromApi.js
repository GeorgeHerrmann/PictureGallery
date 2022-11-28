/* 
All functions that pull from the database should be here
For example: anything that gets the pictures, or login info or whatever should be defined in a function here,
then imported in the rest of the code.
*/

export async function getPictures() {
    const response = await fetch(`/api/findall`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        mode: 'no-cors',
      });
     let output = await response.json();
     return output;
}

/* Gets a specific picture */
export async function getPicture(id) {
    const response = await fetch('/api/find?' + new URLSearchParams({
        id: id,
    }), {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        mode: 'no-cors',
    });
    let output = await response.json();
    return output;
}

export async function newPicture(header, text, link, username) {
    await fetch('/api/save?' + new URLSearchParams({
        Header: header,
        Text: text,
        ImgLink: link,
        username: username,
    }), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'no-cors',
    });
}

export async function editPicture (header, text, link, id) {
    await fetch('/api/update?' + new URLSearchParams({
        id: id,
        Header: header,
        Text: text,
        ImgLink: link,
    }), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'no-cors',
    });
}

export async function deletePicture(id) {
    await fetch('/api/delete?' + new URLSearchParams({
        id: id,
    }), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'no-cors',
    });
}

export async function registerUser(username, email, password) {
    const response = await fetch('/api/user/signup?' + new URLSearchParams({
        username: username,
        email: email,
        password: password,
    }), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });
    let output = response.json();
    return output;
}

export async function loginUser(email, password) {
    const response = await fetch('/api/user/login?' + new URLSearchParams({
        email: email,
        password: password,
    }), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });
    let output = response.json();
    return output;
}

export async function verifySession(token) {
    const response = await fetch('/api/verifyuser', {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'authorization': token},
    })
    let output = response.json();
    return output;
}