@echo off

cd "C:\repos\fwccn-automation"
@REM call add git pull origin main @REM pulls any changes I make to the github repo
 call npm ci
 call npm run build
 call npm run start
pause