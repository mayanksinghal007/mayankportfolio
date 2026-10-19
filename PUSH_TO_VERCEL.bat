@echo off
title Push Website Updates to Vercel
color 0A
cd /d "%~dp0"
echo.
echo ===================================================================
echo   PUSHING GOOGLE TAGS, SEARCH CONSOLE & GA4 TO GITHUB & VERCEL...
echo ===================================================================
echo.
git push origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ===================================================================
    echo   SUCCESS! Deployment has been triggered on Vercel.
    echo   Wait ~40 seconds, then go to Search Console and click Verify!
    echo ===================================================================
) else (
    echo.
    echo ===================================================================
    echo   If GitHub login was requested, please complete the sign-in above.
    echo ===================================================================
)
echo.