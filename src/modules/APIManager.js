const baseUrl = `http://localhost:5002`

export default {
    getAll(module) {
        return fetch(`${baseUrl}/${module}`)
        .then(data => data.json())
    },
    get(module, id) {
        return fetch(`${baseUrl}/${module}/${id}`)
        .then(data => data.json())
    },
    getBy(module, modifier, modifier2) {
        return fetch(`${baseUrl}/${module}?${modifier}&?${modifier2}`)
        .then(data => data.json())
    },
    getWith(module, id, secondModule) {
        return fetch(`${baseUrl}/${module}/${id}/_?embed=${secondModule}`)
        .then(data => data.json())
    },
    post(module, newItem) {
        return fetch(`${baseUrl}/${module}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        }
        ).then(data => data.json())
    },
    update(module, editedItem) {
        return fetch(`${baseUrl}/${module}/${editedItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        }
        ).then(data => data.json())
    },
    delete(module) {
        return fetch(`${baseUrl}/${module}`, {
            method: "DELETE"
        }
        ).then(data => data.json())
    }
}