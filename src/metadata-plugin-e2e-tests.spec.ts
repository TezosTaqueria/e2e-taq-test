import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);

import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('E2E Testing for the taqueria metadata plugin', () => {

	jest.setTimeout(300000);

	test('metadata plugin should create a contract metadata.json file', async () => {
		const { execute, spawn, cleanup, ls, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-metadata', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		// const { stdout: stdout2 } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		// expect(stdout2).toContain('Plugin installed successfully');

		const mligo_file = await (await exec(`cat src/test-data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const contracts_list = await ls('./test-project/contracts');
		expect(contracts_list).toContain('hello-tacos.mligo');

		const { getStdout, getStderr, waitForText: waitForText2, wait, writeText, pressKey, waitForFinish, getExitCode, debug, kill } = await spawn(
		 	'taq', 'generate-project-metadata', './test-project'
		 	);

		await wait(1000);   // wait one second
		await waitForText2("Enter your project name:");
		debug();
		await writeText('test-project-name');
		await pressKey('enter');
		await waitForFinish();

		//kill(); 

		getStdout();   // ['Enter your name:', ...]
		getStderr();   // [] empty since no errors encountered
		getExitCode();   // 0 since we finished successfully
	  
		await cleanup();    // cleanup after test
	});

	// test('metadata plugin should re-create a contract metadata.json using existing values', async () => {
	// 	await runCliWithPrompts(`generate-metadata hello-tacos`, [
	// 		['name', 'test-name'],
	// 		['description', 'test-description'],
	// 		['author', 'test-author'],
	// 		['url', 'test-url'],
	// 		['license', 'test-license'],
	// 	]);

	// 	await runCliWithPrompts(`generate-metadata hello-tacos`, [
	// 		['name', ''],
	// 		['description', ''],
	// 		['author', ''],
	// 		['url', ''],
	// 		['license', ''],
	// 	]);

	// 	const metadataFileContents = await fsPromises.readFile(`${taqueriaProjectPath}/artifacts/hello-tacos.json`, {
	// 		encoding: 'utf-8',
	// 	});
	// 	expect(metadataFileContents).toMatch(/name.*test-name/i);
	// 	expect(metadataFileContents).toMatch(/description.*test-description/i);
	// 	expect(metadataFileContents).toMatch(/authors(.|\n)*test-author/i);
	// 	expect(metadataFileContents).toMatch(/homepage.*test-url/i);
	// 	expect(metadataFileContents).toMatch(/license.*test-license/i);
	// });

	// test('metadata plugin should ask for contract name if not provided', async () => {
	// 	await runCliWithPrompts(`generate-metadata`, [
	// 		['contract', 'hello-tacos'],
	// 		['name', 'test-name'],
	// 		['description', 'test-description'],
	// 		['author', 'test-author'],
	// 		['url', 'test-url'],
	// 		['license', 'test-license'],
	// 	]);

	// 	const metadataFileContents = await fsPromises.readFile(`${taqueriaProjectPath}/artifacts/hello-tacos.json`, {
	// 		encoding: 'utf-8',
	// 	});
	// 	expect(metadataFileContents).toMatch(/name.*test-name/i);
	// 	expect(metadataFileContents).toMatch(/description.*test-description/i);
	// 	expect(metadataFileContents).toMatch(/authors(.|\n)*test-author/i);
	// 	expect(metadataFileContents).toMatch(/homepage.*test-url/i);
	// 	expect(metadataFileContents).toMatch(/license.*test-license/i);
	// });

	// test('metadata plugin should previous answers for defaults', async () => {
	// 	await runCliWithPrompts(`generate-metadata hello-tacos`, [
	// 		['name', 'test-name'],
	// 		['description', 'test-description'],
	// 		['author', 'test-author'],
	// 		['url', 'test-url'],
	// 		['license', 'test-license'],
	// 	]);

	// 	await runCliWithPrompts(`generate-metadata hello-tacos`, [
	// 		['name', 'test2-name'],
	// 		['description', 'test2-description'],
	// 		['author', ''],
	// 		['url', ''],
	// 		['license', ''],
	// 	]);

	// 	const metadataFileContents = await fsPromises.readFile(`${taqueriaProjectPath}/artifacts/hello-tacos.json`, {
	// 		encoding: 'utf-8',
	// 	});
	// 	expect(metadataFileContents).toMatch(/name.*test2-name/i);
	// 	expect(metadataFileContents).toMatch(/description.*test2-description/i);
	// 	expect(metadataFileContents).toMatch(/authors(.|\n)*test-author/i);
	// 	expect(metadataFileContents).toMatch(/homepage.*test-url/i);
	// 	expect(metadataFileContents).toMatch(/license.*test-license/i);
	// });

	// test('metadata plugin should use other contracts for defaults', async () => {
	// 	await runCliWithPrompts(`generate-metadata hello-tacos`, [
	// 		['name', 'test-name'],
	// 		['description', 'test-description'],
	// 		['author', 'test-author'],
	// 		['url', 'test-url'],
	// 		['license', 'test-license'],
	// 	]);

	// 	await runCliWithPrompts(`generate-metadata fake-contract`, [
	// 		['name', 'fake-name'],
	// 		['description', 'fake-description'],
	// 		['author', ''],
	// 		['url', ''],
	// 		['license', ''],
	// 	]);

	// 	const metadataFileContents = await fsPromises.readFile(`${taqueriaProjectPath}/artifacts/fake-contract.json`, {
	// 		encoding: 'utf-8',
	// 	});
	// 	expect(metadataFileContents).toMatch(/name.*fake-name/i);
	// 	expect(metadataFileContents).toMatch(/description.*fake-description/i);
	// 	expect(metadataFileContents).toMatch(/authors(.|\n)*test-author/i);
	// 	expect(metadataFileContents).toMatch(/homepage.*test-url/i);
	// 	expect(metadataFileContents).toMatch(/license.*test-license/i);
	// });

	// test('metadata plugin should use project metadata for defaults', async () => {
	// 	await runCliWithPrompts(`generate-project-metadata`, [
	// 		['name', 'project-name'],
	// 		['description', 'project-description'],
	// 		['author', 'project-author'],
	// 		['url', 'project-url'],
	// 		['license', 'project-license'],
	// 	]);

	// 	await runCliWithPrompts(`generate-metadata fake-contract`, [
	// 		['name', 'fake-name'],
	// 		['description', 'fake-description'],
	// 		['author', ''],
	// 		['url', ''],
	// 		['license', ''],
	// 	]);

	// 	const metadataFileContents = await fsPromises.readFile(`${taqueriaProjectPath}/artifacts/fake-contract.json`, {
	// 		encoding: 'utf-8',
	// 	});
	// 	expect(metadataFileContents).toMatch(/name.*fake-name/i);
	// 	expect(metadataFileContents).toMatch(/description.*fake-description/i);
	// 	expect(metadataFileContents).toMatch(/authors(.|\n)*project-author/i);
	// 	expect(metadataFileContents).toMatch(/homepage.*project-url/i);
	// 	expect(metadataFileContents).toMatch(/license.*project-license/i);
	// });

	// afterAll(async () => {
	// 	await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	// });
});
