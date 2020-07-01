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

      /*  window.FirebasePlugin.onNotificationOpen(function(notification) {
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
            
            //----------- Preparando datos para envio -----------------------
            var listOperationModel = {user_id:user_id,security_token:security_token};
            var string_model = JSON.stringify(listOperationModel);
            
            var dataLabSecurity = new DatalabSecurity();
            var encripted_text = dataLabSecurity.procesar_datos_envio(string_model);          
            //---------- Fin preparacion de datos ----------------------------
            
            var url = base_url + 'rest_envio_dinero/verificar_cliente';
            
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
                        if(response.has_img == 0){
                            $("#msg-info").show();
                        }else{
                            $("#msg-info").hide();
                        }
                        has_img_account = response.has_img;
                        loader_img = response.url_img;
                        
                        if (response.status == 200) {

                            $("#register_client").show();
                            $("#not_register_user").hide();
                            localStorage.setItem('client_id',response.client_id);
                            
                            //mostrar los botones de operaciones del cliente
                        } else if(response.status == 404) {
                            pintar_actividades_economicas(response.lista);
                            //mostrar formulario de creacion de cliente

                            $("#not_register_user").show();
                            $("#register_client").hide();

                            llenar_combo_paises(response.paises,"pais_emision_documento");
                            llenar_combo_paises(response.paises,"pais_residencia");
                            llenar_combo_paises(response.paises,"pais_nacimiento");
                            llenar_combo_paises(response.paises,"nacionalidad");

                            var user_object = response.user_object;
                            var complete_name = user_object.name;
                            
                            var fullname = "";
                            var lastname = "";
                            
                            var separated_name = complete_name.split(" ");
                            if(separated_name.length == 4){
                                fullname = separated_name[0]+" "+separated_name[1];
                                lastname = separated_name[2]+" "+separated_name[3];
                            }else if(separated_name.length == 3){
                                fullname = separated_name[0];
                                lastname = separated_name[1]+" "+separated_name[2];
                            }else if(separated_name.length == 2){
                                fullname = separated_name[0];
                                lastname = separated_name[1];
                            }else{
                                fullname = separated_name[0];                            
                            }

                            $("#fullname").val(fullname);
                            $("#lastname").val(lastname);
                            $("#documento_identidad").val(user_object.cedula);
                            $("#email").val(user_object.email);

                        }else{
                            //error de autenticacion
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