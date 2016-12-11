<?php
	include("conexion.php");
	$selectCliente = $_POST['selectCliente'];
	$fechaDesde = $_POST['fechaDesde'];
	$fechaDesde = str_replace('/', '-', $fechaDesde);
	$fechaDesde = date("Y-m-d", strtotime($fechaDesde));
	$fechaHasta = $_POST['fechaHasta'];
	$fechaHasta = str_replace('/', '-', $fechaHasta);
	$fechaHasta = date("Y-m-d", strtotime($fechaHasta));
	$listarResumenCliente=mysqli_query($conexion,"SELECT * FROM cuenta WHERE cliente_cuit=$selectCliente AND fecha BETWEEN '$fechaDesde' AND '$fechaHasta' ORDER BY id DESC ") or die(mysqli_error());
			$resumen = array();
					while($row =mysqli_fetch_assoc($listarResumenCliente))
					{
							$resumen[] = $row;
					}
			$json = json_encode($resumen);
			echo $json;
?>