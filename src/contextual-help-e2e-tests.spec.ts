import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Contextual Help E2E Testing for Taqueria CLI', () => {

    jest.setTimeout(30000);

	
	test('help will offer project based help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-jest@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', '--help', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['taq <command>']));

		await cleanup();
	});

	
	test('test will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-jest@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'test --help', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Setup a directory as a partition to run Jest tests']));

		await cleanup();
	});

	
	test('jest will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-jest@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'jest --help', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Setup a directory as a partition to run Jest tests']));

		await cleanup();
	});

	
	test('create contract-test will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-jest@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'create contract-test --help', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Create files from pre-existing templates']));

		await cleanup();
	});

	test('ligo plugin help will display default help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', '--help', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['taq <command>']));

		await cleanup();
	});

	
	test('1635 - ligo plugin compile will show contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'compile --help', './test-project');
		expect(stdout2).toEqual(
			expect.arrayContaining(['Compile a smart contract written in a LIGO syntax to Michelson code, along with']),
		);

		await cleanup();
	});

	
	test('1635 - ligo plugin compile-ligo will show contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute(
			'taq',
			'compile-ligo --help',
			'./test-project',
		);
		expect(stdout2).toEqual(
			expect.arrayContaining(['Compile a smart contract written in a LIGO syntax to Michelson code, along with']),
		);

		await cleanup();
	});

    
	test('taquito plugin will give contextual help for deploy', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'deploy --help', './test-project');
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	
	test('taquito plugin will give contextual help for originate', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.26.28-rc', 'test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'originate --help', './test-project');
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	
	test('taquito plugin will give contextual help for transfer task', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'transfer --help', './test-project');
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	
	test('taquito plugin will give contextual help for transfer', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'call --help', './test-project');
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	
	test('taquito plugin will give contextual help for fund', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'fund --help', './test-project');
		expect(stdout2).toContain('Fund all the instantiated accounts up to the desired/declared amount in a target');

		await cleanup();
	});

	
	test('taquito plugin will give contextual help for instantiate-account', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'instantiate-account --help');
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});


	test('help will offer contenxtual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@0.26.28-rc', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'--help',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});

	
	test('start sandbox will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@0.26.28-rc', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'start sandbox --help',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});

	
	test('start will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@0.26.28-rc', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'start --help',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});

	
	test('sandbox stop will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@0.26.28-rc', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'sandbox stop --help',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Stops a flextesa sandbox']));

		await cleanup();
	});

	
	test('stop will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@0.26.28-rc', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'stop --help',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Stops a flextesa sandbox']));

		await cleanup();
	});

	
	test('project help will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-smartpy@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout1 } = await execute('taq', '--help/', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['taq compile <sourceFile>']));
		expect(stdout1).toEqual(expect.arrayContaining(['taq compile <sourceFile>']));

		await cleanup();
	});

	
	test('compile will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-smartpy@0.26.28-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout1 } = await execute('taq', 'compile --help/', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['taq compile <sourceFile>']));
		expect(stdout1).toEqual(expect.arrayContaining(['taq compile <sourceFile>']));

		await cleanup();
	});
});
