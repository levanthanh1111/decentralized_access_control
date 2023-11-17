/**
 *  Written by Thanh Le
 */

const Web3 = require('web3');
// import Web3 from 'web3'
const { CONTRACT_ADDRESS } = require('./constant');
// const Valuation = require('./contracts/Valuation.json')
const Valua = require('./contracts/Valua.json')

//const web3 = new Web3('http://127.0.0.1:7545');
//const smartContract = new web3.eth.Contract(Valuation.abi, CONTRACT_ADDRESS);
class Web3Connection {
    constructor() {
        this.web3 = new Web3('http://127.0.0.1:7545');
        this.smartContract = new this.web3.eth.Contract(Valua, CONTRACT_ADDRESS);

    }

    /** Get account from metamask **/

  
    async getAccount() {
        const accounts = await this.web3.eth.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        return address
        //showAccount.innerHTML = account;
    }

    /**  Write into Blockchain  **/

    async grantPermissionToCreateProduct (addressClient, addressAmin) {
        await this.smartContract.methods.grantPermissionToCreateProduct(addressClient).send({from: addressAmin, gas: 3000000})
            .then((data) => {
                console.log(data);
                console.log('====Created a transaction====')
            })
            .catch((error) => {
                console.error(error);
                console.log('====Fail====')
            })
    }

    async revokePermissionToCreateProduct(addressClient, addressAmin) {
        await this.smartContract.methods.revokePermissionToCreateProduct(addressClient).send({from: addressAmin, gas: 3000000})
            .then((data) => {
                console.log(data);
                console.log('====Created a transaction====')
            })
            .catch((error) => {
                console.error(error);
                console.log('====Fail====')
            })
    }

    async register(name, address) {

        await this.smartContract.methods.register(name).send({ from: address, gas: 3000000 })
            .then((data) => {
                console.log(data);
                console.log('====Created a transaction====')
            })
            .catch((error) => {
                console.error(error);
                console.log('====Fail====')
            });
    }
    async createProduct(productName, imageHash, address, description) {
        

        const productHash = this.web3.utils.sha3(imageHash);
        await this.smartContract.methods.createProduct(productHash, productName , imageHash, description).send({ from: address, gas: 3000000 })
            .then((data) => {
                console.log(data);
                console.log('====Created a transaction====')
            })
            .catch((error) => {
                console.error(error);
                console.log('====Fail====')
            });
    }

    async createValuation(imageHash,timeSet,address) {
        const productHash = this.web3.utils.sha3(imageHash);
        
        await this.smartContract.methods.createValuation(productHash, timeSet).send({ from: address, gas: 3000000 })
            .then((data) => {
                console.log(data);
                console.log('====Created a transaction====')
            })
            .catch((error) => {
                console.error(error);
                console.log('====Fail====')
            });
    }

    async addPrice(productHash, price, address) {
       
        await this.smartContract.methods.addPrice(productHash, price).send({ from: address, gas: 3000000 })
            .then((data) => {
                console.log(data);
                console.log('====Created a transaction====')
            })
            .catch((error) => {
                console.error(error);
                console.log('====Fail====')
            });
    }

    async calculateFinalPrice(productHash, address) {
        
        await this.smartContract.methods.caculateFinalPrice(productHash).send({ from: address, gas: 3000000 })
            .then((data) => {
                console.log(data);
                console.log('====Created a transaction====')
            })
            .catch((error) => {
                console.error(error);
                console.log('====Fail====')
            });
    }

    async closeValuation(productHash,address) {
        
        await this.smartContract.methods.closeValuation(productHash).send({ from: address, gas: 3000000 })
            .then((data) => {
                console.log(data);
                console.log('====Created a transaction====')
            })
            .catch((error) => {
                console.error(error);
                console.log('====Fail====')
            });
    }

    /**   Read into Blockchain  **/

    //hàm này k phải hàm call
    // async getCalculateFinalPrice (productHash) {
    //     const address = getAccount();
    //     return await this.smartContract.methods.caculateFinalPrice(productHash).call({from: address, gas: 3000000});
    // }

    async userInfo(address) {
        return await this.smartContract.methods.users(address).call();
    }

    async productInfo(productHash) {
        return await this.smartContract.methods.products(productHash).call();
    }

    async productCount() {
        return await this.smartContract.methods.productCount().call();
    }
    // lấy sản phẩm theo index vd 0 1 2 3
    async productArray(index) {
        return await this.smartContract.methods.productArray(index).call();
    }
    // lấy số lượng sản phẩm đang định giá
    async numberOfProductInValuation() {
        return await this.smartContract.methods.numberOfProductInValuation().call();
    }
    //lấy hash, name của sản phẩm đang định giá
    async getProdInValByID(index) {
        return await this.smartContract.methods.getProdInValByID(index).call();
    }
    //lấy name, price của người định giá theo index sp và index người định giá
    //VD prodIndex 0, valuatorIndex 0 : lấy người định giá đầu tiên của sản phẩm đầu đang định giá
    async getValuator(productHash, valuatorIndex) {
        return await this.smartContract.methods.getValuator(productHash, valuatorIndex).call();
    }

    async adminInfo() {
        return await this.smartContract.methods.administrator().call();
    }

    async isAdministrator(address) {
        return await this.smartContract.methods.isAdministrator(address).call();
    }

    async checkAdmin(address) {
        return await this.smartContract.methods.checkAdmin(address).call();
    }


}
module.exports = Web3Connection









