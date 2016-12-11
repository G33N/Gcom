<?php
include("conexion.php");
$pa=mysqli_query($conexion,"SELECT MAX(id)as maximo FROM factura");				
        if($row=mysqli_fetch_array($pa)){
			if($row['maximo']==NULL){
				$factura='1001';
			}else{
				$factura=$row['maximo']+1;
			}
		}
		$json = '{"facturaGen" : [ ';
		$json.= '{ "id" : "'.$factura.'"  },';
		$json= substr($json,0,-1);
		$json .=']}';
		echo $json;

?>