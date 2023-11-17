const Web3Connection = require('./Web3')

let conn = new Web3Connection();

/**  Write into Blockchain  **/

// Function write into blockchain need call in order

//Resister user
// conn.register('duyen le','0xDcF60520bb52c6A348FF9c0bD26CEDf22ea87613');

// Create product
//conn.createProduct('packka','QmZBghVYFP52y2VJkv32J8njG6WhnPsqCLa76X6Dme','0x55430b0c02b336B6461d914A8EA17892f40e485c', 'hello hi');

//grant permission
//conn.grantPermissionToCreateProduct('0x55430b0c02b336B6461d914A8EA17892f40e485c', '0x309f8888C0b7E0c19E4eD938Fb4E3354744aA513');

//revoke permission
//conn.revokePermissionToCreateProduct('0xDcF60520bb52c6A348FF9c0bD26CEDf22ea87613', '0x44ef06651886D8853569595210D20F26AB22B015')

// Create valuation
// conn.createValuation('0x6d696c6b', 1234, '0x73e70e8F477FD004a23E8f6BBD9A0CbBD92C234d');

// Add price for product on valuation session
// conn.addPrice('0x6d696c6b', 19, '0xE358774DF4E795ecf6218c3D909970BA4774915F');

// calculate FinalPrice
//conn.calculateFinalPrice('0x6d696c6b', '0x73e70e8F477FD004a23E8f6BBD9A0CbBD92C234d');

// close Valuation
//conn.closeValuation('0x6d696c6b', '0x73e70e8F477FD004a23E8f6BBD9A0CbBD92C234d');



/**   Read into Blockchain  **/

/** 
 *  Function read into blocchain
 *  note: function: calculateFinalPrice
 *  call after calculate FinalPrice and before close valuation
*/
// return object user
// const userInfor = async () => {
//     const user = await conn.userInfo('0xE358774DF4E795ecf6218c3D909970BA4774915F');
//     console.log(user);
// }
// userInfor();

// return object product
// const productInfor = async () => {
//     const product = await conn.productInfo('0x6d696c6b');
//     console.log(product);
// }
// productInfor();

// get calculate FinalPrice
// const calculateFinalPrice = async () => {
//     const price = await conn.getCalculateFinalPrice('0x6d696c6b', '0x73e70e8F477FD004a23E8f6BBD9A0CbBD92C234d');
//     console.log(price);
// }
// calculateFinalPrice();

// return address of admin
// const adminInfor = async () => {
//     const admin = await conn.adminInfo()
//     console.log(admin);
// }
// adminInfor();

// check admin
// const isAdministrator = async () => {
//     const admin = await conn.isAdministrator('0x55430b0c02b336B6461d914A8EA17892f40e485c')
//     console.log(admin);
// }
// isAdministrator();



