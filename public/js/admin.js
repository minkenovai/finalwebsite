const userLink = document.getElementById('userLink')
const postLink = document.getElementById('postLink')
const contentBlock2 = document.getElementById('content')

fetch('/username')
    .then(response => response.json())
    .then(user => {
        const usernameDisplay = document.getElementById('usernameDisplay');
        usernameDisplay.innerText = `${user.username}`;
    })
    .catch(error => console.error('Error:', error)); 
    
fetch("/post/posts")
    .then(response => response.json())
    .then(posts => {
        content.innerHTML = '';
        const contentBlock = document.createElement("div")
        contentBlock.classList.add("content-block")
        posts.forEach(post => {
            fetch("/profile")
                .then(response => response.json())
                .then(user => {
                    fetch(`/user/${post.user_id}`).then(response => response.json()).then(postuser => {
                        const date = new Date(post.date);
                        const formattedDate = date.toLocaleString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric'
                        });
                        contentBlock.innerHTML += ` <div class="post-block">
                                            <h3>${post.title}</h3>
                                            <p>${post.description}</p>
                                            <p class="post-user-info">${postuser.username}</p>
                                            <p class="post-user-info">${formattedDate}</p>
                                            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
                                        </div>`
                    content.appendChild(contentBlock)
                    })
                    
                })
                .catch(error => console.error(error))
            
        });
    })
    .catch(error => {console.error(error)})

postLink.addEventListener('click', postLinkClick);

function postLinkClick(event) {
    event.preventDefault();
    fetch("/post/posts")
        .then(response => response.json())
        .then(posts => {
            content.innerHTML = '';
            const contentBlock = document.createElement("div")
            contentBlock.classList.add("content-block")
            posts.forEach(post => {
                fetch("/profile")
                    .then(response => response.json())
                    .then(user => {
                        fetch(`/user/${post.user_id}`).then(response => response.json()).then(postuser => {
                            const date = new Date(post.date);
                            const formattedDate = date.toLocaleString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric'
                            });
                            contentBlock.innerHTML += ` <div class="post-block">
                                                <h3>${post.title}</h3>
                                                <p>${post.description}</p>
                                                <p class="post-user-info">${postuser.username}</p>
                                                <p class="post-user-info">${formattedDate}</p>
                                                <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
                                            </div>`
                        content.appendChild(contentBlock)
                        })
                        
                    })
                    .catch(error => console.error(error))
                
            });
        })
        .catch(error => {console.error(error)})
}

async function deletePost(postId) {
    try {
        const confirmDelete = confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            const deleteResponse = await fetch(`/post/post/${postId}`, {
                method: 'DELETE',
            });
            if (deleteResponse.ok) {
                alert("Successful!");
                location.reload();
            } else {
                console.error(`Error deleting user with ID ${postId}`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
    
async function fetchAndRenderUsers() {
    const response = await fetch('/users');
    const users = await response.json();
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}


function loadUsers(event) {
    event.preventDefault()
    const userTable = document.createElement('table');
    userTable.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="userTableBody"></tbody>
    `;

    contentBlock2.innerHTML = '';
    contentBlock2.appendChild(userTable);

    fetchAndRenderUsers();
}

async function editUser(userId) {
    const newUsername = prompt('Enter new username:');
    const newEmail = prompt('Enter new email:');
    const newRole = prompt('Enter new role:');
    console.log('Edit user clicked', userId);
    if (newUsername !== null && newEmail !== null && newRole !== null) {
        fetch(`/users/${userId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername, email: newEmail, role: newRole }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        })
        .then(updatedUser => {
            console.log('User updated successfully:', updatedUser);

            
        })
    }
    fetchAndRenderUsers();
    
}



async function deleteUser(userId) {
    try {
        const confirmDelete = confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            const deleteResponse = await fetch(`/users/${userId}`, {
                method: 'DELETE',
            });

            if (deleteResponse.ok) {
                fetchAndRenderUsers();
            } else {
                console.error(`Error deleting user with ID ${userId}`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

