import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {

    function loginDef(e) {
        e.preventDefault();
        const { email, password } = e.target;
        fetch(`http://localhost:8080/login_users`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
            .then(res => res.json())
            .then(data => {
                alert(data[0])
                if (data[0] == "Success!") {
                    window.location.pathname = '/';
                    localStorage.setItem('token', data[1])
                } else if (data[0] == 'Password error!') {
                    password.value = '';
                } else {
                    window.location.pathname = '/registar';
                }
            })
    }

    return (
        <div id='big_reg'>
            <div className='registar'>

                <h1>Login</h1>

                <form onSubmit={loginDef}>
                    <input type="email" placeholder='Email' required name='email' />
                    <input type="password" placeholder='Password' required name='password' />
                    <button type='submit'>sign-in</button>
                </form>

                <a href="/">
                    <Link to='/registar'>or registar</Link>
                </a>

            </div>
        </div>
    )
}

export default Login