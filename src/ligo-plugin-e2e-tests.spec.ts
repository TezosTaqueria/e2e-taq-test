import { exec as exec1 } from 'child_process';
import { createHash } from 'crypto';
import path from 'path';
import util from 'util';
const exec = util.promisify(exec1);

import { prepareEnvironment } from '@gmrchk/cli-testing-library';

jest.setTimeout(120000);

describe('Ligo Plugin E2E Testing for Taqueria CLI', () => {

	test('(quickstart scenario) - ligo compile will create an artifact from three files - slowtest ', async () => {
		const { execute, cleanup, writeFile, exists, ls } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ligo/index.js');
		await execute('taq', '@taqueria/plugin-flextesa', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');

		const mligo_file = await (await exec(`cat src/test-data/counter.mligo`)).stdout;
		await writeFile('./test-project/contracts/counter.mligo', mligo_file);
		const storage_file = await (await exec(`cat src/test-data/counter.storageList.mligo`)).stdout;
		await writeFile('./test-project/contracts/counter.storageList.mligo', storage_file);
		const permissions_file = await (await exec(`cat src/test-data/counter.parameterList.mligo`)).stdout;
		await writeFile('./test-project/contracts/counter.parameterList.mligo', permissions_file);

		await execute('taq', 'add-contract counter.mligo', './test-project');
		await execute('taq', 'add-contract counter.parameterList.mligo', './test-project');
		await execute('taq', 'add-contract counter.storageList.mligo', './test-project');

		const contracts_list = await ls('./test-project/contracts');
		expect(contracts_list).toEqual(
			expect.arrayContaining(['counter.mligo', 'counter.parameterList.mligo', 'counter.storageList.mligo']),
		);

		const { stdout: stdout1, stderr: stderr0 } = await execute('taq', 'compile counter.mligo --plugin @taqueria/plugin-ligo', './test-project');
			console.log('stdout1', stdout1);
			console.log('stderr0', stderr0);
		expect(stdout1).toMatchInlineSnapshot(`
				  [
					"┌─────────────────────────────┬───────────────────────────────────────────────┐",
					"│ Contract                    │ Artifact                                      │",
					"├─────────────────────────────┼───────────────────────────────────────────────┤",
					"│ counter.mligo               │ artifacts/counter.tz                          │",
					"├─────────────────────────────┼───────────────────────────────────────────────┤",
					"│ counter.storageList.mligo   │ artifacts/counter.default_storage.tz          │",
					"│                             │ artifacts/counter.storage.another_count.tz    │",
					"├─────────────────────────────┼───────────────────────────────────────────────┤",
					"│ counter.parameterList.mligo │ artifacts/counter.parameter.increment_by_3.tz │",
					"└─────────────────────────────┴───────────────────────────────────────────────┘",
				  ]
			  `);

		// const { stdout: stdout2, stderr } = await execute('taq', 'start sandbox local', './test-project');
		// expect(stdout2).toEqual(expect.arrayContaining(['Starting node...']));

		// const { stdout: stdout3 } = await execute('taq', 'list accounts local', './test-project');
		// expect(stdout3).toEqual(expect.arrayContaining(['│ Account │ Balance │ Address                              │']));
		// expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('bob')]));

		await cleanup();
	});

	test('ligo plugin compile will error if missing <contract> parameter', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stderr } = await execute('taq', 'compile', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['Not enough non-option arguments: got 0, need at least 1']));

		await cleanup();
	});

	test('ligo plugin add-contract will register a contract', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec(`cat src/test-data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const { stdout: stdout2 } = await execute('taq', 'add-contract hello-tacos.mligo', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ No registered contracts found │']));

		await cleanup();
	});

	test('ligo plugin add-contract will error if named contract does not exist', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stderr } = await execute('taq', 'add-contract no_such_contract.mligo', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['Could not read {{base}}/test-project/contracts/no_such_contract.mligo']));

		await cleanup();
	});

	test('ligo plugin compile will only compile one contract using compile <sourceFile> command', async () => {
		const { execute, cleanup, spawn, writeFile, ls, path } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout, stderr } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifacts_list_before = await ls('./test-project/artifacts');
		expect(artifacts_list_before).toEqual([]);

		const mligo_file = await (await exec(`cat src/test-data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const { } = await execute('taq', 'add-contract hello-tacos.mligo', './test-project');

		const { } = await execute('taq', 'compile hello-tacos.mligo', './test-project');
		const artifacts_list = await ls('./test-project/artifacts');
		expect(artifacts_list).toContain('hello-tacos.tz');

		await cleanup();
	});

	test('ligo plugin compile will error if the named contract does not exist', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute('taq', 'compile does_not_exist.mligo', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ does_not_exist.mligo │ Not compiled │']));
		expect(stderr).toEqual(expect.arrayContaining([expect.stringContaining('contracts/does_not_exist.mligo: No such file or directory')]));

		await cleanup();
	});	

	test('ligo plugin test can run ligo test', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec('cat src/test-data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const test_file = await (await exec('cat src/test-data/hello-tacos-tests.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos-tests.mligo', test_file);

		const { stdout: stdout2 } = await execute('taq', 'test hello-tacos-tests.mligo', './test-project');
		expect(stdout2).toEqual(
			expect.arrayContaining(['│                         │ 🎉 All tests passed 🎉                       │']),
		);

		await cleanup();
	});

	test('ligo plugin test will error if test file is invalid', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec('cat src/test-data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const invalid_test_file = await (await exec('cat src/test-data/hello-tacos-invalid-tests.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos-invalid-tests.mligo', invalid_test_file);

		const { stdout: stdout2, stderr } = await execute('taq', 'test hello-tacos-invalid-tests.mligo', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ hello-tacos-invalid-tests.mligo │ Some tests failed :( │']));
		expect(stderr).toEqual(expect.arrayContaining(['Variable "initial_storage" not found.']));

		await cleanup();
	});

	test('ligo plugin test will error if named file does not exist', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stderr } = await execute('taq', 'test hello-tacos-test.mligo', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['contracts/hello-tacos-test.mligo: No such file or directory.\\n']));

		await cleanup();
	});

	test('LIGO contract template will be instantiated with the right content and registered', async () => {
		const { execute, cleanup, spawn, readFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { code } = await execute('taq', 'create contract counter.mligo', './test-project');
		expect(code).toEqual(0);
		expect(await ls('./test-project/contracts')).toContain('counter.mligo');

		const bytes = await readFile(path.join('./test-project', 'contracts', 'counter.mligo'));
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');
		expect(hash).toEqual('241556bb7f849d22564378991ce6c15ffd7fd5727620f207fb53e6dc538e66ef');

		const configFile = await readFile(path.join('./test-project', '.taq', 'config.json'));
		const json = JSON.parse(configFile);
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('contracts');
		expect(json.contracts).toEqual({
			'counter.mligo': {
				'hash': '241556bb7f849d22564378991ce6c15ffd7fd5727620f207fb53e6dc538e66ef',
				'sourceFile': 'counter.mligo',
			},
		});

		await cleanup();
	});
});
