import { isValidObjectId } from "mongoose";

/**
 * Checks if the req.params.id is a valid Mongoose ObjectId.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 * @throws {Error} Throws an error if the ObjectId is invalid.
 */

function checkObjectId(req, res, next) {
  if (!isValidObjectId(req.user.id)) {
    res.status(400).json({
      message: `invalid object id of ${req.params.id}`,
    });
  }
  next();
}

export default checkObjectId;
