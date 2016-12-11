$.ajax({
         type: 'POST',
            url: "datos/ameIva.php",
            data: $(this).serialize(),
            success: function(data){
                                    $('#selectTipo').html("");
                                    json=jQuery.parseJSON(data);
                                    var objeto=json;
                                        for(i=0; i<= (objeto.length -1); i++){
                                            id=objeto[i].id;
                                            nombre=objeto[i].nombre;
                                            iva=objeto[i].iva;
                                                $('#selectTipo').append('\
                                                        <option value="'+id+'">'+nombre+'</option>\
                                                ');
                                        }
                                    }
            });