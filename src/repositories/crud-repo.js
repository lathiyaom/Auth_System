const { logger } = require("../config");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  // CREATE
 async createRecoreds(data) {
  try {
    const response = await this.model.create(data);
    return response;
  } catch (error) {
    const logMeta = {
      layer: "repository",
      source: "CrudRepo",
      action: "create",
      data,
      error: error.message,
      stack: error.stack,
    };

    if (error.name === "SequelizeValidationError") {
      logMeta.validationErrors = error.errors.map(e => ({
        field: e.path,
        message: e.message,
        value: e.value,
      }));
    }

    logger.error("❌ Failed to create record in CrudRepo", logMeta);
    throw error;
  }
}


  // DELETE
  async destroy(id) {
    try {
      const response = await this.model.destroy({
        where: { id },
      });

      if (response === 0) {
        logger.warn(`⚠️ CrudRepo: No record found to delete with id: ${id}`);
      }

      return response;
    } catch (error) {
      logger.error("❌ CrudRepo: Error in destroy", {
        error: error.message,
        stack: error.stack,
        id,
      });
      throw error;
    }
  }

  // GET BY ID
  async get(id) {
    try {
      const response = await this.model.findByPk(id);
      if (!response) {
        logger.warn(`⚠️ CrudRepo: No record found with id: ${id}`);
      }
      return response;
    } catch (error) {
      logger.error("❌ CrudRepo: Error in get", {
        error: error.message,
        stack: error.stack,
        id,
      });
      throw error;
    }
  }

  // GET ALL
  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      logger.error("❌ CrudRepo: Error in getAll", {
        error: error.message,
        stack: error.stack,
      });
      throw error; // use throw, not return
    }
  }

  // UPDATE
  async update(id, data) {
    try {
      const [rowsUpdated] = await this.model.update(data, {
        where: { id },
      });

      if (rowsUpdated === 0) {
        logger.warn(`⚠️ CrudRepo: No record updated for id: ${id}`);
      }

      return rowsUpdated;
    } catch (error) {
      logger.error("❌ CrudRepo: Error in update", {
        error: error.message,
        stack: error.stack,
        id,
        data,
      });
      throw error;
    }
  }
}

module.exports = CrudRepository;
