const router = require("express").Router();
const { isAuth } = require("../helpers/auth");
const AuthController = require("../modules/auth/controller");
const articleCatrgory = require("../modules/articleCategory/controller");
const article = require("../modules/article/controller");
const upload = require("../helpers/upload");


// Auth
router.route("/auth/register").post(AuthController.register);
router.route("/auth/login").post(AuthController.login);

// Article categories
router.route("/article-category/create").post(isAuth, articleCatrgory.create);
router.route("/article-category").get(articleCatrgory.view);
router.route("/article-category/:id").get(articleCatrgory.getById);

// Article
router.route("/article/create").post(isAuth, upload.single('image'), article.create, (error, req, res, next) => {
    res.status(400).send({
        status: 400,
        message: error.message,
        payload: null
    })
});
router.route("/article").get(article.view);

module.exports = router