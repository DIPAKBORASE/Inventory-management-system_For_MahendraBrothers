module.exports = {
    HOST: 'localhost',
    USER: 'damahe',
    PASSWORD: 'damahe123',
    DB: 'inventory_management',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}