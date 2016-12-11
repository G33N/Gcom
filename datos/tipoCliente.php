<?php
	include("conexion.php");
		$queryTipoCliente=  mysqli_query($conexion,"SELECT * FROM iva") or die(mysqli_error());
			$tipoCliente = array();
					while($row =mysqli_fetch_assoc($queryTipoCliente))
					{
							$tipoCliente[] = $row;
					}
			$json = json_encode($tipoCliente);
			echo $json;
?>