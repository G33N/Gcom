<?php
	include("conexion.php");
		$queryFormaPago=  mysqli_query($conexion,"SELECT * FROM forma_pago") or die(mysqli_error());
			$formaPago = array();
					while($row =mysqli_fetch_assoc($queryFormaPago))
					{
							$formaPago[] = $row;
					}
			$json = json_encode($formaPago);
			echo $json;
?>