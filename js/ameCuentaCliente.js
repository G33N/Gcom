$(document).ready(function(){
    listarFacturasPendientes();
    $("#selectCliente").change(function(){
    listarFacturasPendientesCliente();
    });
});
function listarFacturasPendientesCliente(){
    selectCliente = $("#selectCliente").val();
        $.ajax({
                 type: 'POST',
                    url: "datos/ameCuentaCliente.php",
                    data: $(this).serialize() +"&orden="+1 +"&selectCliente="+selectCliente,
                    success: function(data){
                                            $('#facturasPendientes').html("");
                                            $('#modalPago').html("");
                                            json=jQuery.parseJSON(data);
                                            var objeto=json.listarFacturasPendientesCliente;
                                                for(i=0; i<= (objeto.length -1); i++){
                                                    id=objeto[i].id;
                                                    cliente=objeto[i].cliente_cuit;
                                                    formaPago=objeto[i].forma_pago_id;
                                                    estado=objeto[i].estado;
                                                    empleado=objeto[i].empleado;
                                                    observacion=objeto[i].observacion;
                                                    fecha=objeto[i].fecha;
                                                    total=objeto[i].total;
                                                    iva=objeto[i].iva;
                                                        $('#facturasPendientes').append('<tr><td>#'+id+'</td><td>'+cliente+'</td><td>'+fecha+'</td><td>$'+total+'</td><td style="text-align: center;"><a href="javascript:" data-toggle="modal" data-target="#myModal'+i+'"><i class="fa fa-edit"></i></a></td></tr>');
                                                        $('#modalPago').append('<div id="myModal'+i+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Pago de Factura</h4></div><div class="modal-body"><form action="datos/ameCuentaCliente.php" method="POST" class="form-horizontal" role="form" id="formModificarProducto"><div class="form-group"><label class="col-sm-2 control-label">Nro</label><div class="col-sm-4"><input type="text" class="form-control" name="id"  value="'+id+'" data-placement="bottom"></div><label class="col-sm-2 control-label">Cliente</label><div class="col-sm-4"><input type="text" class="form-control" name="cliente" value="'+cliente+'" data-placement="bottom" ></div></div><div class="form-group"><label class="col-sm-2 control-label">Forma de Pago</label><div class="col-sm-4"><input type="text" class="form-control" name="formaPago" value="'+formaPago+'" data-placement="bottom"></div><label class="col-sm-2 control-label">Observacion</label><div class="col-sm-4"><input type="text" class="form-control" name="observacion" value="'+observacion+'" data-placement="bottom"></div></div><div class="form-group"><label class="col-sm-2 control-label">Fecha</label><div class="col-sm-4"><input type="text" class="form-control" name="fecha" value="'+fecha+'" data-placement="bottom"></div><label class="col-sm-2 control-label">total</label><div class="col-sm-4"><input type="text" class="form-control" name="total" value="'+total+'" data-placement="bottom"><input type="hidden" name="txtid" value="'+id+'"></div></div><h4 class="page-header"></h4><div class="row form-group"><div class="col-sm-6 pull-right"><button type="submit" class="btn btn-success" name="orden" value="2">Pagar</button><button type="submit" class="btn btn-default" name="orden" value="3">Anular</button><button type="button" class="btn btn-danger" data-dismiss="modal">Salir</button></div></div></form></div></div></div></div>');
                                                }
                                            }
                    });
}
function listarFacturasPendientes(){
    selectCliente = $("#selectCliente").val();
        $.ajax({
                 type: 'POST',
                    url: "datos/ameCuentaCliente.php",
                    data: $(this).serialize() +"&orden="+0,
                    success: function(data){
                                            $('#facturasPendientes').html("");
                                            json=jQuery.parseJSON(data);
                                            var objeto=json.facturasPendientes;
                                                for(i=0; i<= (objeto.length -1); i++){
                                                    id=objeto[i].id;
                                                    cliente=objeto[i].cliente_cuit;
                                                    formaPago=objeto[i].forma_pago_id;
                                                    estado=objeto[i].estado;
                                                    empleado=objeto[i].empleado;
                                                    observacion=objeto[i].observacion;
                                                    fecha=objeto[i].fecha;
                                                    total=objeto[i].total;
                                                    iva=objeto[i].iva;
                                                        $('#facturasPendientes').append('<tr><td>#'+id+'</td><td>'+cliente+'</td><td>'+fecha+'</td><td>$'+total+'</td><td style="text-align: center;"><a href="javascript:" data-toggle="modal" data-target="#myModal'+i+'"><i class="fa fa-edit"></i></a></td></tr>');
                                                        $('#modalPago').append('<div id="myModal'+i+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Contact Form</h4></div><div class="modal-body"><form action="datos/ameCuentaCliente.php" method="POST" class="form-horizontal" role="form" id="formModificarProducto"><div class="form-group"><label class="col-sm-2 control-label">Nro</label><div class="col-sm-4"><input type="text" class="form-control" name="id"  value="'+id+'" data-placement="bottom"></div><label class="col-sm-2 control-label">Cliente</label><div class="col-sm-4"><input type="text" class="form-control" name="cliente" value="'+cliente+'" data-placement="bottom" ></div></div><div class="form-group"><label class="col-sm-2 control-label">Forma de Pago</label><div class="col-sm-4"><input type="text" class="form-control" name="formaPago" value="'+formaPago+'" data-placement="bottom"></div><label class="col-sm-2 control-label">Observacion</label><div class="col-sm-4"><input type="text" class="form-control" name="observacion" value="'+observacion+'" data-placement="bottom"></div></div><div class="form-group"><label class="col-sm-2 control-label">Fecha</label><div class="col-sm-4"><input type="text" class="form-control" name="fecha" value="'+fecha+'" data-placement="bottom"></div><label class="col-sm-2 control-label">total</label><div class="col-sm-4"><input type="text" class="form-control" name="total" value="'+total+'" data-placement="bottom"><input type="hidden" name="txtid" value="'+id+'"></div></div><h4 class="page-header"></h4><div class="row form-group"><div class="col-sm-6 pull-right"><button type="submit" class="btn btn-success" name="orden" value="2">Pagar</button><button type="submit" class="btn btn-default" name="orden" value="3">Anular</button><button type="button" class="btn btn-danger" data-dismiss="modal">Salir</button></div></div></form></div></div></div></div>');
                                                }
                                            }
                    });
}
