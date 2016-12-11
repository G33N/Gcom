<?php
	include("conexion.php");
	$orden = $_POST['orden'];

	switch($orden){
		case 0:
			$queryCliente=  mysqli_query($conexion,"SELECT * FROM cliente") or die(mysqli_error());
			$clientes = array();
					while($row =mysqli_fetch_assoc($queryCliente))
					{
							$clientes[] = $row;
					}
			$json = json_encode($clientes);
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
			$idem = $_POST['idem'];
		if(!empty($txtcui AND $txtnom AND $txtdir)){
			$queryCliente =  mysqli_query($conexion,"INSERT INTO cliente VALUES ('$txtcui','$idem','$tipo','$txtnom','$txtdir','$txtloc','$txttel','$txtmai')");
			$queryCuenta = mysqli_query($conexion,"INSERT INTO cuenta VALUES (NULL, '$txtcui', '0')");
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
			$idem = $_POST['tipo_documento'];
		if(!empty($txtcui AND $txtnom AND $txtdir)){
			$queryCliente =  mysqli_query($conexion,"UPDATE cliente SET cuit='$txtcui',tipo_documento='$idem',tipo='$tipo',nombre='$txtnom',direccion='$txtdir',localidad='$txtloc',telefono='$txttel',mail='$txtmai' WHERE cuit=$id ");
				        $msg = 'Se modifico correctamente.';
				    }
				   	else {
				        $msg = 'Error al modificar.';
				    }
				    // NO LO PUDE HACER ANDAR EN AJAX JSON POR ESO PASA DIRECTO POR ACTION POST | NO MUESTRA ALERT.
					echo '<script type="text/javascript">alert("'.$msg.'");</script>';
				    header('location: ../index.html#ajax/cliente.html');
		break;
		case 3:
			$id = $_POST['delid'];
		if(!empty($id)){
			$queryCliente =  mysqli_query($conexion,"DELETE FROM cliente WHERE cuit=$id");
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
