# e2e-taq-test
A portable repo for rapid user aaceptance e2e test of Taqueria

### 1. Get a Taqueria executable to test - built from sources, pre-release, or post release
#### Post Release
```
curl -LO https://taqueria.io/get/linux/taq
chmod +x taq1
sudo mv taq /usr/local/bin

taq --version
```
#### Pre-release
```
wget https://github.com/ecadlabs/taqueria/releases/download/<RELEASE VERSION>/taq-linux
chmod +x taq-linux
mv taq-linux taq
sudo mv taq /usr/local/bin

taq --version
```
#### Build from sources
```
git clone https://github.com/ecadlabs/taqueria.git
cd taqueria
npm run build-all
```

### 2. Set up the e2e-taq-test tool

1. clone https://github.com/ecadlabs/e2e-taq-test.git
2. npm i ts-jest
3. npm i @gmrchk/cli-testing-library
4. npm install

### 3. Run Tests

use jest --watch

or from terminal caommand line, 
to run all: 
npm t

to run specific suites:
npm t "smoke-e2e-tests.spec.ts"
npm t "ligo-plugin-e2e-test.spec.ts"
npm t "taquito-plugin-e2e-test.spec.ts"

### Make a note of your node --version
    Check requirement against the Docs : https://taqueria.io/docs/getting-started/installation/

### More tests can be added
    But it should not take more than 2 minutes for them all to run!
    So we have to choose carefully.
---

