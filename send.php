<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$email = $_POST['email'];

// Формирование самого письма
$title = "Новое обращение Best Tour Plan";

if ($phone && $email) {
    $body = "
      <h2>Новое сообщение от </h2>$name<br>
      <b>Телефон:</b> $phone<br>
      <b>Почта:</b><br>$email<br>
      <b>Сообщение:</b><br>$message
    ";
} elseif($email) {
    $body = "
      <h2>Новое сообщение от </h2>$name<br>
      <b>Почта:</b><br>$email  
    ";
} else {
    $body = "
      <h2>Новое сообщение от </h2>$name<br>
      <b>Телефон:</b> $phone<br>    
      <b>Сообщение:</b><br>$message
    ";
}




// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2; 
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.yandex.com'; // SMTP сервера вашей почты
    $mail->Username   = 'zhekadolgovoi@yandex.com'; // Логин на почте
    $mail->Password   = '05102020__zheka'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('zhekadolgovoi@yandex.com', 'Жека Долговой'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('hiiamdiv@yandex.ru');  

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    
    
// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
header("Location: thankyou.html");


