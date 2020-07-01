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

    

   

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

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
       
        $("#btn-registrar").click(function () {
            var nombre = $("#name").val();
            var email = $("#email").val();
            var password = $("#password").val();
            var repeat_password = $("#repeat_password").val();
            var phone = $("#phone").val();

            if (nombre.trim().length > 0) {

                if (email.trim().length > 0) {

                    if (phone.trim().length > 0) {

                        if (password.trim().length > 0) {

                            if (ValidateEmail(email)) {

                                if (password.trim() == repeat_password.trim()) {

                                    //mandar a registrar al usuario

                                   // var url = base_url +'rest_user/register';
                                    var url = base_url + 'rest_user/index';
                                    $.ajax
                                        ({
                                            type: "POST",
                                            url: url,
                                            dataType: 'json',
                                            async: false,
                                            beforeSend: function (xhr) {
                                                xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));
                                            },
                                            data: { name: nombre, email: email, phone: phone, password: password, repeat_password: repeat_password },
                                            success: function (response) {
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
                                                    localStorage.setItem("security_token", token);
                                                    localStorage.setItem("id", user_id);

                                                    window.location.href = 'dash.html';
                                                }
                                            },
                                            error: function (error) {
                                               
                                            }
                                        });

                                } else {
                                    $("#msg_error").fadeIn(600);
                                    $("#msg_error_text").text("No coinciden las contraseñas");

                                    setTimeout(function () {
                                        $("#msg_error").fadeOut(600);
                                    }, 4000);
                                }

                            } else { //formato de email incorrecto
                                $("#msg_error").fadeIn(600);
                                $("#msg_error_text").text("Formato de email incorrecto");

                                setTimeout(function () {
                                    $("#msg_error").fadeOut(600);
                                }, 4000);
                            }

                        } else { // contraseña requerida
                            $("#msg_error").fadeIn(600);
                            $("#msg_error_text").text("La contraseña es requerida");

                            setTimeout(function () {
                                $("#msg_error").fadeOut(600);
                            }, 4000);
                        }
                    } else {
                        $("#msg_error").fadeIn(600);
                        $("#msg_error_text").text("El teléfono es requerido");

                        setTimeout(function () {
                            $("#msg_error").fadeOut(600);
                        }, 4000);
                    }

                } else { //email requerido
                    $("#msg_error").fadeIn(600);
                    $("#msg_error_text").text("El email es requerido");

                    setTimeout(function () {
                        $("#msg_error").fadeOut(600);
                    }, 4000);
                }

            } else { //el campo nombre se ha quedado vacío
                $("#msg_error").fadeIn(600);
                $("#msg_error_text").text("El nombre y apellidos son requeridos");

                setTimeout(function () {
                    $("#msg_error").fadeOut(600);
                }, 4000);
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