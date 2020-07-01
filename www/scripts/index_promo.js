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

   

    function pintar_promos(lista) {
        $("#content_section").empty();

        var item = "";
        if (lista.length > 0) {
            for (var i = 0; i < lista.length; i++) {

                var foto_url = lista[i].photo;
                var funcion_mostrar = 'mostrar_elemento("' + lista[i].promo_id + '");';
                var funcion_esconder = 'esconder_elemento("' + lista[i].promo_id + '");';
                item += "<div class='row' style='margin-right:0px;margin-top:5px;>";
                    item += "<div class='col text-center'>";
                        item += "<div class='card' style='margin-left:25px;'>";
                            item += "<img style='width:100%;' src= '" + foto_url+"' />";
                            item += "<div class='text-center'>";
                            item += "<h6 style='#09366e;font-weight:bold;margin-top:5px;'>" + lista[i].titulo + "</h6>";
                            item += "<p style='display:none;' id='desc_" + lista[i].promo_id + "' style='text- align:justify; '>" + lista[i].description + "</p > ";
                            item+="<div class='row'>";
                            item+="<div class='col-4'>"
                            item += "<p id='btn_mostrar_" + lista[i].promo_id +"'> <a style='width: 90%;' onclick='" + funcion_mostrar + "' class='btn btn-primary waves-effect' role='button'><i class='fa fa-eye'></i> </a> </p>";
                            item += "<p class='btn_escondido' id='btn_esconder_"+lista[i].promo_id +"'> <a style='width: 90%;'  onclick='" + funcion_esconder + "' class='btn btn-outline-info waves-effect' role='button'><i class='fa fa-remove'></i></a> </p>";
                            item+='</div>';

                            item+="<div class='col-4'>"                           
                            item += "<a href='https://wa.me/"+lista[i].whatsapp+"' class='btn btn-outline-primary'><i class='fa fa-whatsapp'></i></a>";
                            item+='</div>';

                            item+="<div class='col-4'>"                           
                            item += "<a href='tel:"+lista[i].phone+"' class='btn btn-info'><i class='fa fa-phone'></i></a>";
                            item+='</div>';
                            
                            item+="</div>";
                            item += "</div>";
                        item += "</div>";
                    item += "</div>";
                item += "</div>";
               

            }
        } else {
            item += "<div class='row' style='margin-right:0px;'>";

            item += "<div class='col-xs-12' style='text-align:center;margin-top:10px;margin-left:10px;'>";
            item += "<div class='alert alert-info'>";
            item += "No se encuentran promociones para mostrar.";
            item += "</div>";
            item += "</div>";

            item += "</div>";
        }

        $("#content_section").html(item);
        $(".btn_escondido").hide();
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
        }else{
            if(item_auth.id == 0){
                cerrar_session();
            }
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
         }); */

        setTimeout(function(){
            var user_id = item_auth.id;
            var security_token = item_auth.security_token;
            var url = base_url + 'rest_paga_hoy/load_promos';

           
            $.ajax
                ({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    async: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));
                        
                    },
                    data: {user_id:user_id,security_token:security_token},
                    success: function (response) {
                        
                        var status = response.status;
                        if (status == 404) { // si existe error de autenticación
                            //mostrar mensaje informando que no hay regalos planificados
                        } else if (status == 200) {
                            $("#container_loading").hide();
                            $("#content_section").fadeIn(400);
                            var lista = response.promos;
                            pintar_promos(lista);
                            
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