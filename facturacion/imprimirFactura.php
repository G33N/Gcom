<?php
function modificarRutaFactura($id){
  $archivo = "/srv/http/Gcom/facturacion/rece.ini";
  $abrir = fopen($archivo, 'r+');
  $contenido = fread($abrir, filesize($archivo));
  fclose($abrir);
  $contenido = explode("\r\n", $contenido);
  //aqui va el numero de fila y el contenido que deseo cambiar
  $contenido[15] = "ENTRADA=/srv/http/Gcom/facturacion/facturas/factura-$id.json";
  $contenido[30] = "ENTRADA=/srv/http/Gcom/facturacion/facturas/factura-$id.json";
  $contenido[31] = "SALIDA=/srv/http/Gcom/facturacion/factura.pdf";
  //print_r($contenido);
  $contenido = implode("\r\n", $contenido);
  $abrir = fopen($archivo, 'w');
  fwrite($abrir, $contenido);
  fclose($abrir);
}
function modificarRutaRemito($id){
  $archivo = "/srv/http/Gcom/facturacion/rece.ini";
  $abrir = fopen($archivo, 'r+');
  $contenido = fread($abrir, filesize($archivo));
  fclose($abrir);
  $contenido = explode("\r\n", $contenido);
  //aqui va el numero de fila y el contenido que deseo cambiar
  $contenido[15] = "ENTRADA=/srv/http/Gcom/facturacion/facturas/factura-$id.json";
  $contenido[30] = "ENTRADA=/srv/http/Gcom/facturacion/facturas/factura-$id.json";
  $contenido[31] = "SALIDA=/srv/http/Gcom/facturacion/remito.pdf";
  //print_r($contenido);
  $contenido = implode("\r\n", $contenido);
  $abrir = fopen($archivo, 'w');
  fwrite($abrir, $contenido);
  fclose($abrir);
}
function imprimirCopiaFactura($id){
  modificarRutaFactura($id);
 #exec("python2 /srv/http/Gcom/facturacion/pyafipws/pyfepdfCopias.py /srv/http/Gcom/facturacion/rece.ini --cargar --json");
  exec("python2 /srv/http/Gcom/facturacion/pyafipws/pyfepdf.py /srv/http/Gcom/facturacion/rece.ini --cargar --json");
}
function imprimirRemitoFactura($id){
  modificarRutaRemito($id);
  exec("python2 /srv/http/Gcom/facturacion/pyafipws/pyfepdfRemitos.py /srv/http/Gcom/facturacion/rece.ini --cargar --json");
}
 ?>
