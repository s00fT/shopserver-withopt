'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const [parts] = await queryInterface.sequelize.query(
      'SELECT id FROM `BoilerParts` ORDER BY id'
    );

    const updates = parts.map((part, index) => {
      const imgPath =
        index < 23
          ? `/images/boiler-parts/part-${index + 1}.webp`
          : '/images/boiler-parts/placeholder.webp';

      return queryInterface.bulkUpdate(
        'BoilerParts',
        {
          images: JSON.stringify([imgPath]),
        },
        { id: part.id }
      );
    });

    return Promise.all(updates);
  },

  async down(queryInterface, Sequelize) {
    const [parts] = await queryInterface.sequelize.query(
      'SELECT id FROM `BoilerParts`'
    );

    const updates = parts.map((part) =>
      queryInterface.bulkUpdate(
        'BoilerParts',
        {
          images: JSON.stringify([]),
        },
        { id: part.id }
      )
    );

    return Promise.all(updates);
  },
};

