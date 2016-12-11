<?php
	include("conexion.php");
	$orden = $_POST['orden'];

	switch($orden){
		case 0:
			$queryProveedor=  mysqli_query($conexion,"SELECT * FROM proveedor") or die(mysqli_error());
			$proveedores = array();
					while($row =mysqli_fetch_assoc($queryProveedor))
					{
							$proveedores[] = $row;
					}
			$json = json_encode($proveedores);
			echo $json;
		break;
		case 1:
			$txtnom = $_POST['txtnom'];
			$tipo = $_POST['tipo'];	
			$txtcui = $_POST['txtcui'];
			$txtloc = $_POST['txtloc'];
			$txtdir = $_POST['txtdir'];
			$txttel = $_POST['txttel'];
			$txtmai = $_POST['txtmai'];
			$idem = $_POST['idem'];;
		if(!empty($txtcui AND $txtnom AND $txtdir)){
			$queryProveedor =  mysqli_query($conexion,"INSERT INTO proveedor VALUES ('$txtcui','$idem','$tipo','$txtnom','$txtdir','$txtloc','$txttel','$txtmai')");
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
			$id = $_POST['txtcui'];
			$txtnom = $_POST['txtnom'];
			$tipo = $_POST['tipo'];
			$txtcui = $_POST['txtcui'];
			$txtloc = $_POST['txtloc'];
			$txtdir = $_POST['txtdir'];
			$txttel = $_POST['txttel'];
			$txtmai = $_POST['txtmai'];
			$idem = $_POST['idem'];
		if(!empty($txtcui AND $txtnom AND $txtdir)){
			$queryProveedor =  mysqli_query($conexion,"UPDATE proveedor SET cuit='$txtcui',tipo_documento_id='$idem',tipo='$tipo',nombre='$txtnom',direccion='$txtdir',localidad='$txtloc',telefono='$txttel',mail='$txtmai' WHERE cuit='$id' ");
				        $msg = 'Se modifico correctamente.';
				    } 
				   	else {
				        $msg = 'Error al modificar.';
				    }
				    // NO LO PUDE HACER ANDAR EN AJAX JSON POR ESO PASA DIRECTO POR ACTION POST | NO MUESTRA ALERT.
					echo '<script type="text/javascript">alert("'.$msg.'");</script>';
				    header('location: ../index.html#ajax/proveedor.html');
		break;
		case 3:
			$id = $_POST['delid'];
		if(!empty($id)){
			$queryProveedor =  mysqli_query($conexion,"DELETE FROM proveedor WHERE cuit=$id");
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
	}
?>