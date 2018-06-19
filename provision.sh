#!/usr/bin/env bash

sudo apt-get update
sudo apt-get install -y build-essential python
# sudo apt-get install -y postgresql postgresql-contrib
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password mysql'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password mysql'
sudo apt-get -y install mysql-server

sudo mysql --user root --password=mysql  -e "CREATE DATABASE toptal_db;"
sudo mysql --user root --password=mysql  -e "CREATE DATABASE toptal_db_test;"
sudo mysql --user root --password=mysql  -e "CREATE DATABASE toptal_db_production;"
sudo mysql --user root --password=mysql  -e "GRANT ALL PRIVILEGES ON toptal_db.* TO 'toptal_user'@'localhost' IDENTIFIED BY 'toptal_pw';"
sudo mysql --user root --password=mysql  -e "GRANT ALL PRIVILEGES ON toptal_db_test.* TO 'toptal_user'@'localhost' IDENTIFIED BY 'toptal_pw';"
sudo mysql --user root --password=mysql  -e "GRANT ALL PRIVILEGES ON toptal_db_production.* TO 'toptal_user_production'@'localhost' IDENTIFIED BY 'toptal_pw_production';"

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# only for dev
sudo apt-get install -y php7.0-cli
sudo apt-get install -y php7.0-mysql
sudo apt-get install -y nginx