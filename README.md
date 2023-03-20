# task-manager-for-user
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fvivekiet22%2Ftask-manager&count_bg=%2379C83D&title_bg=%23555555&icon=whitesource.svg&icon_color=%23E7E7E7&title=Hits&edge_flat=false)](https://hits.seeyoufarm.com)
## Demo Of Backend API
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/v1SI2WAaRak/0.jpg)](https://www.youtube.com/watch?v=v1SI2WAaRak)

## Objective of the project

1. Create a CRUD based operation for task entries where you will be doing all the
CRUD operations regarding a task
2. The schema for a particular task can be name, description, assignee, createdAt,
expireOn, completed: boolean
3. A user must signup to get an API key which then they will use to
add/edit/delete/update any task (only created by them) using the backend
4. There should also be cache added for faster querying of user's task list data


## Getting Started

### Install Dependencies
<code>npm install</code>

### Run The Backend from Root Directory
<code>node index.js</code>

### Build With
- Express.js
- jsonwebtoken
- memory-cache
- mongoose
- validator

### End Points

#### For User Login/Register

- '/user/register' - For Registration of User 
- '/user/login' - For Login

#### For Task CRUD (include ```x-auth-token``` in header) Login Required
- '/task/create' - create task (include)
- '/task/fetchall' - fetch all task of logged in user
- '/task/updatetask/:id' - update task by it's id
- '/task/deletetask/:id' - delete task by id

## Contributing

Everyone is welcomed to contribute to this project. You can contribute either by submitting bugs or suggesting improvements by opening an issue on GitHub. Please see the [CONTRIBUTING](CONTRIBUTING.md) guidelines for more information.