@echo off
title Mayank Portfolio - Automated Daily Scheduler Setup
color 0A
cd /d "%~dp0"

echo ===================================================================
echo   MAYANK AGGARWAL PORTFOLIO - WINDOWS DAILY TASK SCHEDULER
echo ===================================================================
echo.
echo This utility configures Windows Task Scheduler to run DAILY_TASK.bat
echo automatically every day (Build + SEO checks + IndexNow + Git Push).
echo.
echo Options:
echo   [1] Schedule Daily Task at 09:30 AM (Recommended)
echo   [2] Schedule Daily Task at Custom Time
echo   [3] Schedule to run automatically on PC Startup / User Login
echo   [4] Check Status of Scheduled Task
echo   [5] Run Scheduled Task Now (Test Run)
echo   [6] Remove / Delete Scheduled Task
echo   [0] Exit
echo.
set /p opt="Choose an option [1-6, 0]: "

set TASK_NAME=MayankPortfolioDailyTask
set SCRIPT_PATH=%~dp0DAILY_TASK.bat

if "%opt%"=="1" (
    echo.
    echo Creating daily scheduled task at 09:30 AM...
    schtasks /create /tn "%TASK_NAME%" /tr "\"%SCRIPT_PATH%\"" /sc daily /st 09:30 /f
    goto DONE
)

if "%opt%"=="2" (
    echo.
    set /p custom_time="Enter time in 24-hr format (e.g. 10:00 or 14:30): "
    schtasks /create /tn "%TASK_NAME%" /tr "\"%SCRIPT_PATH%\"" /sc daily /st %custom_time% /f
    goto DONE
)

if "%opt%"=="3" (
    echo.
    echo Creating scheduled task to run on User Login...
    schtasks /create /tn "%TASK_NAME%" /tr "\"%SCRIPT_PATH%\"" /sc onlogon /f
    goto DONE
)

if "%opt%"=="4" (
    echo.
    echo Checking task status...
    schtasks /query /tn "%TASK_NAME%" /fo list /v
    goto END
)

if "%opt%"=="5" (
    echo.
    echo Running scheduled task now...
    schtasks /run /tn "%TASK_NAME%"
    goto END
)

if "%opt%"=="6" (
    echo.
    echo Removing scheduled task...
    schtasks /delete /tn "%TASK_NAME%" /f
    goto END
)

goto END

:DONE
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================================
    echo   SUCCESS! Windows Task Scheduler is now configured!
    echo   Your website will automatically run daily SEO and Vercel sync!
    echo ===================================================================
) else (
    echo.
    echo NOTE: If access was denied, please right-click this .bat file
    echo and select 'Run as Administrator'.
)

:END
echo.
pause
