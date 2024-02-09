const Listing = require("../models/listingModel.js");
const { errorHandler } = require("../utils/error.js");

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body.body);
    return res.status(201).json({ status: true, listing });
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: true, message: "Listing has been deleted!" });
  } catch (error) {
    next(error);
  }
};

const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

const getListings = async (req, res, next) => {
  try {
    const { search, sort, price, status, skip } = req.query;

    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: "i" } };
    }

    let sortQuery = {
      createdAt: parseInt(sort) || 1,
      _id: parseInt(sort) || 1,
    }; // or -1 for descending

    let priceQuery = {};
    if (price) {
      const [min, max] = price.split("-");
      priceQuery = { regularPrice: { $gte: min, $lte: max } };
    }

    let statusQuery = {};
    if (status) {
      statusQuery = { status: status };
    }
    const products = await Listing.find({
      ...query,
      ...priceQuery,
      ...statusQuery,
    })
      .sort(sortQuery)
      .skip(parseInt(skip))
      .limit(20);
    res.json(products);
  } catch (error) {
    next(error);
  }
  // try {
  //   const limit = parseInt(req.query.limit) || 9;
  //   const startIndex = parseInt(req.query.startIndex) || 0;
  //   let offer = req.query.offer;

  //   if (offer === undefined || offer === "false") {
  //     offer = { $in: [false, true] };
  //   }

  //   let furnished = req.query.furnished;

  //   if (furnished === undefined || furnished === "false") {
  //     furnished = { $in: [false, true] };
  //   }

  //   let parking = req.query.parking;

  //   if (parking === undefined || parking === "false") {
  //     parking = { $in: [false, true] };
  //   }

  //   let type = req.query.type;

  //   if (type === undefined || type === "all") {
  //     type = { $in: ["sale", "rent"] };
  //   }

  //   const searchTerm = req.query.searchTerm || "";

  //   const sort = req.query.sort || "createdAt";

  //   const order = req.query.order || "desc";

  //   const listings = await Listing.find({
  //     name: { $regex: searchTerm, $options: "i" },
  //     offer,
  //     furnished,
  //     parking,
  //     type,
  //   })
  //     .sort({ [sort]: order })
  //     .limit(limit)
  //     .skip(startIndex);

  //   return res.status(200).json(listings);
  // } catch (error) {
  //   next(error);
  // }
};

const getDashboardData = async (req, res, next) => {
  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

  const listing = await Listing.aggregate([
    {
      $match: {
        createdAt: { $gte: sixMonthsAgo, $lte: currentDate },
      },
    },
    {
      $group: {
        _id: {
          month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          status: "$status",
        },
        totalPrice: { $sum: "$regularPrice" },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.month",
        total: { $sum: "$totalPrice" },
        rentedListings: {
          $sum: {
            $cond: [{ $eq: ["$_id.status", "rent"] }, "$totalPrice", 0],
          },
        },
        boughtListings: {
          $sum: {
            $cond: [{ $eq: ["$_id.status", "buy"] }, "$totalPrice", 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id",
        total: 1,
        rentedListings: 1,
        boughtListings: 1,
      },
    },
    {
      $sort: { month: 1 },
    },
  ]);

  res.status(200).json(listing);
};

module.exports = {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
  getDashboardData,
};
