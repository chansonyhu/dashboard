#!/bin/bash
cd /home/forest/dashboard
sudo -u forest npm run preview & > dashboard.log 2>&1
cd upload
sudo -u forest node nodejs-upload-file.js & > ../upload.log 2>&1

