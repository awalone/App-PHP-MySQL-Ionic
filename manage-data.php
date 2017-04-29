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

    switch ($key) 
    {
        case 'create':

            $name = filter_var($_REQUEST['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $city = filter_var($_REQUEST['city'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $country = filter_var($_REQUEST['country'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $description = filter_var($_REQUEST['description'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

            try{

                $sql = "INSERT INTO pontos_turisticos (name, city, country, description) VALUES (:name, :city, :country, :description)";
               
                $statment = $pdo->prepare($sql);
                $statment->bindParam(':name', $name, PDO::PARAM_STR);
                $statment->bindParam(':city', $city, PDO::PARAM_STR);
                $statment->bindParam(':country', $country, PDO::PARAM_STR);
                $statment->bindParam(':description', $description, PDO::PARAM_STR);
                $statment->execute();
                
                echo json_decode(['message' => 'Ponto turístico '.$name.' cadastrado!']);

            } catch(PDOExeption $e ){
                    echo $e->getMessage();
            }

        break;
        
        case 'update':

            $name = filter_var($_REQUEST['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $city = filter_var($_REQUEST['city'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $country = filter_var($_REQUEST['country'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $description = filter_var($_REQUEST['description'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $codeID = filter_var($_REQUEST['codeID'], FILTER_SANITIZE_NUMBER_INT);

            try{

                $sql = "UPDATE pontos_turisticos SET name= :name, city= : city, country= :country, description= :description WHERE id = :codeID";
                
                $statment = $pdo->prepare($sql);
                $statment->bindParam(':name', $name, PDO::PARAM_STR);
                $statment->bindParam(':city', $city, PDO::PARAM_STR);
                $statment->bindParam(':country', $country, PDO::PARAM_STR);
                $statment->bindParam(':description', $description, PDO::PARAM_STR);
                $statment->bindParam(':codeID', $codeID, PDO::PARAM_INT);                
                $statment->execute();
                
                echo json_decode('Ponto turístico '.$name.' atualizado!');

            } catch(PDOExeption $e ){
                    echo $e->getMessage();
            }

         break;
        
        case 'delete':
            $codeID = filter_var($_REQUEST['codeID'], FILTER_SANITIZE_NUMBER_INT);

            try{
                //$pdo = new PDO($dns,$user, $password);

                $sql = "DELETE FROM pontos_turisticos WHERE id= :codeID"; 

                $statment = $pdo->prepare($sql);
                $statment->bindParam(':codeID', $codeID, PDO::PARAM_INT);                
                $statment->execute();

                echo json_decode('Ponto turístico '.$name.' removido!');

            } catch(PDOExeption $e ){
                    echo $e->getMessage();
            }
            break;
    }
?>