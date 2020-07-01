// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    document.addEventListener("offline", networkoffline, false);
    document.addEventListener("online", networkonline, false);

    function networkoffline() {
       
        window.location = 'index.html'; 
    }

    function networkonline() {
             
    }

    
    function pintar_item_favoritos(lista_favoritos) {

        var cadena_resultante = "";
        for (var i = 0; i < lista_favoritos.length; i++) {
            if (i % 2 == 0) {
                var function_click = 'onclick = cargar_datos_favoritos("' + lista_favoritos[i].favorito_id + '","' + lista_favoritos[i].codigo_servicio + '","' + lista_favoritos[i].tipo_servicio + '")';
                var item = "";
                item += '<div ' + function_click + ' id= "metodo_' + lista_favoritos[i].favorito_id + '" class="row" style= "margin-right:0px; border-bottom: 2px solid #dddddd; background-color:#f0f1f2; margin-left:0px; " > ';
                item += '<div class="col-xs-12">';
                item += '<img src = "images/estrella.png" style="width:20px; height:20px;" />';
                item += '<label style="font-size:18px;color:#00579e;font-weight:bold; margin-left:5px;margin-top:10px;">' + lista_favoritos[i].nombre + '</label > ';
                item += '</div>';
                item += '</div>';
            } else {
                var item = "";
                var function_click = 'onclick = cargar_datos_favoritos("' + lista_favoritos[i].favorito_id + '","' + lista_favoritos[i].codigo_servicio + '","' + lista_favoritos[i].tipo_servicio + '")';
                item += '<div ' + function_click + '  id= "metodo_' + lista_favoritos[i].favorito_id + '" class="row" style= "margin-right:0px; border-bottom: 2px solid #dddddd;background-color:#fff;margin-left:0px;" > ';
                item += '<div class="col-xs-12">';
                item += '<img src = "images/estrella.png" style="width:20px; height:20px;" />';
                item += '<label style="font-size:18px;color:#00579e;font-weight:bold; margin-left:5px;margin-top:10px;">' + lista_favoritos[i].nombre + '</label> ';

                item += '</div>';
                item += '</div>';

            }

            cadena_resultante += item;
        }


        $("#body_container_favorito").empty();
        $("#body_container_favorito").html(cadena_resultante);
    }
    

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        var url = base_url + 'rest_user/list_fav_user_multiple_cat';
        var user_id = localStorage.getItem("id");
        $.ajax
            ({
                type: "POST",
                url: url,
                dataType: 'json',
                async: true,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));
                },
                data: { nservicio_id: '23~24~25', user_id: user_id },
                success: function (response) {
                    var status = response.status;
                    if (status == 200) {
                        $("#container_block").hide();

                        if (response.lista_favoritos.length > 0) {
                            $("#container-favoritos").show();
                            pintar_item_favoritos(response.lista_favoritos);
                            $("#container-favoritos").show();
                        } else {
                            $("#container-favoritos").hide();
                        }

                    } else {
                        //error
                    }

                },
                error: function (response) {
                    
                }
            });
       
       
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
} )();