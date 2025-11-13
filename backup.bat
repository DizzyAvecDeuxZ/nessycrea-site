@echo off
REM Script de backup automatique NessyCrea

echo ========================================
echo   BACKUP NESSYCREA
echo ========================================

REM 1. Commit Git
cd "%~dp0"
git add -A
git commit -m "Backup automatique - %date% %time%"
echo [OK] Git commit cree

REM 2. Backup dans Documents
set BACKUP_NAME=nessycrea-backup-%date:~-4%-%date:~3,2%-%date:~0,2%-%time:~0,2%%time:~3,2%
set BACKUP_NAME=%BACKUP_NAME: =0%
xcopy /E /I /Y "%~dp0" "C:\Users\Spare\Documents\nessycrea-backups\%BACKUP_NAME%"
echo [OK] Backup cree dans Documents\nessycrea-backups\%BACKUP_NAME%

REM 3. Afficher l'historique Git
echo.
echo Derniers commits :
git log --oneline -5

echo.
echo ========================================
echo   BACKUP TERMINE !
echo ========================================
pause
