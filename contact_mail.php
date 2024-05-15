<?php
$mail_to = "salma.khater@viola.ae";
$name = str_replace(array("\r", "\n"), array(" ", " "), strip_tags(trim($_POST["name"])));
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$subject = trim($_POST["subject"]);
$message = trim($_POST["message"]);

// Additional PHP validations
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    $data = ['message' => 'Please fill out all fields', 'status' => 'error'];
    echo json_encode($data);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $data = ['message' => 'Invalid email format', 'status' => 'error'];
    echo json_encode($data);
    exit;
}

if (!preg_match('/^[a-zA-Z\s]+$/', $name)) {
    $data = ['message' => 'Name can only contain letters and spaces', 'status' => 'error'];
    echo json_encode($data);
    exit;
}

if (!isValidContent($subject)) {
    $data = ['message' => 'Content cannot contain script or HTML tags', 'status' => 'error'];
    echo json_encode($data);
    exit;
}

if (!isValidContent($message)) {
    $data = ['message' => 'Content cannot contain script or HTML tags', 'status' => 'error'];
    echo json_encode($data);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once "vendor/autoload.php";

$phpmailer = new PHPMailer(true);

try {
    $phpmailer->SMTPDebug = 0;                                       // Enable verbose debug output
    $phpmailer->isSMTP();
    $phpmailer->Host =  'p3plzcpnl504617.prod.phx3.secureserver.net';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = 465;
    $phpmailer->Username = '_mainaccount@sekured.io';
    $phpmailer->Password = 'bZXX%9Vr6#hy';
    $phpmailer->SMTPSecure = 'ssl';
    // Enable SSL encryption

    // $phpmailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;


    $content = '<html>
      <head>
      <title></title>
      </head>
      <body><table> 
      <tr>
      <td colspan="2">Hello, </td> 
      </tr>
      <tr>
      <td> Name:</td> 
      <td>' . $name . '</td> 
      </tr>
      <tr>
      <td> Email:</td> 
      <td>' . $email . '</td> 
      </tr>
      <tr>
      <td> Subject:</td> 
      <td>' . $subject . '</td> 
      </tr>
      <tr>
      <td> Message:</td> 
      <td>' . $message . '</td> 
      </tr>
      </table>
      </body>
      </html>';

    $phpmailer->CharSet = 'UTF-8';
    $phpmailer->setFrom("contact@sekured.io", 'Defend Expert');
    $phpmailer->addAddress("contact@sekured.io", 'Defend Expert');
    $phpmailer->isHTML(true);
    $phpmailer->Subject = "Defend Expert - Contact Us";
    $phpmailer->Body = $content;
    $phpmailer->AltBody = "This is the plain text version of the email content";
    $phpmailer->send();

    $data = ['message' => 'Thank you', 'status' => 'success'];
    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode($phpmailer->ErrorInfo);
    $data = ['message' => 'Please try again later', 'status' => 'error'];
    echo json_encode($data);
}

function isValidContent($content)
{
    // Regular expression to check if content contains script or HTML tags
    return !preg_match('/<(.*?)script(.*?)>|<(.*?)\/(.*?)script(.*?)>|<(.*?)style(.*?)>|<(.*?)\/(.*?)style(.*?)>|<.*?>/', $content);
}
