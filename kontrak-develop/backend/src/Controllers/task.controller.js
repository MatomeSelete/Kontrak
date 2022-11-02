const pool = require("../../config/db");

//Delete a user
exports.review = (req, res) => {
    try {
        
        const userId = parseInt(req.params.id)
        const {title, body } = req.body;


        pool.query('INSERT INTO review(rating, comment, contractor_id, user_id, firstname) VALUES ($1, $2,$3,$4,$;', [
            userId, title, body], (error) => {
            if (error) {
                res.status(500).json
                ({
                  message: error,
                });
            }
            res.status(200).json(`note created with ID: ${userId}`);
        });


    } catch (error) {

        res.status(400).json(`not created:`)
    }
};
