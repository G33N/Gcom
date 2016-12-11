$(document).ready(function(){
ordenFormularioFactura();
generarIdFactura();
selectFacturaIndex();
generarFecha();
listarDetalle();
enviarFormularioFactura();
enviarFormularioFacturaProducto();
enviarFormularioAnularFactura();
selectAnulartFactura();
controlSelectIva();
tipoComprobante();
    $('#selectIva').change(function(){
        selectIva = $('#selectIva').val();
    });
});
function tipoComprobante(){
    $('#tipoComprobante ').append('<option value="">-</option><option value="1">A</option><option value="6">B</option>');
    $('#tipoComprobante').change(function(){
        tipo_cbte = $('#tipoComprobante').val();
        $('.tipo_cbte').val(tipo_cbte);
        controlSelectIva(tipo_cbte);
    });
    $('#tipoComprobanteCredito ').append('<option value="">-</option><option value="3">A</option><option value="8">B</option>');
    $('#tipoComprobanteCredito').change(function(){
        tipo_cbte = $('#tipoComprobanteCredito').val();
        $('.tipo_cbte').val(tipo_cbte);
        controlSelectIva(tipo_cbte);
    });
  }
function ordenFormularioFactura(){
    $('#g1').click(function(){
        orden = 1;
    });
    $('#g11').click(function(){
        orden = 11;
    });
    $('#g14').click(function(){
        orden = 14;
    });
}
function generarIdFactura(){
    $.ajax({
        type: 'POST',
        url: "datos/facturaId.php",
        data: $(this).serialize(),
        success: function(data){
                                json=jQuery.parseJSON(data);
                                var objeto=json.facturaGen;
                                        id=objeto[0].id;
                                        $("#facturaGen").append('Factura #'+id+'');
                                        $(".facturaGenHidden").val(id);
                                }
        });
}
function selectFacturaIndex(){
  $('#facturaIndex').change(function(){
    id=$('#facturaIndex').val();
    $('#facturaGen').html('');
    $('#facturaGen').append('Factura #'+id+'');
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
function enviarFormularioFactura(){
    $('#formFactura').submit(function() {
        $.ajax({
            type: 'POST',
            url: "datos/ameFactura.php",
            data: $(this).serialize() +"&orden="+orden,
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
        showLoader(13000);
        setTimeout(function abrirPDF(){
            window.open('facturacion/factura.pdf');
        }, 13000);
        return false;
    });
}
function showLoader(time){
    $("#fakeloader").fakeLoader({
    timeToHide:time, //Time in milliseconds for fakeLoader disappear
    zIndex:"999",//Default zIndex
    spinner:"spinner7",//Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7'
    bgColor:"#5A83A4", //Hex, RGB or RGBA colors
    });
}
function imprimirFactura(facturaId){
        $.ajax({
            type: 'POST',
            url: "datos/ameFactura.php",
            data: $(this).serialize() +"&orden="+15 +"&facturaId="+facturaId,
            success:function(data){
                    window.open('/Gcom/facturacion/factura.pdf');
                }
        });
}
function enviarFormularioFacturaProducto(){
     $('#formFacturaProducto').submit(function() {
        $.ajax({
                type: 'POST',
                url: "datos/ameFactura.php",
                data: $(this).serialize() +"&orden="+11,
                success:function(data){
                    listarDetalle();
                    }
            });
            $('#formFacturaProducto')[0].reset();
            return false;
        });
}
function borrarFactura(cuit){
                            orden = 3;
                            delid = cuit;
                            $.ajax({
                                type: 'POST',
                                url: "datos/ameFactura.php",
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
                                url: "datos/ameFactura.php",
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
                url: "datos/ameFactura.php",
                data: $(this).serialize() +"&orden="+10,
                success: function(data){
                                        $('#tablaDetalle').html("");
                                        json=jQuery.parseJSON(data);
                                        var objeto=json;
                                        var total=0;
                                            for(i=0; i<= (objeto.length -1); i++){
                                                id=objeto[i].id;
                                                codigoProducto=objeto[i].producto_id;
                                                facturaId=objeto[i].factura_id;
                                                nombreProducto=objeto[i].nombre_producto;
                                                detalleProducto=objeto[i].detalle_producto;
                                                precioVenta=objeto[i].precio_venta;
                                                cantidadProducto=objeto[i].cantidad;
                                                subtotal=objeto[i].total;
                                                total=parseFloat(total)+parseFloat(subtotal);
                                                    $('#tablaDetalle').append('<tr><td class="m-ticker"><b>'+nombreProducto+'</b><span>'+detalleProducto+'</span></td><td>'+cantidadProducto+'</td><td>$ '+precioVenta+'</td><td>$ '+subtotal+'</td><td style="text-align: center;"><a href="javascript:" class="g3" onClick="borrarProductoFactura('+id+');"><i class="fa fa-times"></i></a></td></tr>');
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
$.ajax({
         type: 'POST',
            url: "datos/ameFactura.php",
            data: $(this).serialize() +"&orden="+0,
            success: function(data){
                                    $('#tablaListarFacturas').html("");
                                    $('#facturaIndex').html("<option value=''>-</option>");
                                    json=jQuery.parseJSON(data);
                                    var objeto=json;
                                        for(i=0; i<= (objeto.length -1); i++){
                                            id=objeto[i].id;
                                            cliente=objeto[i].cliente_cuit;
                                            formaPago=objeto[i].forma_pago_id;
                                            estado=objeto[i].estado;
                                            empleado=objeto[i].empleado;
                                            observacion=objeto[i].observacion;
                                            fecha=objeto[i].fecha_cbte;
                                            total=objeto[i].total;
                                            iva=objeto[i].iva;
                                                $('#tablaListarFacturas ').append('<tr><td>#'+id+'</td><td>'+cliente+'</td><td>'+fecha+'</td><td>$ '+total+'</td><td style="text-align: center;"><a href="javascript:" onclick="imprimirFactura('+id+')" ><i class="fa fa-print"></i></a></td><td style="text-align: center;"><a href="javascript:" onclick="imprimirFactura('+id+')" ><i class="fa fa-undo"></i></a></td><td style="text-align: center;"><a href="reFacturarGcom('+id+')" ><i class="fa fa-times"></i></a></td></tr>');
                                                $('#facturaIndex ').append('<option value='+id+'>'+id+'</option>');
                                        }
                                    }
        });
function controlSelectIva(tipo_cbte){
  $('#selectIva').html("<option value=''>-</option>");
          if(tipo_cbte == 11 || tipo_cbte == 6 || tipo_cbte == 13 || tipo_cbte == 8){
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
function selectAnulartFactura(){
  $('#facturaIndex ').change(function(){
      facturaId = $('#facturaIndex').val();
      leer_json(facturaId);
  });
}
function leer_json(id) {
                    $.getJSON('facturacion/facturas/factura-'+id+'.json', function(factura) {
                      $('#tablaDetalle').html('');
                      $('#selectCliente').html('<option value='+factura[0].nro_doc+'>'+factura[0].nombre_cliente+'</option>');
                      $('#selectFormaPago').html('<option value='+factura[0].forma_pago+'>'+factura[0].forma_pago+'</option>');
                      letra_cbte='';
                      if(factura[0].tipo_cbte==1){
                        letra_cbte='A';
                        tipo_cbte=3;
                      }
                      else if (factura[0].tipo_cbte==6){
                        letra_cbte='B';
                        tipo_cbte=8;
                      }
                      else if (factura[0].tipo_cbte==11){
                        letra_cbte='C';
                        tipo_cbte=13;
                      }
                      else if (factura[0].tipo_cbte==51){
                        letra_cbte='M';
                        tipo_cbte=53;
                      }
                      $('#tipoComprobanteCredito').html('<option value='+tipo_cbte+'>'+letra_cbte+'</option>');
                      controlSelectIva(tipo_cbte);
                      $('#observacion').val(factura[0].obs_generales);
                      $('#addressCliente').html('<address><strong>'+factura[0].nombre_cliente+'</strong><br>'+factura[0].domicilio_cliente+'<br>CUIT: '+factura[0].nro_doc+'<br></address>');
                      $('#address').html('<h3 class="invoice-header" id="facturaGen">Factura #'+factura[0].id+'</h3><p> CAE: '+factura[0].cae+'</p><p> Fecha Vto: '+factura[0].fecha_vto+'</p>');
                      $.each(factura[0].detalles, function(index, detalles) {
                        $('#tablaDetalle').append('<tr><td class="m-ticker"><b>'+detalles.ds+'</b><span>'+detalles.ds+'</span></td><td>'+detalles.qty+'</td><td>$ '+detalles.precio+'</td><td>$ '+detalles.importe+'</td><td style="text-align: center;"href="javascript:" class="g3" onClick=""><i class="fa fa-times"></i></a></td></tr>');
                    });
                  });
}
function enviarFormularioAnularFactura(){
    $('#formAnularFactura').submit(function() {
        $.ajax({
            type: 'POST',
            url: "datos/ameFactura.php",
            data: $(this).serialize() +"&orden="+16,
            success:function(data){
                    if(data.success === true ){
                        alert(data.message);
                    }
                    if(data.success === false ){
                        alert(data.message);
                    }
                }
        });
        setTimeout(function abrirPDF(){
            window.open('facturacion/factura.pdf');
        }, 6000);
        return false;
    });
  }
  function reFacturarGcom(facturaId){
        $.ajax({
            type: 'POST',
            url: "datos/ameFactura.php",
            data: $(this).serialize() +"&orden="+17 +"&facturaId="+facturaId,
            success:function(data){
                    window.open('/Gcom-ToyotaCipolletti/facturacion/factura.pdf');
                }
        });
}
// function LoadBootstrapValidatorScript(callback){
//  if (!$.fn.bootstrapValidator){
//      $.getScript('plugins/bootstrapvalidator/bootstrapValidator.min.js', callback);
//  }
//  else {
//      if (callback && typeof(callback) === "function") {
//          callback();
//      }
//  }
// }
// function DemoFormValidator(){
//   $('#formFactura').bootstrapValidator({
//     message: 'Este valor no es valido.',
//     fields: {
//       tipo_cbte: {
//              validators: {
//                  notEmpty: {
//                      message: 'El tipo de comprobante es requerido.'
//                  }
//              }
//          },
//       clienteCuit: {
//              validators: {
//                  notEmpty: {
//                      message: 'El cliente es requerido.'
//                  }
//              }
//          },
//       formaPago: {
//              validators: {
//                  notEmpty: {
//                      message: 'La forma de pago es requerida.'
//                  }
//              }
//          },
//       iva: {
//              validators: {
//                  notEmpty: {
//                      message: 'El iva del cliente es requerido.'
//                  }
//              }
//          },
//       observacion: {
//              message: 'La observacion no es valida.',
//              validators: {
//                  notEmpty: {
//                      message: 'La observacion no puede estar vacia.'
//                  },
//                  stringLength: {
//                      min: 6,
//                      max: 30,
//                      message: 'Debe tener entre 6 y 30 caracteres.'
//                  },
//                  regexp: {
//                      regexp: /^[a-zA-Z0-9_\.\s\-\/]+$/,
//                      message: 'Esta usando caracteres no permitidos. Solo se permiten - o /.'
//                  }
//              }
//          }
//     }
// });
// $('#formFacturaProducto').bootstrapValidator({
//   message: 'Este valor no es valido.',
//   fields: {
//     nombreProducto: {
//       validators: {
//         notEmpty: {
//           message: 'El tipo de comprobante es requerido.'
//         }
//       }
//     },
//     observacion: {
//       message: 'La observacion no es valida.',
//       validators: {
//         notEmpty: {
//           message: 'La observacion no puede estar vacia.'
//         },
//         stringLength: {
//           min: 1,
//           max: 30,
//           message: 'Debe tener entre 1 y 30 caracteres.'
//         },
//         regexp: {
//           regexp: /^[0-9]+$/,
//           message: 'Esta usando caracteres no permitidos.'
//         }
//       }
//     }
//   }
// });
// }