import '../login/Login.css';
import './testAdmins.css';
import { Link } from 'react-router-dom';

const testAdmins = () => {

    function loginDef(e) {
        e.preventDefault();
        const { admin, password } = e.target;
        fetch(`http://localhost:8080/login_admins`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                admin: admin.value,
                password: password.value
            })
        })
            .then(res => res.json())
            .then(data => {
                alert(data[0])
                if (data[0] == "Success!") {
                    window.location.pathname = '/admin';
                    localStorage.setItem('admin', data[1])
                } else if (data[0] == 'Password error !') {
                    password.value = '';
                }
            })
    }

    return (
        <div id='big_reg'>
            <div className='registar'>

                <h1>Login-admin</h1>

                <form onSubmit={loginDef}>
                    <input type="text" placeholder='Admin' required name='admin' />
                    <input type="password" placeholder='Password' required name='password' />
                    <button type='submit'>sign-in</button>
                </form>

                <a href="/">
                    <Link to='/'>or not</Link>
                </a>

            </div>
        </div>
    )
}

export default testAdmins