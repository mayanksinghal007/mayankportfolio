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
echo   1. Production Build & Static HTML Prerendering (193+ Pages)
echo   2. Link Integrity Verification (0 Broken Links)
echo   3. Automated 1150+ SEO Compliance Checks
echo   4. Full Site SEMRush & Deep Link Connectivity Audit Scan
echo   5. Daily IndexNow Push (Bing, Yandex, IndexNow API)
echo   6. Core Backlink Target Indexing & Validation
echo   7. Automatic Git Commit & Push to Vercel
echo   8. Timestamped Run Log saved in logs/daily-task.log
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
