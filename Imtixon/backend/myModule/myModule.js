const { reader_files, writer_files, Headers } = require('../fs/fs');
const { v4 } = require('uuid')

function getEm(res, url) {
    Headers(res)
    const list = reader_files(url);
    return res.send(list)
}

function createEm(req, res, what) {
    const { name, price, year, title } = req.body;
    const list = reader_files(what);
    list.push({
        id: v4(),
        isSell: "false",
        ...data
    })
    writer_files(what, list);
    Headers(res);
    return res.send([what + ' is created !'])
}

function anyFindIndex(arr, id) {
    var itemIndex = null;
    try {
        itemIndex = arr.findIndex(function (item) {
            return item.id == id
        })
    } catch (err) {
        itemIndex = -1
    }
    return itemIndex
}

function deleteEM(res, id, what) {
    const list = reader_files(what);
    itemIndex = anyFindIndex(list, id)
    if (itemIndex == -1) {
        res.send(([`There is no such ${what} !!`]))
    } else {
        list.splice(itemIndex, 1)
        writer_files(what, list);
        Headers(res);
        return res.sendend([what + ' is deleted'])
    }
}

function uptadeEm(req, res, id, what) {
    req.on('data', (chunk) => {
        const data = JSON.parse(chunk);
        const { name, title, price, isSell, img } = data
        const products = reader_files(what);
        const producIndex = anyFindIndex(products, id)

        if (producIndex == -1) {
            res.send([
                `There is no such ${what}`
            ])
        } else {
            products[producIndex].name = name != null ? name : products[producIndex].name;
            products[producIndex].title = title != null ? title : products[producIndex].title;
            products[producIndex].price = price != null ? price : products[producIndex].price;
            products[producIndex].isSell = isSell != null ? isSell : products[producIndex].isSell;
            products[producIndex].img = img != null ? img : products[producIndex].img;

            writer_files(what, products);
            Headers(res)
            res.send([
                "products is updated"
            ])
        }
    })
}

module.exports = { getEm, createEm, deleteEM, anyFindIndex, uptadeEm, Headers, reader_files, writer_files }