module.exports = (sequelize, DataTypes) => {

    const posts = sequelize.define("posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false       
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        }
    })

    return posts;
}