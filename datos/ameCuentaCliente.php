<?php
	include("conexion.php");
	$orden = $_POST['orden'];
	$hoy = date("Y-m-d");
	switch($orden){
		case 0:
			$facturasPendientes=  mysqli_query($conexion,"SELECT * FROM factura WHERE estado=4 ") or die(mysqli_error());
			$pendientes = array();
					while($row =mysqli_fetch_assoc($facturasPendientes))
					{
							$pendientes[] = $row;
					}
			$json = json_encode($pendientes);
			echo $json;
		break;
		case 1:
			$selectCliente = $_POST['selectCliente'];
			$listarFacturasPendientesCliente=  mysqli_query($conexion,"SELECT * FROM factura WHERE estado=4 AND cliente_cuit=$selectCliente ") or die(mysqli_error());
			$pendientesCliente = array();
					while($row =mysqli_fetch_assoc($listarFacturasPendientesCliente))
					{
							$pendientesCliente[] = $row;
					}
			$json = json_encode($pendientesCliente);
			echo $json;
		break;
		case 2:
			$id = $_POST['id'];
			$cliente = $_POST['cliente'];
			$formaPago = $_POST['formaPago'];
			$estado = @$_POST['estado'];
			$empleado = @$_POST['empleado'];
			$observacion = $_POST['observacion'];
			$fecha = $_POST['fecha'];
			$total = $_POST['total'];
			$iva = @$_POST['iva'];
				if(!empty($id)){
					$queryPago =  mysqli_query($conexion,"UPDATE factura SET estado=1 WHERE id='$id'");
					$ultimaOperacionId = mysqli_query($conexion,"SELECT MAX(id) AS id FROM cuenta WHERE cliente_cuit=$cliente");
					$maxid = $ultimaOperacionId->fetch_array(MYSQLI_ASSOC);
					$ultimoSaldoQuery = mysqli_query($conexion, "SELECT saldo FROM cuenta WHERE cliente_cuit=$cliente AND id=$maxid[id]");
					$ultimoSaldo = $ultimoSaldoQuery->fetch_array(MYSQLI_ASSOC);
					$saldo = $ultimoSaldo['saldo']+$total;
					$opStock = mysqli_query($conexion,"INSERT INTO cuenta VALUES(NULL,'$cliente','33','$hoy','PAGO FAC #$id','$total','$saldo')");
					$jsondata = array();
					        $jsondata['success'] = true;
					        $jsondata['message'] = 'Se guardo correctamente.';
					    } 
					   	else {
					        $jsondata['success'] = false;
					        $jsondata['message'] = 'Error al guardar.';
					    }
					    //Aunque el content-type no sea un problema en la mayoría de casos, es recomendable especificarlo
					    header('Content-type: application/json; charset=utf-8');
					    echo json_encode($jsondata);
					  	header('location: ../index.html#ajax/producto.html');
					    exit();
		break;
	}	
?>