const cargarHistorial = () => {
    pushPage('#appNavigator', 'mis_pagos.html', '');
    modal.show();
    $('#bodyModal').text("Cargando historial de pagos...");
    let item_auth = get_data_local();
    setTimeout(function() {
        let url = base_url + 'rest_payment/mis_pagos';
        let userId = item_auth.user_id;
        let securityToken = item_auth.security_token;
        data_to_server = {
            user_id: userId,
            security_token: securityToken,
            anuncio_id: ads_id
        };
        send_data_server(url, data_to_server, successCargarPagos,
            error);
    }, 1000);
}

const successCargarPagos = (response) => {
    let status = response.status;
    let listaPagos = response.pagos;
    if (status == 200) {
        cargar_pagos(listaPagos);
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
    if (status == 404) {
        modal.hide();
        $('#headerListaPagos').empty();
        $('#headerListaPagos').html("<h3 style='text-align: center;'>No tiene pagos realizados</h3>");
        navigator.notification.alert(
            'No tiene pagos realizados.', // message
            cerrar_push, // callback
            'Notificación', // title
            'Aceptar' // buttonName
        );
    }

}

const cargar_pagos = (listaPagos) => {
    $('#headerListaPagos').empty();
    let cadenaPagos = "<ons-list-header>Historial de pagos</ons-list-header>";
    for (let i = 0; i < listaPagos.length; i++) {
        let estado_pago = "";
        if (listaPagos[i].status == 0) {
            estado_pago = "Nuevo pago";
        } else if (listaPagos[i].status == 1) {
            estado_pago = "Aprobado";
        } else if (listaPagos[i].status == 2) {
            estado_pago = "Cancelada por el cliente ó rechazada";
        } else if (listaPagos[i].status == 3) {
            estado_pago = "Pendiente por aprobar";
        } else {
            estado_pago = "Reverso";
        }
        cadenaPagos = cadenaPagos + "<ons-list-item expandable>Referencia: " + listaPagos[i].reference + " valor: $" +
            parseFloat(listaPagos[i].monto).toFixed(2) +
            "<div class='expandable-content'><p style='text-align:center'>Estado: " + estado_pago +
            "</p><p style='text-align:center'>Detalle: " + listaPagos[i].detalle +
            "</p><p style='text-align:center'>Fecha: " + listaPagos[i].date + "</p></div></ons-list-item>";
    }
    $('#headerListaPagos').append(cadenaPagos);
    modal.hide();
}