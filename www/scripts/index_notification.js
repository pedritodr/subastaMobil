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
            var security_token = item_auth.security_token;
            var user_id = item_auth.id;
             
            var lista_elementos = [];
    
            var url = base_url + 'rest_user/get_notifications';
            
                 
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
                        user_id:btoa(user_id),
                        security_token:security_token
                    },
                    success: function (response) {                      
    
                      
                        $("#carga_content").hide();
                        $("#marco-content").show();
                                            
                        var status = response.status;
                        $("#container_block").hide();
                       
                        if (status == 200) {                        
    
                            pintar_item(response.lista);      
    
                        } else {
                           cerrar_session();
                        }
                    },
                    error: function (response) {        
                      
                    }
            });
        },1000); 
      
         

                       
    };

    function pintar_item(lista_solicitudes) {
        
        var cadena_resultante = '';

        cadena_resultante +='<div class="row" style="margin-right:0px;margin-bottom:10px;">';
            cadena_resultante +='<div class="col text-right">';
                cadena_resultante+='<a onclick="delete_all_modal();" style="color:darkred;" class="btn btn-outline-danger waves-effect"><i class="fa fa-trash"></i> Vaciar lista</a>';
            cadena_resultante+='</div>';
        cadena_resultante+='</div>';

        for (var i = 0; i < lista_solicitudes.length; i++) {
            var onclick_function2 = "show_delete_solicitud(" + lista_solicitudes[i].notificacion_id + ")";
            
                var item = "";
              
               // var onclick_function1 = "ver_detalle('" + description + "')";
                item+='<div class="card" style="margin-bottom:5px;">';
                    item += '<div class="row" style="margin-right:0px;">';
                        
                        item += '<div class="col">';               
                            item+='<label style="font-weight:bold;font-size:16px;color:#0f3064;margin-left:10px;">'+lista_solicitudes[i].title+'</label><br />';
                            item+='<label style="font-weight:bold;margin-left:10px;color:#2193D0">'+lista_solicitudes[i].body+'</label><br />';
                            item+='<label style="font-weight:bold;margin-left:10px;">'+lista_solicitudes[i].fecha_hora+'</label><br />';                                          
                        item += '</div>';                  
                    item+='</div>'   
                        
                    item+='<div class="row" style="margin-right:0px;">';
                        item += '<div class="col text-center">';
                            item+='<a onclick = "'+onclick_function2+'" style="margin-bottom:10px;margin-left:10px;" class="btn btn-danger waves-effect btn-block"><i class="fa fa-times"></i> Eliminar notificación</a>';
                        item += '</div>';  
                                        
                    item += '</div>';
               item+='</div>';
           

            cadena_resultante += item;
        }

        $("#marco-content").fadeIn(400);
        $("#container-lista").empty();
        $("#container-lista").html(cadena_resultante);
    }

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
} )();