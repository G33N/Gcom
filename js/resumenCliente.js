$(document).ready(function() {
    listarResumenCliente();

    var output = "01/01/2015";
    $('#fechaDesde').val(output);

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' +
        (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();
    $('#fechaHasta').val(output);

    $("#selectCliente").change(function() {
        fechaDesde = $("#fechaDesde").val();
        fechaHasta = $("#fechaHasta").val();
        listarResumenCliente(fechaDesde, fechaHasta);
    });
    $("#fechaDesde").change(function() {
        fechaDesde = $("#fechaDesde").val();
        fechaHasta = $("#fechaHasta").val();
        listarResumenCliente(fechaDesde, fechaHasta);
    });

    $("#fechaHasta").change(function() {
        fechaDesde = $("#fechaDesde").val();
        fechaHasta = $("#fechaHasta").val();
        listarResumenCliente(fechaDesde, fechaHasta);
    });
});

function listarResumenCliente(fechaDesde, fechaHasta) {
    selectCliente = $("#selectCliente").val();
    $.ajax({
        type: 'POST',
        url: "datos/resumenCliente.php",
        data: $(this).serialize() + "&selectCliente=" + selectCliente + "&fechaDesde=" + fechaDesde + "&fechaHasta=" + fechaHasta,
        success: function(data) {
            $('#recumenCuenta').html("");
            json = jQuery.parseJSON(data);
            var objeto = json;
            var saldo = 0;
            for (i = 0; i <= (objeto.length - 1); i++) {
                id = objeto[i].id;
                cliente = objeto[i].cliente_cuit;
                fecha = objeto[i].fecha;
                concepto = objeto[i].concepto;
                importe = objeto[i].importe;
                formaPago = objeto[i].forma_pago;
                saldo = objeto[i].saldo;
                if (formaPago == 2) {
                    importeClass = 'importeNegativo';
                } else {
                    importeClass = '';
                }
                if (saldo < 0) {
                    saldoClass = 'importeNegativo';
                } else {
                    saldoClass = '';
                }
                $('#recumenCuenta').append('<tr><td>' + fecha + '</td><td>#' + concepto + '</td><td><span class="' + importeClass + '">$' + importe + '</span></td><td><span class="' + saldoClass + '">$' + saldo + '</span></td>\</tr>');

            }
        }
    });
}
