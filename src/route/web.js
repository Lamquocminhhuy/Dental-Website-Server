import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    //arrow function

    router.get('/', homeController.getHomePage);

    router.get('/about', homeController.getAboutPage);


    return app.use("/", router);
}



module.exports = initWebRoutes;