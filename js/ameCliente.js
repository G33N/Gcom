$(document).ready(function(){
    listarCliente();
    tipoDocumento();
    ordenFormularioCliente();
    enviarFormularioCliente();
    formClienteValidador();
});
function justNumbers(e){
    var keynum = window.event ? window.event.keyCode : e.which;
        if ((keynum == 8) || (keynum == 46))
            return true;
            return /\d/.test(String.fromCharCode(keynum));
        }
function ordenFormularioCliente(){
    $('#g1').click(function(){
        orden = 1;
    });
}
function enviarFormularioCliente(){
    $('#formCliente').submit(function() {
        $.ajax({
            type: 'POST',
            url: "datos/ameCliente.php",
            data: $(this).serialize() +"&orden="+orden,
            success:function(data){
                    listarCliente();
                    if(data.success === true ){
                        alert(data.message);
                    }
                    if(data.success === false ){
                        alert(data.message);
                    }
                }
        });
        $('#formCliente')[0].reset();
        return false;
    });
}
function borrarCliente(cuit){
                            orden = 3;
                            delid = cuit;
                            $.ajax({
                                type: 'POST',
                                url: "datos/ameCliente.php",
                                data: $(this).serialize() +"&orden="+orden  +"&delid="+cuit,
                                // Mostramos un mensaje con la respuesta de PHP
                                success:function(data){
                                    listarCliente();
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
function listarCliente(){
$.ajax({
            type: 'POST',
            url: "datos/ameCliente.php",
            data: $(this).serialize() +"&orden="+0,
            success: function(data){
                                    $('#tablaCliente').html("");
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
                                                $('#tablaCliente').append('<tr><td>'+cuit+'</td><td>'+nombre+'</td><td>'+localidad+'</td><td>'+direccion+'</td><td>'+telefono+'</td><td style="text-align: center;"><a href="javascript:" id="modalPedido" data-toggle="modal" data-target="#myModal'+i+'"><i class="fa fa-edit"></i></a><td style="text-align: center;"><a href="javascript:" class="g3" onClick="borrarCliente('+cuit+')""><i class="fa fa-times"></i></a></td></tr>');
                                                $('#modalCliente').append('<div id="myModal'+i+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Modificacion Cliente</h4></div><div class="modal-body"><form action="datos/ameCliente.php" method="POST" class="form-horizontal" role="form" id="formModificarCliente"><div class="form-group"><label class="col-sm-2 control-label">Nombre</label><div class="col-sm-4"><input type="text" class="form-control" name="txtno" value="'+nombre+'" data-placement="bottom" ></div><label class="col-sm-2 control-label">CUIT</label><div class="col-sm-4"><input type="text" class="form-control" name="txtcui" value="'+cuit+'" data-placement="bottom" readonly ></div></div><div class="form-group"><label class="col-sm-2 control-label">Localidad</label><div class="col-sm-4"><input type="text" class="form-control" name="txtloc" value="'+localidad+'" data-placement="bottom"></div><label class="col-sm-2 control-label">Direccion</label><div class="col-sm-4"><input type="text" class="form-control" name="txtdir" value="'+direccion+'" data-placement="bottom"></div></div><div class="form-group"><label class="col-sm-2 control-label">Telefono</label><div class="col-sm-4"><input type="text" class="form-control" name="txttel" value="'+telefono+'" data-placement="bottom"></div><label class="col-sm-2 control-label">Mail</label><div class="col-sm-4"><input type="text" class="form-control" name="txtmai" value="'+mail+'" data-placement="bottom"></div></div><div class="form-group"><label class="col-sm-2 control-label">Categoria</label><div class="col-sm-4"><input type="text" class="form-control" name="tipo" value="'+tipo+'" data-placement="bottom"></div><label class="col-sm-2 control-label">Tipo documento</label><div class="col-sm-4"><input type="text" class="form-control" name="tipo_documento" value="'+tipo_documento+'" data-placement="bottom"></div></div><h4 class="page-header"></h4><div class="row form-group"><div class="col-sm-6 pull-right"><button type="submit" class="btn btn-success" name="orden" value="2">Modificar</button><button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button></div></div></form></div></div></div></div></td>');

                                    }
                                  }
            });
}
$.ajax({
         type: 'POST',
            url: "datos/ameCliente.php",
            data: $(this).serialize() +"&orden="+0,
            success: function(data){
                                    $('#selectCliente').html("<option value=''>-</option>");
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
                                                $('#selectCliente').append('<option value="'+cuit+'">'+nombre+'</option>');
                                        }
                                        $('#addressCliente').html("<address><strong>Cliente</strong><br>Direccion<br>localidad<br><abbr title='Phone'>Tel:</abbr> (0299) 477-8656</address>");
                                        $('#selectCliente').on('change', function(){
                                            selectOn = $(this).val();
                                            $('#addressCliente').html("");
                                            for(i=0; i<= (objeto.length -1); i++){
                                                if(objeto[i].cuit==selectOn){
                                                    cuit2=objeto[i].cuit;
                                                    nombre2=objeto[i].nombre;
                                                    tipo2=objeto[i].tipo;
                                                    direccion2=objeto[i].direccion;
                                                    localidad2=objeto[i].localidad;
                                                    telefono2=objeto[i].telefono;
                                                    mail2=objeto[i].mail;
                                                    $('#addressCliente').append('<strong>'+nombre2+'</strong><br>'+direccion2+'<br>'+localidad2+'<br><abbr title="Phone">Tel:</abbr> '+telefono2+'');
                                                }
                                            }
                                        });
                                    }
            });
function tipoDocumento(){
    $.ajax({
             type: 'POST',
                url: "datos/ameTipoDocumento.php",
                data: $(this).serialize(),
                success: function(data){
                                        $('#tipoDocumento').html("");
                                        json=jQuery.parseJSON(data);
                                        var objeto=json;
                                            for(i=0; i<= (objeto.length -1); i++){
                                                id=objeto[i].id;
                                                detalle=objeto[i].detalle;
                                                    $('#tipoDocumento').append('<option value="'+id+'">'+detalle+'</option>');
                                            }
                                        }
            });
}
function formClienteValidador(){
  $('#formCliente').bootstrapValidator({
    message: 'Este valor no es valido.',
    fields: {
      txtnom: {
        message: 'El usuario no es valido.',
        validators: {
          notEmpty: {
            message: 'El nombre no puede estar vacio.'
          },
          stringLength: {
            min: 4,
            max: 50,
            message: 'El nombre debe tener entre 6 y 30 caracteres.'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_\.\s]+$/,
            message: 'El nombre de usuario sólo puede consistir en orden alfabético, número, puntos y guión'
          }
        }
      },
      txtcui: {
                message: 'El numero de CUIT o CUIL es invalido.',
                validators: {
                    notEmpty: {
                        message: 'Debe ingresar un numero de CUIT o CUIL.'
                    },
                    stringLength: {
                        min: 8,
                        max: 11,
                        message: 'El CUIT o CUIL debe tener 11 caracteres.'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'El CUIT debe contener solo numeros'
                    }
                }
            },
      tipo: {
                validators: {
                    notEmpty: {
                        message: 'El tipo de proveedor es requerido.'
                    }
                }
            },
      txtloc: {
                message: 'La localidad no es valida.',
                validators: {
                    notEmpty: {
                        message: 'La localidad no puede estar vacia.'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'Debe tener entre 6 y 30 caracteres.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.\s\-\/]+$/,
                        message: 'Esta usando caracteres no permitidos. Solo se permiten - o /.'
                    }
                }
            },
      txtdir: {
                message: 'La direccion no es valida.',
                validators: {
                    notEmpty: {
                        message: 'La direccion no puede estar vacia.'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'Debe tener entre 6 y 30 caracteres.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.\s\-\/]+$/,
                        message: 'Esta usando caracteres no permitidos. Solo se permiten - o /.'
                    }
                }
            },
      txttel: {
                message: 'El telefono no es valido.',
                validators: {
                    notEmpty: {
                        message: 'El usuario no puede estar vacio'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'Debe tener entre 6 y 30 caracteres.'
                    },
                    regexp: {
                        regexp: /^[0-9_\.\s\-\/\(\)]+$/,
                        message: 'Esta usando caracteres no permitidos. Solo se permiten - o /. ( )'
                    }
                }
            },
      txtmai: {
                validators: {
                    notEmpty: {
                        message: 'El mail no puede estar vacio.'
                    },
                    emailAddress: {
                        message: 'El mail ingresado no es valido.'
                    }
                }
            }
    }
});
}