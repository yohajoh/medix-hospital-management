export const baseLayout = (content, title = "Clinical Notification") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
    .header { background-color: #1A4F95; padding: 25px; text-align: center; color: #ffffff; }
    .content { padding: 40px; color: #2d3748; line-height: 1.6; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 11px; color: #718096; border-top: 1px solid #e2e8f0; }
    .btn { background-color: #1A4F95; color: #ffffff !important; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h2 style="margin:0;">${title}</h2></div>
    <div class="content">${content}</div>
    <div class="footer">
      © 2026 Medix Health Systems. All rights reserved.<br>
      This is a secure, HIPAA-compliant automated transmission.
    </div>
  </div>
</body>
</html>
`;
