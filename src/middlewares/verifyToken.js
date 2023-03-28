import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Result like : Bearer youtoken => youtoken (remove bearer) 
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SERECTKEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        
        req.user = decoded;

        next();
      }
    );
}

export default verifyToken;