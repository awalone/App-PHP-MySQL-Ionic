<?php 
    header('Access-Control-Allow-Origin: *');

    //Parâmetro para conexão com a base de dados
    $host = 'localhost';
    $user = 'root';
    $password = 'pcds1991';
    $dbname = 'monumentos';
    $charset = 'utf8';

    //Parâmetros para conexão com PDO
    $dns = "mysql:host=".$host.";port=3306;dbname=".$dbname.";charset=".$charset;
    $opt = [ 
        PDO:: ATTR_ERRMODE => PDO:: ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES   => false
    ];
   
    //Criando uma instância
    $pdo = new PDO($dns,$user, $password, $opt);

    $key = strip_tags($_REQUEST['key']);
    $data = [];

    try{

        $statment = $pdo->query('SELECT id, name, city, country, description FROM pontos_turisticos ORDER BY name ASC');

        while ($row = $statment->fetch(PDO::FETCH_OBJ)) 
        {
            $data[] = $row;
        }

        echo json_encode($data);

    } catch(PDOException $e)
   {
      echo $e->getMessage();
   }
            
?>