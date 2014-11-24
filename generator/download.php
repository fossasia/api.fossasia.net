<?php 
if(isset($_POST['result']))
 {
   if(isset($_POST['communityName']) && $_POST['communityName']!='')
     {
       $filename=$_POST['communityName'] . '-api.json';
     } else
     {
       $filename='your-apifile.json';
     }
   header('Content-disposition: attachment; filename=' . $filename);
   header('Content-type: application/json');
   echo $_POST['result'];
   exit; //stop writing
 }
?>

