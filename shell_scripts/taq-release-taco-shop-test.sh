#!/bin/sh
: << 'COMMENT'
This script can be used to test a pre-release version of Taqueria
- You have to copy the test files directory shell_scripts/taqueria-test-files
  to your home directory, e.g. 
     cp -r shell_scripts/taqueria-test-files ~/ 
- You have to enter the version number of the pre release when asked
- You have to have docker installed and running
- You have to have wget installed
COMMENT

# The script will exit if any command fails
set -e

# Check if Taqueria is installed
TAQ=/usr/local/bin/taq
if [ -f "$TAQ" ]; then
    echo "$TAQ exists."
    sudo rm -r /usr/local/bin/taq
fi

# Get the version number
echo What is the version? e.g. v0.25.31-rc
read -r VERSION
echo "Getting taq version $VERSION"

# Check if the project directory exists
PROJECT=/usr/local/bin/taq
if [ -f "$PROJECT" ]; then
    echo "$PROJECT exists."
    sudo rm -r taq_test_"$VERSION"
fi

# Check if docker is installed
if [ "$( docker ps | grep taq-flextesa-local )" = "true" ]; then
    echo "Removing taq-flextesa-local"
    docker rm -vf $(docker ps -aq) 2>&1 > /dev/null
fi

# Install Taqueria
curl -LO https://taqueria.io/get/linux/taq
chmod +x taq
sudo mv taq /usr/local/bin

# Check if Taco Shop is installed
TACOSHOP=/home/mike/e2e-taq-test/shell_scripts/taco-shop
if [ -f "$TACOSHOP" ]; then
    echo "$TACOSHOP exists."
    sudo rm -r /home/mike/e2e-taq-test/shell_scripts/taco-shop
fi

#Wait
sleep 5

# Scaffold and Initialize the Project
taq scaffold https://github.com/ecadlabs/taqueria-scaffold-taco-shop taco-shop
cd taco-shop
cp ~/taqueria-test-files/contracts/* ./contracts
cp ~/taqueria-test-files/artifacts/* ./artifacts

#Wait
sleep 5

taq compile taco-shop.mligo

taq originate taco-shop.tz -e testing

cd app
npm run build
npm run start

## End of script