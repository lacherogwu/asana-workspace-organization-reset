import 'dotenv/config';
import { chunk } from 'lodash-es';
import { getProjects, getTasks, deleteTask, me, deleteProject, getTeams, getUsers } from './asana.js';
import { generateDeleteTeamCode } from './asana-ws.js';
import cliProgress from 'cli-progress';

async function getAllTasks(project, offset, tasks = [], count = 1) {
	const response = await getTasks(project, offset);
	tasks.push(...response.data);
	progressBar.start(tasks.length, 0);

	if (response.next_page) {
		return getAllTasks(project, response.next_page.offset, tasks, ++count);
	}

	return tasks;
}

function deleteAllTasks(tasks) {
	return requestChunk(tasks, deleteTask);
}

async function deleteAllProjects(projects) {
	console.log(`Removing projects`);
	progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	progressBar.start(projects.length, 0);
	await requestChunk(projects, deleteProject);
	progressBar.stop();
}

async function deleteAllTasksFromAllProjects(projects) {
	for (let i = 0; i < projects.length; i++) {
		const project = projects[i];

		progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
		console.log(`Removing tasks from ${project.name}`);
		const tasks = await getAllTasks(project.gid);
		await deleteAllTasks(tasks);
		progressBar.stop();
	}
}

async function requestChunk(items, cb) {
	const chunks = chunk(items, 15);

	for (let i = 0; i < chunks.length; i++) {
		const items = chunks[i];
		const promises = items.map(item => cb(item.gid));
		await Promise.all(promises);
		progressBar.increment(items.length);
	}
}

let progressBar;
// const { data: projects } = await getProjects();
// await deleteAllTasksFromAllProjects(projects);
// await deleteAllProjects(projects);
// const { data: teams } = await getTeams();
// await generateDeleteTeamCode(teams);
import fs from 'fs/promises';
const { data: users } = await getUsers();
console.log(users);
