import Servicios from './servicios.js';

class GestorUsuarios {
    constructor() {
        this.servicios = new Servicios();
        this.token = '';
        this.usuarios = [];
        this.init();
    }

    login() {
        const usuario = $('#user').val();
        const contrasena = $('#pass').val();

        this.servicios.autenticar(usuario, contrasena, (error, response) => {
            if (error) {
                alert('Usuario o contraseña incorrectos');
            } else {
                if (response.status === 200) {
                    alert('¡Login exitoso!');
                    this.token = response.token;
                    this.cleanMain();
                    this.mostrarUsuarios(this.token);
                }
            }
        });
    }

    mostrarUsuarios(token) {
        this.servicios.obtenerUsuarios(token, (error, response) => {
            if (error) {
                console.error('Error al obtener usuarios:', error);
            } else {
                this.renderizarUsuarios(response);
            }
        });
    }

    cleanMain() {
        $("#mainlogin").html("");
    }

    renderizarUsuarios(usuarios) {
        $('#trainers').empty();
        usuarios.forEach(trainer => {
            let trainerHtml = `<div class="trainer"><h2>${trainer.entrenador}</h2>`;
            trainer.pokemons.forEach(pokemon => {
                trainerHtml += `<div class="pokemon ${pokemon.tipo}">
                                    <img src="${pokemon.foto}" alt="${pokemon.nombre}">
                                    <div class="name">${pokemon.nombre}</div>
                                </div>`;
            });
            trainerHtml += '</div>';
            $('#trainers').append(trainerHtml);
        });
    }

    renderLogin() {
        const templatelogin = `<div class="inputLogin">
            <div class="input">
                <label>Usuario</label>
                <input type="text" id="user" />
            </div>
            <div class="input">
                <label>Password</label>
                <input type="password" id="pass" />
            </div>
            <div class="input">
                <button type="submit" class="btn" id="btLogin">Logear</button>
            </div>
        </div>`;
        $("#mainlogin").append(templatelogin);
    }

    init() {
        this.render();
        $('#btLogin').on('click', () => {
            this.login();
        });
    }

    render() {
        this.renderLogin();
    }
}

export default GestorUsuarios;
