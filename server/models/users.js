module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
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

        users.hasMany(models.postsLikes, {foreignKey: 'userId'})
        models.postsLikes.belongsTo(users, {foreignKey: 'userId'})
    } 

    return users;
}