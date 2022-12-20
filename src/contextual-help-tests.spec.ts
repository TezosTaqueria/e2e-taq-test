import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Contextual Help E2E Testing for Taqueria CLI', () => {

    jest.setTimeout(30000);

	test('ligo plugin help will display default help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', '--help --projectDir=./test-project', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['taq [command]']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('1635 - ligo plugin compile will show contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'compile --help --projectDir=./test-project', './test-project');
		expect(stdout2).toEqual(
			expect.arrayContaining(['Compile a smart contract written in a LIGO syntax to Michelson code, along with']),
		);

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('1635 - ligo plugin compile-ligo will show contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute(
			'taq',
			'compile-ligo --help --projectDir=./test-project',
			'./test-project',
		);
		expect(stdout2).toEqual(
			expect.arrayContaining(['Compile a smart contract written in a LIGO syntax to Michelson code, along with']),
		);

		await cleanup();
	});

    // blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('1635-taquito plugin will give contextual help for deploy', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'deploy --help', './test-project');
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('1635-taquito plugin will give contextual help for originate', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', 'test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'originate --help', './test-project');
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('1635-taquito plugin will give contextual help for transfer task', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'transfer --help', './test-project');
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('1635-taquito plugin will give contextual help for transfer', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'call --help', './test-project');
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('1635-taquito plugin will give contextual help for fund', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'fund --help', './test-project');
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('1635-taquito plugin will give contextual help for instantiate-account', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'instantiate-account --help');
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});
});
