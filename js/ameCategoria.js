$(document).ready(function(){
    $('#g1').click(function(){
        orden = 1;
    });
    nuevaCategoria();
    formCategoriaValidador();
});
function formCategoriaValidador(){
  $('#formCategoria').bootstrapValidator({
    message: 'Este valor no es valido.',
    fields: {
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
            message: 'La Categoria sólo puede consistir en orden alfabético, número, puntos y guión'
          }
        }
      }
    }
});
}
function nuevaCategoria(){
    $('#formCategoria').submit(function(){
        $.ajax({
            type: 'POST',
            url: "datos/ameCategoria.php",
            data: $(this).serialize() +"&orden="+1,
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
        });
    $('#formCategoria')[0].reset();
    return false;
}
function borrarCategoria(id){
                            orden = 3;
                            id = id;
                            $.ajax({
                                type: 'POST',
                                url: "datos/ameCategoria.php",
                                data: $(this).serialize() +"&orden="+orden  +"&delid="+id,
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
$.ajax({
        type: 'POST',
        url: "datos/ameCategoria.php",
        data: $(this).serialize() +"&orden="+0,
        success: function(data){
                                $('#tablaCategoria').html("");
                                json=jQuery.parseJSON(data);
                                var objeto=json;
                                    for(i=0; i<= (objeto.length -1); i++){
                                        id=objeto[i].id;
                                        detalle=objeto[i].detalle;
                                            $('#tablaCategoria').append('<tr><td>'+id+'</td><td>'+detalle+'</td><td style="text-align: center;"><a href="javascript:" id="modalPedido" data-toggle="modal" data-target="#myModal'+i+'"><i class="fa fa-edit"></i></a><td style="text-align: center;"><a href="javascript:" onClick="borrarCategoria('+id+')""><i class="fa fa-times"></i></a></td></tr>');
                                            $('#modalCategoria').append('<div id="myModal'+i+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Contact Form</h4></div><div class="modal-body"><form action="datos/ameCategoria.php" method="POST" class="form-horizontal" role="form"><div class="form-group"><label class="col-sm-2 control-label">Nombre</label><div class="col-sm-4"><input type="text" class="form-control" name="txtid"  value="'+id+'" data-placement="bottom" readonly></div><label class="col-sm-2 control-label">Detalle</label><div class="col-sm-4"><input type="text" class="form-control" name="txtdet" value="'+detalle+'" data-placement="bottom"></div></div><h4 class="page-header"></h4><div class="row form-group"><div class="col-sm-6 pull-right"><button type="submit" class="btn btn-success" name="orden" value="2">Modificar</button><button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button></div></div></form></div></div></div></div>');
                                        }
                                    }
});
