function createPage(users) {
    let markup = '<h1>Users</h1><a href="/users/create">add user</a><ul>';
    users.forEach(u => {
        markup += `<li>${u.firstName} ${u.lastName} ${u.birthday}</li>`;
    });
    markup += '</ul>';
    return markup;
}

export default createPage;