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

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        }

        return false;
    } 


    function pintar_regalos_mes(lista) {
        $("#container_regalos_mes").empty();
        
        var item = "";
        if (lista.length > 0) {
            for (var i = 0; i < lista.length; i++) {
                var foto_url = lista[i].photo;
                item += "<div class='row' style='margin-right:0px;margin-top:10px;'>";

                item += "<div class='col-12' style='text-align:center;'>";
                item += "<img style='width:100%;margin-left:5px;margin-bottom:5px;' src='" + foto_url + "' />";
                item += "</div>";

                item += "<div class='col-12'>";
                item += "<label style='color:#09366e;'>" + lista[i].name + "</label><br />";
                item += "<label style='color:#2193d0';> Cantidad: " + lista[i].cantidad + "</label>";
                item += "<p style='text-align:justify;color:gray;'>" + lista[i].resumen + "</p>";
                item+="<hr />";
                item += "</div>";
               
                item += "</div>";

            }
        } else {
            item += "<div class='row' style='margin-right:0px;'>";

            item += "<div class='col' style='text-align:center;margin-top:10px;margin-left:10px;'>";
            item += "<div class='alert alert-info' style='margin-left:10px; margin-right:10px;'>";
            item += "No se encuentran regalos planificados para este mes.";    
            item += "</div>";
            item += "</div>";         

            item += "</div>";
        }

        $("#container_regalos_mes").html(item);

    }

    function pintar_regalos_ganados(lista) {
        $("#container_mis_regalos").empty();

        var item = "";
        if (lista.length > 0) {
            for (var i = 0; i < lista.length; i++) {
                if (lista[i].product_object) {
                    var foto_url = lista[i].product_object.photo;
                    item += "<div class='row' style='margin-right:0px;margin-top:10px;'>";

                    item += "<div class='col-12'>";
                    item += "<img style='width:100%;margin-bottom:5px;' src='" + foto_url + "' />";
                    item += "</div>";

                    item += "<div class='col-12'>";
                    item += "<label style='color:#09366e;'>" + lista[i].product_object.name + "</label><br />";
                    item += "<p style='text-align:justify;color:gray;'>" + lista[i].product_object.resumen + "</p>";
                    item+="<hr />";
                    item += "</div>";

                    item += "</div>";
                } else {
                    item += "<div class='row' style='margin-right:0px;margin-top:10px;'>";

                    item += "<div class='col' style='text-align:center;'>";
                    item += "Usted ha sido el ganador del sorteo Paga Hoy correspondiente al período <span style='color:#2193d0;font-weight:bold;'>" + lista[i].plan_regalo_object.year + " / " + lista[i].plan_regalo_object.mes + "</span>";
                    item += "<br />";
                    item += "<span style='font-weight:bold;'>El producto ganado no se ha asignado aún. Comuníquese con nuestra empresa para escoger el producto de su preferencia</span>";
                    item += "</div>";

                   

                    item += "</div>";
                }
            }
        } else {
            item += "<div class='row' style='margin-right:0px;'>";

            item += "<div class='col' style='text-align:center;margin-top:10px;margin-left:10px;'>";
            item += "<div class='alert alert-info' style='margin-right:10px;margin-left:10px;'>";
            item += "No se encuentran regalos obtenidos.";
            item += "</div>";
            item += "</div>";

            item += "</div>";
        }

        $("#container_mis_regalos").html(item);
    }

    function alertDismissed(){
        
    }
   

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        cargar_datos_perfil();
        screen.orientation.lock("portrait");
        var item_auth = get_data_local();
             
        if(!item_auth){
            cerrar_session();
        }
        
     /*   window.FirebasePlugin.onNotificationOpen(function(notification) {
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

        setTimeout(function(){
            var url = base_url + 'rest_paga_hoy/load_regalos_este_mes';
            var id = item_auth.id;
            var security_token = item_auth.security_token;

           $.ajax
                ({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    async: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));                    
                    },
                    data: {user_id:id,security_token:security_token},
                    success: function (response) {
                        
                        $("#container_loading").hide();
                        var status = response.status;
                       if (status == 200) {
                          
                            $("#tab_container").fadeIn(400);
                            var lista_regalos_mes = response.lista_regalos_mes;
                            pintar_regalos_mes(lista_regalos_mes);
                            var regalos_ganados = response.lista_regalos_ganados;                       
                            pintar_regalos_ganados(regalos_ganados);
                            
                        } else {                        
                            cerrar_session();
                        }
                    },
                    error: function (error) {                    
                        show_error(error);
                    }
                });     
            },1000); 

          
       
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
} )();