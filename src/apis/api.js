import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

//创建项目api
export async function createProject(formData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/createProject`, formData);
        return response.data;
    } catch (error) {
        throw new Error('There was an error while creating the project.');
    }
}

//修改项目api
export async function editProject(formData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/editProject`, formData);
        return response.data;
    } catch (error) {
        throw new Error('There was an error while editing the project.');
    }
}

//获得所有用户列表api
export async function getMemberList() {
    try {
        const response = await axios.get(`${BASE_URL}/api/getMembers`);
        console.log(response.data);
        const userList = response.data.data;
        return userList;
        // return userList.map((user) => ({
        //   value: user.id,
        //   label: user.username
        // }));
    } catch (error) {
        throw new Error('Error fetching user list');
    }
}

//获取项目列表
export async function fetchProjects(filter, userid) {
    let url = '';
    if (filter == 'all') {
        url = `${BASE_URL}/api/allProjects`;
    } else if (filter == 'managed') {
        url = `${BASE_URL}/api/managedProjects`;
    } else if (filter == 'joined') {
        url = `${BASE_URL}/api/joinedProjects`;
    }
    try {
        const response = await axios.get(url, {
            params: {
                id: userid
            }
        });
        //return response.data.projectsList;
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch projects:', error);
    }
}


export async function fetchTasks(projectid) {
    let url = '';

    url = `${BASE_URL}/api/allProjectTasks`;
    try {
        const response = await axios.get(url, {
            params: {
                project_id: projectid
            }
        });
        console.log(response.data.data)
            //return response.data.projectsList;
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
    }
}

export async function deleteProject(projectid) {
    let url = '';

    url = `${BASE_URL}/api/deleteProject`;
    try {
        const response = await axios.get(url, {
            params: {
                id: projectid
            }
        });
        console.log('deleteProject', response.data.data)
        return response.data.data;
    } catch (error) {
        console.error('Failed to deleteProject:', error);
    }
}


//新建任务传项目id和项目name