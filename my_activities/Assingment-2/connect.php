<?php
    $firstname = $_POST['Firstname'];
    $lastname = $_POST['Lastname'];
    $email = $_POST['Email'];
    $linkedin = $_POST['LinkedIn'];
    $drupal = $_POST['Drupal'];
    $position = $_POST['Position'];
    $duration = $_POST['Duration'];
    $mobile = $_POST['Mobile'];
    $city = $_POST['Current-city'];
    $prevcomp = $_POST['previous-company'];
    $comments = $_POST['Comments'];


    // Database connection

    $con = new mysqli('localhost', 'root', '8285', 'registration_details');

    // checking if connection is live
    
    if(con -> connect_error){
        die('connection failes : ' .$con->connect_error);
    }
    else{
        $sbmt = $con -> prepare("insert into user-details(firstname,lastname,
        email, linkedin, drupal, position, duration, mobile, city, prevcomp,
        comments) values(?,?,?,?,?,?,?,?,?,?,?)");
        $sbmt -> bind_param('ssssssiisss',$firstname,$lastname,$email,$linkedin,$drupal,$position,$duration,$mobile,$city,$prevcomp,$comments);
        $sbmt -> execute();
        echo "Registration completed.......";
        $sbmt -> close();
        $con->close();
    }

?>