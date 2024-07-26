import { Router } from "express";
import cartManager from "../managers/cartManager.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import cartDao from "../dao/cart.dao.js";



const router = Router();

router.get("/carts", async (req, res)=>{
  try{
  const cart = await cartManager.getCars();

  res.status(201).json({ status: "ok", cart });
  }catch(error){
    console.log(error);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
    try {
      const cart = await cartDao.create();
  
      res.status(201).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
  });


  router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;  

      const cart = await cartDao.getById(cid);
      if(!cart) return res.status(404).json({status: "error", msg: "Carrito no encontrado"});
  
      res.status(201).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
  });

  router.post("/:cid/product/:pid", checkProductAndCart, async (req, res) => {
    try {
      const { cid, pid } = req.params;
      // Chequear que el producto y el carrito existan y sino devolver un status 404 indicando los errores
      
      const cart = await cartDao.addProductToCart(cid, pid);

      

      res.status(201).json({ status: "ok", cart });

    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
  });



export default router;