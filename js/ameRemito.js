$(document).ready(function(){
ordenFormularioFactura();
generarIdFactura();
selectFacturaIndex();
generarFecha();
listarDetalle();
listarRemitos();
enviarFormularioRemito();
enviarFormularioRemitoProducto();
controlSelectIva();
tipoComprobante();
    $('#selectIva').change(function(){
        selectIva = $('#selectIva').val();
    });
});
function tipoComprobante(){
    $('#tipoComprobante ').append('<option value="91">R</option>');
        tipo_cbte = $('#tipoComprobante').val();
        $('#tipo_cbte').val(tipo_cbte);
        controlSelectIva(tipo_cbte);
  }
function ordenFormularioFactura(){
    $('#g1').click(function(){
        orden = 1;
    });
    $('#g14').click(function(){
        orden = 14;
    });
}
function generarIdFactura(){
    $.ajax({
        type: 'POST',
        url: "datos/remitoId.php",
        data: $(this).serialize(),
        success: function(data){
                                json=jQuery.parseJSON(data);
                                var objeto=json.remitoGen;
                                        id=objeto[0].id;
                                        $("#facturaGen").append('Remito #'+id+'');
                                        $(".facturaGenHidden").val(id);
                                }
        });
}
function selectFacturaIndex(){
  $('#facturaIndex').change(function(){
    id=$('#facturaIndex').val();
    $('#facturaGen').html('');
    $('#facturaGen').append('Remito #'+id+'');
    $('#facturaGenHidden').val(id);
  });
}
function generarFecha(){
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = ((''+day).length<2 ? '0' : '') + day + '/' +
        ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
    $('#address').append('<h3 class="invoice-header" id="facturaGen"></h3><p> Fecha: '+output+'</p>');
}
function enviarFormularioRemito(){
    $('#formFactura').submit(function() {
        $.ajax({
            type: 'POST',
            url: "datos/ameRemito.php",
            data: $(this).serialize() +"&orden="+1,
            success:function(data){
                    if(data.success === true ){
                        listarDetalle();
                        alert(data.message);
                    }
                    if(data.success === false ){
                        alert(data.message);
                    }
                }
        });
        $('#formFactura')[0].reset();
        setTimeout(function abrirPDF(){
            window.open('facturacion/remito.pdf');
        }, 10000);
        return false;
    });
}
function enviarFormularioRemitoProducto(){
     $('#formRemitoProducto').submit(function() {
        $.ajax({
                type: 'POST',
                url: "datos/ameRemito.php",
                data: $(this).serialize() +"&orden="+11,
                success:function(data){
                    listarDetalle();
                    }
            });
            $('#formRemitoProducto')[0].reset();
            return false;
        });
}
function borrarFactura(cuit){
                            orden = 3;
                            delid = cuit;
                            $.ajax({
                                type: 'POST',
                                url: "datos/ameRemito.php",
                                data: $(this).serialize() +"&orden="+orden  +"&delid="+cuit,
                                // Mostramos un mensaje con la respuesta de PHP
                                success:function(data){
                                    if(data.success === true ){
                                        alert(data.message);
                                        //window.location = "index.html";
                                    }
                                    if(data.success === false ){
                                        alert(data.message);
                                    }
                                }
                            });
                            return false;
}
function borrarProductoFactura(id){
                            orden = 13;
                            delid = cuit;
                            $.ajax({
                                type: 'POST',
                                url: "datos/ameRemito.php",
                                data: $(this).serialize() +"&orden="+orden  +"&delid="+id,
                                // Mostramos un mensaje con la respuesta de PHP
                                success:function(data){
                                    listarDetalle();
                                }
                            });
                            return false;
}
function agregarProductoFactura(i){
                            $.ajax({
                                type: 'POST',
                                url: "datos/ameProducto.php",
                                data: $(this).serialize() +"&orden="+0,
                                success: function(data){
                                                        json=jQuery.parseJSON(data);
                                                        var objeto=json;
                                                        id=objeto[i].id;
                                                        proveedor_cuit=objeto[i].proveedor_cuit;
                                                        categoria_id=objeto[i].categoria_id;
                                                        codigo=objeto[i].codigo;
                                                        nombre=objeto[i].nombre;
                                                        detalle=objeto[i].detalle;
                                                        marca=objeto[i].marca;
                                                        stock=objeto[i].stock;
                                                        precio_venta=objeto[i].precio_venta;
                                                        precio_costo=objeto[i].precio_costo;
                                                        fecha_ingreso=objeto[i].fecha_ingreso;
                                                        $("#productoId").val(id);
                                                        $("#codigoProducto").val(codigo);
                                                        $("#nombreProducto").val(nombre);
                                                        $("#detalleProducto").val(detalle);
                                                        $("#precioVenta").val(precio_venta);
                                                        $("#modalProductoFactura").modal('toggle');
                                                    }
                            });
}
function listarDetalle(){
    $.ajax({
             type: 'POST',
                url: "datos/ameRemito.php",
                data: $(this).serialize() +"&orden="+10,
                success: function(data){
                                        $('#detalleRemitos').html("");
                                        json=jQuery.parseJSON(data);
                                        var objeto=json;
                                        var total=0;
                                            for(i=0; i<= (objeto.length -1); i++){
                                                id=objeto[i].id;
                                                codigoProducto=objeto[i].codigo_producto;
                                                facturaId=objeto[i].remito_id;
                                                nombreProducto=objeto[i].nombre_producto;
                                                detalleProducto=objeto[i].detalle_producto;
                                                cantidadProducto=objeto[i].cantidad;
                                                    $('#detalleRemitos').append('<tr><td class="m-ticker"><b>'+nombreProducto+'</b><span>'+detalleProducto+'</span></td><td>'+cantidadProducto+'</td><td>$</td><td>$</td><td style="text-align: center;"><a href="javascript:" class="g3" onClick="borrarProductoFactura('+id+');"><i class="fa fa-times"></i></a></td></tr>');
                                            }
                                            $('#selectIva').change(function(){
                                                total=parseFloat(total).toFixed(2);
                                                if(selectIva!=5 && selectIva!=4 && selectIva!=3){
                                                    totalIva = parseFloat(total*1.21).toFixed(2);
                                                }
                                                else{
                                                    totalIva = total;
                                                }
                                                $('#facturaTotal').val(totalIva);
                                                $('#tablaTotal').html("");
                                                $('#tablaTotal').append('<tr><td></td><td></td><td></td><td><b>$ '+totalIva+'</b></td></tr>');
                                            });
                                        }
                });
}
function listarRemitos(){
$.ajax({
         type: 'POST',
            url: "datos/ameRemito.php",
            data: $(this).serialize() +"&orden="+0,
            success: function(data){
                                    $('#tablaListarRemitos').html("");
                                    json=jQuery.parseJSON(data);
                                    var objeto=json;
                                        for(i=0; i<= (objeto.length -1); i++){
                                            id=objeto[i].id;
                                            factura_id=objeto[i].factura_id;
                                            cliente=objeto[i].cliente_cuit;
                                            formaPago=objeto[i].forma_pago;
                                            empleado=objeto[i].empleado;
                                            observacion=objeto[i].observacion;
                                            fecha=objeto[i].fecha;
                                                $('#tablaListarRemitos').append('<tr><td>#'+id+'</td><td>'+cliente+'</td><td>'+fecha+'</td><td> '+observacion+'</td><td style="text-align: center;"><a href="javascript:" onclick="imprimirRemito('+id+')" ><i class="fa fa-print"></i></a></td></tr>');
                                        }
                                    }
        });
}
function imprimirRemito(remito_id){
        $.ajax({
            type: 'POST',
            url: "datos/ameRemito.php",
            data: $(this).serialize() +"&orden="+15 +"&remito_id="+remito_id,
            success:function(data){
                    window.open('/Gcom/facturacion/remito.pdf');
                }
        });
}
function controlSelectIva(tipo_cbte){
  $('#selectIva').html("<option value=''>-</option>");
          if(tipo_cbte == 11 || tipo_cbte == 6 || tipo_cbte == 13 || tipo_cbte == 8 || tipo_cbte == 91){
            $('#selectIva ').append('<option value="3">Resp. Inscripto</option>');
            $('#selectIva ').append('<option value="3">Resp. Monotributo</option>');
            $('#selectIva ').append('<option value="4">Cons. Final</option>');
            $('#selectIva ').append('<option value="5">Exento</option>');
          }
          else if (tipo_cbte == 1 || tipo_cbte == 51 || tipo_cbte == 3 || tipo_cbte == 53) {
            $('#selectIva ').append('<option value="1">Resp. Inscripto</option>');
          }
}
$.ajax({
         type: 'POST',
            url: "datos/formaPago.php",
            data: $(this).serialize(),
            success: function(data){
                                    $('#selectFormaPago').html("<option value=''>-</option>");
                                    json=jQuery.parseJSON(data);
                                    var objeto=json;
                                        for(i=0; i<= (objeto.length -1); i++){
                                            id=objeto[i].id;
                                            detalle=objeto[i].detalle;
                                                $('#selectFormaPago ').append('<option value='+id+'>'+detalle+'</option>');
                                        }
                                    }
        });
