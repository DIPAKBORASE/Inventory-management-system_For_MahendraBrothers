
module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define(
		'user',
		{
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			mobile: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			password: {
				type: DataTypes.STRING,
				isAlphaNumeric: true,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Password is required',
					},
				},
			},
		},
	
	);
	return user;
};
