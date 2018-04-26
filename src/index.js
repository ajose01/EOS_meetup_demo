import Eos from 'eosjs'

document.addEventListener('scatterLoaded', scatterExtension => {
    // Scatter will now be available from the window scope.
    // At this stage the connection to Scatter from the application is·
    // already encrypted.·
    const scatter = window.scatter;
    console.log(scatter, "scatter")
    // It is good practice to take this off the window once you have·
    // a reference to it.
    window.scatter = null;
    const eosjs = Eos.Localnet({httpEndpoint:'http://159.65.161.242:8888'})
    window.eosjs = eosjs

    // If you want to require a specific version of Scatter
    scatter.requireVersion(3.0);

    // Set up the network and options you want to use eosjs and Scatter with.·
    const network = { host:"159.65.161.242", port:8888 }
    console.log(network, "network")
    const eosOptions = {}

    //const tempEos = Eos.Localnet({httpEndpoint: 'http://169.99.104.110:888'})
    const tempEos = Eos.Localnet
    console.log(tempEos, "tempEos")

    // Get a reference to an 'Eos.LocalNet' with a Scatter signature provider.
    const eos = scatter.eos( Eos.Localnet, network, eosOptions )
    window.eos = eos
    console.log(eos, "EOS")

  console.log(scatter.identity, "id1")

  scatter.getIdentity(['account']).then(identity => {
    console.log(identity, "identity")
    window.identity = identity
  }).catch(error => {
    console.log(error, "identityError")
  });

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

  eosjs.contract('eosio.token').then(contract => {
    window.contract = contract
      console.log(contract)
  }).catch(error => {
    console.log(error)
  })
})
