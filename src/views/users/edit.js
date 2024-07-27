/**
 * 
 * @param {'create' | 'edit'} action 
 * @param {{}} user 
 */
function createUserForm(action="", user=null) {
    let submitPath = action === 'edit' ? `/users/${action}/${user.id}` : `/users/${action}`;
    const markup = `
    <!doctype html>
        <title>${action} user</title>
        <html>
            <body>
                <h1 style="text-transform: capitalize;">${action}</h1>
                <form action="${submitPath}" method="post">
                    <input type="text" name="firstName" value="${user?.firstName || ''}" placeholder="First Name" required/>
                    <br>
                    <input type="text" name="lastName" value="${user?.lastName  || ''}" placeholder="Last Name" required />
                    <br>
                    <input type="text" name="birthday" placeholder="Birth Date" />
                    <br>
                    <br>
                    <button>
                        <input type="submit" value="${action}" />
                    </button>
                </form>
            </body>
        </html>
    `;
    return markup;
}

export default createUserForm;