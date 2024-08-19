import './Home.css';
import { Link } from 'react-router-dom'
import Users from '../users/Users';
const Home = () => {

    function btnToHome() {
        window.location.pathname = '/'
    }

    return (
        <>

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
                    <Users />
                </div>


            </div>

        </>
    )
}

export default Home