@echo off
start mongoose.exe -document_root .
timeout /t 2
start npm start
exit
