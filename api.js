
const baseURL = 'https://api-clientes-ee5p.onrender.com/clients'

export function getClients() {
    return fetch(baseURL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
            return null;
        });
}

export function getClientById(id) {
    return fetch(`${baseURL}/${id}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
            return null;
        });
}

export function createClient(client) {
    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
}
export function updateClient(client) {
    fetch(`${baseURL}/${client.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
}
export function deleteClient(id) {
    fetch(`${baseURL}/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.status)
        .then(data => {
            console.log('Cliente deletado com sucesso:', data);
        })
        .catch(err => {
            console.error('Erro ao deletar o cliente:', err);
        });
}