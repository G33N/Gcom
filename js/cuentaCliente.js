$.ajax({
         type: 'POST',
            url: "datos/cuentaCliente.php",
            data: $(this).serialize() +"&orden="+0,
            success: function(data){
                                    $('#selectProveedor').html("");
                                    json=jQuery.parseJSON(data);
                                    var objeto=json;
                                        for(i=0; i<= (objeto.length -1); i++){
                                            cuit=objeto[i].cuit;
                                            tipo_documento_id=objeto[i].tipo_documento_id;
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
