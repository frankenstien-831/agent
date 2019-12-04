import express from "express";

const router = express.Router();

/* /ASSETS/CREATE
   Returns: Asset object (encapsulates the DDO document)
 */
router.post('/create',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});


exports.assetsRouter = router;