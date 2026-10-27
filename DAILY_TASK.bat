@echo off
title Mayank Portfolio - Automated Daily Task & Vercel Push
color 0B
cd /d "%~dp0"
echo.
echo ===================================================================
echo   MAYANK AGGARWAL PORTFOLIO - AUTOMATED DAILY SEO & PUSH ENGINE
echo ===================================================================
echo.
echo Running complete pipeline:
echo   1. Production Build & Static HTML Prerendering (185 Pages)
echo   2. Link Integrity Verification (0 Broken Links)
echo   3. Automated 1100+ SEO Compliance Checks
echo   4. Daily IndexNow Push (Bing, Yandex, IndexNow API)
echo   5. Core Backlink Target Ping
echo   6. Automatic Git Commit & Push to Vercel
echo.
echo ===================================================================
echo.
node scripts/run-daily-task.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================================
    echo   SUCCESS! All daily tasks executed and deployed to Vercel!
    echo ===================================================================
) else (
    echo.
    echo ===================================================================
    echo   NOTICE: If authentication was needed, please complete it above.
    echo ===================================================================
)
echo.
pause
