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

    
    function pintar_items(lista) {
        $("#accordion").empty();
        
        var item = '';
        for (var i = 0; i < lista.length; i++) {
            var colapse = '';
            if (i == 0) {
                colapse = 'show';
            }
            item += '<div class="card">';
            item += '<div class="card-header info-color white-text" id="head_'+i+'">';
            item += '<h6 class="mb-0">';
            item += '<a data-parent="#accordion" data-toggle="collapse" data-target="#collapse_' + i + '" aria-expanded="false" aria-controls="collapseOne">';
            item += lista[i].pregunta;
            item += '</a>';
            item += '</h6>';
            item += '</div>';
            item += '<div id="collapse_' + i + '" class="collapse ' + colapse+'" role="tabpanel" data-parent="#accordion" aria-labelledby="head_'+i+'">';
            item += '<div class="card-body">';
            item += lista[i].respuesta;
            item += '</div>';
            item += '</div>';
            item += '</div>';            
        }

        $("#accordion").html(item);

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
        var url = base_url + 'rest_paga_hoy/lista_faqs';

       
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
                    if (status == 200 || status == 404) {
                        var status = response.status;
                        $("#accordion").fadeIn(400);
                        $("#container_loading").hide();
                        pintar_items(response.lista);
                    } else {
                        cerrar_session;
                    }
                   
                },
                error: function (response) { 
                   show_error(response);
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