const productModel = require('../models/productModel');

const {successResponse, errorResponse} = require('../helpers/responseHelper');

exports.getProducts = async (req, res) =>{
    try {
        const {
            currentPage = 1,
            pageSize = 10,
            orderBy = 'createdAt',
            orderDir = 'desc',
            searchBy = '',
            searchFields = [],
        } = req.query;

        const queryParams = {
            currentPage: parseInt(currentPage, 10),
            pageSize: parseInt(pageSize, 10),
            orderBy,
            orderDir: orderDir.toLowerCase() === 'asc' ? 'ASC' : 'DESC',
            searchBy,
            searchFields: Array.isArray(searchFields) ? searchFields :[],
        };

        const result = await productModel.getFilteredProducts(queryParams);
        successResponse(res,result);
}catch(error){
    console.error(error);
    errorResponse(res, 'Failed to fetch products');
}
}