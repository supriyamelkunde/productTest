const db = require('../config/dbConfig');

exports.getFilteredProducts = async(queryParams)=>{
    const {
        currentPage,
        pageSize,
        orderBy,
        orderDir,
        searchBy,
        searchFields,
    }= queryParams;

    const offset = (currentPage -1 )* pageSize;
    const limit = parseInt(pageSize,10);

    let whereClause = '';
    if (searchBy && searchFields.length > 0){
        const searchConditions = searchFields.map(
    (field)=> `${field} LIKE '%${searchBy}%'`
);
 whereClause = `WHERE ${searchConditions.join('OR')}`
}

const orderClause = `ORDER BY ${orderBy} ${orderDir}`;
const limitClause = `LIMIT ${limit} OFFSET ${offset}`;

const productQuery = `
    SELECT 
    productId, productName, productImageName, productImageURL, brandName
     ,description
     ,itemCode
     ,itemType
     ,currency
     ,currencyCode
     ,saleAmount
     ,brochureFileName
     ,brochureFileURL
     ,vendors
     ,status
     ,createdBy
     ,created
     ,updated
     ,subCategoryId
     ,categoryId
     ,uomId
     ,shippingMethodId
     ,shippingTermsId
     ,paymentTermsId
     ,categoryName
     ,subCategoryName
     ,uomCode
     ,uomDescription, organisationName,
     organisationId 
     FROM ProductV2

     ${whereClause}
     ${orderClause}
     ${limitClause};
     `;

     const countQuery = `
     SELECT COUNT(*) AS totalCount
     FROM ProductV2
     ${whereClause};
     `;

     const [products] = await db.promise().query(productQuery);
     const [countResult] = await db.promise().query(countQuery);

     const totalCount = countResult[0]?.totalCount || 0;
     const totalPages = Mat.ceil(totalCount/ pageSize);

     return{
     currentPage,
     pageSize,
     totalPages,
     totalCount,
     data: products,
     };
};