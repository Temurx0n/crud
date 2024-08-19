import './Cars.css';
import { Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import starImg from '../../images/star.png';
import { useState, useEffect } from 'react';
import { MdOutlineDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Cars = () => {
    const [element, setElement] = useState(null)
    const [modal, setModal] = useState(false);
    const [pro, setPro] = useState(false)
    const proggle = () => {
        setPro(!pro)
    }

    function calME(element) {
        proggle();
        setElement(element)
    }

    function editDef(e) {
        e.preventDefault();
        const { name, price, title, img, year } = e.target;
        const id = element.id

        fetch(`http://localhost:8080/update_cars/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.value,
                price: price.value,
                title: title.value,
                year: year.value,
                img: img.value
            })

        }).then(res => res.json())
            .then(data => {
                alert(data[0])
                if (data[0] == `Car's updated!`) {
                    name.value = ''
                    price.value = ''
                    title.value = ''
                    year.value = ''
                    img.value = ''
                    window.location.reload();
                }
            });
    }

    function delDef(el) {
        const id = el.id;
        fetch(`http://localhost:8080/delete_cars/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then(data => {
                alert(data[0])
                if (data[0] == `Car's deleted!`) {
                    window.location.reload();
                }
            });
    }
    function postDef(e) {
        e.preventDefault();
        const { name, price, title, year, img } = e.target;
        fetch(`http://localhost:8080/create_cars`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.value,
                price: price.value,
                title: title.value,
                year: year.value,
                img: img.value
            })
        })
            .then(res => res.json())
            .then(data => {
                alert(data[0])
                if (data[0] == `Car's created!`) {
                    name.value = ''
                    price.value = ''
                    title.value = ''
                    year.value = ''
                    img.value = ''
                    window.location.reload();
                } else {
                    console.log('not');
                }
            })
    }
    function num(number) {
        number = number.replace(/\D/g, '')
        return Math.floor(+(number) / 3 * 2)
    }
    const perMonth = (number) => {
        number = number.replace(/\D/g, '')
        return Math.floor(+(number) / 12)
    }
    const str = (text) => {
        return text.slice(0, 4).split(' ').join('')
    }
    const star = (text) => {
        return text.slice(0, 2).split(' ').join('') / 10
    }
    const toggle = () => {
        setModal(!modal)
    }
    const [list, setList] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/cars')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setList(data);
            });
    }, []);
    function btnToHome() {
        window.location.pathname = '/'
    }

    return (
        <>

            {modal && (
                <div className="Modal">
                    <div className="overGround" onClick={toggle}></div>
                    <div className="modal">
                        <button className='close' onClick={toggle}>
                            <p>x</p>
                        </button>
                        <h2>
                            Add cars u want
                        </h2>
                        <form onSubmit={postDef}>
                            <input type="text" placeholder='Name' name='name' required />
                            <input type="number" placeholder='Price' name='price' required />
                            <input type="text" placeholder='Title' name='title' required />
                            <input type="number" placeholder='Year' name='year' required />
                            <input type="url" placeholder='Img' name='img' required />
                            <button className='btn' type='submit'> Submit </button>
                        </form>
                        <br />
                    </div>
                </div>
            )}

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
                            <input type="number" placeholder='Price' name='price' />
                            <input type="text" placeholder='Title' name='title' />
                            <input type="number" placeholder='Year' name='year' />
                            <input type="url" placeholder='Img' name='img' />
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

                <button className='btn_cool' onClick={toggle}>Add cars</button>

                <div className='all_cards'>
                    {
                        list.map((el, ind) => (
                            <div className="card" key={ind}>
                                <div className="top_card">
                                    <img src={el.img} alt='dsa' />
                                    <button className='yurak'> <FaRegHeart /> </button>
                                    <button className='aksiya'> Aksiya </button>
                                </div>
                                <div className="bottom_card">
                                    <h4>
                                        {el.name} arzon narxlarda
                                    </h4>
                                    <p className='tiny'>
                                        <img src={starImg} /> {el.year}
                                    </p>
                                    <p className='yellow_p'> {perMonth(el.price)} $$ /oyiga </p>
                                    <CiEdit id='edit_btn' onClick={() => calME(el)} />
                                    <p className='delete_text'> {el.price} $ </p>
                                    <p className='price'>
                                        {num(el.price)} $ <MdOutlineDeleteForever onClick={() => delDef(el)} id='del_btn' />
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div >

            </div>

        </>
    )
}

export default Cars