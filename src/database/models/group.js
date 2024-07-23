module.exports = function (sequelize, DataTypes){
  const conf = {
    name: 'groups',
    ships:[
      {
        method: 'hasMany',
        target: 'ibans',
        data:{
          foreignKey: 'groupId',
          as: 'ibans'
        }
      }
    ]
  };

  const model = sequelize.define(conf.name, {
    groupId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      field: 'deleted_at', // SQL'de indeks ismi
    },
    groupName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    groupURL: {
      type: DataTypes.STRING(180),
      allowNull: true,
    },
    groupLogo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    handle: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  });

  return { conf, model };
};
