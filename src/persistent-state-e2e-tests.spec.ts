import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { exec as exec1 } from 'child_process';
import utils from 'util';
const exec = utils.promisify(exec1);

describe('Persistent State E2E Tests for Taqueria CLI', () => {

    jest.setTimeout(60000);

	test('taqueria will create a development-state file', async () => {
		const { execute, cleanup, writeFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
<<<<<<< HEAD
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
=======
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo@v0.27.17-rc', './test-project');
>>>>>>> 3212583e4535041eb2cb820dd3c4767cec0a6670
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec('cat src/test-data/hello-tacos.mligo')).stdout;
		writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const {} = await execute('taq', 'compile hello-tacos.mligo', './test-project');
		await exists('./test-project/artifacts/hello-tacos.tz');
		await exists('./test-project/.taq/development-state.json');

		await cleanup();
	});

	test('taqueria will create a development-state file when there is no default environment in the config', async () => {
		const { execute, cleanup, writeFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
<<<<<<< HEAD
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
=======
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo@v0.27.17-rc', './test-project');
>>>>>>> 3212583e4535041eb2cb820dd3c4767cec0a6670
		expect(stdout).toContain('Plugin installed successfully');

		const config_file = await (await exec('cat src/test-data/config-without-default-environment.json')).stdout;
		writeFile('./test-project/.taq/config.json', config_file);
		const mligo_file = await (await exec('cat src/test-data/hello-tacos.mligo')).stdout;
		writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const {} = await execute('taq', 'compile hello-tacos.mligo', './test-project');
		await exists('./test-project/artifacts/hello-tacos.tz');
		await exists('./test-project/.taq/development-state.json');

		await cleanup();
	});

	test('taqueria will create a testing-state file when the default in the config is set to testing', async () => {
		const { execute, cleanup, writeFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
<<<<<<< HEAD
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
=======
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo@v0.27.17-rc', './test-project');
>>>>>>> 3212583e4535041eb2cb820dd3c4767cec0a6670
		expect(stdout).toContain('Plugin installed successfully');

		const config_file = await (await exec('cat src/test-data/config-default-environment-testing.json')).stdout;
		writeFile('./test-project/.taq/config.json', config_file);
		const mligo_file = await (await exec('cat src/test-data/hello-tacos.mligo')).stdout;
		writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const {} = await execute('taq', 'compile hello-tacos.mligo', './test-project');
		await exists('./test-project/artifacts/hello-tacos.tz');
		await exists('./test-project/.taq/development-state.json');
		await exists('./test-project/.taq/testing-state.json');

		await cleanup();
	});

	test('taqueria will create a testing-state file when the test environment is specified using the CLI', async () => {
		const { execute, cleanup, writeFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
<<<<<<< HEAD
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
=======
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo@v0.27.17-rc', './test-project');
>>>>>>> 3212583e4535041eb2cb820dd3c4767cec0a6670
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec('cat src/test-data/hello-tacos.mligo')).stdout;
		writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const {} = await execute('taq', 'compile -e testing hello-tacos.mligo', './test-project');
		await exists('./test-project/artifacts/hello-tacos.tz');
		await exists('./test-project/.taq/testing-state.json');

		await cleanup();
	});
});
