import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Flextesa Plugin E2E Testing for Taqueria CLI', () => {

    jest.setTimeout(120000);
    
	test('start and stop will work with a custom name sandbox', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();1
		await exec('docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "Docker clear."',{ cwd: `./` });
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@next', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@next', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const config_file = (await exec('cat src/test-data/config-flextesa-test-sandbox.json')).stdout;
		await writeFile('./test-project/.taq/config.json', config_file);

		const { stdout: stdout2 } = await execute('taq', 'start sandbox test', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Started test.']));
		expect(stdout2).toEqual(expect.arrayContaining(['Starting postgresql']));
		expect(stdout2).toEqual(expect.arrayContaining(['Starting TzKt.Sync']));
		expect(stdout2).toEqual(expect.arrayContaining(['Starting TzKt.Api']));

		const { stdout: stdout3 } = await execute('docker', 'ps --filter name=taq-flextesa-test', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('taq-flextesa-test')]));
		//expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('oxhead')]));

		const { stdout: stdout4 } = await execute('taq', 'stop sandbox test', './test-project');
		await expect(stdout4).toEqual(expect.arrayContaining(['Stopped test.']));

		await cleanup();
	});

	

	test('start sandbox will error if no sandbox in config', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		await exec('docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "Docker clear."',{ cwd: `./` });
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@next', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@next', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const config_file = await (await exec('cat src/test-data/config-no-sandboxes.json')).stdout;
		await writeFile('./test-project/.taq/config.json', config_file);

		const { stderr } = await execute('taq', 'start sandbox', './test-project');
		expect(stderr).toEqual([
			"No sandbox name was specified. We couldn't find a valid sandbox config for the current environment.",
		]);

		await cleanup();
	});

	test('start sandbox will error if incorrect sandbox name called', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		await exec('docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "Docker clear."',{ cwd: `./` });
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@next', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@next', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stderr } = await execute('taq', 'start sandbox no_such_sandbox', './test-project');
		expect(stderr).toEqual(['There is no sandbox configuration with the name no_such_sandbox.']);

		await cleanup();
	});

	test('show protocols will offer known protocols', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		await exec('docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "Docker clear."',{ cwd: `./` });
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@next', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@next', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'show protocols', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ PtLimaPtLMwfNinJi9rCfDPWea8dFgTZ1MeJ9f1m2SRic6ayiwW │']));

		await cleanup();
	});

	test('stop sandbox will error if call stop on a stopped sandbox', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		await exec('docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "Docker clear."',{ cwd: `./` });
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@next', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@next', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'stop sandbox local', './test-project');
		expect(stdout2).toEqual(['The local sandbox was not running.']);

		await cleanup();
	});

	test('list accounts will error if called on a stopped sandbox', async () => {
		5;
		const { execute, cleanup, spawn } = await prepareEnvironment();
		await exec('docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "Docker clear."',{ cwd: `./` });
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@next', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@next', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stderr } = await execute('taq', 'list accounts local', './test-project');
		expect(stderr).toEqual(['The local sandbox is not running.']);

		await cleanup();
	});

	test('start sandbox will error if called on a started sandbox', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		await exec('docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "Docker clear."',{ cwd: `./` });
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@next', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@next', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const {} = await execute('taq', 'start sandbox local', './test-project');

		const { stdout: stdout2 } = await execute('taq', 'start sandbox local', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Already running.']));

		await cleanup();
	});

	test('list accounts will display the sandbox accounts', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		await exec('docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "Docker clear."',{ cwd: `./` });
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@next', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@next', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const {} = await execute('taq', 'start sandbox local', './test-project');

		const { stdout: stdout2 } = await execute('taq', 'list accounts local', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ Account │ Balance │ Address                              │']));

		await cleanup();
	});

	// config does not include baker by default - is this a bug?
	test.skip('start sandbox will initiate a baker daemon by default', async () => {
		await exec('docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "Docker clear."',{ cwd: `./` });
		const { execute, cleanup, spawn, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-core@next', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-flextesa@next', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'start sandbox local', './test-project');
		expect(stdout2).toContain('The sandbox "local" is ready.');

		const { stdout: stdout3 } = await execute('docker', 'ps', './test-project');

		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('taq-flextesa-local')]));
		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('oxhead')]));

		// const { stdout: stdout3 } = await execute('docker', 'ps', './test-project')
		// expect(stdout3).toContain('baker');

		await cleanup();
	});
});