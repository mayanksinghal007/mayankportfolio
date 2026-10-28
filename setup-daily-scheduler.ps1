# Mayank Portfolio - Windows Scheduled Task Setup Script
$ErrorActionPreference = 'Stop'

$TaskName = "MayankPortfolioDailyTask"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BatPath = Join-Path $ScriptDir "DAILY_TASK.bat"

Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "  MAYANK PORTFOLIO - AUTOMATED DAILY TASK SCHEDULER SETUP" -ForegroundColor Cyan
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Target: $BatPath" -ForegroundColor Yellow

$Action = New-ScheduledTaskAction -Execute $BatPath -WorkingDirectory $ScriptDir
$Trigger = New-ScheduledTaskTrigger -Daily -At 09:30AM
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

try {
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "Runs daily SEO build, prerender, IndexNow submission, and Vercel sync for Mayank Portfolio" -Force
    Write-Host ""
    Write-Host "✓ SUCCESS! Scheduled Task '$TaskName' has been created." -ForegroundColor Green
    Write-Host "  Trigger: Daily at 09:30 AM" -ForegroundColor Green
    Write-Host "  Action: Runs DAILY_TASK.bat automatically" -ForegroundColor Green
} catch {
    Write-Host "Error creating scheduled task: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Try running PowerShell as Administrator if permission was denied." -ForegroundColor Yellow
}
