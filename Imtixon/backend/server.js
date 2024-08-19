const express = require('express');
const { v4 } = require('uuid')
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const { reader_files, writer_files, getEm } = require('./myModule/myModule');
const token = "cebba2c6-c4df-481d-98ee-2a676e4497f8";
const admin = "febda2c6-addf-481d-3d3e-dsa123443123";

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Getting there ! // --------------!>
app.get('/users', (req, res) => {
    const users = reader_files('users');
    res.status(200).json(users)
})
app.get('/animals', (req, res) => {
    const animals = reader_files('animals');
    res.status(200).json(animals)
})
app.get('/cars', (req, res) => {
    const cars = reader_files('cars');
    res.status(200).json(cars)
})
app.get('/fruits', (req, res) => {
    const fruits = reader_files('fruits');
    res.status(200).json(fruits)
})


app.post('/login_admins', async (req, res) => {
    if (req.body.admin == "Saidakbar" && req.body.password == "qwerty") {
        res.status(200).send([
            `Success!`, admin
        ])
    } else if (req.body.admin == 'Saidakbar' && req.body.password != "qwerty") {
        res.status(200).send([
            `Password error !`
        ])
    } else {
        res.status(200).send([
            `admin not found!`
        ])
    }
})
// Posting there ! // --------------!>
app.post('/registar_users', async (req, res) => {
    const { name, age, email, password, job } = req.body
    const users = reader_files('users')
    const findEmail = users.find(e => {
        return e.email === req.body.email
    });

    if (findEmail) {
        res.status(201).send([
            'This user already registared!'
        ])
    } else {
        users.push({
            id: v4(),
            name,
            age,
            job,
            email,
            password
        })
        writer_files('users', users);
        res.status(201).send([`User's registared !`, token])
    }
})
app.post('/login_users', async (req, res) => {
    const users = reader_files('users');
    const findUser = users.find(e => {
        return e.email == req.body.email
    });
    const findPassword = findUser ? findUser.password == req.body.password : false
    if (!findUser) {
        res.status(200).send([
            `User not found!`
        ])
    } else if (!findPassword) {
        res.status(200).send([
            'Password error!'
        ])
    } else {
        res.status(200).send([
            `Success!`, token
        ])
    }
})
// Cars =========-------/!>>
app.post('/create_cars', async (req, res) => {
    const { name, price, year, title, img } = req.body;
    const cars = reader_files('cars');
    cars.push({
        id: v4(),
        name,
        title,
        price,
        year,
        img
    })
    writer_files('cars', cars);
    res.status(200).send([
        `Car's created!`
    ])
})
// Animals =========-------/!>>
app.post('/create_animals', async (req, res) => {
    const { name, price, color, img } = req.body;
    const animals = reader_files('animals');
    animals.push({
        id: v4(),
        name,
        price,
        color,
        img
    })
    writer_files('animals', animals);
    res.status(200).send([
        `Animal's created!`
    ])
})
// Fruits =========-------/!>>
app.post('/create_fruits', async (req, res) => {
    const { name, price, color, img } = req.body;
    const fruits = reader_files('fruits');
    fruits.push({
        id: v4(),
        name,
        price,
        color,
        img
    })
    writer_files('fruits', fruits);
    res.status(200).send([
        `Fruit's created!`
    ])
})


// Deleting there ! // --------------!>
// Users =========-------/!>>
app.delete('/delete_users/:id', (req, res) => {
    const users = reader_files('users')
    let userIndex = null;
    try {
        userIndex = users.findIndex(function (item) {
            return item.id == req.params.id
        })
    } catch (err) {
        userIndex = -1
    }
    if (userIndex == -1) {
        res.status(200).send([
            `There is no such user!`
        ])
    } else {
        users.splice(userIndex, 1);
        writer_files('users', users);
        res.status(200).send([
            `User's deleted!`
        ])
    }
})
// Cars =========-------/!>>
app.delete('/delete_cars/:id', (req, res) => {
    const cars = reader_files('cars')
    let carIndex = null;
    try {
        carIndex = cars.findIndex(function (item) {
            return item.id == req.params.id
        })
    } catch (err) {
        carIndex = -1
    }
    if (carIndex == -1) {
        res.status(200).send([
            `There is no such car!`
        ])
    } else {
        cars.splice(carIndex, 1);
        writer_files('cars', cars);
        res.status(200).send([
            `Car's deleted!`
        ])
    }
})
// Animals =========-------/!>>
app.delete('/delete_animals/:id', (req, res) => {
    const animals = reader_files('animals')
    let animalIndex = null;
    try {
        animalIndex = animals.findIndex(function (item) {
            return item.id == req.params.id
        })
    } catch (err) {
        animalIndex = -1
    }
    if (animalIndex == -1) {
        res.status(200).send([
            `There is no such animal!`
        ])
    } else {
        animals.splice(animalIndex, 1);
        writer_files('animals', animals);
        res.status(200).send([
            `Animal's deleted!`
        ])
    }
})
// Fruits =========-------/!>>
app.delete('/delete_fruits/:id', (req, res) => {
    const fruits = reader_files('fruits')
    let fruitIndex = null;
    try {
        fruitIndex = fruits.findIndex(function (item) {
            return item.id == req.params.id
        })
    } catch (err) {
        fruitIndex = -1
    }
    if (fruitIndex == -1) {
        res.status(200).send([
            `There is no such fruit!`
        ])
    } else {
        fruits.splice(fruitIndex, 1);
        writer_files('fruits', fruits);
        res.status(200).send([
            `Fruit's deleted!`
        ])
    }
})


