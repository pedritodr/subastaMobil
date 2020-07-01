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

    var pStart = {x: 0, y:0};
    var pStop = {x:0, y:0};

function swipeStart(e) {
    if (typeof e['targetTouches'] !== "undefined"){
        var touch = e.targetTouches[0];
        pStart.x = touch.screenX;
        pStart.y = touch.screenY;
    } else {
        pStart.x = e.screenX;
        pStart.y = e.screenY;
    }
}

function swipeEnd(e){
    if (typeof e['changedTouches'] !== "undefined"){
        var touch = e.changedTouches[0];
        pStop.x = touch.screenX;
        pStop.y = touch.screenY;
    } else {
        pStop.x = e.screenX;
        pStop.y = e.screenY;
    }

    swipeCheck();
}

function swipeCheck(){
    var changeY = pStart.y - pStop.y;
    var changeX = pStart.x - pStop.x;
    if (isPullDown(changeY, changeX) ) {
        window.location.reload();
    }
}

function isPullDown(dY, dX) {
    // methods of checking slope, length, direction of line created by swipe action 
    return dY < 0 && (
        (Math.abs(dX) <= 100 && Math.abs(dY) >= 300)
        || (Math.abs(dX)/Math.abs(dY) <= 0.3 && dY >= 60)
    );
}
   
   

    function pintar_item(lista_metodos_pago) {
        
        var cadena_resultante = "";
        if(lista_metodos_pago.length>0){
            for (var i = 0; i < lista_metodos_pago.length; i++) {
            
                    var item = "";
                    var onclick_function = "modal_delete('" + lista_metodos_pago[i].card_id + "');";
                    
                    item+='<div class="card" style="margin-bottom:5px;">';
                        item += '<div id="metodo_' + lista_metodos_pago[i].card_id+'" class="row" style="margin-right:0px;">';
                            item += '<div class="col">';               
                                item += '<label style="font-size:18px;color:#00579e;font-weight:bold; margin-left:10px;margin-top:10px;">' + lista_metodos_pago[i].titular + '</label> <br />';
                                
                                var nombre_imagen = "";
                                if(lista_metodos_pago[i].tipo_tarjeta == 'visa'){
                                    nombre_imagen = 'vi';
                                }else if(lista_metodos_pago[i].tipo_tarjeta == 'master'){
                                    nombre_imagen = 'mc';
                                }else if(lista_metodos_pago[i].tipo_tarjeta == 'diners'){
                                    nombre_imagen = 'diners';
                                }else if(lista_metodos_pago[i].tipo_tarjeta == 'discover'){
                                    nombre_imagen = 'discover';
                                }

                                item += '<img src="images/' + nombre_imagen + '.png" style="width:60px;margin-top:-5px;margin-bottom:10px;margin-left:10px;"  />';  

                            
                                
                                item += '<label style="font-size:16px; color:#2193D0;margin-left:15px;">************' + lista_metodos_pago[i].lastDigits +'</label><br />';
                                item += '<label style="font-size:18px;color:#00579e;font-weight:bold; margin-left:10px;margin-top:10px;">' + lista_metodos_pago[i].issuerName + '</label> <br />';
                               

                                item += '<a class="btn btn-outline-danger waves-effect btn-block" style="margin-left:10px;margin-right:10px;margin-bottom:10px;" onclick="' + onclick_function + '"><i class="fa fa-times"></i> Eliminar tarjeta</a>';
                            item += '</div>';
                        item += '</div>';
                    item += '</div>';
            
                cadena_resultante += item;
            }
            $("#marco-content").fadeIn(400);
            $("#container-lista").empty();
            $("#container-lista").html(cadena_resultante);
        }else{
            $("#marco-content").fadeIn(400);
            $("#container-lista").empty();
            $("#container-lista").html("<div class='alert alert-danger' style='text-align:center'>No existen tarjetas que mostrar</div>");
        }

        
    }



     
        

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        screen.orientation.lock("portrait");
        var item_auth = get_data_local();
        cargar_datos_perfil(); 
        if(!item_auth){
            cerrar_session();
        }

        document.addEventListener('touchstart', function(e){ swipeStart(e); }, false);
        document.addEventListener('touchend', function(e){ swipeEnd(e); }, false);

        
       /* window.FirebasePlugin.onNotificationOpen(function(notification) {
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
        var url = base_url + 'rest_card/get_tarjetas';

       
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
                    user_id:user_id,
                    security_token:security_token
                },
                success: function (response) {
                  
                    var card_list = response.cards;
                    $("#carga_content").hide();
                    $("#marco-content").show();
                                        
                    
                    $("#container_block").hide();                   
                    if (response.status == 200) {
                        

                        if (card_list.length > 0) {                            
                            pintar_item(card_list);    
                        } else {
                            $("#msg-error").hide();
                            $("#msg-info").fadeIn(400);
                        }
                        

                    } else {
                       cerrar_session();
                    }
                },
                error: function (response) {        
                  console.log(response);
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