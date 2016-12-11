<?php
	include("conexion.php");
		$queryTipoDocumento=  mysqli_query($conexion,"SELECT * FROM tipo_documento") or die(mysqli_error());
			$documentos = array();
					while($row =mysqli_fetch_assoc($queryTipoDocumento))
					{
							$documentos[] = $row;
					}
			$json = json_encode($documentos);
			echo $json;
?>