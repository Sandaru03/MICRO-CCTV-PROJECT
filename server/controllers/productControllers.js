import Product from "../models/product.js";

// Create product
export const createProduct = (req, res) => {
  new Product(req.body)
    .save()
    .then(() => res.json({ message: "Product created successfully" }))
    .catch((err) => {
      if (err?.code === 11000) {
        return res.status(409).json({ message: "ProductId already exists" });
      }
      res.status(500).json({ message: "Failed to create product", err });
    });
};


// Get product using productId 
export const getProductById = (req, res) => {
  const { productId } = req.params; 

  Product.findOne({ productId })
    .then((product) => {
      if (!product) {
        
        return res.status(404).json(
            { 
                message: "Product not found" 
            }
        );
      }
      res.json(product);
    })
    .catch((err) =>
      res.status(500).json(
        { 
            message: "Failed to find product", err 
            
        })
    );
};



// Update product by productId

export function updateProductById(req, res) {
  const productId = req.params.productId;
  const updateData = { ...req.body };

  Product.findOneAndUpdate({ productId: productId }, updateData, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json(
            { 
                message: "Product not found" 
            });
      }
      res.json({
        message: "Product updated successfully",
        data: updatedProduct
      });
    })
    .catch((error) => {
      res.status(500).json(
        {
             message: "Failed to update product", error 
            });
    });
}



// Delete product by productId

export function deleteProductById(req, res) {
  const productId = req.params.productId;

  Product.findOneAndDelete({ productId: productId })
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json(
            { 
                message: "Product not found" 
            });
      }
      res.json({
        message: "Product deleted successfully",
        data: deletedProduct
      });
    })
    .catch((error) => {
      res.status(500).json(
        { 
            message: "Failed to delete product", error 
        });
    });
}