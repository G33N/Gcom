<?php
	include("conexion.php");
	$orden = $_POST['orden'];
	$hoy = date("Y-m-d");
	switch($orden){
		case 0:
			$queryProducto=  mysqli_query($conexion,"SELECT * FROM producto") or die(mysqli_error());
			$productos = array();
					while($row =mysqli_fetch_assoc($queryProducto))
					{
							$productos[] = $row;
					}
			$json = json_encode($productos);
			echo $json;
		break;
		case 1:
			$cod = $_POST['txtcod'];
			$pcui = $_POST['txtcui'];
			$cid = $_POST['txtcat'];
			$nom = $_POST['txtnom'];
			$det = $_POST['txtdet'];
			$mar = $_POST['txtmar'];
			$sto = $_POST['txtsto'];
			$pven = $_POST['txtven'];
			$pcos = $_POST['txtcos'];
			$fing = $hoy;
		if(!empty($cod AND $nom AND $pcos AND $sto)){
			$queryProducto =  mysqli_query($conexion,"INSERT INTO producto VALUES (NULL,'$cid','$pcui','$cod','$nom','$det','$mar','$sto','$pven','$pcos','$fing')");
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
		case 2:
			$id = $_POST['txtid'];
			$cod = @$_POST['txtcod'];
			$pcui = @$_POST['txtcui'];
			$cid = @$_POST['txtcat'];
			$nom = $_POST['txtnom'];
			$det = $_POST['txtdet'];
			$mar = $_POST['txtmar'];
			$sto = $_POST['txtsto'];
			$pven = $_POST['txtven'];
			$pcos = $_POST['txtcos'];
			$fing = $hoy;
		if(!empty($nom AND $sto AND $pcos AND $pven)){
			$queryProducto =  mysqli_query($conexion,"UPDATE producto SET nombre='$nom', detalle='$det', marca='$mar', stock=$sto, precio_venta=$pven, precio_costo=$pcos, fecha_ingreso=$fing WHERE id=$id ");
				        $msg = 'Se modifico correctamente.';
				    }
				   	else {
				        $msg = 'Error al modificar.';
				    }
				    // NO LO PUDE HACER ANDAR EN AJAX JSON POR ESO PASA DIRECTO POR ACTION POST | NO MUESTRA ALERT.
					echo '<script type="text/javascript">alert("'.$msg.'");</script>';
				    header('location: ../index.html#ajax/producto.html');
		break;
		case 3:
			$id = $_POST['delid'];
		if(!empty($id)){
			$queryProducto =  mysqli_query($conexion,"DELETE FROM producto WHERE id=$id");
				$jsondata = array();
				        $jsondata['success'] = true;
				        $jsondata['message'] = "Se elimino correctamente";
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
	}
?>
