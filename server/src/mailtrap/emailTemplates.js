export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
  </head>
  <body style="margin: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
      <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Verify Your Email</h1>
      </div>

      <div style="padding: 30px;">
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">Thank you for signing up! Your verification code is:</p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background: #4CAF50; color: white; font-size: 28px; font-weight: bold; padding: 15px 30px; border-radius: 6px; letter-spacing: 5px;">
            {verificationCode}
          </span>
        </div>

        <p style="font-size: 16px;">Enter this code on the verification page to complete your registration.</p>
        <p style="font-size: 16px;">This code will expire in 24 hours for security reasons.</p>
        <p style="font-size: 16px;">If you didn't create an account with us, please ignore this email.</p>

        <p style="font-size: 16px; margin-top: 30px;">Best regards,<br />The App Team</p>
      </div>

      <div style="text-align: center; font-size: 12px; color: #888; padding: 10px;">
        <p>&copy; 2025 The App Company. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px;">
  <!-- Header Section -->
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>

  <!-- Message Box -->
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    
    <!-- Reset Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" 
         style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; 
                border-radius: 5px; font-weight: bold; cursor: pointer;">
        Reset Password
      </a>
    </div>

    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Successful</title>
  </head>
  <body style="margin: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
      <div style="background: linear-gradient(to right, #4CAF50, #2e7d32); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Password Changed Successfully</h1>
      </div>

      <div style="padding: 30px;">
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">Your password has been changed successfully. If this was you, no further action is needed.</p>
        <p style="font-size: 16px;">If you didn't perform this action, please <a href="{supportLink}" style="color: #e53935;">contact support immediately</a>.</p>

        <p style="font-size: 16px; margin-top: 30px;">Stay secure,<br />The App Team</p>
      </div>

      <div style="text-align: center; font-size: 12px; color: #888; padding: 10px;">
        <p>&copy; 2025 The App Company. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;