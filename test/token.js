const {expect} = require("chai");

describe("Token Contract" , function(){
    let Token;
    let hardHatToken;
    let owner;
    let add1;
    let add2;
    let addrs;

    beforeEach(async function(){
        Token = await ethers.getContractFactory("Token");    
        [owner , add1 , add2 , ...addrs] =await ethers.getSigners();
        hardHatToken = await Token.deploy();

    })


    describe("Deployment" ,  function(){
            it("Should set the right owner" , async function(){
                expect (await hardHatToken.owner()).to.equal(owner.address);
            })
            it("Should supply total supply to owner" , async function(){
                const ownerBalance = await hardHatToken.balanceOf(owner.address);
                expect (await hardHatToken.totalSupply()).to.equal(ownerBalance);


            })
    })


    describe("Transactions" , function(){
        it("Should transfer tokens between accounts" , async function(){
            await hardHatToken.transfer(add1.address , 5);
            const add1Balance = await hardHatToken.balanceOf(add1.address);
            expect(add1Balance).to.equal(5);


            await hardHatToken.connect(add1).transfer(add2.address , 3);
            const add2Balance = await hardHatToken.balanceOf(add2.address);
            expect(add2Balance).to.equal(3);
        })


        it("Should fail is sender does not have enough sender" , async function(){
const initialOwnerBalance = await hardHatToken.balanceOf(owner.address);
await expect(hardHatToken.connect(add1).transfer(owner.address,1)).to.be.revertedWith("Not Enough Tokens");
expect(await hardHatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        })


        it("Should Balances After transaction" , async function(){
            const initialOwnerBalance = await hardHatToken.balanceOf(owner.address);
            
            await hardHatToken.transfer(add1.address ,2);
            await hardHatToken.transfer(add2.address ,2);

            const balanceOfOwner = await hardHatToken.balanceOf(owner.address);
            expect(balanceOfOwner).to.equal(initialOwnerBalance-4);
            const add1Balance = await hardHatToken.balanceOf(add1.address);
            expect(add1Balance).to.equal(2);
            const add2Balance = await hardHatToken.balanceOf(add2.address);
            expect(add2Balance).to.equal(2);

        })

    })
})




















// describe("Token contract",function(){
//     it("Deployment should assign total Supply of tokens to the owner" , async function(){
//         const [owner] = await ethers.getSigners();     // Represents  the accounts
//         console.log("Signers Object : " , owner);
//         const Token = await ethers.getContractFactory("Token");     // creates an instance of the token
//         const hardHatToekn = await Token.deploy();      //Deploying the contract

//         const ownerBalance  = await hardHatToekn.balanceOf(owner.address);    //Calling the balance of function from the contract
//         console.log("Owner Balance" , ownerBalance);
//         console.log("Owner Address : " , owner.address);


//         expect(await hardHatToekn.totalSupply()).to.equal(ownerBalance);        //check whether the valance of owner is equal to the total Supply


//     })

//     it("Should transfer token between accounts" , async function(){
//         const [owner , address1 , address2] = await ethers.getSigners();     // Represents  the accounts
//         const Token = await ethers.getContractFactory("Token");     // creates an instance of the token
//         const hardHatToekn = await Token.deploy();      //Deploying the contract

//        //Transfer 10 tokens from owner to address1
//        await hardHatToekn.transfer(address1.address  ,10);
//        expect(await hardHatToekn.balanceOf(address1.address)).to.equal(10);

//        //Transfet 5 tokens from adddress1 to adderess2
//        await hardHatToekn.connect(address1).transfer(address2.address , 5);
//        expect(await hardHatToekn.balanceOf(address2.address)).to.equal(5);

//     })
// })