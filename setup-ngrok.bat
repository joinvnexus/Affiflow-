@echo off
echo ========================================
echo    AffiFlow - ngrok Authentication Setup
echo ========================================
echo.
echo This script will help you set up ngrok for webhook testing.
echo.
set /p token="Enter your ngrok authtoken: "
echo.
echo Setting up authentication...
ngrok config add-authtoken %token%
echo.
echo Authentication complete! Now you can run:
echo .\start-ngrok.bat
echo.
pause