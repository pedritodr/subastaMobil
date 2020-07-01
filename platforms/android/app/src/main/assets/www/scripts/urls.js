document.write('<script type="text/javascript" src="scripts/Security/DatalabSecurity.js"></script>');

var base_url = 'https://www.pagahoy.com/';
var url_photo = 'https://www.pagahoy.com/';

//var base_url = 'http://192.168.0.7/pagalo_hoy/index.php/';
//var url_photo = 'http://192.168.0.7/pagalo_hoy/';
//var base_url_chefs = 'http://192.168.0.2/search_chef/';
var user_rest = 'admin';
var pass_rest = 'programar';
var monto_billetera = 0;
var available_countries = [{ code: 'EC', flag: 'ecu.jpg' }];


//var myDb = null;
var global_row = null;
function show_error(response) {
    var output = '';
    for (var property in response) {
        output += property + ': ' + response[property] + '; ';
    }
    alert(output);
}

function pagina_principal(){
    var item_auth = get_data_local();
    if(item_auth){               
        
        if(item_auth.role_id == 4){
            window.location.href = 'dash.html';
        }else if(item_auth.role_id == 11){
            window.location.href = 'dash_repartidor.html';
        }else if(item_auth.role_id == 5){
            window.location.href = 'dash_tendero.html';
        }
    }
}

function find_available_country(country_code) {
    var selected_index = -1;
    for (var i = 0; i < available_countries.length; i++) {
        if (available_countries[i].code == country_code) {
            selected_index = i;
            break;
        }
    }
    return selected_index;
}

function cerrar_push() {

}

var icon = "fa fa-times fa-2x";
function mostrar_menu() {
    $('div#contenedor_1').toggle(250);
    $("#icon_btn").removeClass("fa fa-times fa-2x");
    $("#icon_btn").removeClass("fa fa-align-justify fa-2x");
    $("#icon_btn").addClass(icon);
    if (icon == "fa fa-times fa-2x") {
        icon = "fa fa-align-justify fa-2x";
    } else {
        icon = "fa fa-times fa-2x";
    }
}

function cargar_datos_perfil() {
    var item_auth = get_data_local();

    $("#name_menu").text(item_auth.name);
    $("#email_menu").text(item_auth.email);
    var url_country_flag = localStorage.getItem("country_flag");
    $("#flag_country").attr("src", 'images/ecu.jpg');
    if (item_auth.photo) {
        $("#img_perfil").attr("src", item_auth.photo);
    }
}



//------------- manejo de almacenamiento local --------------




function save_data_local(id, email, security_token, role_id, name, pphoto,ptienda_id) {
    var obj = { id: id, email: email, security_token: security_token, role_id: role_id, name: name, photo: pphoto,tienda_id:ptienda_id };
    localStorage.setItem('auth', JSON.stringify(obj));
}

function delete_data_local() {
    localStorage.removeItem('auth');
}

function get_data_local() {
    var item = localStorage.getItem('auth');
    if (item) {
        var obj = JSON.parse(item);
        return obj;
    } else {
        return false;
    }
}

function update_data_local(nombre, photo) {
    var item = localStorage.getItem('auth');
    if (item) {
        var obj = JSON.parse(item);
        obj.name = nombre;
        obj.photo = photo;
        localStorage.setItem('auth', JSON.stringify(obj));
        
    }
}

//------- fin del almacenamiento local ----------------------

function call_view(vista_destino, old_view) {
    localStorage.setItem("last_url", old_view);
    window.location.href = vista_destino;
}

function back() {

    var url = localStorage.getItem('last_url');
    window.location.href = url;
}

function cerrar_session() {

    delete_data_local();
    // delete_data_local();
    window.location.href = 'login.html';



}


