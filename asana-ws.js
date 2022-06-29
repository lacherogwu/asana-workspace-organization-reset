import fs from 'fs/promises';

export async function generateDeleteTeamCode(teams) {
	const data = teams.reduce((acc, curr, i) => {
		const data = {
			msg: 'method',
			method: '/team_trash',
			params: {
				http_method: 'post',
				endpoint_data: {
					team: curr.gid,
					__app_name: 'admin_console',
					__session_id: process.env.WS_SESSION_ID,
					__session_information_for_mutation_logging: {
						current_domain_or_null: process.env.WORKSPACE_ID,
					},
				},
			},
			id: i,
		};
		acc += `// ${curr.name}\n`;
		acc += `page_load_globals.ws.send(JSON.stringify(${JSON.stringify(data)}))\n\n`;
		return acc;
	}, '');

	await fs.writeFile('ws-scripts/delete-teams-code.js', data);
	return data;
}

export async function generateDeleteUsersCode(users) {
	const data = users.reduce((acc, curr, i) => {
		const data = {
			msg: 'method',
			method: '/domain_user_deactivate',
			params: {
				http_method: 'post',
				endpoint_data: {
					create_project_with_domain_users_tasks: false,
					du: '',
					project_assignee_du: '',
					skip_completed_tasks: true,
					__app_name: 'admin_console',
					__session_id: process.env.WS_SESSION_ID,
					__session_information_for_mutation_logging: {
						current_domain_or_null: process.env.WORKSPACE_ID,
					},
				},
			},
			id: '20',
		};
	});
}
