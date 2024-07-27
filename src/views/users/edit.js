/**
 * 
 * @param {'create' | 'edit'} action 
 * @param {{}} user 
 */
function createUserForm(action="", user={}) {
    const markup = `
    <!doctype html>
        <title>${action} user</title>
        <html>
            <body>
                <h1 style="text-transform: capitalize;">${action}</h1>
                <form action="/users/${action}" method="post">
                    <input type="text" name="firstName" placeholder="First Name" required/>
                    <br>
                    <input type="text" name="lastName" placeholder="Last Name" required />
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