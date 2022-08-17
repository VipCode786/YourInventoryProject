import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isWarehouse: user.isWarehouse,
      isProduct: user.isProduct,
      isTransfer: user.isTransfer,
      isGeneratePurchaseOrder: user.isGeneratePurchaseOrder,
      isListPurchaseOrder: user.isListPurchaseOrder
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};


export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const isWarehouse = (req, res, next) => {
  if (req.user && req.user.isWarehouse) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Warehouse Token' });
  }
};


export const isProduct = (req, res, next) => {
  if (req.user && req.user.isProduct) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Product Token' });
  }
};


export const isTransfer = (req, res, next) => {
  if (req.user && req.user.isTransfer) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Transfer Token' });
  }
};

export const isGeneratePurchaseOrder = (req, res, next) => {
  if (req.user && req.user.isGeneratePurchaseOrder) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid GeneratePurchaseOrder Token' });
  }
};

export const isListPurchaseOrder = (req, res, next) => {
  if (req.user && req.user.isListPurchaseOrder) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid ListPurchaseOrder Token' });
  }
};


