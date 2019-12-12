const baseUrl = `http://localhost:5002`

export default {
    getAll(endpoint) {
        return fetch(`${baseUrl}/${endpoint}`)
        .then(data => data.json())
    },
    get(endpoint, id) {
        return fetch(`${baseUrl}/${endpoint}/${id}`)
        .then(data => data.json())
    },
    getUserBy(endpoint, username, password) {
        return fetch(`${baseUrl}/${endpoint}?username=${username}&?password=${password}`)
        .then(data => data.json())
    },
    getWith(endpoint, id, secondEndpoint) {
        return fetch(`${baseUrl}/${endpoint}?userId=${id}&?embed=${secondEndpoint}`)
        .then(data => data.json())
    },
    post(endpoint, newItem) {
        return fetch(`${baseUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        }
        ).then(data => data.json())
    },
    update(endpoint, editedItem) {
        return fetch(`${baseUrl}/${endpoint}/${editedItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        }
        ).then(data => data.json())
    },
    delete(endpoint) {
        return fetch(`${baseUrl}/${endpoint}`, {
            method: "DELETE"
        }
        ).then(data => data.json())
    }
}