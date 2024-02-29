const profileLink = document.getElementById("profileLink")
const postLink = document.getElementById("postLink")
const profileName = document.getElementById("profileName")
const content = document.getElementById("content")
const addcontent = document.getElementById("add-content")
const followersContainer = document.getElementById("followersContainer")
const subscribersContainer = document.getElementById("subscribersContainer")
const closeButton = document.querySelector(".close-btn");
const addPostContainer = document.getElementById("addPostContainer")
const accSettingContainer = document.getElementById("accSettingContainer")
const followersList = document.getElementById("followersList")
const subscribersList = document.getElementById("subscribersList")
const allusersContainer = document.getElementById("allusersContainer")
const allusersList = document.getElementById("allusersList")
fetch("/username")
    .then(response => response.json())
    .then(user => {
        const profileDisplay = document.getElementById('usernameDisplay')
        profileDisplay.innerHTML = `${user.username}`
    })
    .catch(error => console.error('Error:', error))

fetch("/profile")
    .then(response => response.json())
    .then(user => {
        fetch(`/followers/${user.id}`).then(response => response.json()).then(followerCount => {
            fetch(`/followees/${user.id}`).then(response => response.json()).then(followeeCount => {
                
                content.innerHTML =`<div class="user-content">
                                        <div class="pngg">
                                            <img src="/materials/user.png">
                                        </div>
                                        <div class="user-info">
                                            <h2>${user.username}</h2>
                                            <div class="follower-following">
                                                <button class="follower-following-button" id="followersButton">${followerCount} Followers</button>
                                                <button class="follower-following-button" id="subscribersButton">${followeeCount} Subscribers</button>
                                                <button class="follower-following-button" id="allButton">All</button>
                                            </div>
                                            <button class="acc-stng-btn" id="accSettingButton">Account Settings</button>
                                        </div>
                                    </div>`;
            }).catch(error => console.error('followee fetching error', error))
        }).catch(error => console.error('follower fetching error', error))
        
    })
    .catch(error => console.error('profile fetching error:', error))

    fetch("/post/posts/id")
    .then(response => response.json())
    .then(posts => {
        addcontent.innerHTML = '';
        const contentBlock = document.createElement("div")
        contentBlock.classList.add("content-block")
        posts.forEach(post => {
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
                                            <p class="post-user-info">${formattedDate}</p>
                                            <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
                                            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
                                        </div>`
            addcontent.appendChild(contentBlock)
        });
        const addPost = document.createElement("button")
        addPost.classList.add("add-post")
        addPost.innerHTML = '+'
        addcontent.appendChild(addPost)
    })
    .catch(error => {console.error(error)})


function profileLinkClick(event) {
    event.preventDefault();
    document.getElementById('quote').innerHTML = "";
    document.getElementById('author').innerHTML = ""
    exchangeResult.innerHTML ="";
    fetch("/profile")
    .then(response => response.json())
    .then(user => {
        fetch(`/followers/${user.id}`).then(response => response.json()).then(followerCount => {
            fetch(`/followees/${user.id}`).then(response => response.json()).then(followeeCount => {
                
                content.innerHTML =`<div class="user-content">
                                        <div class="pngg">
                                            <img src="/materials/user.png">
                                        </div>
                                        <div class="user-info">
                                            <h2>${user.username}</h2>
                                            <div class="follower-following">
                                                <button class="follower-following-button" id="followersButton">${followerCount} Followers</button>
                                                <button class="follower-following-button" id="subscribersButton">${followeeCount} Subscribers</button>
                                                <button class="follower-following-button" id="allButton">All</button>
                                            </div>
                                            <button class="acc-stng-btn" id="accSettingButton">Account Settings</button>
                                        </div>
                                    </div>`;
            }).catch(error => console.error('followee fetching error', error))
        }).catch(error => console.error('follower fetching error', error))
        
    })
    .catch(error => console.error('profile fetching error:', error))
    addcontent.style.display = "block"
    fetch("/post/posts/id")
    .then(response => response.json())
    .then(posts => {
        addcontent.innerHTML = '';
        const contentBlock = document.createElement("div")
        contentBlock.classList.add("content-block")
        posts.forEach(post => {
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
                                            <p class="post-user-info">${formattedDate}</p>
                                            <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
                                            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
                                        </div>`
            addcontent.appendChild(contentBlock)
        });
        const addPost = document.createElement("button")
        addPost.classList.add("add-post")
        addPost.innerHTML = '+'
        addcontent.appendChild(addPost)
    })
    .catch(error => {console.error(error)})
}

async function getUserId() {
    const response = await fetch('/profile')
    const user = await response.json()
    return user.id
}

