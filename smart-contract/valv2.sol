//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Valuation {
    struct User {
        bool registered;
        string name;
        uint userDeviation;
        uint sessionJoined;
    }
    struct Product {
        bytes32 productHash;
        string description;
        string ipfs;
        bool exists;
        bool haveFinalPrice;
        bool inValuation;
        uint finalPrice;
        string name;
        uint evaluatorsCount;
        uint[] prices;
        address[] evaluators;
        uint timeEnd;
    }

    mapping(address => User) public users;
    mapping(bytes32 => Product) public products;


     // Mapping store data user
    mapping(address => bool) public hasPermissionToCreateProduct;

    // Modifier permission only admin
    modifier onlyAdmin() {
        require(msg.sender == administrator, "Only administrator can perform this action");
        _;
    }

    modifier onlyAdminOrAllowedUser() {
        require(msg.sender == administrator || hasPermissionToCreateProduct[msg.sender], "Permission denied");
        _;
    }

    // Grant permission
    function grantPermissionToCreateProduct(address user) public onlyAdmin {
        hasPermissionToCreateProduct[user] = true;
    }

    // Revoke permission
    function revokePermissionToCreateProduct(address user) public onlyAdmin {
        hasPermissionToCreateProduct[user] = false;
    }

    address public administrator;
    uint public productCount;
    uint public numberOfProductInValuation;
    mapping(uint => bytes32) public productArray;

    constructor() {
        administrator = msg.sender;
    }
    // Register account
    function register(string memory name) public {
        require(!users[msg.sender].registered, "User already registered");
        require(bytes(name).length > 0, "your name, pls"); //yêu cầu không để trống tên
        uint userDeviation = 0;
        uint sessionJoined = 0;
        users[msg.sender] = User(true, name, userDeviation, sessionJoined);
    }

    // Just admin and creator create product
    function createProduct(bytes32 productHash, string memory name, string memory ipfs, string memory description) public onlyAdminOrAllowedUser {
    //    require(msg.sender == administrator, "Only administrator can create product");
        require(!products[productHash].exists, "Product already exists");
        bool exists = true;
        bool haveFinalPrice = false;
        bool inValuation = false;
        uint finalPrice = 0;
        uint evaluatorsCount = 0;
        uint[] memory _prices;
        address[] memory _evaluators;
        products[productHash] = Product(productHash, description, ipfs, exists, haveFinalPrice, inValuation, finalPrice, name, evaluatorsCount,  _prices, _evaluators, 0);
        productArray[productCount] = productHash;
        productCount ++;
    }

    // Just admin and creator create valuation
    function createValuation(bytes32 productHash, uint timeSet) public onlyAdminOrAllowedUser {
    //    require(msg.sender == administrator, "Only administrator can create Valuation");
        require(products[productHash].exists, "Product does not exist");
        require(!products[productHash].inValuation, "Product still in valuation");
        products[productHash].inValuation = true;
        numberOfProductInValuation ++;
        if(timeSet != 0) {
            products[productHash].timeEnd = block.timestamp + timeSet;
        }
    }

    function addPrice(bytes32 productHash, uint price) public {
        require(users[msg.sender].registered, "User not registered");
        require(products[productHash].exists, "Product does not exist");
        require(products[productHash].inValuation, "Product must in valuation");
        require(block.timestamp < products[productHash].timeEnd || products[productHash].timeEnd == 0, "Valuation period has ended");
        bool check = false;
        for (uint j = 0; j < products[productHash].evaluatorsCount; j++){
            if(msg.sender == products[productHash].evaluators[j]){
                products[productHash].prices[j] = price;
                check = true;
                break;
            }         
        }
        if(!check) {
            products[productHash].evaluatorsCount ++;
            products[productHash].evaluators.push(msg.sender);
            products[productHash].prices.push(price);
            users[msg.sender].sessionJoined ++;
        }
    }

    function caculateFinalPrice(bytes32 productHash) public returns (uint finalPrice) {
        require(msg.sender == administrator, "Only administrator can caculate final price");
        require(products[productHash].exists, "Product does not exist");
        require(products[productHash].inValuation, "no valuation for this product");
        uint A = 0;
        uint B = 0;
        for (uint j = 0; j < products[productHash].evaluatorsCount; j++){
            A += products[productHash].prices[j] * (100 - users[products[productHash].evaluators[j]].userDeviation);
            B += users[products[productHash].evaluators[j]].userDeviation; 
        }
        products[productHash].finalPrice = (A) / (100 * products[productHash].evaluatorsCount - B);
        finalPrice = (A) / (100 * products[productHash].evaluatorsCount - B);
    }

    function newUserDeviation(bytes32 productHash) private {
        uint P = products[productHash].finalPrice;      
        for (uint j = 0; j < products[productHash].evaluatorsCount; j++){
            uint dNew;
            uint d;
            uint dCurrent = users[products[productHash].evaluators[j]].userDeviation;
            uint n = users[products[productHash].evaluators[j]].sessionJoined;
            if(products[productHash].prices[j] < P){
                dNew = P - products[productHash].prices[j];
            }
            else{
                dNew = products[productHash].prices[j] - P;
            }
            uint dNew1 = (dNew * 100) / P;
            d = (dCurrent * n + dNew1) / (n + 1);
            users[products[productHash].evaluators[j]].userDeviation = d;
        }
    }

    // Just admin
    function closeValuation(bytes32 productHash) public {
        require(msg.sender == administrator, "Only administrator can close valuation!");
        require(products[productHash].exists, "Product does not exist!");
        require(products[productHash].inValuation, "no valuation for this product!");
        // thêm yêu cầu tính giá cuối cùng trước khi đóng phiên
        require(products[productHash].finalPrice != 0, "Pls caculate finalPrice before close the valuation!");
        newUserDeviation(productHash);
        products[productHash].inValuation = false;
        numberOfProductInValuation --;
    }
    
    // check admin and createtor.
    function isAdministrator(address account) public view returns (bool) {
        return account == administrator || hasPermissionToCreateProduct[account];
    }

    //check admin
    function checkAdmin(address account) public view returns (bool) {
        return account == administrator;
    }

    function getProdInValByID(uint id) public view returns (bytes32 _hash){
        require(numberOfProductInValuation > 0, "No product in valuation");
        uint temp = 0;
        for(uint j = 0; j < productCount; j++){
            if (products[productArray[j]].inValuation) {
                if (temp == id) {
                    _hash = productArray[j];
                    //_name = products[productArray[j]].name;
                } 
                temp++;
            }
        }
    }

    function getValuator(bytes32 productHash, uint id) public view returns (string memory _name, uint _price, address _address) {
        // require(numberOfProductInValuation > 0, "No product in valuation");
        require(products[productHash].evaluatorsCount > id, "No evaluation with that id");
        _name = users[products[productHash].evaluators[id]].name;
        _price = products[productHash].prices[id];
        _address = products[productHash].evaluators[id];
    }
}