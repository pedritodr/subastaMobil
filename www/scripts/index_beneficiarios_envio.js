﻿// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
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

    

   function llenar_combo_paises(lista_paises,container_id){
       var str = "";
       for(var i = 0; i<lista_paises.length;i++){
           str+="<option value='"+lista_paises[i].alpha3Code+"'>"+lista_paises[i].name+"</option>";
       }
       $("#"+container_id).empty();
       $("#"+container_id).html(str);
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

       /* window.FirebasePlugin.onNotificationOpen(function(notification) {
            navigator.notification.alert(
                notification.body,  // message
                cerrar_push,        // callback
                notification.title, // title
                'Aceptar'           // buttonName
            );

           
         }, function(error) {
            // show_error(error);
         });*/

        setTimeout(function(){
            var user_id = item_auth.id;
            var security_token = item_auth.security_token;
            var client_id = localStorage.getItem("client_id");
            
            //----------- Preparando datos para envio -----------------------
            var listOperationModel = {user_id:user_id,security_token:security_token,client_id:client_id};
            var string_model = JSON.stringify(listOperationModel);
            
            var dataLabSecurity = new DatalabSecurity();
            var encripted_text = dataLabSecurity.procesar_datos_envio(string_model);          
            //---------- Fin preparacion de datos ----------------------------
    
            var url = base_url + 'rest_envio_dinero/get_beneficiarios_by_client';
            $.ajax
                ({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    async: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));                   
                    },
                    data: { data: JSON.stringify(encripted_text) },
                    success: function (response) {
                        $("#container_loading").hide();   
                        $("#content_list").show();   
                        lista_paises = response.lista_paises;
                        matriz_relaciones = response.matriz_relaciones; 
                        $("#msg-info").hide();
                        $("#content-beneficiario").show();  
                        if(response.status == 200){
                            pintar_lista_beneficiarios(response.lista);
                        }else if(response.status == 404){
                            navigator.notification.alert(
                                response.msg,  // message
                                alertDismissed,         // callback
                                'Error',            // title
                                'Aceptar'                  // buttonName
                            );
                        }else if(response.status == 204){ //lista vacia
                            $("#msg-info").show();
                        }else{ // 501 forbidden request
                            cerrar_session();
                        }

                    },
                    error: function (response) {
                        
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