document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.matches('#allButton')) {
        event.preventDefault();
        fetch('/users/all')
            .then(response => response.json())
            .then(async users => {
                const loggedId = await getUserId();
                users.forEach(user => {
                    fetch(`/follows/${user.id}/${loggedId}`)
                    .then(response => response.json())
                    .then(data => {
                        const isFollowing = data;
                        allusersList.innerHTML += ` <div class="follow-item-list">
                                                        <p>${user.username}</p>
                                                        <button class="follow-buton" onclick="handleFollowButtonClick('${user.id}', '${loggedId}')">
                                                        ${isFollowing ? 'Unfollow' : 'Follow'}
                                                        </button>
                                                    </div>`
                    }).catch(error => console.error(error))
                })
            }).catch(error => console.error(error))
        allusersContainer.style.display = "block";
    }
    if (target.matches('#followersButton')) {
        event.preventDefault();
        fetch('/followers')
        .then(response => response.json())
        .then(followers => {
            followers.forEach(follower => {
                fetch(`/user/${follower.follower_id}`).then(response => response.json()).then(user => {
                    followersList.innerHTML += `<div class="follow-item-list">
                                                    <p>${user.username}</p>
                                                    <button class="follow-button" onclick="followUser('${follower.follower_id}')">Follow</button>
                                                </div>`
                })
            })
        })
        console.log("f button clicked")
        followersContainer.style.display = "block";
        
    }
    if (target.matches('#subscribersButton')) {
        event.preventDefault();
        fetch('/followees')
        .then(response => response.json())
        .then(followees => {
            followees.forEach(followee => {
                fetch(`/user/${followee.followee_id}`).then(response => response.json()).then(user => {
                    subscribersList.innerHTML += `  <div class="follow-item-list">
                                                        <p>${user.username}</p>
                                                        <button class="follow-button" onclick="unfollowUser('${followee.followee_id}')">Unfollow</button>
                                                    </div>`
                })
            })
        })
        console.log("s button clicked")
        subscribersContainer.style.display = "block";
    }
    if (target.matches('.add-post')) {
        addPostContainer.style.display ="block"
    }
    if (target.matches('.close-btn')) {
        allusersList.innerHTML = '';
        followersList.innerHTML = '';
        subscribersList.innerHTML = '';
        accSettingContainer.style.display = "none"
        addPostContainer.style.display ="none"
        subscribersContainer.style.display ="none";
        followersContainer.style.display = "none";
        allusersContainer.style.display = "none";
    }
    if(target.matches('#addNewPost')){
        const title = document.getElementById("newTitle").value
        const description = document.getElementById("newDescription").value
        addNewPost(title, description);
        addPostContainer.style.display = "none"
    }
    if (target.matches('#accSettingButton')) {
        accSettingContainer.style.display = "block"
    }
    if (target.matches('#updateUser')) {
        const email = document.getElementById("email").value
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        updateUser(username, email, password)
    }
});

function handleFollowButtonClick(followerId,followeeId) { 
    console.log(followerId + " " + followeeId) 
    const followButton = document.querySelector(".follow-button") 
    fetch(`/follows/${followerId}/${followeeId}`) 
        .then(response => response.json()) 
        .then(data => { 
            const isFollowing = data 
            if (isFollowing) { 
                unfollowUser(followerId) 
                    .then(() => { 
                    followButton.innerText = 'Follow'; 
                  }) 
                  .catch(error => { 
                    console.error('Error unfollowing user:', error); 
                  }); 
              } else { 
                followUser(followerId) 
                  .then(() => { 
                    followButton.innerText = 'Unfollow'; 
                  }) 
                  .catch(error => { 
                    console.error('Error following user:', error); 
                  }); 
              } 
        }) 
        .catch(error => console.error(error)); 
} 
   
 
function followUser(followeeId) { 
    return fetch('/follows/follow', { 
        method: 'POST', 
        body: JSON.stringify({ followeeId: followeeId }), 
        headers: { 
            'Content-Type': 'application/json' 
        } 
    }) 
    .then(response => response.json()) 
    .catch(error => { 
        throw error; 
    }); 
} 
   
function unfollowUser(followeeId) { 
    return fetch('/follows/unfollow', { 
        method: 'POST', 
        body: JSON.stringify({ followeeId: followeeId }), 
        headers: { 
            'Content-Type': 'application/json' 
        } 
    }) 
    .then(response => response.json()) 
    .catch(error => { 
        throw error; 
    }); 
}


async function addNewPost(title, description){
    const response = await fetch('/post/add', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
     });
    if(response.ok) {
        alert("Post added successfully")
    } else {
        alert(`Addition failed`);
    }
}   

