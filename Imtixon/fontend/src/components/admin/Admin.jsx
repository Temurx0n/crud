import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import '../home/Home.css';
import './Admin.css';
import { Link } from 'react-router-dom'
const Admin = () => {

    const [element, setElement] = useState(null)
    const [pro, setPro] = useState(false)
    const proggle = () => {
        setPro(!pro)
    }

    function calME(element) {
        proggle();
        setElement(element)
    }

    function delDef(el) {
        const id = el.id;
        fetch(`http://localhost:8080/delete_users/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then(data => {
                alert(data[0])
                if (data[0] == `User's deleted!`) {
                    window.location.reload();
                }
            });
    }

    function editDef(e) {
        e.preventDefault();
        const { name, age, job, email, password } = e.target;
        const id = element.id

        fetch(`http://localhost:8080/update_users/${id}`, {
            method: 'PUT',
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

        }).then(res => res.json())
            .then(data => {
                alert(data[0])
                if (data[0] == `User's updated!`) {
                    name.value = ''
                    age.value = ''
                    job.value = ''
                    email.value = ''
                    password.value = ''
                    window.location.reload();
                }
            });
    }

    const [list, setList] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setList(data);
            });
    }, []);

    function btnToHome() {
        window.location.pathname = '/'
    }

    return (
        <>



            {pro && (
                <div className="Modal">
                    <div className="overGround" onClick={proggle}></div>
                    <div className="modal">
                        <button className='close' onClick={proggle}>
                            <p>x</p>
                        </button>
                        <h2>
                            Edit them
                        </h2>
                        <form onSubmit={(e) => editDef(e)}>
                            <input type="text" placeholder='Name' name='name' />
                            <input type="number" placeholder='Age' name='age' />
                            <input type="text" placeholder='Job' name='job' />
                            <input type="number" placeholder='Email' name='email' />
                            <input type="password" placeholder='Password' name='password' />
                            <button className='btn' type='submit'> Submit </button>
                        </form>
                        <br />
                    </div>
                </div>
            )}

            <div className="container">

                <nav>
                    <ul>
                        <Link className='li' to='/'><li>Users</li></Link>
                        <Link className='li' to='/cars'><li>Cars</li></Link>
                        <Link className='li' to='/animals'><li>Animals</li></Link>
                        <Link className='li' to='/fruits'><li>Fruits</li></Link>
                    </ul>
                    <button id='btn' onClick={btnToHome}>home</button>
                </nav>

                <div className="all_div">

                    <div id='users'>
                        <table>
                            <tbody>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Job</th>
                                <th>Email </th>
                                <th>Edit </th>
                                <th>Delete </th>
                            </tbody>

                            {list.map((item, idx) => (
                                <tr key={item.id}>
                                    <td>{idx + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.job}</td>
                                    <td>{item.email}</td>
                                    <td><FaEdit id='edit_btn' onClick={() => calME(item)} /></td>
                                    <td><RiDeleteBin5Fill id='del_btn' onClick={() => delDef(item)} /></td>
                                </tr>
                            ))}
                        </table>
                    </div>

                </div>


            </div>

        </>
    )
}

export default Admin