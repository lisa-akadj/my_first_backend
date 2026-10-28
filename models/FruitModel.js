const db = require('../database/db')

// OOP - object orientd programming
class Fruit {
    constructor(fruit) {
        this.id = fruit.id;
        this.name = fruit.fruit_name;
        this.genus = fruit.genus;
        this.family = fruit.family;
        this.order = fruit.fruit_order;
        this.nutritions = fruit.nutritions
    }

    static async showAll() {
        const response = await db.query('SELECT * FROM fruits ORDER BY fruit_name;')
        return response.rows.map(fruit => new Fruit(fruit))
    }

    static async show(name) {
        const response = await await db.query('SELECT * FROM fruits WHERE LOWER(fruit_name) = $1;', [name])

        if (response.rows.length != 1) {
            throw 'The fruit does not exist'
        } else {
            return new Fruit(response.rows[0])
        }
    }

    static async create(data) {
        if (!data.name) {
            throw 'A fruit needs a name'
        }

        const existing = await db.query('SELECT * FROM FRUITS WHERE LOWER(fruit_name) = $1;', [data.name.toLowerCase()])

        if (existing.rows.length > 0) {
            throw 'The fruit already exists'
        } 

        const response = await 
            db.query('INSERT INTO fruits (fruit_name, genus, family, fruit_order, nutritions) VALUES ($1,$2, $2, $3, $4, $5) RETURNING *;', [data.name, data.genus, data.family, data.order, data.nutritions])

        return new Fruit(response.rows[0])
    }

    async update(data) {
        const name = data.name || this.name
        const family = data.family || this.family

        const response = await db.query('UPDATE fruits SET fruit_name = $1, family = $2 WHERE id = $3 RETURNING *;',
            [name, family, this.id]
        )
        return new Fruit(response.rows[0])
    }

    async destroy () {
        await db.query('DELETE FROM fruits WHERE id = $1;', [this.id])
        
    }
}

module.exports = Fruit