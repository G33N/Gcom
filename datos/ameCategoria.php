<?php
	include("conexion.php");
	$orden = $_POST['orden'];

	switch($orden){
		case 0:
			$queryCategoria=  mysqli_query($conexion,"SELECT * FROM categoria") or die(mysqli_error());
			$categorias = array();
					while($row =mysqli_fetch_assoc($queryCategoria))
					{
							$categorias[] = $row;
					}
			$json = json_encode($categorias);
			echo $json;
		break;
		case 1:
			$det = $_POST['txtdet'];
		if(!empty($det)){
			$queryCategoria =  mysqli_query($conexion,"INSERT INTO categoria (id, detalle) VALUES (NULL, '$det')");
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
			$det = $_POST['txtdet'];
			$id = $_POST['txtid'];
		if(!empty($det AND $id)){
			$queryCategoria =  mysqli_query($conexion,"UPDATE categoria SET detalle='$det' WHERE id='$id' ");
				        $msg = 'Se modifico correctamente.';
				    } 
				   	else {
				        $msg = 'Error al modificar.';
				    }
				    // NO LO PUDE HACER ANDAR EN AJAX JSON POR ESO PASA DIRECTO POR ACTION POST | NO MUESTRA ALERT.
					echo '<script type="text/javascript">alert("'.$msg.'");</script>';
				    header('location: ../index.html#ajax/categoria.html');
		break;
		case 3:
			$id = $_POST['delid'];
		if(!empty($id)){
			$queryCategoria =  mysqli_query($conexion,"DELETE FROM categoria WHERE id=$id");
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