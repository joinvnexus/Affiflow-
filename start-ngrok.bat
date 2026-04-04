@echo off
echo ========================================
echo    AffiFlow - ngrok Setup for Webhooks
echo ========================================
echo.
echo IMPORTANT: ngrok requires authentication!
echo.
echo 1. Go to: https://ngrok.com
echo 2. Sign up for a free account
echo 3. Get your authtoken from: https://dashboard.ngrok.com/get-started/your-authtoken
echo 4. Run: ngrok config add-authtoken YOUR_TOKEN_HERE
echo.
echo Example: ngrok config add-authtoken 2abcd...xyz
echo.
echo After authentication, run this script again.
echo.
pause
echo.
echo Starting ngrok tunnel...
ngrok http 3000