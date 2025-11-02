@echo off
setlocal enabledelayedexpansion

REM Usage: deploy-article.bat <path-to-exported-html>
if "%~1"=="" (
  echo Usage: deploy-article.bat ^<path-to-exported-html^>
  echo Example: deploy-article.bat "%USERPROFILE%\Downloads\my-article.html"
  pause
  exit /b 1
)

set FILE=%~1
set NAME=%~nx1
set REPO=%~dp0
set BLOGDIR=%REPO%blog

echo Copying "%FILE%" to "%BLOGDIR%\%NAME%" ...
copy /Y "%FILE%" "%BLOGDIR%\%NAME%" >nul
if errorlevel 1 (
  echo Copy failed.
  exit /b 1
)

echo Updating sitemap.xml ...
powershell -NoProfile -ExecutionPolicy Bypass -File "%REPO%auto-deploy.ps1" -OncePath "%BLOGDIR%\%NAME%" -SkipVercel
if errorlevel 1 (
  echo Sitemap update failed.
  exit /b 1
)

echo Deploying to Vercel (prod)...
vercel deploy --prod
if errorlevel 1 (
  echo Vercel deploy failed.
  exit /b 1
)

set URL=https://aigrantwriter.xyz/blog/%NAME%
echo Published: %URL%
REM Open default browser
start "" "%URL%"
REM Copy URL to clipboard via PowerShell
powershell -NoProfile -ExecutionPolicy Bypass -Command "Set-Clipboard -Value '%URL%'"

echo Done. URL copied to clipboard.
exit /b 0