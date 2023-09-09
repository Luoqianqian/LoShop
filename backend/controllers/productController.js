import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword 
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {};
    const count = await Product.countDocuments({...keyword});
    const pages = Math.ceil(count / pageSize)
    const products = await Product.find({...keyword})
      .limit(pageSize)
      .skip(pageSize * (page -1));

    res.json({ products, page, pages});
  }

  export const getTopProducts = async (req, res) => {
    const products = await Product.find().sort({rating: -1}).limit(3);
    res.json(products);
  };

  export const getProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error('Resource not found');
    }
  }

  export const createReviews = async (req, res) => {
    const {productId, rating, comment} = req.body;
    const product = await Product.findById(productId);
    if(product) {
      const alreadyReviewed = product.reviews.find((r) => (
        r.user.toString() === req.user._id.toString()));
      if(alreadyReviewed) {
        res.status(400).json({ message: 'Product already reviewed'});
      }
      
      const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
  };
};
    