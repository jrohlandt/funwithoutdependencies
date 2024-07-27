function createPage(users) {
    let markup = '<h1>Users</h1><a href="/users/create">add user</a><ul>';
    users.forEach(u => {
        markup += `<li>${u.id} ${u.firstName} ${u.lastName} ${u.birthday}`;
        markup += `<a href="/users/edit/${u.id}">edit</a></li>`;
    });
    markup += '</ul>';
    return markup;
}

export default createPage;