import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { debug } from 'console';
import { readFileSync } from 'fs';
import util from 'util';
const exec = util.promisify(require('child_process').exec);

jest.setTimeout(30000);

describe('E2E Test of Taqueria CLI Quickstart,', () => {

    test('Taqueria CLI will show help', async () => {
        const { execute, spawn, cleanup } = await prepareEnvironment();
        const { waitForText } = await spawn('taq', 'init test-project');
        await waitForText("Project taq'ified!");

        const { stdout } = await execute('taq', '--help', './test-project');
        expect(stdout).toContain('taq [command]');

        await cleanup();
    });

    test('Taqueria CLI will install ligo plugin', async () => {
        const { execute, spawn, cleanup } = await prepareEnvironment();
        const { waitForText } = await spawn('taq', 'init test-project');
        await waitForText("Project taq'ified!");

        const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
        expect(stdout).toContain('Plugin installed successfully');

        await cleanup();
    });

    test('Ligo Plugin compile will create an artifact from three files', async () => {
        const { execute, spawn, cleanup, writeFile, readFile, ls } = await prepareEnvironment();
        const { waitForText } = await spawn('taq', 'init test-project');
        await waitForText("Project taq'ified!");

        const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
        expect(stdout).toContain('Plugin installed successfully');

        const mligo_file = await (await exec(`cat src/counter.mligo`)).stdout;
        await writeFile('./contracts/counter.mligo', mligo_file);

        const storage_file = await (await exec(`cat src/counter.storageList.mligo`)).stdout;
        await writeFile('./contracts/counter.storageList.mligo', storage_file);

        const permissions_file = await (await exec(`cat src/counter.parameterList.mligo`)).stdout;
        await writeFile('./contracts/counter.parameterList.mligo', permissions_file);

        const { stderr } = await execute('taq', 'compile counter.mligo', './test-project');
        console.log(stderr);
        const artifacts_list = await ls('./test-project/artifacts');
        expect(artifacts_list).toContain('counter.tz');

        const { stdout: stdout1, stderr: stderr2 } = await execute('taq', 'compile counter.mligo', 'test-project');
        console.log(stdout1);
        console.log(stderr2);

        expect(stdout1).toMatchInlineSnapshot(`
              Array [
                "┌────────────────────────────────┬───────────────────────────────────────────────┐",
                "│ Contract                       │ Artifact                                      │",
                "├────────────────────────────────┼───────────────────────────────────────────────┤",
                "│ counter.mligo                  │ artifacts/counter.tz                          │",
                "├────────────────────────────────┼───────────────────────────────────────────────┤",
                "│ counter.storageList.mligo      │ artifacts/counter.default_storage.tz          │",
                "│                                │ artifacts/counter.storage.another_count.tz    │",
                "├────────────────────────────────┼───────────────────────────────────────────────┤",
                "│ counter.parameterList.mligo    │ artifacts/counter.parameter.increment_by_3.tz │",
                "└────────────────────────────────┴───────────────────────────────────────────────┘"
              ]
          `);

        await cleanup();
    });

    test.only('ligo plugin compile will only compile one contract using compile <sourceFile> command', async () => {
		const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const artifacts_list_before = await ls('./test-project/artifacts');
		expect(artifacts_list_before).toEqual([]);

		const mligo_file = await (await exec(`cat src/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const {} = await execute('taq', 'compile hello-tacos.mligo', './test-project');
		const artifacts_list = await ls('./test-project/artifacts');
		expect(artifacts_list).toContain('hello-tacos.tz');

		await cleanup();
	});


});