#!/bin/bash
sudo service mongodb stop
sudo service mysql stop
# swap
# sudo fallocate -l 1G /swapfile
# sudo chmod 600 /swapfile
# sudo mkswap /swapfile
# sudo swapon /swapfile
#======
# sudo ln -s /usr/bin/nodejs /usr/bin/node
cd /home/forest/dashboard
sudo chmod 777 *.log
sudo -u forest npm run preview > dashboard.log 2>&1 &
cd upload
sudo chmod 777 *.log
sudo -u forest node nodejs-upload-file.js > upload.log 2>&1 &
# cd /home/chansonyhu123/code-server1.1119-vsc1.33.1-linux-x64/
# sudo -u chansonyhu123 ./code-server -N -H -p 59999 &
# chmod 440 /etc/sudoers
