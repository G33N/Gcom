<?php
function redondear_dos_decimal($valor) {
   $float_redondeado=round($valor * 100) / 100;
   return $float_redondeado;
}
function generarJsonFactura($id){
    include('../datos/conexion.php');
    $detalleFactura=mysqli_query($conexion,"SELECT * FROM detalle_factura WHERE factura_id=$id");
        $queryFactura=mysqli_query($conexion,"SELECT cliente.*, detalle_factura.*, factura.id AS fid, factura.cliente_cuit, factura.forma_pago_id, factura.estado, factura.empleado, factura.observacion, factura.fecha, factura.total AS fto, factura.iva FROM factura INNER JOIN cliente ON factura.id=$id AND cliente.cuit=factura.cliente_cuit INNER JOIN detalle_factura ON factura.id=$id AND detalle_factura.factura_id=factura.id");
    //Llenar array factura
    $i = 0;
    $imp_neto = 0;
    while ($fila = mysqli_fetch_array($queryFactura)) {
    $datos[$i]['id']= (int)$fila['fid'];                     // identificador único (obligatorio WSFEX)
    $datos[$i]['punto_vta']= 0001;
    $datos[$i]['tipo_cbte']= 51;                         // 1: FCA, 2: NDA, 3:NCA, 6: FCB, 11: FCC
    $datos[$i]['cbte_nro']= 0;                          // solicitar proximo con /ult
    $datos[$i]['tipo_doc']= (int)$fila['tipo_documento'];
    $datos[$i]['nro_doc']= $fila['cuit'];               // Nro. de CUIT o DNI
    $datos[$i]['fecha_cbte']= date('Ymd');
    $datos[$i]['fecha_serv_desde']= null;             // competar si concepto > 1
    $datos[$i]['fecha_serv_hasta']= null;             // competar si concepto > 1
    $datos[$i]['fecha_serv_pago']= null;              // competar si concepto > 1
    $datos[$i]['concepto']= 1;                          // 1: Productos, 2: Servicios, 3/4: Ambos
    $datos[$i]['nombre_cliente']= $fila['nombre'];
    $datos[$i]['domicilio_cliente']= $fila['direccion'];
    $datos[$i]['pais_dst_cmp']= 16;                     // solo exportacion
    $datos[$i]['moneda_ctz']= 1;                        // 1 para pesos
    $datos[$i]['moneda_id']= 'PES';                     // 'PES': pesos, 'DOL': dolares (solo exportacion)
    $datos[$i]['obs_comerciales']="";
    $datos[$i]['obs_generales']= $fila['observacion'];
    $datos[$i]['forma_pago']= $fila['forma_pago_id'];
    $datos[$i]['incoterms']= 'FOB';                     // Solo exportacion
    $datos[$i]['id_impositivo']= 'PJ54482221-1';        // Solo exportacion

    // importes subtotales generales:
    $datos[$i]['imp_neto']= $fila['total'];          // neto gravado
    $datos[$i]['imp_op_ex']= 0;                         // operacioens exentas
    $datos[$i]['imp_tot_conc']= 0;                      // no gravado
    $datos[$i]['imp_iva']= $fila['iva'];                // IVA liquidado
    $datos[$i]['imp_trib']= 0;                          // Otros tributos
    $datos[$i]['imp_total']= $fila['fto'];          // total de la factura

    // Datos devueltos por AFIP (completados luego al llamar al webservice):
    $datos[$i]['cae']= '';
    $datos[$i]['fecha_vto']= '';
    $datos[$i]['motivos_obs']= '';
    $datos[$i]['err_code']= '';

    $datos[$i]['fecha_venc_pago']=null;
    //$datos[$i]['cbt_desde']='';
    //$datos[$i]['cbt_hasta']='';

    $datos[$i]['descuento']= 0;

    $i++;
    }
    foreach($datos as $num => $values) {
        $imp_neto += $values[ 'imp_neto' ];
    }
    $imp_iva = redondear_dos_decimal($imp_neto * $datos[0]['imp_iva'] / 100);
    // Llenar array detalles
    $i = 0;
    while ($fila = mysqli_fetch_array($detalleFactura)) {
    $det[$i]['qty']= $fila['cantidad'];
    $det[$i]['umed']= 7;
    $det[$i]['codigo']= $fila['producto_id'];
    $det[$i]['ds']= $fila['nombre_producto'];
    $det[$i]['precio']= $fila['precio_venta'];
    $det[$i]['importe']= $fila['total'];
    $det[$i]['imp_iva']= redondear_dos_decimal($fila['total']*0.21);
    $det[$i]['iva_id']= 5; // este campo deberia ser dinamico para los clientes excentos pero no estoy seguro si ira aca o en el generico de la factura.
    $det[$i]['u_mtx']= 123456;
    $det[$i]['cod_mtx']= $fila['producto_id'];
    $det[$i]['despacho']= 'Nº 123456';
    $det[$i]['dato_a']= null;
    $det[$i]['dato_b']= null;
    $det[$i]['dato_c']= null;
    $det[$i]['dato_d']= null;
    $det[$i]['dato_e']= null;
    $det[$i]['bonif']= 0;
    $i++;
    }
     $detalles = $det;



    // IVAS
    $i = 0;
    // while ($fila = mysqli_fetch_array($queryFactura)) {
    $iva[$i]['base_imp']= $imp_neto;
    $iva[$i]['importe']= $imp_iva;
    $iva[$i]['iva_id']= 5;
    // $i++;
    // }

    $i = 0;
    // while ($fila = mysqli_fetch_array($queryFactura)) {
    $tri[$i]['alic']= 0;
    $tri[$i]['base_imp']= 0;
    $tri[$i]['desc']= 'Impuesto Municipal';
    $tri[$i]['importe']= 0;
    $tri[$i]['tributo_id']= 99;
    // $i++;
    // }

    // Establezco los valores de la factura a autorizar:
    $factura = array(
         'id' => $datos[0]['id'],                     // identificador único (obligatorio WSFEX)

         'punto_vta' => $datos[0]['punto_vta'],
         'tipo_cbte' => $datos[0]['tipo_cbte'],              // 1: FCA, 2: NDA, 3:NCA, 6: FCB, 11: FCC
         'cbte_nro' => $datos[0]['cbte_nro'],               // solicitar proximo con /ult

         'tipo_doc' => $datos[0]['tipo_doc'],              // 96: DNI, 80: CUIT, 99: Consumidor Final
         'nro_doc' => $datos[0]['nro_doc'],    // Nro. de CUIT o DNI

         'fecha_cbte' => $datos[0]['fecha_cbte'],   // Formato AAAAMMDD
         'fecha_serv_desde' => $datos[0]['fecha_serv_desde'],    // competar si concepto > 1
         'fecha_serv_hasta' => $datos[0]['fecha_serv_hasta'],    // competar si concepto > 1
         'fecha_venc_pago' => $datos[0]['fecha_venc_pago'],     // competar si concepto > 1

         'concepto' => $datos[0]['concepto'],               // 1: Productos, 2: Servicios, 3/4: Ambos

         'nombre_cliente' => $datos[0]['nombre_cliente'],
         'domicilio_cliente' => $datos[0]['domicilio_cliente'],
         'pais_dst_cmp' => $datos[0]['pais_dst_cmp'],  // solo exportacion

         'moneda_ctz' => $datos[0]['moneda_ctz'],   // 1 para pesos
         'moneda_id' => $datos[0]['moneda_id'],  // 'PES': pesos, 'DOL': dolares (solo exportacion)

         'obs_comerciales' => $datos[0]['obs_comerciales'],
         'obs_generales' => $datos[0]['obs_generales'],
         'forma_pago' => $datos[0]['forma_pago'],
         'incoterms' => $datos[0]['incoterms'],                  // solo exportacion
         'id_impositivo' => $datos[0]['id_impositivo'],     // solo exportacion

         // importes subtotales generales:
         'imp_neto' => $imp_neto,            // neto gravado
         'imp_op_ex' => $datos[0]['imp_op_ex'],             // operacioens exentas
         'imp_tot_conc' => $datos[0]['imp_tot_conc'],          // no gravado
         'imp_iva' => $imp_iva,              // IVA liquidado
         'imp_trib' => $datos[0]['imp_trib'],              // otros tributos
         'imp_total' => $imp_neto + $imp_iva,           // total de la factura

         // Datos devueltos por AFIP (completados luego al llamar al webservice):
         'cae' => '',                       // ej. '61123022925855'
         'fecha_vto' => '',                 // ej. '20110320'
         'motivos_obs' => '',               // ej. '11'
         'err_code' => '',                  // ej. 'OK'

         'descuento' => $datos[0]['descuento'],
         'detalles' => $detalles,
         'ivas' => array (
              array(
                 'base_imp' => $iva[0]['base_imp'],
                 'importe' => $iva[0]['importe'],
                 'iva_id' => $iva[0]['iva_id'],
              ),
            ),
         // Comprobantes asociados (solo notas de crédito y débito):
         //'cbtes_asoc' => array (
         //   array('cbte_nro' => 1234, 'cbte_punto_vta' => 2, 'cbte_tipo' => 91, ),
         //   array('cbte_nro' => 1234, 'cbte_punto_vta' => 2, 'cbte_tipo' => 5, ),
         // ),
         'tributos' => array (
              array(
                 'alic' => $tri[0]['alic'],
                 'base_imp' => $tri[0]['base_imp'],
                 'desc' => $tri[0]['desc'],
                 'importe' => $tri[0]['importe'],
                 'tributo_id' => $tri[0]['tributo_id'],
              ),
            ),
         'permisos' => array (),
         'datos' => array (),
    );
    // Guardar el archivo json para consultar la ultimo numero de factura:
    $json = file_put_contents('/srv/http/Gcom/facturacion/facturas/factura-'.$id.'.json', json_encode(array($factura)));

}

 ?>
