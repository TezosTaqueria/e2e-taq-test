# e2e-taq-test
A portable repo for rapid e2e test of Taqueria

## Need Taqueria
### Release
```
curl -LO https://taqueria.io/get/linux/taq
chmod +x taq1
sudo mv taq /usr/local/bin

taq --version
```
### Pre-release
```
wget https://github.com/ecadlabs/taqueria/releases/download/<RELEASE VERSION>/taq-linux
chmod +x taq-linux
mv taq-linux taq
sudo mv taq /usr/local/bin

taq --version
```
## Set up the e2e-taq-test tool

1. clone https://github.com/ecadlabs/e2e-taq-test.git
2. npm i ts-jest
3. npm install

## run

to run all: 
npm t

to run specific suites:
npm t "smoke-e2e-tests.spec.ts"
npm t "ligo-plugin-e2e-test.spec.ts"
npm t "taquito-plugin-e2e-test.spec.ts"

## Make a note of your node --version
    Check requirement against the Docs : https://taqueria.io/docs/getting-started/installation/
## More tests can be added
---
This should help with solving the "You tried what version of what running on what?" problem.
