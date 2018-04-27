import Eos from 'eosjs'
let divId = document.getElementById("Title")
let scatter;

document.addEventListener('scatterLoaded', scatterExtension => {
  divId.innerHTML = "SCATTER IS HERE.... Maybe we do have EOS Stuff" 

  scatter = window.scatter;
  document.getElementById("secretButton").addEventListener("click", function(){
    getIdentity(scatter) 
  })
  console.log(scatter, "scatter")
  // It is good practice to take this off the window once you have·
  // a reference to it.
  window.scatter = null

  const eosjs = Eos.Localnet({httpEndpoint:'http://159.65.161.242:8888'})
  window.eosjs = eosjs

  // If you want to require a specific version of Scatter
  scatter.requireVersion(3.0);

  // Set up the network and options you want to use eosjs and Scatter with.·
  const network = { host:"159.65.161.242", port:8888 }
  console.log(network, "network")
  const eosOptions = {}

  // Get a reference to an 'Eos.LocalNet' with a Scatter signature provider.
  const eos = scatter.eos( Eos.Localnet, network, eosOptions )
  window.eos = eos
  console.log(eos, "EOS")

  console.log(scatter.identity, "id1")

  console.log(scatter.identity, "id2")
  let name = scatter.identity.account.name
  eos.getAccount(name).then(acc => {
    console.log(acc)
    window.account = acc
  }).catch(error => {
    console.log(error)
  })

  eosjs.getAccount(name).then(acc => {
    console.log(acc)
    window.eosjsaccount = acc
  }).catch(error => {
    console.log(error)
  })
})

let getEosBalance = (account) => {
  eosjs.getTableRows({
    scope: "aihgh",
    code: "eosio.token",
    table: "accounts",
    json: true})
    .then((x) => {
      console.log(x)
    })
    .catch((e) => 
      console.log(e)
    )
}

let getIdentity = (_scatter) => {
  _scatter.getIdentity(['account']).then(identity => {
    window.identity = identity
    divId.innerHTML = "ALL the EOS goodies are yours!"
  }).catch(error => {
    console.log(error, "identityError")
    divId.innerHTML = "Ok... soooo close... no EOS for you"
  });
}

window.getEosBalance = getEosBalance
