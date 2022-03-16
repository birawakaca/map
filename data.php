
<?php

// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST');
// header("Access-Control-Allow-Headers: X-Requested-With");

function csvToJson($fname) {

    if (!($fp = fopen($fname, 'r'))) {
        die("Tidak bisa membuka file...");
    }
    
    $key = fgetcsv($fp,"1024",",");

    $json = array();
    while ($row = fgetcsv($fp,"1024",",")) {
    $json[] = array_combine($key, $row);
    }

    fclose($fp);

    echo json_encode($json);

    

    // if (file_put_contents("wirausaha.json", $js))
    //   echo "JSON file created successfully...";
    // else 
    //   echo "Oops! Error creating json file...";
    
    
}

print(csvToJson("file/Tracer Wirausaha_edit.csv"));

?>