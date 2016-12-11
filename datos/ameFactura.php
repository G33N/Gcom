<?php
	include("conexion.php");
	include("../facturacion/factura_electronicaV2.php");
	include("../facturacion/imprimirFactura.php");
	include("../facturacion/anular_factura.php");
	$orden = $_POST['orden'];
	$fecha = date("Y-m-d");

	switch($orden){
		case 0:
			$listarFacturas=  mysqli_query($conexion,"SELECT * FROM factura") or die(mysqli_error());
			$facturas = array();
					while($row =mysqli_fetch_assoc($listarFacturas))
					{
							$facturas[] = $row;
					}
			$json = json_encode($facturas);
			echo $json;
		break;
		case 10:
			$queryDetalleFactura=  mysqli_query($conexion,"SELECT * FROM tmp_detalle_factura") or die(mysqli_error());
			$detalleProducto = array();
	        while($row =mysqli_fetch_assoc($queryDetalleFactura))
	        {
	            $detalleProducto[] = $row;
	        }
	    $json = json_encode($detalleProducto);
	    echo $json;
		break;
		case 1:
		//datos de facturacion
			$id = $_POST['facturaGen'];
			$clienteCuit = $_POST['clienteCuit'];
			$formaPago = $_POST['formaPago'];
			$empleado = $_POST['empleado'];
			$observacion = $_POST['observacion'];
			$total = $_POST['facturaTotal'];
			$tipo_cbte = $_POST['tipo_cbte'];
 			$fecha_cbte = $fecha;
 			$fecha_vto = NULL;
 			$punto_vta = 0001;
 			$cbte_nro = $id;
 			$cae = NULL;
			if($formaPago==1){
				$estado = 1;
			}
			else{
				$estado = 4;

			}
			if($_POST['iva']==5){
				$iva = 1;
			}
			else{
				$iva = 21;
			}
			if(!empty($clienteCuit AND $formaPago)){
				$queryFactura =  mysqli_query($conexion,"INSERT INTO factura VALUES ('$id','$clienteCuit','$formaPago','$estado','$punto_vta','$tipo_cbte','$cbte_nro','$cae','$fecha_vto','$empleado','$observacion','$fecha_cbte','$total','$iva')");
				$queryRemito =  mysqli_query($conexion,"INSERT INTO remito VALUES ('$id','$id','$clienteCuit','$formaPago','$empleado','$observacion','$fecha')");
				$ultimaOperacionId = mysqli_query($conexion,"SELECT MAX(id) AS id FROM cuenta WHERE cliente_cuit=$clienteCuit");
				$maxid = $ultimaOperacionId->fetch_array(MYSQLI_ASSOC);
				$ultimaOperacion = mysqli_query($conexion,"SELECT * FROM cuenta WHERE id=$maxid[id]");
				while($row=mysqli_fetch_array($ultimaOperacion)){
					$saldoAnterior = $row['saldo'];
					$ultimoImporte = $row['importe'];
				}
				$importe = $total;
				if($formaPago==1){
					$saldoOperacion = $importe;
					$proximoSaldo = $saldoAnterior - $saldoOperacion + $importe;
				}
				else{
					$saldoOperacion = 0;
					$proximoSaldo = $saldoAnterior - $saldoOperacion - $importe;
				}
				$queryResumen =  mysqli_query($conexion,"INSERT INTO cuenta VALUES (NULL,'$clienteCuit','$formaPago','$fecha','$id','$total','$proximoSaldo')");
				$queryDetalleFactura =  mysqli_query($conexion,"INSERT INTO detalle_factura (id,factura_id,codigo_producto,nombre_producto,detalle_producto,precio_venta,cantidad,total)SELECT id,factura_id,codigo_producto,nombre_producto,detalle_producto,precio_venta,cantidad,total FROM tmp_detalle_factura");
				$queryDetalleRemito =  mysqli_query($conexion,"INSERT INTO detalle_remito (id,remito_id,codigo_producto,cantidad,detalle_producto,nombre_producto) SELECT id,factura_id,codigo_producto,cantidad,detalle_producto,nombre_producto FROM detalle_factura");
				$descuentoStock = mysqli_query($conexion, "SELECT cantidad, producto_id FROM detalle_factura WHERE factura_id=$id");
				while($row=mysqli_fetch_array($descuentoStock)){
					$controlStock = mysqli_query($conexion,"UPDATE producto SET stock=stock-$row[cantidad] WHERE codigo_producto=$row[codigo_producto]");
				}
				$queryTruncateTmp = mysqli_query($conexion,"TRUNCATE tmp_detalle_factura");
				facturarGcom($id);
						$jsondata = array();
						$jsondata['success'] = true;
						$jsondata['message'] = 'Se guardo correctamente.';
				}
				   	else {
				        $jsondata['success'] = false;
				        $jsondata['message'] = 'Error al guardar.';
				    }
				header('Content-type: application/json; charset=utf-8');
				   echo json_encode($jsondata);

		break;
		case 11:
		//Producto
		$tipo_cbte=$_POST['tipo_cbte'];
		if($tipo_cbte==6 OR $tipo_cbte==11){
			$producto_id = $_POST['productoId'];
			$codigoProducto = $_POST['codigoProducto'];
			$facturaId = $_POST['facturaGen'];
			$nombreProducto = $_POST['nombreProducto'];
			$detalleProducto = $_POST['detalleProducto'];
			$precioVenta = $_POST['precioVenta']*1.21;
			$cantidadProducto = $_POST['cantidadProducto'];
			$total = $precioVenta * $cantidadProducto;
		}
		else {
			$producto_id = $_POST['productoId'];
			$codigoProducto = $_POST['codigoProducto'];
			$facturaId = $_POST['facturaGen'];
			$nombreProducto = $_POST['nombreProducto'];
			$detalleProducto = $_POST['detalleProducto'];
			$precioVenta = $_POST['precioVenta'];
			$cantidadProducto = $_POST['cantidadProducto'];
			$total = $precioVenta * $cantidadProducto;
		}
				if(!empty($codigoProducto AND $cantidadProducto)){
					$queryDetalleFactura =  mysqli_query($conexion,"INSERT INTO tmp_detalle_factura VALUES (NULL,$producto_id,'$facturaId','$codigoProducto','$nombreProducto','$detalleProducto','$precioVenta','$cantidadProducto','$total')");
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
			$queryProducto =  mysqli_query($conexion,"DELETE FROM tmp_detalle_factura WHERE id=$id");
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
		 	$queryDetalleFactura = mysqli_query($conexion,"TRUNCATE TABLE tmp_detalle_factura ");
		break;
		case 15:
		$facturaId=$_POST['facturaId'];
		imprimirCopiaFactura($facturaId);
		break;
		case 16:
		$indexFacturaAnular=$_POST['facturaId'];
		anularGcom($indexFacturaAnular);
		break;
		case 17:
		$facturaId=$_POST['facturaId'];
		facturarGcom($facturaId);
		break;
	}

?>
