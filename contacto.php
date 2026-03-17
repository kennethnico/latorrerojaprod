<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo 'Acceso no válido.';
    exit;
}

$nombre       = trim($_POST['nombre'] ?? '');
$email        = trim($_POST['email'] ?? '');
$whatsapp     = trim($_POST['whatsapp'] ?? '');
$pais         = trim($_POST['pais'] ?? '');
$servicio     = trim($_POST['servicio'] ?? '');
$problema     = trim($_POST['problema'] ?? '');
$fecha_limite = trim($_POST['fecha_limite'] ?? '');
$comentarios  = trim($_POST['comentarios'] ?? '');

// Validación mínima
if ($nombre === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'Por favor, revisa tu nombre y correo.';
    exit;
}

$to      = 'info@latorrerojaproducciones.com';
#$to      = 'krenicgm@gmail.com';
$subject = 'Nuevo mensaje desde el formulario de contacto';

// Cuerpo del correo
$body  = "Nuevo mensaje desde La Torre Roja Producciones:\n\n";
$body .= "Nombre: $nombre\n";
$body .= "Email: $email\n";
$body .= "Whatsapp: $whatsapp\n";
$body .= "País: $pais\n";
$body .= "Servicio / producto: $servicio\n";
$body .= "Problema / necesidad: $problema\n";
$body .= "Fecha límite: $fecha_limite\n";
$body .= "Comentarios adicionales: $comentarios\n";

// Cabeceras
$headers  = "From: no-reply@latorrerojaproducciones.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Cc: sweet@latorrerojaproducciones.com\r\n";
$headers .= "Bcc: krenicgm@gmail.com\r\n";

if (mail($to, $subject, $body, $headers)) {
    // éxito
    header('Location: mensaje-enviado.php?status=ok');
    exit;
} else {
    // error
    header('Location: mensaje-enviado.php?status=error');
    exit;
}
?>