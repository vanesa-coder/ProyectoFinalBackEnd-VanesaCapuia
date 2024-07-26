import productManage from "../managers/productManage.js";

export const checkProductList = async (req, res, next) => {
    try {
        const products = await productManage.getProducts();

        const { cid, pid } = req.params;
        console.log(`todo bien ${cid} y el producto ${pid}`)
      

        const prodexist = products.find(p => p.id === pid);
        console.log(prodexist);
        if(!prodexist) {
            return res.status(400).json({ status: "error", msg: "El producto no existe en el listado general" });
        }

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
  };