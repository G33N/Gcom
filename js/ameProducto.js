$(document).ready(function(){
ordenFormularioProducto();
listarProducto();
listarProveedor();
listarCategoria();
enviarFormularioProducto();
formProductoValidador();
});

function ordenFormularioProducto(){
    $('#g1').click(function(){
        orden = 1;
    });
}
function enviarFormularioProducto(){
    $('#formProducto').submit(function() {
        $.ajax({
            type: 'POST',
            url: "datos/ameProducto.php",
            data: $(this).serialize() +"&orden="+orden,
            success:function(data){
                    if(data.success === true ){
                        listarProducto();
                        alert(data.message);
                    }
                    if(data.success === false ){
                        alert(data.message);
                    }
                }
        });
        $('#formProducto')[0].reset();
        return false;
    });
}
function borrarProducto(id){
                            orden = 3;
                            delid = cuit;
                            $.ajax({
                                type: 'POST',
                                url: "datos/ameProducto.php",
                                data: $(this).serialize() +"&orden="+orden  +"&delid="+id,
                                // Mostramos un mensaje con la respuesta de PHP
                                success:function(data){
                                    if(data.success === true ){
                                        listarProducto();
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
function listarProveedor(){
    $.ajax({
             type: 'POST',
                url: "datos/ameProveedor.php",
                data: $(this).serialize() +"&orden="+0,
                success: function(data){
                                        $('#selectProveedor').html("");
                                        json=jQuery.parseJSON(data);
                                        var objeto=json;
                                            for(i=0; i<= (objeto.length -1); i++){
                                                cuit=objeto[i].cuit;
                                                tipo_documento=objeto[i].tipo_documento;
                                                nombre=objeto[i].nombre;
                                                tipo=objeto[i].tipo;
                                                direccion=objeto[i].direccion;
                                                localidad=objeto[i].localidad;
                                                telefono=objeto[i].telefono;
                                                mail=objeto[i].mail;
                                                    $('#selectProveedor').append('<option value="'+cuit+'">'+nombre+'</option>');
                                            }
                                        }
    });
}
function listarCategoria(){
    $.ajax({
            type: 'POST',
            url: "datos/ameCategoria.php",
            data: $(this).serialize() +"&orden="+0,
            success: function(data){
                                    $('#selectCategoria').html("");
                                    json=jQuery.parseJSON(data);
                                    var objeto=json;
                                        for(i=0; i<= (objeto.length -1); i++){
                                            id=objeto[i].id;
                                            detalle=objeto[i].detalle;
                                                $('#selectCategoria').append('<option value="'+id+'">'+detalle+'</option>');
                                        }
                                    }
    });
}
function listarProducto(){
    $.ajax({
            type: 'POST',
            url: "datos/ameProducto.php",
            data: $(this).serialize() +"&orden="+0,
            success: function(data){
                $('#tablaProducto').html("");
                json=jQuery.parseJSON(data);
                var objeto=json;
                    for(i=0; i<= (objeto.length -1); i++){
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
                        $('#tablaProducto').append('<tr><td>'+codigo+'</td><td>'+nombre+'</td><td>'+detalle+'</td><td>'+marca+'</td><td>'+stock+'</td><td>'+precio_costo+'</td><td>'+precio_venta+'</td><td style="text-align: center;"><a href="javascript:" id="modalPedido" data-toggle="modal" data-target="#myModal'+i+'"><i class="fa fa-edit"></i></a><td style="text-align: center;"><a href="javascript:" class="g3" onClick="borrarProducto('+id+')"><i class="fa fa-times"></i></a></td></tr>');
                        $('#tablaProductoFactura').append('<tr><td>'+codigo+'</td><td>'+nombre+'</td><td>'+detalle+'</td><td>'+marca+'</td><td>'+stock+'</td><td>'+precio_venta+'</td><td style="text-align: center;"><a onClick="agregarProductoFactura('+i+')" href="javascript:"><i class="fa fa-edit"></i></a></tr>');
                        $('#modalProducto').append('<div id="myModal'+i+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Modificar Producto</h4></div><div class="modal-body"><form action="datos/ameProducto.php" method="POST" class="form-horizontal" role="form" id="formModificarProducto"><div class="form-group"><label class="col-sm-2 control-label">Nombre</label><div class="col-sm-4"><input type="text" class="form-control" name="txtnom" value="'+nombre+'" data-placement="bottom"></div><label class="col-sm-2 control-label">Detalle</label><div class="col-sm-4"><input type="text" class="form-control" name="txtdet" value="'+detalle+'" data-placement="bottom"></div></div><div class="form-group"><label class="col-sm-2 control-label">Marca</label><div class="col-sm-4"><input type="text" class="form-control" name="txtmar" value="'+marca+'" data-placement="bottom"></div><label class="col-sm-2 control-label">Stock</label><div class=" col-sm-4"><input type="text" class="form-control" name="txtsto" value="'+stock+'" data-placement="bottom"></div></div><div class="form-group"><label class="col-sm-2 control-label">Precio costo</label><div class="col-sm-4"><input type="text" class="form-control" name="txtcos" value="'+precio_costo+'" data-placement="bottom"></div><label class="col-sm-2 control-label">Precio venta</label><div class="col-sm-4"><input type="text" class="form-control" name="txtven" value="'+precio_venta+'" data-placement="bottom"><input type="hidden" name="txtid" value="'+id+'"></div></div><h4 class="page-header"></h4><div class="row form-group"><div class="col-sm-6 pull-right"><button type="submit" class="btn btn-success" name="orden" value="2">Modificar</button><button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button></div></div></form></div></div></div></div>');
                                            }

                                        }
    });
}

function formProductoValidador(){
  $('#formProducto').bootstrapValidator({
    message: 'Este valor no es valido.',
    fields: {
      txtnom: {
        message: 'El usuario no es valido.',
        validators: {
          notEmpty: {
            message: 'El nombre no puede estar vacio.'
          },
          stringLength: {
            min: 6,
            max: 30,
            message: 'El nombre debe tener entre 6 y 30 caracteres.'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_\.\s]+$/,
            message: 'El nombre de usuario sólo puede consistir en orden alfabético, número, puntos y guión'
          }
        }
      },
      txtdet: {
        message: 'El detalle no es valido.',
        validators: {
          notEmpty: {
            message: 'El detalle no puede estar vacio.'
          },
          stringLength: {
            min: 4,
            max: 30,
            message: 'El detalle debe tener entre 6 y 30 caracteres.'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_\.\s]+$/,
            message: 'El detalle sólo puede consistir en orden alfabético, número, puntos y guión'
          }
        }
      },
      txtcat: {
                validators: {
                    notEmpty: {
                        message: 'La categoria es requerida.'
                    }
                }
            },
      txtmar: {
                message: 'La marca no es valida.',
                validators: {
                    notEmpty: {
                        message: 'La marca no puede estar vacia.'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'Debe tener entre 6 y 30 caracteres.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.\s\-\/]+$/,
                        message: 'La marca sólo puede consistir en orden alfabético, número, puntos y guión.'
                    }
                }
            },
      txtsto: {
                message: 'El stock no es valido.',
                validators: {
                    notEmpty: {
                        message: 'El stock no puede estar vacio.'
                    },
                    stringLength: {
                        min: 1,
                        max: 30,
                        message: 'Debe tener entre 1 y 30 caracteres.'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'El stock sólo puede consistir de números.'
                    }
                }
            },
      txtcui: {
                validators: {
                    notEmpty: {
                        message: 'El proveedor es requerido.'
                    }
                }
            },
      txtven: {
                message: 'El precio de venta no es valido.',
                validators: {
                    notEmpty: {
                        message: 'El precio de venta no puede estar vacio.'
                    },
                    stringLength: {
                        min: 1,
                        max: 30,
                        message: 'Debe tener entre 1 y 30 caracteres.'
                    },
                    regexp: {
                        regexp: /^[0-9\.\,]+$/,
                        message: 'El stock sólo puede consistir de números y puntos.'
                    }
                }
            },
      txtcos: {
                message: 'El costo no es valido.',
                validators: {
                    notEmpty: {
                        message: 'El costo no puede estar vacio.'
                    },
                    stringLength: {
                        min: 1,
                        max: 30,
                        message: 'Debe tener entre 1 y 30 caracteres.'
                    },
                    regexp: {
                        regexp: /^[0-9\.\,]+$/,
                        message: 'El stock sólo puede consistir de números y puntos.'
                    }
                }
            },
      txtcod: {
                message: 'El codigo no es valido.',
                validators: {
                    notEmpty: {
                        message: 'El codigo no puede estar vacio.'
                    },
                    stringLength: {
                        min: 1,
                        max: 30,
                        message: 'Debe tener entre 1 y 30 caracteres.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: 'El codigo sólo puede consistir de números y letras.'
                    }
                }
            }
    }
});
}
