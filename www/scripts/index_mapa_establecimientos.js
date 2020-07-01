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

    var miPosicionOk = function (pos) {
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
    }

    function pintar_lista_tiendas(lista){       
        var content = "";
        for(var i=0;i<lista.length;i++){
            content+="<div class='card' style='margin-bottom:5px;'>";

                content+="<div class='row'>";

                    content+="<div class='col-3 text-center' >";
                        content+="<img src='"+lista[i].url_photo+"' style='width:60px; height:60px;margin-left:5px;margin-top:5px;' />"
                    content+="</div>";

                    content+="<div class='col-9'>";
                        content+="<span style='color:#0F3268;'><i class='fa fa-building'></i> "+lista[i].nombre_tienda+"</span><br />";
                        content+="<span style='color:#2193D0;'><i class='fa fa-id-card'></i> "+lista[i].identificacion+"</span><br />";
                        content+="<span style='color:#0F3268;'><i class='fa fa-calendar'></i> "+lista[i].fecha_creacion+"</span>";  
                    content+="</div>";              
                content+="</div>";
            content+="</div>";
        }

        $("#lista_ubicaciones").html(content);
    }



    var onSuccess = function (position) {
        
        lat = position.coords.latitude;
        lng = position.coords.longitude;


        var item_auth = get_data_local();
        if(!item_auth){
            cerrar_session();
        }

        setTimeout(function(){
            var security_token = item_auth.security_token;
            var puser_id = item_auth.id;
            var url = base_url + 'rest_tienda/loading_tiendas_mapa';
            distancia_radio = 5;
           
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
                        user_id:puser_id,
                        security_token:security_token,
                        lat:lat,
                        lng:lng,
                        radio:distancia_radio
                    },
                    success: function (response) {
                        
                        var lista_positions = response.tiendas;
                        $("#myModalLoad").modal('hide');
                        pintar_lista_tiendas(response.tiendas);

                        $("#container_loading").hide();
                        $("#section_mapa").show();
                        if (response.status == 200) {
                           
                            map = L.map('map_container').setView([lat, lng], 16);
                          
                            map.on('click', function(e) { 
                                lat = e.latlng.lat;
                                lng = e.latlng.lng;

                                $("#questionCenter").modal('show');
                                  
                            });
                            

                            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            }).addTo(map);
                            
                            var greenIcon = L.icon({
                                iconUrl: 'images/posicion_actual.png',
                                iconSize:     [64, 64], // size of the icon
                                
                            });
                            var marker = L.marker([lat, lng],{icon:greenIcon}).addTo(map);
                            mapMarkers.push(marker);
                            
                            
                            var lista_info_windows = new Array();
                            
                            for (var i = 0; i < lista_positions.length; i++) {
                                 
                                var icon_normal = L.icon({
                                    iconUrl: 'images/tienda_sin_retiro.png',
                                    iconSize:     [64, 64], // size of the icon			
                                });
                                
                                var marker2 = L.marker([parseFloat(lista_positions[i].lat), parseFloat(lista_positions[i].lng)],{icon:icon_normal}).addTo(map).bindPopup(lista_positions[i].nombre_tienda);
                                mapMarkers.push(marker2);                                
                            }

                                //initMap(response);



                            } else {
                                cerrar_session();
                            }
                        
                    },
                    error: function (response) {
                        show_error(response);
                    }
                });
           },1000);  

		
		
		
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('No se puede detectar la posición. Por favor revise que tenga el GPS activado y vuelva a intentar');
		window.location.href = 'mapa_establecimientos.html';
    }

    function cargar_mapas() {
        $("#myModalLoad").modal('show');

        setTimeout(function(){

            $("#category_sections").hide();
            $("#container_block").show();
            $("#section_mapa").hide();


            var item_auth = get_data_local();
                    
            if(!item_auth){
                cerrar_session();
            }else{
               
            }

        

            var url_method = base_url + 'rest_tienda/loading_tiendas_by_category';
            var security_token = item_auth.security_token;
            var puser_id = item_auth.id;

            navigator.geolocation.getCurrentPosition(miPosicionOk, onError);

            //----------- Preparando datos para envio -----------------------
            var listMapaModel = {user_id:puser_id,security_token:security_token,category_id:pcategory_id};
            var string_model = JSON.stringify(listMapaModel);
            
            var dataLabSecurity = new DatalabSecurity();
            var encripted_text = dataLabSecurity.procesar_datos_envio(string_model);          
            //---------- Fin preparacion de datos ----------------------------        

            
                $.ajax
                ({
                    type: "POST",
                    url: url_method,
                    dataType: 'json',
                    async: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(user_rest + ":" + pass_rest));                    
                    },
                    data: { data: JSON.stringify(encripted_text) },
                    success: function (response) {
                    
                        $("#myModalLoad").modal('hide');

                        $("#category_sections").hide();
                        $("#container_block").hide();
                        $("#section_mapa").show();
                        if (response.status == 200) {
                            initMap(response);
                        } else {
                            cerrar_session();
                        }

                    },
                    error: function (response) {
                       
                    }
                });
        },1000);
        
        

        
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

        
         
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
       
       
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
} )();