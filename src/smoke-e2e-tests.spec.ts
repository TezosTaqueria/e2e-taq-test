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
		const {} = await execute('taq', 'install @taqueria/plugin-ligo@v0.27.17-rc');
		await waitForFinish();
		const content = await readFile('./auto-test-npm-success/package.json');
		expect(content).toContain('"name": "auto-test-npm-success"');
		await cleanup();
	});
	
	test('taq --help will get help for a non-initialized project', async () => {
		const { execute, cleanup } = await prepareEnvironment();
		const { stdout } = await execute('taq', '--help');
		expect(stdout).toEqual(expect.arrayContaining(["taq opt-in                                Opt-in to sharing anonymous usage an"]));
		await cleanup();
	});

	test('taq --help will get help for a project initialized with --debug', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout, code } = await execute('taq', '--help -p test-project');
		expect(stdout).toEqual(expect.arrayContaining(["taq install <pluginName>                  Install a plugin"]));
		expect(code).toBe(0);
		await cleanup();
	});

	test('taq --help will get help for an initialized project', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout, code } = await execute('taq', '--help -p test-project');
		expect(stdout).toEqual(expect.arrayContaining(["taq opt-in                                Opt-in to sharing anonymous usage an"]));
		expect(code).toBe(0);
		await cleanup();
	});

	test('taq --help will get help for a project initialized with --workflow ligo --debug', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --workflow ligo --debug');
		await waitForText("Project taq'ified!");
		const { stdout, code } = await execute('taq', '--help -p test-project');
		expect(stdout).toEqual(expect.arrayContaining(["taq install <pluginName>                  Install a plugin"]));
		expect(code).toBe(0);
		await cleanup();
	});

	test('taq --help will get help for a project initialized with --workflow ligo', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --workflow ligo');
		await waitForText("Project taq'ified!");
		const { stdout, code } = await execute('taq', '--help -p test-project');
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

});
