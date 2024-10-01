module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false       
        }
    })

    users.associate = (models) => {
        users.hasMany(models.posts, { foreignKey: 'userId'});
        models.posts.belongsTo(users, { foreignKey: 'userId'});
    } 

    return users;
}