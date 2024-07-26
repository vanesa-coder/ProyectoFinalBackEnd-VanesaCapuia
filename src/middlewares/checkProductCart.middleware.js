import cartManager from "../managers/cartManager.js";

export const checkProductCart = async (req, res, next) => {
    try {
        const carts = await cartManager.getCars();

        const { cid } = req.params;
        
      

        const cartexist = carts.find(c => c.id === cid);
        console.log(cartexist);
        if(!cartexist) {
            return res.status(400).json({ status: "error", msg: "El carrito no existe " });
        }

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
  };