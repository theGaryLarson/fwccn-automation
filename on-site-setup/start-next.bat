@echo off

cd "C:\fwccn\webApp\fwccn-automation"
@REM call add git pull origin main @REM pulls any changes I make to the github repo
 call npm ci
 call npm run build
 call npm run start
pause