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
                item += '<label style="font-size:16px;color:#00579e;font-weight:bold; margin-left:5px;margin-top:10px;">' + lista_favoritos[i].nombre + ' / ' + lista_favoritos[i].codigo_servicio+'</label > ';
                item += '</div>';
                item += '</div>';
            } else {
                var item = "";
                var function_click = 'onclick = cargar_datos_favoritos("' + lista_favoritos[i].favorito_id + '","' + lista_favoritos[i].codigo_servicio + '","' + lista_favoritos[i].tipo_servicio + '")';
                item += '<div ' + function_click + '  id= "metodo_' + lista_favoritos[i].favorito_id + '" class="row" style= "margin-right:0px; border-bottom: 2px solid #dddddd;background-color:#fff;margin-left:0px;" > ';
                item += '<div class="col-xs-12">';
                item += '<img src = "images/estrella.png" style="width:20px; height:20px;" />';
                item += '<label style="font-size:16px;color:#00579e;font-weight:bold; margin-left:5px;margin-top:10px;">' + lista_favoritos[i].nombre + ' / ' + lista_favoritos[i].codigo_servicio + '</label > ';

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

         if(lista_paises.length == 0){ //no se han descargado los paises, asi que voy a buscarlos
            var security_token = item_auth.security_token;

            var url = base_url + 'rest_recargas/lista_paises';
            var user_id = item_auth.id;

            $("#myModalPaises").modal('show');
            
            setTimeout(function(){
                $.ajax
                ({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    async: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));                   
                    },
                    data: {user_id:btoa(user_id),security_token:security_token},
                    success: function (response) {  
                        $("#myModalPaises").modal('hide');                 
                        if (response.status == 200) {
                           
                            
                            for(var i=0;i<response.lista.length;i++){
                                lista_paises.push({ value: response.lista[i].name, data: response.lista[i].alpha2Code});
                            }
                        } else {
                            cerrar_session();
                        }

                    },
                    error: function (response) {
                       
                      
                    }
                });
            },500);
            
         }
       


            
      // setup autocomplete function pulling from currencies[] array
      $('#autocomplete').autocomplete({
        lookup: lista_paises,
        onSelect: function (suggestion) {
            $("#myModalLoadOperadores").modal('show');
            var item_auth = get_data_local();
            selected_country = suggestion.data;       
            if(!item_auth){
                cerrar_session();
            }else{
                if(item_auth.id == 0){
                    cerrar_session();
                }
            }        

            var security_token = item_auth.security_token;

            var url = base_url + 'rest_recargas/lista_provedores';
            var user_id = item_auth.id;

            setTimeout(function(){

                $.ajax
                ({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    async: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));                   
                    },
                    data: {user_id:btoa(user_id),security_token:security_token,country:suggestion.data},
                    success: function (response) {       
                                                  
                        if (response.status == 200) {
                            pintar_proveedores(response.lista);
                            
                            
                            $("#myModalLoadOperadores").modal('hide');       
                        } else {
                            cerrar_session();
                        }

                    },
                    error: function (response) {
                       
                      
                    }
                });

            },500);

            

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