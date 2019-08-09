#!/bin/bash
# Note: the user name must be 'forest', and the working directory must be '~/dashboard'
# update source
sudo apt-get update
sudo apt-get -y install unar git nodejs npm python3-pip vim tmux curl libbz2-dev libgdbm-dev liblzma-dev libreadline-dev libsqlite3-dev libssl-dev tcl-dev tk-dev dpkg-dev libffi-dev curl gcc g++ make

# install python 3.7.2 and some packages
cd /tmp
wget https://www.python.org/ftp/python/3.7.2/Python-3.7.2.tar.xz
tar -xf Python-3.7.2.tar.xz
cd Python-3.7.2
./configure --enable-optimizations
# multiple cores building; may consume much time
make -j
sudo make altinstall
sudo pip3.7 install numpy pandas xlrx apt_pkg

# nodejs: npm5.6.0 and node9.11.2
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
cd ~
git clone https://github.com/chansonyhu/dashboard.git
cd dashboard
sudo cp start.sh /etc/init.d/
npm install
cd upload
npm install formidable
/home/forest/dashboard/start.sh
