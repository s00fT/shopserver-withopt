'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const [parts] = await queryInterface.sequelize.query(
      `SELECT id FROM BoilerParts WHERE bestseller = true OR new = true ORDER BY id`
    )

    const updates = parts.map((part, index) =>
      queryInterface.bulkUpdate(
        'BoilerParts',
        {
          images: JSON.stringify([`/images/boiler-parts/part-${index + 1}.jpg`]),
        },
        { id: part.id }
      )
    )

    return Promise.all(updates)
  },

  async down(queryInterface, Sequelize) {
    const [parts] = await queryInterface.sequelize.query(
      `SELECT id FROM BoilerParts WHERE bestseller = true OR new = true`
    )

    const updates = parts.map((part) =>
      queryInterface.bulkUpdate(
        'BoilerParts',
        {
          images: JSON.stringify([]),
        },
        { id: part.id }
      )
    )

    return Promise.all(updates)
  },
}