// Updating there ! // --------------!>
// Users =========-------/!>>
app.put('/update_users/:id', (req, res) => {
    const { name, age, job, email, password } = req.body;
    const users = reader_files('users')
    let userIndex = null;
    try {
        userIndex = users.findIndex(function (item) {
            return item.id == req.params.id
        })
    } catch (err) {
        userIndex = -1
    }
    if (userIndex == -1) {
        res.status(200).send([
            `There is no such user!`
        ])
    } else {
        users[userIndex].name = name ? name : users[userIndex].name;
        users[userIndex].age = age ? age : users[userIndex].age;
        users[userIndex].job = job ? job : users[userIndex].job;
        users[userIndex].email = email ? email : users[userIndex].email;
        users[userIndex].password = password ? password : users[userIndex].password;
        writer_files('users', users);
        res.status(200).send([
            `User's updated!`
        ])
    }
})
// Cars =========-------/!>>
app.put('/update_cars/:id', (req, res) => {
    const { name, price, year, title, img } = req.body;
    const cars = reader_files('cars')
    let carIndex = null;
    try {
        carIndex = cars.findIndex(function (item) {
            return item.id == req.params.id
        })
    } catch (err) {
        carIndex = -1
    }
    if (carIndex == -1) {
        res.status(200).send([
            `The is no such car!`
        ])
    } else {
        cars[carIndex].name = name ? name : cars[carIndex].name;
        cars[carIndex].price = price ? price : cars[carIndex].price;
        cars[carIndex].title = title ? title : cars[carIndex].title;
        cars[carIndex].year = year ? year : cars[carIndex].year;
        cars[carIndex].img = img ? img : cars[carIndex].img;
        writer_files('cars', cars);
        res.status(200).send([
            `Car's updated!`
        ])
    }
})
// Animals =========-------/!>>
app.put('/update_animals/:id', (req, res) => {
    const { name, price, color, img } = req.body;
    const animals = reader_files('animals')
    let animalIndex = null;
    try {
        animalIndex = animals.findIndex(function (item) {
            return item.id == req.params.id
        })
    } catch (err) {
        animalIndex = -1
    }
    if (animalIndex == -1) {
        res.status(200).send([
            `There is no such animal!`
        ])
    } else {
        animals[animalIndex].name = name ? name : animals[animalIndex].name;
        animals[animalIndex].price = price ? price : animals[animalIndex].price;
        animals[animalIndex].color = color ? color : animals[animalIndex].color;
        animals[animalIndex].img = img ? img : animals[animalIndex].img;
        writer_files('animals', animals);
        res.status(200).send([
            `Animal's updated!`
        ])
    }
})
// Fruits =========-------/!>>
app.put('/update_fruits/:id', (req, res) => {
    const { name, price, color, img } = req.body;
    const fruits = reader_files('fruits')
    let fruitIndex = null;
    try {
        fruitIndex = fruits.findIndex(function (item) {
            return item.id == req.params.id
        })
    } catch (err) {
        fruitIndex = -1
    }
    if (fruitIndex == -1) {
        res.status(200).send([
            `There is no such furit!`
        ])
    } else {
        fruits[fruitIndex].name = name ? name : fruits[fruitIndex].name;
        fruits[fruitIndex].price = price ? price : fruits[fruitIndex].price;
        fruits[fruitIndex].color = color ? color : fruits[fruitIndex].color;
        fruits[fruitIndex].img = img ? img : fruits[fruitIndex].img;
        writer_files('fruits', fruits);
        res.status(200).send([
            `Fruit's updated!`
        ])
    }
})

app.listen(8080, () => {
    console.log(`Server app listening on port ${8080}`)
})