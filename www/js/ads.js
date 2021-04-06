  //funcion de carga los anuncios del cliente

  const misAnuncios = () => {
      modal.show();
      document.querySelector('ons-navigator').bringPageTop('misAnuncios.html');
      $('#bodyModal').text("Cargando mis anuncios...");
      $('#areaMisAnuncios').empty();
      let item_auth = get_data_local();
      setTimeout(function() {
          let url = base_url + 'rest_anuncio/cargar_mis_anuncios';
          var userId = item_auth.user_id;
          var securityToken = item_auth.security_token;
          comienzaMisAnuncios = 0;
          limiteMisAnuncios = 11;
          data_to_server = {
              user_id: userId,
              security_token: securityToken,
              comienza: comienzaMisAnuncios,
              limite: limiteMisAnuncios
          };
          send_data_server(url, data_to_server, successMisAnuncios,
              error);
      }, 1000);
  }

  //funcion de respuesta al cargar los anuncios del cliente
  const successMisAnuncios = (response) => {
      let status = response.status;
      if (status == 200) {
          lista = response.lista;
          cargarMisAnuncios(lista);
      }
      if (status == 500) {
          modal.hide();
          navigator.notification.alert(
              'No tiene acceso a la plataforma', // message
              cerrar_push, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }
      if (status == 404 && !response.infinito) {
          modal.hide();
          $('#areaMisAnuncios').empty();
          $('#areaMisAnuncios').html("<ons-col><h3 style='text-align: center;'>No tiene anuncios creados</h3></ons-col>");
          navigator.notification.alert(
              'No hay anuncios disponible', // message
              cerrar_push, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }
  }

  //funcion que lista los anuncios
  const cargarMisAnuncios = (lista) => {
      let cadena = "";
      if (lista.length > 0) {
          for (let i = 0; i < lista.length; i++) {
              if (lista[i].anuncio_photo.indexOf("upload") >= 0) {
                  img = base_url + lista[i].anuncio_photo;
              } else {
                  img = lista[i].anuncio_photo;
              }
              let adsDestacado = ""
              if (lista[i].destacado == 1) {
                  adsDestacado =
                      "<span style='background: #00bb2d !important;font-size:10px !important ;position:absolute; top:2%;z-index:100; color:#fff !important; class='badge badge-danger'><strong> Destacado</strong></span>";
              } else {
                  adsDestacado = "";
              }
              let visibleAds = ""
              if (lista[i].is_active == 1) {
                  visibleAds = "<ons-icon  style='color:#2a3681'  size='16px, material:16px' icon='fa-eye'></ons-icon>"
              } else {
                  visibleAds = "<ons-icon  style='color:#2a3681'  size='16px, material:16px' icon='fa-eye-slash'></ons-icon>";
              }
              cadena = cadena +
                  "<ons-col width='50%'><ons-card onclick=accionesAnuncios('" + encodeB64Utf8(JSON.stringify(lista[i])) +
                  "') style='height:220px !important' id='verMiAnuncio_" +
                  lista[i].anuncio_id +
                  "' onclick=''><div class='row'><div class='col-12'><h4 id='tituloAnuncio" +
                  lista[i].anuncio_id +
                  "' style='font-size:12px !important; color:#80232b !important; line-height:1.5px !important; margin-top:2px !important;' class='card-title'><strong>" +
                  lista[i].titulo +
                  " </strong>" + visibleAds + " </h4></div><div class='col-12'>" +
                  adsDestacado +
                  "<div style='width:129.5px; height:129.5px'><img style='max-width:129.5px; position:relative; max-height:129.5px' class='rounded' src='" +
                  img +
                  "' alt='Card image cap'></div> <p class='text-center'><span style='margin-left:10% !important;margin-top:0px !important; background: #80232b !important' class='badge badge-danger'>$" +
                  parseFloat(lista[i]
                      .precio).toFixed(2) +
                  "</span><br><span><i class='fa fa-map-marker' aria-hidden='true'></i> " +
                  lista[i].ciudad +
                  "</span></p></div></div></ons-card></ons-col>";
          }
          $('#areaMisAnuncios').append(cadena);
          $('#areaMisAnuncios').show();
          if (validaMisAnuncios) {
              $('#btnAtrasAds').show();
              $('#btnBackAds').hide();
          } else {
              $('#btnAtrasAds').hide();
              $('#btnBackAds').show();
          }
          modal.hide();
      }
  }

  const accionesAnuncios = (obj) => {
      obj = decodeB64Utf8(obj);
      obj = JSON.parse(obj);
      adsObject = obj;
      if (obj.is_active == 1 && obj.destacado == 1) {
          $('#btnAccionesVer').show();
          $('#btnAccionesUpdate').show();
          $('#btnAccionesDesactivar').show();
          $('#btnAccionesDestacar').hide();
          $('#btnAccionesActivar').hide();
          $('#btnAccionesEliminar').show();
      }
      if (obj.is_active == 1 && obj.destacado == 0) {
          $('#btnAccionesVer').show();
          $('#btnAccionesUpdate').show();
          $('#btnAccionesDesactivar').show();
          $('#btnAccionesDestacar').show();
          $('#btnAccionesActivar').hide();
          $('#btnAccionesEliminar').show();
      }
      if (obj.is_active == 0) {
          $('#btnAccionesVer').hide();
          $('#btnAccionesUpdate').hide();
          $('#btnAccionesDesactivar').hide();
          $('#btnAccionesDestacar').hide();
          $('#btnAccionesActivar').show();
          $('#btnAccionesEliminar').show();
      }
      $('#btnAccionesVer').attr('onclick', 'detalleAnuncio("' + obj.anuncio_id + '")');
      $('#btnAccionesUpdate').attr('onclick', 'editarAnuncio("' + encodeB64Utf8(JSON.stringify(obj)) + '")');
      $('#btnAccionesDesactivar').attr('onclick', 'desactivarAnuncio("' + encodeB64Utf8(JSON.stringify(obj)) + '")');
      $('#btnAccionesDestacar').attr('onclick', 'pagar_subasta_inversa()');
      $('#btnAccionesActivar').attr('onclick', 'activarAnuncio("' + encodeB64Utf8(JSON.stringify(obj)) + '")');
      $('#btnAccionesEliminar').attr('onclick', 'eliminar_anuncio("' + encodeB64Utf8(JSON.stringify(obj)) + '")');
      app.showFromTemplate();
  }

  //funcion que se ejecuta para ver el detalle del anuncio
  const detalleAnuncio = (id) => {
      $('#bodyDetalleAnuncio').hide();
      app.hideFromTemplate();
      pushPage('#appNavigator', 'detalleAnuncio.html', '');
      modal.show();
      $('#bodyModal').text("Cargando detalle del anuncio...");
      setTimeout(function() {
          let url = base_url + 'rest_anuncio/detalle_anuncio';
          let userId = item_auth.user_id;
          let securityToken = item_auth.security_token;
          data_to_server = {
              user_id: userId,
              security_token: securityToken,
              id: id
          };
          send_data_server(url, data_to_server, successDetalleAnuncio,
              error);
      }, 1000);
  }

  //funcion que muestra el detalle del anuncio
  const successDetalleAnuncio = (response) => {
      modal.hide();
      let status = response.status;
      if (status == 200) {
          $('#tituloDetalleAnuncio').text(response.detalle.titulo);
          $('#categoriaDetalleAnuncio').html("<span><i class='fa fa-tag' aria-hidden='true'></i> " + response.detalle
              .categoria +
              "|" + response.detalle.subcategoria +
              "</span>&nbsp;<br><span><i class='fa fa-map-marker' aria-hidden='true'></i> " + response.detalle
              .ciudad +
              "</span> ");
          $('#descripcionDetalleAnuncio').html(response.detalle.descripcion);
          $('#precioAnuncio').text("Precio: $" + parseFloat(response.detalle.precio).toFixed(2));
          $('#numberWhatsaap').attr("href", "https://api.whatsapp.com/send?phone=593" + response.detalle.whatsapp);
          $('#whatsapp').html("<i class='fa fa-whatsapp' aria-hidden='true'></i> " + response.detalle.whatsapp + "");
          if (response.detalle.anuncio_photo.indexOf("upload") >= 0) {
              imagen1 = base_url + response.detalle.anuncio_photo;
          } else {
              imagen1 = response.detalle.anuncio_photo;
          }
          //slider
          let slider =
              "<ons-carousel-item><img style='width:100%' src='" +
              imagen1 + "'></ons-carousel-item>";
          if (response.foto_object.length > 0) {
              for (let i = 0; i < response.foto_object.length; i++) {
                  if (response.detalle.anuncio_photo.indexOf("upload") >= 0) {
                      imagen2 = base_url + response.foto_object[i].photo_anuncio;
                  } else {
                      imagen2 = response.foto_object[i].photo_anuncio;
                  }
                  slider = slider +
                      "<ons-carousel-item><img style='width:100%' src='" +
                      imagen2 + "'></ons-carousel-item>";
              }
          }
          $('#carousel_anuncio').append(slider);
          lat = response.detalle.lat;
          lng = response.detalle.lng;
          mapa =
              " <iframe width='280' height='170'frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='https://maps.google.com/maps?q=" +
              lat + "," + lng + "&hl=es&z=14&amp;output=embed'></iframe>";
          $('#map').html(mapa);
          getReverseGeocodingData(lat, lng);
          $('#bodyDetalleAnuncio').show();
      }
      if (status == 500) {
          navigator.notification.alert(
              'No tiene acceso a la plataforma', // message
              cerrar_push, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }
      if (status == 404) {
          navigator.notification.alert(
              'No hay detalle del anuncio', // message
              cerrar_push, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }
  }

  const editarAnuncio = (obj) => {
      obj = decodeB64Utf8(obj);
      obj = JSON.parse(obj);
      adsObject = obj;
      app.hideFromTemplate();
      document.querySelector('ons-navigator').bringPageTop('formularioEditar.html');
      modal.show();
      $('#bodyModal').text("Cargando anuncio...")
      setTimeout(function() {
          let url = base_url + 'rest_anuncio/subcategorias';
          let userId = item_auth.user_id;
          let securityToken = item_auth.security_token;
          data_to_server = {
              user_id: userId,
              security_token: securityToken,
              id: adsObject.cate_anuncio_id
          };
          send_data_server(url, data_to_server, successSubcategoriasAnuncios,
              error);
      }, 1000);
  }

  const successSubcategoriasAnuncios = (response) => {
      modal.hide();
      let status = response.status;
      if (status == 200) {
          lista = response.object;
          count = lista.length;
          cargarFormEditar(lista);
      }
      if (status == 500) {
          navigator.notification.alert(
              'No tiene acceso a la plataforma', // message
              cerrar_push, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }
      if (status == 404) {
          navigator.notification.alert(
              'No hay categorias', // message
              cerrar_push, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }
  }

  //funcion que carga el formulario del anuncio
  const cargarFormEditar = (lista) => {
      $('#labelTituloEdit').addClass('active');
      $('#labelDescripcionEdit').addClass('active');
      $('#labelPhoneEdit').addClass('active');
      $('#labelPrecioEdit').addClass('active');
      $('#tituloPublicarEdit').val("");
      $('#descripcionPublicarEdit').val("");
      $('#phonePublicarEdit').val("");
      $('#precioPublicarEdit').val("");
      $('#tituloPublicarEdit').val(adsObject.titulo_completo);
      $('#descripcionPublicarEdit').val(adsObject.descripcion);
      $('#phonePublicarEdit').val(adsObject.whatsapp);
      $('#precioPublicarEdit').val(adsObject.precio);
      let cadenaSub = '<ons-select style="margin-left:10%" id="selectSubcategoria">';
      if (lista.length > 0) {
          lista.forEach(element => {
              cadenaSub += '<option value="' + element.subcate_id + '">' + element.nombre + '</option>'
          });
      }
      cadenaSub += '</ons-select>'
      $('#bodySelectSub').html(cadenaSub);
      $('#selectSubcategoria').val(adsObject.subcate_id);
  }

  const desactivarAnuncio = (obj) => {
      obj = decodeB64Utf8(obj);
      obj = JSON.parse(obj);
      $('#mensajeDesactivar').html("<p style='text-align:center'>¿Desactivar anuncio?</p><p style='text-align:center'>" +
          obj.titulo + "</p>");
      adsId = obj.anuncio_id;
      modalDesactivarAds.show();
      app.hideFromTemplate();
  }

  const closeDesactivarAds = () => {
      modalDesactivarAds.hide();
  }

  const desactivarAds = () => {
      modalDesactivarAds.hide();
      modal.show();
      $('#bodyModal').text("Desactivando anuncio...");
      let item_auth = get_data_local();
      setTimeout(function() {
          let url = base_url + 'rest_anuncio/desactivar_anuncio';
          let userId = item_auth.user_id;
          let securityToken = item_auth.security_token;
          data_to_server = {
              user_id: userId,
              security_token: securityToken,
              anuncio_id: adsId
          };
          send_data_server(url, data_to_server, successDesactivarAds,
              error);
      }, 1000);
  }

  const successDesactivarAds = (response) => {
      let status = response.status;
      if (status == 200) {
          validaMisAnuncios = true;
          navigator.notification.alert(
              'Anuncio desactivado correctamente', // message
              misAnuncios, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }
      if (status == 500) {
          navigator.notification.alert(
              'No tiene acceso a la plataforma', // message
              cerrar_push, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }
      if (status == 404) {
          navigator.notification.alert(
              'Ocurrio un problema en la actualización del anuncio', // message
              cerrar_push, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }

  }

  const activarAnuncio = (obj) => {
      obj = decodeB64Utf8(obj);
      obj = JSON.parse(obj);
      $('#mensajeActivar').html("<p style='text-align:center'>¿Activar anuncio?</p><p style='text-align:center'>" +
          obj.titulo + "</p>");
      adsId = obj.anuncio_id;
      modalActivarAds.show();
      app.hideFromTemplate();
  }

  const closeActivarAds = () => {
      modalActivarAds.hide();
  }

  const activarAds = () => {
      modalActivarAds.hide();
      modal.show();
      $('#bodyModal').text("Activando anuncio...");
      let item_auth = get_data_local();
      setTimeout(function() {
          let url = base_url + 'rest_anuncio/activar_anuncio';
          let userId = item_auth.user_id;
          let securityToken = item_auth.security_token;
          data_to_server = {
              user_id: userId,
              security_token: securityToken,
              anuncio_id: adsId
          };
          send_data_server(url, data_to_server, succesActivarAds,
              error);
      }, 1000);
  }

  const succesActivarAds = (response) => {
      let status = response.status;
      if (status == 200) {
          validaMisAnuncios = true;
          navigator.notification.alert(
              'Anuncio activado correctamente', // message
              misAnuncios, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }
      if (status == 500) {
          navigator.notification.alert(
              'No tiene acceso a la plataforma', // message
              cerrar_push, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }
      if (status == 404) {
          navigator.notification.alert(
              'Ocurrio un problema en la actualización del anuncio', // message
              cerrar_push, // callback
              'Notificación', // title
              'Aceptar' // buttonName
          );
      }

  }