<?php
	include("conexion.php");
		$queryIva=  mysqli_query($conexion,"SELECT * FROM iva") or die(mysqli_error());
		$iva = array();
			while($row =mysqli_fetch_assoc($queryIva))
			{
					$iva[] = $row;
			}
		$json = json_encode($iva);
		echo $json;
?>