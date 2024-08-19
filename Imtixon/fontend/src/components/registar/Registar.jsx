import './Registar.css';
import { Link } from 'react-router-dom'

const Registar = () => {

    function registarDef(e) {
        e.preventDefault();
        const { name, age, job, email, password } = e.target;
        fetch(`http://localhost:8080/registar_users`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.value,
                age: age.value,
                job: job.value,
                email: email.value,
                password: password.value
            })
        })
            .then(res => res.json())
            .then(data => {
                alert(data[0])
                if (data[0] == "User's registared !" || data[0] == "This user already registared!") {
                    window.location.pathname = '/';
                    localStorage.setItem('token', data[1])
                }
            })
    }

    return (
        <div id="big_reg">
            <div className='registar'>

                <h1>Registar</h1>

                <form onSubmit={registarDef}>
                    <input type="text" placeholder='Name' required name='name' />
                    <input type="number" placeholder='Age' required name='age' />
                    <input type="text" placeholder='Job' required name='job' />
                    <input type="email" placeholder='Email' required name='email' />
                    <input type="password" placeholder='Password' required name='password' />
                    <button type='submit'>sign-up</button>
                </form>

                <a href="/">
                    <Link to='/login'>or login</Link>
                </a>

            </div>
        </div>
    )
}

export default Registar