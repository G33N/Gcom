<?php
function modificarRutaArchivos2($id){
  $archivo = "/srv/http/Gcom/facturacion/rece.ini";
  $abrir = fopen($archivo, 'r+');
  $contenido = fread($abrir, filesize($archivo));
  fclose($abrir);
  $contenido = explode("\r\n", $contenido);
  //aqui va el numero de fila y el contenido que deseo cambiar
  $contenido[15] = "ENTRADA=/srv/http/Gcom/facturacion/facturas/factura-$id-anulada.json";
  $contenido[30] = "ENTRADA=/srv/http/Gcom/facturacion/facturas/factura-$id-anulada.json";
  $contenido[31] = "SALIDA=/srv/http/Gcom/facturacion/factura-anulada.pdf";
  //print_r($contenido);
  $contenido = implode("\r\n", $contenido);
  $abrir = fopen($archivo, 'w');
  fwrite($abrir, $contenido);
  fclose($abrir);
}
function anularGcom($id){
    $json = file_get_contents('/srv/http/Gcom/facturacion/facturas/factura-'.$id.'.json');
    $factura = json_decode($json, True);
    // Obtener el último número para este tipo de comprobante / punto de venta:z
    exec("python2 /srv/http/Gcom/facturacion/pyafipws/rece1.py /srv/http/Gcom/facturacion/rece.ini /json /ult 13 0001");
    $json = file_get_contents('/srv/http/Gcom/facturacion/facturas/salidaAnulada.json');
    $facturas = json_decode($json, True);
    // leo el ultimo numero de factura del archivo procesado (salida)
    $cbte_nro = intval($facturas[0]['cbt_desde']) + 1;
    echo "Proximo Numero: ", $cbte_nro, "\n\r";
    // Vuelvo a guardar el archivo json para actualizar el número de factura:
    $factura['tipo_cbte'] = 13;         // para Nota de Credito M
    $factura['cbt_desde'] = $cbte_nro;  // para WSFEv1
    $factura['cbt_hasta'] = $cbte_nro;  // para WSFEv1
    $factura['cbte_nro'] = $cbte_nro;   // para PDF
    $json = file_put_contents('/srv/http/Gcom/facturacion/facturas/factura-'.$id.'-anulada.json', json_encode(array($factura)));
    // Obtención de CAE: llamo a la herramienta para WSFEv1
    exec("python2 /srv/http/Gcom/facturacion/pyafipws/rece1.py /srv/http/Gcom/facturacion/rece.ini /json ");
    // Ejemplo para levantar el archivo json con el CAE obtenido:
    $json = file_get_contents('/srv/http/Gcom/facturacion/facturas/salidaAnulada.json');
    $facturas = json_decode($json, True);
    // leo el CAE del archivo procesado
    echo "CAE OBTENIDO: ", $facturas[0]['cae'], "\n\r";
    echo "Observaciones: ", $facturas[0]['motivos_obs'], "\n\r";
    echo "Errores: ", $facturas[0]['err_msg'], "\n\r";
    // Vuelvo a guardar el archivo json para actualizar el CAE y otros datos:
    $factura['cae'] = $facturas[0]['cae'];
    $factura['fecha_vto'] = $facturas[0]['fch_venc_cae'];
    $factura['motivos_obs'] = $facturas[0]['motivos_obs'];
    $factura['err_code'] = $facturas[0]['err_code'];
    $factura['err_msg'] = $facturas[0]['err_msg'];
    $json = file_put_contents('/srv/http/Gcom/facturacion/facturas/factura-'.$id.'-anulada.json',
    json_encode(array($factura)));
    modificarRutaArchivos2($id);
    // Genero la factura en PDF (agregar --mostrar si se tiene visor de PDF)
    exec("python2 /srv/http/Gcom/facturacion/pyafipws/pyfepdf.py /srv/http/Gcom/facturacion/rece.ini --cargar --json");
    // leer factura.pdf o similar para obtener el documento generado. TIP: --mostrar
}
?>
