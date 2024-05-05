import Listing from '../models/listing.models.js';
import { errorHandler } from '../utils/error.utils.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    return res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.find(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can delete your own listings'));
  }

  try {
    await listing.findByIdAndDelete(req.params.id);
  } catch (error) {
    next(error);
  }
};
