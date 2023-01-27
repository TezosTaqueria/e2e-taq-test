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

# Check if Taqueria is installed
V=$(taq --version)
if [ "$V" = "$VERSION" ]; then
    echo "Taqueria version $VERSION installed"
else
    echo "Taqueria version $VERSION not installed"
fi

# Initialize the test directory
taq init taq_test_"$VERSION"
cd taq_test_"$VERSION" || exit
cp ~/taqueria-test-files/contracts/* ./contracts
cp ~/taqueria-test-files/artifacts/* ./artifacts

# Install the ligo plugin
taq install @taqueria/plugin-ligo

# Compile the contracts
taq compile counter.mligo

# Install the flextesa plugin
taq install @taqueria/plugin-flextesa

# Start the sandbox
taq start sandbox local

#Wait
sleep 5

# List the accounts
taq list accounts local

# Install the taquito plugin
taq install @taqueria/plugin-taquito

# Originate the counter contract
taq originate counter.tz --sender alice

# Increment the counter by 3
taq transfer counter --param counter.parameter.increment_by_3.tz

## End of script