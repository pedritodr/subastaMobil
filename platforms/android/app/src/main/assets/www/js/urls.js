//var base_url = 'https://subasta.localtunnel.me/subastaanuncio/';
var base_url = 'https:/subastanuncios.com/';
//var base_url = 'https://fa2547cc.ngrok.io/subastaanuncio/';
var url_photo = 'https:/subastanuncios.com/';

//var base_url = 'http://192.168.0.7/pagalo_hoy/index.php/';
//var url_photo = 'http://192.168.0.7/pagalo_hoy/';
//var base_url_chefs = 'http://192.168.0.2/search_chef/';
var user_rest = 'admin';
var pass_rest = 'programar';
var monto_billetera = 0;
var available_countries = [{
    code: 'EC',
    flag: 'ecu.jpg'
}];
const showToast = (texto, time) => {
    ons.notification.toast(texto, {
        timeout: time
    });
}

//Apila una vista para ser recuperada posteriormente
const pushPage = (navigatorId, templatId, data) => {
        document.querySelector(navigatorId).bringPageTop(templatId, {
            data: data
        });
    }
    //screen.orientation.lock('portrait');
    //var myDb = null;
var global_row = null;

function show_error(response) {
    var output = '';
    for (var property in response) {
        output += property + ': ' + response[property] + '; ';
    }
    // alert(output);
}

function send_data_server(url, data_to_server, function_success, function_error) {

    /*  const options = {
          method: 'post',
          data: data_to_server,
          headers: {
              Authorization: "Basic " + btoa(user_rest + ":" + pass_rest)
          }
      };
      cordova.plugin.http.sendRequest(url, options, function_success, function_error);*/
    $.ajax({
        url: url,
        beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));
        },
        type: "POST",
        data: data_to_server,
        success: function_success,
        error: function_error

    });

}

function pagina_principal() {

    var item_auth = get_data_local();
    if (item_auth) {

        if (item_auth.role_id == 2) {
            window.location.href = 'dash.html';
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



function cargar_datos_perfil() {
    var item_auth = get_data_local();

    $("#user_menu").text(item_auth.name);

    $("#email_menu").text(item_auth.email);
    if (item_auth.role_id == 2) {
        $("#user-role").text("Cliente");
    }

    if (item_auth.photo) {
        var imageURL = item_auth.photo;
        let valido = imageURL.indexOf("uploads");
        if (valido > 0) {
            $('#img_perfil').attr("src", url_photo + imageURL);
        } else {
            $('#img_perfil').attr("src", imageURL);
        }

    } else {
        $("#img_perfil").attr("src", "images/icon_profile_dash.png");

    }
}
var comienza = 0;
var limite = 11;
var comienza2 = 0;
var limite2 = 11;
var comienza_mis_anuncios = 0;
var limite_mis_anuncios = 11;

//------------- manejo de almacenamiento local --------------




function save_data_local(id, email, security_token, role_id, name, pphoto, pphone, ccedula, surname, tipo) {

    var obj = {
        user_id: id,
        email: email,
        security_token: security_token,
        role_id: role_id,
        name: name,
        photo: pphoto,
        phone: pphone,
        cedula: ccedula,
        surname: surname,
        tipo_documento: tipo

    };

    localStorage.setItem('auth', JSON.stringify(obj));
    //  console.log(localStorage.getItem('auth'));

}

function set_valida_local(valida, tab) {
    var obj = {
        valida: valida,
        tab: tab,
    };

    localStorage.setItem('valida', JSON.stringify(obj));

}

function delete_data_local() {
    localStorage.removeItem('auth');
}

function delete_valida_local() {
    localStorage.removeItem('valida');
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

function get_valida_local() {
    var item = localStorage.getItem('valida');
    if (item) {
        var obj = JSON.parse(item);
        return obj;
    } else {
        return false;
    }
}

function update_data_local(nombre, photo, phone, cedula, surname, tipo) {
    var item = localStorage.getItem('auth');
    if (item) {
        var obj = JSON.parse(item);
        obj.name = nombre;
        obj.surname = surname;
        obj.photo = photo;
        obj.cedula = cedula;
        obj.phone = phone;
        obj.tipo_documento = tipo;
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
const encodeB64Utf8 = (str) => {
    return btoa(unescape(encodeURIComponent(str)));
}
const decodeB64Utf8 = (str) => {
    return decodeURIComponent(escape(atob(str)));
}