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


    function isAvailableSuccess(result) {

        $("#area_sin_huella").hide();
        $("#area_huella").show();
       
    }

    function isAvailableError(message) {

        $("#area_sin_huella").show();
        $("#area_huella").hide();
    }

    function cerrar_esto(){
        $("#myModalLoadError").modal('show');
    }

    function geolocationSuccess(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $.get("https://api.opencagedata.com/geocode/v1/json?q="+lat+"+"+lng+"&pretty=1&key=e2bedd788726473e8b68334f0713b754", function(data, status){
       
            if(data.status.code == 200){
                var result_country = data.results[0].components.country_code.toUpperCase();            
                var index_country = find_available_country(result_country);               
                if(index_country == -1){
                    navigator.notification.alert(
                        'El país desde el que se conecta no tiene servicio aún para PAGAHOY.',  // message
                        cerrar_esto,        // callback
                        'País sin servicio', // title
                        'Aceptar'           // buttonName
                    );
                }else{
                    localStorage.setItem("country_code",result_country);
                    localStorage.setItem("country_flag",available_countries[index_country].flag);

                    
                }
            }else{
                navigator.notification.alert(
                    'Por el momento no puede utilizar los servicios de PagaHoy. Intente mas tarde',  // message
                    cerrar_esto,        // callback
                    'Servicio no disponible en este momento', // title
                    'Aceptar'           // buttonName
                );
            }
       
        });
    }

    function geolocationError(error){
        navigator.notification.alert(
            'Por el momento no puede utilizar los servicios de PagaHoy. Intente activar el GPS e intente de nuevo.',  // message
            cerrar_esto,        // callback
            'Servicio no disponible en este momento', // title
            'Aceptar'           // buttonName
        );
    }

    function onDeviceReady() {
        screen.orientation.lock("portrait");

        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);


        var item_auth = get_data_local();
        if(item_auth && item_auth.id > 0){
            window.location.href = 'dash.html';
        }


        var item_auth = get_data_local();
            if(item_auth){               
                
                if(item_auth.role_id == 4){
                    window.location.href = 'dash.html';
                }else if(item_auth.role_id == 11){
                    window.location.href = 'dash_repartidor.html';
                }else if(item_auth.role_id == 5){
                    window.location.href = 'dash_tendero.html';
                }
            }

        navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError);      

        $("#area_sin_huella").show();
        $("#logo_3x1").show();
        /*
        FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);
       // $("#area_sin_huella").show();

        $("#btn-autenticar_huella").click(function () {
            var plataforma = cordova.platformId;
            var email = $("#email_huella").val();
            var password = $("#password_huella").val();

            $("#container_block").show();

            $.ajax
                ({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    async: false,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));
                    },
                    data: { email: btoa(email), password: btoa(password), platform_id: btoa(plataforma) },
                    success: function (response) {
                        console.log(response);
                        $("#container_block").hide();
                        var status = response.status;
                        if (status == 404) { // si existe error de autenticación
                            $("#msg_error").fadeIn(600);
                            $("#msg_error_text").text(response.msg);
                            setTimeout(function () {
                                $("#msg_error").fadeOut(600);
                            }, 4000);
                        } else {
                            var token = response.security_token;
                            var user_id = response.id;
                            save_data_local("security_token", token);
                            save_data_local("id", user_id);
                            save_data_local('email', response.email);
                            window.location.href = 'dash.html';
                        }
                    },
                    error: function (response) {
                        console.log(response);
                        $("#container_block").hide();
                        $("#msg_error").fadeIn(600);
                        $("#msg_error_text").text('Error de conexión con la plataforma');
                        setTimeout(function () {
                            $("#msg_error").fadeOut(600);
                        }, 4000);
                    }
                });
        });
        */
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

              
       
    };


  

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
} )();