import express from "express";

const router = express.Router();

router.get('/',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});

/* /assets/create
   Returns: Asset object (encapsulates the DDO document)
 */
router.post('/create',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});

router.get('/resolve',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});

router.get('/search',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});

router.get('/query',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});

router.get('/order',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});

router.get('/consume',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});

router.get('/validate',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});

router.get('/owner',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});

router.get('/ownerAssets',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});


router.get('/consumerAssets',
    async (req, res) => {
        return res.status(501).send("Not implemented.");
});

exports.router = router;