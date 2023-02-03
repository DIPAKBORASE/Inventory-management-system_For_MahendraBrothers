const { check, body } = require('express-validator');

const saveValid = () => {
    return [
        [
            body('Vendor_ID')
            .trim()
            .not()
            .isEmpty()
            .withMessage('vendor id can not be empty')
            .isNumeric()
            .withMessage('vendor id is not valid'),
            check('PO_Date').trim().isDate().withMessage('Must be a valid date'),

            check('products.*.ID')
            .trim()
            .not()
            .isEmpty()
            .withMessage('ID can not be empty'),
            check('products.*.Name')
            .trim()
            .not()
            .isEmpty()
            .withMessage('name can not be empty'),
            check('products.*.UOM')
            .trim()
            .not()
            .isEmpty()
            .withMessage('UOM can not be empty'),
            check('products.*.Price')
            .trim()
            .isNumeric()
            .withMessage('price is not valid')
            .not()
            .isEmpty()
            .withMessage('price can not be empty'),
            check('products.*.TAX_Percentage')
            .trim()
            .not()
            .isEmpty()
            .withMessage('tax percentage can not be empty')
            .isNumeric()
            .withMessage('tax percentage is not valid'),
            check('products.*.Quantity')
            .trim()
            .not()
            .isEmpty()
            .withMessage('quantity can not be empty')
            .isNumeric()
            .withMessage('quantity id is not valid'),
        ],
    ];
};
const updateValid = () => {
    return [
        [
            check('id')
            .not()
            .isEmpty()
            .withMessage('purchase order id can not be empty'),
            body('Vendor_ID')
            .trim()
            .not()
            .isEmpty()
            .withMessage('vendor id can not be empty')
            .isNumeric()
            .withMessage('vendor id is not valid'),
            check('PO_Date').trim().isDate().withMessage('Must be a valid date'),
            check('products.*.ID')
            .trim()
            .not()
            .isEmpty()
            .withMessage('ID can not be empty'),
            check('products.*.ALT_Code')
            .trim()
            .not()
            .isEmpty()
            .withMessage('ALT_Code can not be empty'),
            check('products.*.Name')
            .trim()
            .not()
            .isEmpty()
            .withMessage('name can not be empty'),
            check('products.*.UOM')
            .trim()
            .not()
            .isEmpty()
            .withMessage('UOM can not be empty'),
            check('products.*.Price')
            .trim()
            .isNumeric()
            .withMessage('price is not valid')
            .not()
            .isEmpty()
            .withMessage('price can not be empty'),
            check('products.*.TAX_Percentage')
            .trim()
            .not()
            .isEmpty()
            .withMessage('tax percentage can not be empty')
            .isNumeric()
            .withMessage('tax percentage is not valid'),
            check('products.*.Quantity')
            .trim()
            .not()
            .isEmpty()
            .withMessage('quantity can not be empty')
            .isNumeric()
            .withMessage('quantity id is not valid'),
        ],
    ];
};

const idValid = () => {
    return [
        [
            check('id')
            .not()
            .isEmpty()
            .withMessage('purchase order id can not be empty'),
        ],
    ];
};

module.exports = {
    saveValid,
    updateValid,
    idValid,
};