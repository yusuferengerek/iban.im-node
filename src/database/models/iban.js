const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  const conf = {
    name: 'ibans',
    ships: [
      {
        method: 'belongsTo',
        target: 'users',
        data:{
          foreignKey: 'ownerId',
          as: 'owner'
        }
      },
      {
        method: 'belongsTo',
        target: 'groups',
        data:{
          foreignKey: 'groupId',
          as: 'groups'
        }
      }
    ]
  };

  const model = sequelize.define(conf.name, {
    ibanId: {
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
    text: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(10)));
      },
    },
    handle: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownerType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    hooks: {
      beforeSave: async (iban, options) => {
        // Hash the password if it's set
        if (iban.password) {
          iban.password = await bcrypt.hash(iban.password, bcrypt.genSaltSync(10));
        }

        // Check for handle uniqueness
        const existingIban = await model.findOne({
          where: {
            ownerId: iban.ownerId,
            handle: iban.handle,
            ibanId: {
              [sequelize.Op.ne]: iban.ibanId || 0,
            },
          },
        });

        if (existingIban) {
          throw new Error('Handle already exists');
        }
      },
    },
    paranoid: true, // Enables soft delete
    timestamps: true,
  });

  model.prototype.validate = function() {
    if (!this.text.trim()) {
      throw new Error('You have to provide IBAN');
    }
    if (!this.handle.trim()) {
      throw new Error('You have to provide handle');
    }
    if (this.isPrivate && !this.password.trim()) {
      throw new Error('You have to provide password');
    }
  };

  return { conf, model };
};
