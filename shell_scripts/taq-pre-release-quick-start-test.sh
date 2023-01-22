#!/bin/sh
## This script is used to test the pre-release version of taqueria
## You have to copy the test files directory shell_scripts/taqueria-test-files
## to your home directory, e.g. 
##    cp -r shell_scripts/taqueria-test-files ~/ 
## You have to pass the version number as an argument
## e.g. ./taq-pre-release-quick-start-test.sh v0.25.31-rc   
## You have to have docker installed and running
## You have to have wget installed
## Taqueria will be installed
## A test directory will be created
## The test directory will be initialized
## The test contracts will be copied to the test directory
## The test artifacts will be copied to the test directory
## The ligo plugin will be installed
## The contracts will be compiled
## The flextesa plugin will be installed
## The sandbox will be started
## The accounts will be listed
## The taquito plugin will be installed
## The counter contract will be originated
## The counter contract will be incremented by 3

## The script will exit if any command fails
set -e

TAQ=/usr/local/bin/taq
if [ -f "$TAQ" ]; then
    echo "$TAQ exists."
    sudo rm -r /usr/local/bin/taq
fi

echo What is the version? e.g. v0.25.31-rc
read -r VERSION
echo "Getting taq version $VERSION"

PROJECT=/usr/local/bin/taq
if [ -f "$PROJECT" ]; then
    echo "$PROJECT exists."
    sudo rm -r taq_test_"$VERSION"
fi

if [ "$( docker ps | grep taq-flextesa-local )" = "true" ]; then
    echo "Removing taq-flextesa-local"
    docker rm -vf $(docker ps -aq) 2>&1 > /dev/null
fi

wget https://github.com/ecadlabs/taqueria/releases/download/$VERSION/taq-linux
chmod +x taq-linux
mv taq-linux taq
sudo mv taq /usr/local/bin

V=$(taq --version)
if [ "$V" = "$VERSION" ]; then
    echo "Taqueria version $VERSION installed"
else
    echo "Taqueria version $VERSION not installed"
fi

taq init taq_test_"$VERSION"

cd taq_test_"$VERSION" || exit

cp ~/taqueria-test-files/contracts/* ./contracts
cp ~/taqueria-test-files/artifacts/* ./artifacts

taq install @taqueria/plugin-ligo@"$VERSION"

taq compile counter.mligo

taq install @taqueria/plugin-flextesa@"$VERSION"

taq start sandbox local

taq list accounts local

taq install @taqueria/plugin-taquito@"$VERSION"

taq originate counter.tz --sender alice

taq transfer counter --param counter.parameter.increment_by_3.tz

## End of script