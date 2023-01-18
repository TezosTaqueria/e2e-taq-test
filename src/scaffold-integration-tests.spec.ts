import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);

describe('Taco Shop Scaffold Tutorial E2E Testing', () => {
	jest.setTimeout(100000);

	test('scaffold project will get set up.', async () => {
		const { execute, exists, writeFile, readFile, cleanup } = await prepareEnvironment();
		const { stdout } = await execute(
			'taq',
			'scaffold https://github.com/ecadlabs/taqueria-scaffold-taco-shop.git scaffold-test',
		);
		await expect(stdout).toContain('🌮 Project created successfully 🌮');

		await exists('./scaffold-test/.taq/config.json');
		await exists('./scaffold-test/app/src');

		await exists('./scaffold-test/contracts/hello-tacos.mligo');
		await exists('./scaffold-test/contracts/hello-tacos.parameterList.mligo');
		await exists('./scaffold-test/contracts/hello-tacos.storageList.mligo');
		await exists('./scaffold-test/contracts/hello-tacos.test.mligo');
		await exists('./scaffold-test/contracts/contract.json');
		await exists('./scaffold-test/contracts/_buy.mligo');
		await exists('./scaffold-test/contracts/_make.mligo');
		await exists('./scaffold-test/contracts/_schema.mligo');

		await exists('./scaffold-test/artifacts/hello-tacos.tz');
		await exists('./scaffold-test/artifacts/hello-tacos.default_storage.tz');
		await exists('./scaffold-test/artifacts/hello-tacos.parameter.buySomeTacos.tz');
		await exists('./scaffold-test/artifacts/hello-tacos.storage.store420tacos.tz');

		await exists('./scaffold-test/node_modules/@taqueria/plugin-contract-types/index.js');
		await exists('./scaffold-test/node_modules/@taqueria/plugin-jest/index.js');
		await exists('./scaffold-test/node_modules/@taqueria/plugin-flextesa/index.js');
		await exists('./scaffold-test/node_modules/@taqueria/plugin-taquito/index.js');
		await exists('./scaffold-test/node_modules/@taqueria/plugin-ligo/index.js');

		const { stdout: stdout2, stderr } = await execute('taq', 'compile hello-tacos.mligo', './scaffold-test');
		console.log(stderr);
		console.log(stdout2);

		await cleanup();
	});
});