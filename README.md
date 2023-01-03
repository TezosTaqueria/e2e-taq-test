# e2e-taq-test
A portable repo for rapid user acceptance e2e test of Taqueria
Built using @gmrchk/cli-testing-library

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

```clone https://github.com/ecadlabs/e2e-taq-test.git
npm i ts-jest
npm i @gmrchk/cli-testing-library
npm install
```
### 3. Run Tests
```
jest --watch
```
or from terminal
```
npm t
```
### Make a note of your node --version
    Check requirement against the Docs : https://taqueria.io/docs/getting-started/installation/

### More tests can be added
    But it should not take more than 2 minutes for them all to run!
    So we have to choose carefully.
---

