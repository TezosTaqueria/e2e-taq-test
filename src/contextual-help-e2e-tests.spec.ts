import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Contextual Help E2E Testing for Taqueria CLI', () => {

    jest.setTimeout(30000);

	
	test('help will offer project based help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-jest@0.25.31-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout3 } = await execute('taq', '--help', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['taq <command>']));

		await cleanup();
	});

	
	test('test will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-jest@0.25.31-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout3 } = await execute('taq', 'test --help', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Setup a directory as a partition to run Jest tests']));

		await cleanup();
	});

	
	test('jest will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-jest@0.25.31-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout3 } = await execute('taq', 'jest --help', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Setup a directory as a partition to run Jest tests']));

		await cleanup();
	});

	
	test('create contract-test will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-jest@0.25.31-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout3 } = await execute('taq', 'create contract-test --help', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Create files from pre-existing templates']));

		await cleanup();
	});

	test('ligo plugin help will display default help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo@0.25.31-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', '--help', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['taq <command>']));

		await cleanup();
	});

	
	test('1635 - ligo plugin compile will show contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo@0.25.31-rc', './test-project');
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
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo@0.25.31-rc', './test-project');
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
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.25.31-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'deploy --help', './test-project');
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	
	test('taquito plugin will give contextual help for originate', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.25.31-rc', 'test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'originate --help', './test-project');
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	
	test('taquito plugin will give contextual help for transfer task', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.25.31-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'transfer --help', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('Transfer/call an implicit account or a smart contract')]));

		await cleanup();
	});

	
	test('taquito plugin will give contextual help for transfer', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.25.31-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'call --help', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('Transfer/call an implicit account or a smart contract')]));

		await cleanup();
	});

	
	test('taquito plugin will give contextual help for fund', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.25.31-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'fund --help', './test-project');
		expect(stdout2).toContain('Fund all the instantiated accounts up to the desired/declared amount in a target');

		await cleanup();
	});

	
	test('taquito plugin will give contextual help for instantiate-account', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito@0.25.31-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'instantiate-account --help');
		console.log(stdout2);
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});
	
	test('start sandbox will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@0.25.31-rc', './test-project');
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
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@0.25.31-rc', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'start --help',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});
	
	test('stop will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@0.25.31-rc', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'stop --help',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Stops a flextesa sandbox']));

		await cleanup();
	});

	
	test('smartpy compile will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-smartpy@0.25.31-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout1 } = await execute('taq', 'compile --help', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['taq compile <sourceFile>']));

		await cleanup();
	});

	    // bug - https://github.com/ecadlabs/taqueria/issues/1635
		test('generate types offers contextual help', async () => {
			const { execute, spawn, cleanup } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");
			const { stdout } = await execute('taq', 'install @taqueria/plugin-contract-types@0.25.31-rc', './test-project');
			expect(stdout).toContain('Plugin installed successfully');
	
			const { stdout: stdout2 } = await execute('taq', 'generate types --help');
			expect(stdout2).toEqual(expect.arrayContaining(['Generate types for a contract to be used with taquito']));
	
			await cleanup();
		});
	
		// bug - https://github.com/ecadlabs/taqueria/issues/1635
		test('gen offers contextual help', async () => {
			const { execute, spawn, cleanup } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");
			const { stdout } = await execute('taq', 'install @taqueria/plugin-contract-types@0.25.31-rc', './test-project');
			expect(stdout).toContain('Plugin installed successfully');
	
			const { stdout: stdout2 } = await execute('taq', 'gen --help');
			console.log(stdout2)
			expect(stdout2).toEqual(expect.arrayContaining(['Generate types for a contract to be used with taquito']));
	
			await cleanup();
		});

		test('archetype compile offers contextual help', async () => {
			const { execute, cleanup, exists } = await prepareEnvironment();
			await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');
			await execute('taq', 'install @taqueria/plugin-archetype@0.25.31-rc', './test-project');
			await exists('./test-project/node_modules/@taqueria/plugin-archetype/index.js');
	
			const { stdout } = await execute('taq', 'compile --help', './test-project');
			expect(stdout).toEqual(
				expect.arrayContaining(['Compile a smart contract written in a Archetype syntax to Michelson code']),
			);
	
			await cleanup();
		});

			// see https://github.com/ecadlabs/taqueria/issues/1635
	// works manually
	// might not be working in tests because of the hyphen in the task name
	test('instantiate-account will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout: stdout1 } = await execute(
			'taq',
			'install @taqueria/plugin-taquito@0.25.31-rc',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'instantiate-account --help');
		expect(stdout2).toContain(
			'Instantiate all accounts declared in the "accounts" field at the root level of the config file to a target environment',
		);

		await cleanup();
	});

	test('deploy will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout: stdout1 } = await execute(
			'taq',
			'install @taqueria/plugin-taquito@0.25.31-rc',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'deploy --help', './test-project');
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	test('originate will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout: stdout1 } = await execute(
			'taq',
			'install @taqueria/plugin-taquito@0.25.31-rc',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'originate --help', './test-project');
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	test('transfer will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout: stdout1 } = await execute(
			'taq',
			'install @taqueria/plugin-taquito@0.25.31-rc',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'transfer --help', './test-project');
		expect(stdout2).toEqual(
			expect.arrayContaining([expect.stringContaining('Transfer/call an implicit account or a smart contract')]),
		);

		await cleanup();
	});

	test('call will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout: stdout1 } = await execute(
			'taq',
			'install @taqueria/plugin-taquito@0.25.31-rc',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'call --help', './test-project');
		expect(stdout2).toEqual(
			expect.arrayContaining([expect.stringContaining('Transfer/call an implicit account or a smart contract')]),
		);

		await cleanup();
	});

	test('fund will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout: stdout1 } = await execute(
			'taq',
			'install @taqueria/plugin-taquito@0.25.31-rc',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'fund --help', './test-project');
		expect(stdout2).toContain('Fund all the instantiated accounts up to the desired/declared amount in a target');

		await cleanup();
	});
});
