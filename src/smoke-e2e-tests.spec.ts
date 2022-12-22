import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);

describe('E2E Smoke Test for Taqueria CLI,', () => {

	jest.setTimeout(30000);

	test('init will create the correct directory structure', async () => {
		const { spawn, cleanup, exists } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init temp');
		await waitForText("Project taq'ified!");
		await exists('./artifacts');
		await exists('./contracts');
		await cleanup();
	});

	test('install plugin will only require a package.json file with {}', async () => {
		const { spawn, cleanup, execute, readFile, writeFile } = await prepareEnvironment();
		const { waitForFinish } = await spawn('taq', 'init auto-test-npm-success');
		await writeFile('./auto-test-npm-success/package.json', '{}');
		const {} = await execute('taq', 'install @taqueria/plugin-ligo');
		await waitForFinish();
		const content = await readFile('./auto-test-npm-success/package.json');
		expect(content).toContain('"name": "auto-test-npm-success"');
		await cleanup();
	});
	
	test('taq --help will get help for a non-initialized project', async () => {
		const { execute, cleanup } = await prepareEnvironment();
		const { stdout } = await execute('taq', '--help');
		expect(stdout).toEqual(expect.arrayContaining(["taq opt-in                                Opt-in to sharing anonymous usage an"]));
		console.log(stdout);
		await cleanup();
	});

	test('taq --help will get help for a project initialized with --debug', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout, code } = await execute('taq', '--help -p test-project');
		console.log('project initialized with --debug \n'+ stdout);
		expect(stdout).toEqual(expect.arrayContaining(["taq install <pluginName>                  Install a plugin"]));
		expect(code).toBe(0);
		await cleanup();
	});

	test('taq --help will get help for an initialized project', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout, code } = await execute('taq', '--help -p test-project');
		console.log('project initialized NPM \n'+ stdout);
		expect(stdout).toEqual(expect.arrayContaining(["taq opt-in                                Opt-in to sharing anonymous usage an"]));
		expect(code).toBe(0);
		await cleanup();
	});

	test('taq --help will get help for a project initialized with --workflow ligo --debug', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --workflow ligo --debug');
		await waitForText("Project taq'ified!");
		const { stdout, code } = await execute('taq', '--help -p test-project');
		console.log('project initialized with --workflow ligo --debug \n\n'+ stdout);
		expect(stdout).toEqual(expect.arrayContaining(["taq install <pluginName>                  Install a plugin"]));
		expect(code).toBe(0);
		await cleanup();
	});

	test('taq --help will get help for a project initialized with --workflow ligo', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --workflow ligo');
		await waitForText("Project taq'ified!");
		const { stdout, code } = await execute('taq', '--help -p test-project');
		console.log('project initialized with --workflow ligo --debug \n\n'+ stdout);
		expect(stdout).toEqual(expect.arrayContaining(["taq opt-in                                Opt-in to sharing anonymous usage an"]));
		expect(code).toBe(0);
		await cleanup();
	});

	test('taq --version reports a version number of the expected format', async () => {
		const { execute, cleanup } = await prepareEnvironment();
		const { code, stdout } = await execute('taq', '--version');
		expect(code).toBe(0);
		expect(stdout[0].toString().trim()).toMatch(
			/^((v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)|(dev-[\w-]+)|main?|(\d+)-[\w-]+)$/,
		);
		await cleanup();
	});

	test('taq --build will report build information about the version', async () => {
		const { execute, cleanup } = await prepareEnvironment();
		const { code, stdout } = await execute('taq', '--build');
		expect(code).toBe(0);
		expect(stdout[0].trim()).toMatch(/^\w+$/);
		await cleanup();
	});

	test('calling a task that is not available returns an error', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { code } = await execute('taq', 'compile sourcefile.ligo');
		expect(code).toBe(1);
		await cleanup();
	});

	test('install will error if package does not exist', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { code } = await execute('taq', 'install acoupleofecadhamburgers -p foobar');
		expect(code).toBe(1);
		await cleanup();
	});

	// DEMONSTRATION OF https://github.com/ecadlabs/taqueria/issues/1635
    test('bug 1635 - taquito plugin will only give contextual help for deploy in stderr', async () => {
        const { execute, spawn, cleanup } = await prepareEnvironment();
        const { waitForText } = await spawn('taq', 'init test-project');
        await waitForText("Project taq'ified!");
        const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
        expect(stdout).toContain('Plugin installed successfully');

        //provide --help parameter 
        const { stdout: stdout1 } = await execute('taq', 'deploy --help', './test-project');

        //displays default help, not contextual help
        expect(stdout1).toContain('taq [command]');

        //fail to provide enough parameters 
        const { stderr: stderr1 } = await execute('taq', 'deploy', './test-project');

        //invokes stderr to display contextual help
        expect(stderr1).toContain('Deploy a smart contract to a particular environment');
        expect(stderr1).toContain('Not enough non-option arguments: got 0, need at least 1');

        await cleanup();
    });

	test.only('contract types plugin will compile a contract and generate types', async () => {
		const { spawn, cleanup, execute, readFile, writeFile, exists, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-contract-types', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const increment_jsligo_file = (await (await exec('cat src/test-data/increment.jsligo')).stdout);
		await writeFile('./test-project/contracts/increment.jsligo', increment_jsligo_file);
		await exists('./contracts/increment.jsligo');

		const { } = await execute('taq', 'compile increment.jsligo', './test-project');

		const { stdout: stdout3 } = await execute('taq', 'generate types types', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(["generateTypes { typescriptDir: 'types' }"]));
		expect(stdout3).toEqual(expect.arrayContaining(["Contracts Found:"]));
		expect(stdout3).toEqual(expect.arrayContaining(["- {{base}}/test-project/artifacts/increment.tz"]));
		expect(stdout3).toEqual(expect.arrayContaining(["Processing /increment.tz..."]));
		expect(stdout3).toEqual(expect.arrayContaining(["increment.tz: Types generated"]));

		expect(await ls('./test-project/')).toContain('types');
		expect(await ls('./test-project/types')).toContain('increment.code.ts');
		expect(await ls('./test-project/types')).toContain('increment.types.ts');
		expect(await ls('./test-project/types')).toContain('type-aliases.ts');
		expect(await ls('./test-project/types')).toContain('type-utils.ts');

		await cleanup();
	});
});
