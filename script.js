// main.js
import { createClient, getClients, getClientById, deleteClient, updateClient } from './api.js';

let edit = false;
let clientId = ''

async function salvar() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const cliente = {
        name: name,
        phone: phone,
        email: email
    };
    if (edit){
        cliente.id = clientId;
        updateClient(cliente);
        alert('Cliente alterado com sucesso');
    }else{
        createClient(cliente);
        alert('Cliente cadastrado com sucesso');
    }
    limpar();
    loadClients();
}

function ocultarCadastro(){
    const cadastro = document.querySelector('div.container')
    cadastro.style.display = 'none'
}
function mostrarCadastro(){
    const cadastro = document.querySelector('div.container')
    const clientList = document.getElementById('client-list');
    cadastro.style.display = 'block'
    clientList.style.display = 'none'
}
function cadastrar(){
    let edit = false;
    let clientId = '';
    limpar();
    const h2 = document.querySelector('h2');
    h2.textContent = 'Cadastrar Cliente'
    mostrarCadastro();
}

function listarClientes(){
    ocultarCadastro();
    const clientList = document.getElementById('client-list');
    clientList.style.display = 'flex';
    loadClients()
}

async function buscaCliente(id){
    edit=true;
    clientId = id
    const client = await getClientById(id);
    const h2 = document.querySelector('h2');
    h2.textContent = 'Editar Cliente';
    mostrarCadastro();
    document.getElementById('name').value = client.name;
    document.getElementById('phone').value = client.phone;
    document.getElementById('email').value = client.email;
}

async function loadClients() {
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = '';

    const clients = await getClients();
    if (clients) {
        clients.forEach(client => {
            const clientItem = document.createElement('div');
            clientItem.className = 'client-item';
            clientItem.innerHTML = `
                <p><strong>Nome:</strong> ${client.name}</p>
                <p><strong>Email:</strong> ${client.email}</p>
                <p><strong>Telefone:</strong> ${client.phone}</p>
                <button onclick="buscaCliente(${client.id})">Editar</button>
                <button onclick="remover(${client.id})">Excluir</button>
            `;
            clientList.appendChild(clientItem);
        });
    }
}

function remover(clientId) {
    deleteClient(clientId);
    alert('Cliente excluido com sucesso');
    loadClients();
}

function limpar(){
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
}

// Tornando as funções disponíveis no escopo global
window.salvar = salvar;
window.remover = remover;
window.mostrarCadastro = mostrarCadastro;
window.loadClients = loadClients;
window.listarClientes = listarClientes;
window.buscaCliente = buscaCliente;
window.edit = edit;
window.clientId = clientId;
window.cadastrar = cadastrar;
window.limpar() = limpar();

// Carregar os clientes ao carregar a página
document.addEventListener('DOMContentLoaded', ocultarCadastro);
