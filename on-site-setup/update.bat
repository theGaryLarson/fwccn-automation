@echo off

cd "C:\fwccn\webApp\fwccn-automation"
@REM Check if the current branch is 'main'
for /f %%i in ('git rev-parse --abbrev-ref HEAD') do set branch=%%i
if "%branch%" neq "main" (
    echo You are not on the 'main' branch. Switching to 'main'...
    git checkout main
)

@REM Pull the latest changes from 'origin' and hard reset
echo Pulling latest changes from 'origin/main'...
git fetch origin main
git reset --hard origin/main

@REM Run npm commands
call npm ci
call npm run build
call npm run start