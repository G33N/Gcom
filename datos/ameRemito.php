<?php
	include("conexion.php");
	include("../facturacion/generarRemito.php");
	$orden = $_POST['orden'];
	$fecha = date("Y-m-d");

  switch($orden){
		case 0:
			$listarRemitos=  mysqli_query($conexion,"SELECT * FROM remito") or die(mysqli_error());
			$remitos = array();
					while($row =mysqli_fetch_assoc($listarRemitos))
					{
							$remitos[] = $row;
					}
			$json = json_encode($remitos);
			echo $json;
		break;
		case 1:
				$id=$_POST['facturaGen'];
				$factura_id=$_POST['facturaGen'];
				$cliente_cuit=$_POST['clienteCuit'];
				$forma_pago=$_POST['formaPago'];
				$empleado=$_POST['empleado'];
				$observacion=$_POST['observacion'];
				$queryInsertRemito = mysqli_query($conexion,"INSERT INTO remito VALUES ('$id','$factura_id','$cliente_cuit','$forma_pago','$empleado','$observacion','$fecha')");
				$queryDetalleFactura =  mysqli_query($conexion,"INSERT INTO detalle_remito (id,remito_id,codigo_producto,nombre_producto,cantidad) SELECT id, remito_id, codigo_producto, nombre_producto, cantidad FROM tmp_detalle_remito");
				$descuentoStock = mysqli_query($conexion, "SELECT cantidad, codigo_producto FROM detalle_remito WHERE remito_id=$id");
				while($row=mysqli_fetch_array($descuentoStock)){
					$controlStock = mysqli_query($conexion,"UPDATE producto SET stock=stock-$row[cantidad] WHERE codigo_producto=$row[codigo_producto]");
				}
				$queryTruncateTmp = mysqli_query($conexion,"TRUNCATE tmp_detalle_remito");
				generarRemito($id);
		break;
		case 10:
			$queryDetalleRemito=  mysqli_query($conexion,"SELECT * FROM tmp_detalle_remito") or die(mysqli_error());
			$detalleRemito = array();
					while($row =mysqli_fetch_assoc($queryDetalleRemito))
					{
							$detalleRemito[] = $row;
					}
			$json = json_encode($detalleRemito);
			echo $json;
		break;
		case 11:
		//Producto
			$producto_id = $_POST['producto_id'];
			$codigoProducto = $_POST['codigoProducto'];
			$facturaId = $_POST['facturaGen'];
			$nombreProducto = $_POST['nombreProducto'];
			$detalleProducto = $_POST['detalleProducto'];
			$precioVenta = $_POST['precioVenta'];
			$cantidadProducto = $_POST['cantidadProducto'];
			$total = $precioVenta * $cantidadProducto;
				if(!empty($codigoProducto AND $cantidadProducto)){
					$queryDetalleRemito =  mysqli_query($conexion,"INSERT INTO tmp_detalle_remito VALUES (NULL,$producto_id,'$facturaId','$codigoProducto','$nombreProducto','$cantidadProducto')");
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
					    exit();
		break;
		case 13:
			$id = $_POST['delid'];
		if(!empty($id)){
			$queryProducto =  mysqli_query($conexion,"DELETE FROM tmp_detalle_remito WHERE id=$id");
				$jsondata = array();
				        $jsondata['success'] = true;
				        $jsondata['message'] = 'Se elimino correctamente.';
				    }
				   	else {
				        $jsondata['success'] = false;
				        $jsondata['message'] = 'Error al eliminar.';
				    }
				    //Aunque el content-type no sea un problema en la mayoría de casos, es recomendable especificarlo
				    header('Content-type: application/json; charset=utf-8');
				    echo json_encode($jsondata);
				    exit();
		break;
		case 14:
		 	$queryDetalleRemito = mysqli_query($conexion,"TRUNCATE TABLE tmp_detalle_remito ");
		break;
	  case 15:
	      $remito_id=$_POST['remito_id'];
	      generarRemito($remito_id);
		break;
  }
?>
