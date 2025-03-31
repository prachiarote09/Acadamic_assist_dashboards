const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req,res,next) =>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
            .json({message:'Unauthorized , JWT token is require'});
    }try{
        const decoded= jwt.verify(auth,process.env.JWT_SECRET);
        req.user =decoded;
        next();
    }catch(err){
        return res.status(403)
            .json({message:'Unauthorized , JWT token wrong or expired'});
    }
}

module.exports = ensureAuthenticated;
/*
const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Unauthorized, JWT token is required" });
    }

    // Extract the actual token
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        return res.status(403).json({ message: "Unauthorized, JWT token is wrong or expired" });
    }
};
*/
module.exports = ensureAuthenticated;
