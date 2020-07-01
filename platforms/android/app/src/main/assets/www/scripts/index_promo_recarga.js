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

                var foto_url = lista[i].photo.substring(2);
                var funcion_mostrar = 'mostrar_elemento("' + lista[i].promo_id + '");';
                var funcion_esconder = 'esconder_elemento("' + lista[i].promo_id + '");';
                item += "<div class='row' style='margin-right:0px;margin-top:5px;>";
                    item += "<div class='col text-center'>";
                        item += "<div class='card' style='margin-left:25px;'>";
                            item += "<img style='width:100%;' src= '" + foto_url+"' />";
                            item += "<div class='text-center'>";
                            item += "<h6 style='#09366e;font-weight:bold;margin-top:5px;'>" + lista[i].titulo + "</h6>";
                            item += "<p style='display:none;' id='desc_" + lista[i].promo_id + "' style='text- align:justify; '>" + lista[i].description + "</p > ";
                            item += "<p id='btn_mostrar_" + lista[i].promo_id +"'> <a style='width: 90%;' onclick='" + funcion_mostrar + "' class='btn btn-primary waves-effect' role='button'>Ver detalles</a> </p>";
                            item += "<p class='btn_escondido' id='btn_esconder_"+lista[i].promo_id +"'> <a style='width: 90%;'  onclick='" + funcion_esconder + "' class='btn btn-outline-info waves-effect' role='button'>Esconder detalles</a> </p>";
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
      
     /*   window.FirebasePlugin.onNotificationOpen(function(notification) {
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
            var url = base_url + 'rest_recargas/index_promo';

           

            
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
                       
                        var status = response.status;
                        if (status == 501) { // si existe error de autenticación
                            cerrar_session();
                        
                        } else {
                           //cargando promociones
                            $("#container_loading").hide();
                           for(var i = 0; i<response.lista.length;i++){
                                var lista_descripciones = new Array();
                                for(var j = 0;j<response.lista[i].descripciones.length;j++){
                                    var objeto_descripciones = {
                                        titulo: response.lista[i].descripciones[j].Headline,
                                        terminos_condiciones:response.lista[i].descripciones[j].TermsAndConditionsMarkDown,
                                        BonusValidity:response.lista[i].descripciones[j].BonusValidity,
                                        promotionType:response.lista[i].descripciones[j].PromotionType,
                                        idioma:response.lista[i].descripciones[j].LanguageCode
                                    };
                                    
                                    lista_descripciones.push(objeto_descripciones);
                                   
                                }
                                var objeto_promocion = {
                                    providerCode:response.lista[i].ProviderCode,
                                    fechaInicio: response.lista[i].StartUtc,
                                    fechaFin: response.lista[i].EndUtc,
                                    currency:response.lista[i].CurrencyIso,
                                    minimo_enviar:response.lista[i].MinimumSendAmount,
                                    descripciones: lista_descripciones,
                                    country_object:response.lista[i].country_object,
                                    providerName: response.lista[i].Name
                                };
                                
                                lista_promociones.push(objeto_promocion);
                                
                                
                           }

                           for(var k = 0; k<response.paises.length;k++){
                            lista_paises_recargas.push({name:response.paises[k].name,code:response.paises[k].alpha2Code,flag:response.paises[k].flag});
                           }

                           
                           pintar_paises();
                          
                          
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