async function updateUser(newusername, newemail, newpassword) {
    fetch('/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: newusername,
          email: newemail,
          password: newpassword
        })
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Successfully updated');
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function postLinkClick(event) {
    event.preventDefault();
    addcontent.style.display = "none";
    document.getElementById('author').innerHTML = ""
    document.getElementById('quote').innerHTML = "";
    exchangeResult.innerHTML = "";
    fetch("/post/posts")
        .then(response => response.json())
        .then(posts => {

            content.innerHTML = '';
            const contentBlock = document.createElement("div")
            contentBlock.classList.add("content-block")
            posts.forEach(post => {
                fetch(`/user/${post.user_id}`).then(response => response.json()).then(user => {
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
                                                    <p class="post-user-info">${user.username}</p>
                                                    <p class="post-user-info">${formattedDate}</p>
                                                </div>`
                    content.appendChild(contentBlock)
                })
                
            });
        })
        .catch(error => {console.error(error)})
}

async function editPost(postId) {
    const newTitle = prompt('Enter new title:');
    const newDescription = prompt('Enter new description:');
    console.log('Edit post clicked', postId);
    if (newTitle !== null && newDescription !== null) {
        fetch(`/post/post/${postId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle, description: newDescription}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        })
        .then(updatedPost => {
            console.log('Post updated successfully:', updatedPost);
        })
    }
}

async function deletePost(postId) {
    try {
        const confirmDelete = confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            const deleteResponse = await fetch(`/post/post/${postId}`, {
                method: 'DELETE',
            });
            if (deleteResponse.ok) {
            } else {
                console.error(`Error deleting user with ID ${postId}`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


profileLink.addEventListener('click', profileLinkClick);
postLink.addEventListener('click', postLinkClick);
profileName.addEventListener('click', profileLinkClick);

const currencyLink = document.getElementById("currencyLink")
const exchangeResult = document.getElementById('result')

currencyLink.addEventListener('click', function (event) {
    document.querySelector(".famous_quote_ctn").style.display = "block"
    event.preventDefault()
    addcontent.innerHTML = '';
    content.innerHTML = '';
    const contentBlock = document.createElement("div");
    contentBlock.innerHTML = `     
    <form>
        <div class="form-group">
            <label for="input1">Enter currency:</label>
            <input type="text" class="form-control" id="input1">
        </div>
        <div class="form-group">
            <label for="amount">Enter the required amount:</label>
            <input type="number" class="form-control" id="amount">
        </div>
        <div class="form-group">
            <label for="input2">Enter the required currency:</label>
            <input type="text" class="form-control" id="input2">
        </div>
        <button type="button" class="btn btn-primary" id="convert">Exchange</button>
        <p id="result"></p>
    </form>`;
    content.appendChild(contentBlock);
    var category = 'government'; 
var apiUrl = 'https://api.api-ninjas.com/v1/quotes?category=' + category; 
var apiKey = 'gb8mXsvc2Uq7vOaM/YHXrg==3Ufo0JKSwHtZCYSA'; 
 
fetch(apiUrl, { 
    method: 'GET', 
    headers: { 
        'X-Api-Key': apiKey, 
        'Content-Type': 'application/json' 
    }, 
}) 
    .then(response => { 
        if (!response.ok) { 
            throw new Error('Network response was not ok: ' + response.statusText); 
        } 
        return response.json(); 
    }) 
    .then(resultArray => { 
        // Check if the array has at least one element 
        if (resultArray.length > 0) { 
            const result = resultArray[0]; 
            document.getElementById('quote').innerHTML = result.quote; 
            document.getElementById('author').innerHTML = result.author; 
            console.log(result); 
        } else { 
            console.error('Error: Empty response array'); 
        } 
    }) 
    .catch(error => { 
        console.error('Error: ', error.message); 
    });

})

document.addEventListener('click', function(event) {
    event.preventDefault()
    const target = event.target;
    if(target.matches("#convert")) {
        const input1 = document.getElementById('input1')
        const input2 = document.getElementById('input2')
        const input3 = document.getElementById('amount')
        console.log("clicked")
        const from = input1.value
        const to = input2.value
        const amount = input3.value
        ExchangeRate(from, to, amount)
    }
})

async function ExchangeRate(from, to, amount) {
    console.log("clickeddd")
    const response = await fetch(`https://v6.exchangerate-api.com/v6/b9598552adbc6917ea9155ee/pair/${from}/${to}/${amount}`)
    const data = await response.json()
    exchangeResult.textContent = data.conversion_result;
}

function logout() {
    fetch('/logout', {
      method: 'GET'
    })
    .then(() => {
      // After successful logout, you can redirect the user to the login page or perform any other necessary actions
      window.location.href = '/login';
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
}

