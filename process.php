<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $cryptoType = isset($_POST["cryptoType"]) ? htmlspecialchars($_POST["cryptoType"]) : '';
    $amount = isset($_POST["amount"]) ? htmlspecialchars($_POST["amount"]) : '';
    $bankName = htmlspecialchars($_POST["bankName"]);
    $accountNumber = htmlspecialchars($_POST["accountNumber"]);

    // Admin email (your email)
    $adminEmail = "tonyparcour1@gmail.com"; // Change this to your email

    // Subject for admin notification
    $subject = "New Swap Request from $name";
    
    // Email content
    $message = "Name: $name\n";
    $message .= "Email: $email\n";
    if ($cryptoType) {
        $message .= "Crypto Type: $cryptoType\n";
        $message .= "Amount: $amount\n";
    }
    $message .= "Bank Name: $bankName\n";
    $message .= "Account Number: $accountNumber\n";

    // Email headers
    $headers = "From: noreply@yourdomain.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email to admin
    $adminMailSent = mail($adminEmail, $subject, $message, $headers);

    // Send confirmation email to the user
    $userSubject = "Swap Request Received - FastSwap";
    $userMessage = "Hello $name,\n\nThank you for your swap request!\n\n";
    $userMessage .= "We have received your request and will process it shortly.\n";
    $userMessage .= "Details of your request:\n";
    $userMessage .= "Amount: $amount\n";
    $userMessage .= "Crypto Type: $cryptoType\n";
    $userMessage .= "Bank Name: $bankName\n";
    $userMessage .= "Account Number: $accountNumber\n\n";
    $userMessage .= "If you have any questions, feel free to contact our support.\n\n";
    $userMessage .= "Best regards,\nFastSwap Team";

    $userHeaders = "From: support@yourdomain.com\r\n";
    $userHeaders .= "Reply-To: support@yourdomain.com\r\n";

    $userMailSent = mail($email, $userSubject, $userMessage, $userHeaders);

    if ($adminMailSent && $userMailSent) {
        echo "success"; // Response for JavaScript
    } else {
        echo "error";
    }
} else {
    echo "Invalid request";
}
?>
