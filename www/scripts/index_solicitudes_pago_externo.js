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



    function pintar_item(lista_solicitudes) {

        var cadena_resultante = "";
        for (var i = 0; i < lista_solicitudes.length; i++) {

            var item = "<div class='card' style='margin-bottom:5px;'>";
            var description = btoa(lista_solicitudes[i].description);
            var sol_id = lista_solicitudes[i].solicitud_cobro_pagahoy_id;
            var onclick_function1 = "ver_detalle('" + btoa(lista_solicitudes[i].detalle) + "')";
            var onclick_function2 = "show_delete_solicitud('" + sol_id + "')";
            item += '<div class="row" style="margin-right:0px; margin-left:0px; ">';
            item += '<div class="col text-center">';
            item += '<span style="font-weight:bold;font-size:16px;color:#0f3064;">' + lista_solicitudes[i].tienda_object.nombre_tienda + '</span><br />';
            item += '<span style="font-weight:bold;color:#2193D0;margin-right:10px;"><span style="font-weight:bold;color:#0F3268">Subtotal:</span> $ ' + parseFloat(lista_solicitudes[i].subtotal).toFixed(2).toString() + '</span><br />';
            item += '<span style="font-weight:bold;color:#2193D0;"><span style="font-weight:bold;color:#0F3268">IVA (12%):</span> $ ' + parseFloat(lista_solicitudes[i].iva).toFixed(2).toString() + '</span><br />';
            item += '<span style="font-weight:bold;color:#2193D0;"><span style="font-weight:bold;color:#0F3268">Total:</span> $ ' + parseFloat(lista_solicitudes[i].total).toFixed(2).toString() + '</span><br />';

            item += '<span style="font-weight:bold;font-size:16px;color:#0f3064;">Válido hasta: </span>';
            item += '<span style="font-weight:bold;color:#2193D0;margin-left:10px;">' + lista_solicitudes[i].fecha_hora_caducidad + '</span><br />';
            item += '</div>';

            item += '</div>';

            item += '<div class="row" style="margin-right:0px; margin-left:0px; ">';
            item += '<div class="col text-center">';

            item += '<a onclick="' + onclick_function1 + '" style="margin-bottom:5px;" class="btn btn-outline-info waves-effect btn-block"><i class="fa fa-eye"></i> Ver</a>';

            item += '</div>';

            item += '<div class="col text-center">';
            item += '<a onclick="' + onclick_function2 + '" style="margin-bottom:5px;" class="btn btn-outline-danger waves-effect btn-block"><i class="fa fa-times"></i> Quitar</a>';

            item += '</div>';

            item += '<div class="col text-center">';
            item += '<a style="margin-bottom:5px;" class="btn btn-primary waves-effect btn-block"><i class="fa fa-check"></i> Completar Pago</a>';
            item += '</div>';

            item += '</div>';

            item += '</div>';


            cadena_resultante += item;
        }

        $("#marco-content").fadeIn(400);
        $("#container-lista").empty();
        $("#container-lista").html(cadena_resultante);
    }






    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        screen.orientation.lock("portrait");
        var item_auth = get_data_local();
        cargar_datos_perfil();
        if (!item_auth) {
            cerrar_session();
        }


        /*  window.FirebasePlugin.onNotificationOpen(function(notification) {
              navigator.notification.alert(
                  notification.body,  // message
                  cerrar_push,        // callback
                  notification.title, // title
                  'Aceptar'           // buttonName
              );
  
             
           }, function(error) {
              // show_error(error);
           });
           */

        var security_token = item_auth.security_token;
        var user_id = item_auth.id;


        setTimeout(function () {


            var url = base_url + 'rest_user/mis_solicitudes_pendientes';


            $.ajax
                ({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    async: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));
                    },
                    data: {

                        user_id: user_id,
                        security_token: security_token

                    },
                    success: function (response) {



                        $("#carga_content").hide();
                        $("#marco-content").show();

                        var status = response.status;
                        $("#container_block").hide();

                        if (status == 200) {

                            if (response.solicitudes.length > 0) {
                                pintar_item(response.solicitudes);
                            } else {
                                $("#msg-error").hide();
                                $("#msg-info").fadeIn(400);
                            }

                        } else {

                        }
                    },
                    error: function (response) {
                        show_error(response);
                    }
                });
        }, 1000);

    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
})();