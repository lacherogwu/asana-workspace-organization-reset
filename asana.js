import axios from 'axios';

const WORKSPACE_ID = process.env.WORKSPACE_ID;
const instance = axios.create({
	baseURL: 'https://app.asana.com/api/1.0',
	headers: {
		Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
	},
});
instance.interceptors.response.use(onFulfilled, onReject);
function onFulfilled(response) {
	const { data } = response;
	return data;
}

function onReject(err) {
	const { data } = err.response;
	return Promise.reject(data);
}

export function me() {
	return instance.get('/users/me');
}

export function getTasks(project, offset, limit = 100) {
	return instance.get('/tasks', {
		params: {
			project,
			limit,
			offset,
		},
	});
}

export function searchTasks() {
	return instance.get(`/workspaces/${WORKSPACE_ID}/tasks/search`, {
		params: {
			workspace: WORKSPACE_ID,
		},
	});
}

export function getWorkspaces() {
	return instance.get('/workspaces');
}

export async function getProjects() {
	const response = await instance.get('/projects', {
		params: {
			workspace: WORKSPACE_ID,
		},
	});
	return response.data;
}

export function deleteTask(id) {
	return instance.delete(`/tasks/${id}`);
}

export function deleteProject(id) {
	return instance.delete(`/projects/${id}`);
}

export async function getTeams() {
	const response = await instance.get(`/workspaces/${WORKSPACE_ID}/teams`);
	return response.data;
}

export async function getUsers() {
	const response = await instance.get(`/workspaces/${WORKSPACE_ID}/users`);
	return response.data;
}
