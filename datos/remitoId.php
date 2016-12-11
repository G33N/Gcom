<?php
include("conexion.php");
$pa=mysqli_query($conexion,"SELECT MAX(id)as maximo FROM remito");
        if($row=mysqli_fetch_array($pa)){
			if($row['maximo']==NULL){
				$remito='1001';
			}else{
				$remito=$row['maximo']+1;
			}
		}
		$json = '{"remitoGen" : [ ';
			$json.= '{ "id" : "'.$remito.'"  },';
			$json= substr($json,0,-1);
			$json .=']}';
			echo $json;

?>
