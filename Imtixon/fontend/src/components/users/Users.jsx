import './Users.css';
import { useState, useEffect } from 'react';

const Users = () => {

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

    return (
        <div id='users'>
            <table>
                <tbody>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Job</th>
                    <th>Email </th>
                </tbody>

                {list.map((item, idx) => (
                    <tr key={item.id}>
                        <td>{idx + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.job}</td>
                        <td>{item.email}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Users