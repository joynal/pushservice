# server setup

# librdkafka dependencies
sudo apt update && sudo apt upgrade && sudo apt dist-upgrade
sudo apt autoremove
sudo apt install -y make python git vim curl wget g++ libsasl2-dev libssl-dev libstdc++6

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
source .bashrc

# install nodejs
nvm install 10.16.0
npm i -g pm2

# clone & setup pushservice
mkdir app && cd app/
git clone git@github.com:joynal/pushservice.git
cd pushservice/ && npm i
cp .env.example .env

# server tewak
ulimit -n 1000000
ulimit -S 1000000
