import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);

describe('SmartPy Plugin E2E Testing for Taqueria CLI', () => {

	jest.setTimeout(60000);

	

	test('compile will compile one contract with compile <sourceFile> command', async () => {
		const { execute, cleanup, spawn, writeFile, exists } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-smartpy@0.25.23-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const py_file = await (await exec(`cat src/test-data/hello-tacos.py`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.py', py_file);

		const { stdout: stdout2 } = await execute('taq', 'compile hello-tacos.py', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ hello-tacos.py │ artifacts/hello-tacos.tz                 │']));
		expect(stdout2).toEqual(expect.arrayContaining(['│                │ artifacts/hello-tacos.default_storage.tz │']));

		await exists(`./test-project/artifacts/hello-tacos.tz`);
		await exists(`./test-project/artifacts/hello-tacos.default_storage.tz`);

		await cleanup();
	});

	test('compile will error if no contract', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-smartpy@0.25.23-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'compile no_such_file.py', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ no_such_file.py │ Not compiled │']));

		await cleanup();
	});

	test('test will run test on <sourceFile>', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-smartpy@0.25.23-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const py_file = await (await exec(`cat src/test-data/hello-tacos.py`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.py', py_file);

		const { stdout: stdout2 } = await execute('taq', 'test hello-tacos.py', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ hello-tacos.py │ 🎉 All tests passed 🎉 │']));

		await cleanup();
	});

	test('test will show fails on test file with fails', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-smartpy@0.25.23-rc', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const py_file = await (await exec(`cat src/test-data/hello-tacos-failed-tests.py`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos-failed-tests.py', py_file);

		const { stdout: stdout2 } = await execute('taq', 'test hello-tacos-failed-tests.py', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ hello-tacos-failed-tests.py │ Some tests failed :( │']));

		await cleanup();
	});
});
