import Eos from 'eosjs'
// Let's make it easy to grab these DOM elements.
let title = document.getElementById("Title")
let vid = document.getElementById("vid")
let button = document.getElementById("secretButton")

document.addEventListener('scatterLoaded', scatterExtension => {
  scatter = window.scatter
  // uncomment following in actual projects
  // window.scatter = null

  // If the scatterLoaded event is detected, we change the messaging as follows
  title.innerHTML = "Scatter found! Maybe we do have EOS stuff"
  vid.src = "https://media.giphy.com/media/DfdbTJZx6Yjra/giphy.mp4"
  button.removeAttribute("hidden")
  button.addEventListener("click", function(){
    getIdentity()
  })

  const network = {
    blockchain:'eos',
    host:'159.65.161.242',
    port:8888
  }

  const eosOptions = {}

  const eos = scatter.eos( network, Eos.Localnet, eosOptions )

  let getIdentity = () => {
    scatter.getIdentity().then(identity => {
      console.log(identity, "identityFound")
      // do not assign to window in actual projects... only for learning.
      window.identity = identity
      // User "Accept" action
      title.innerHTML = "Welcome to all the EOS goodies " + identity.name
      vid.src = "https://media.giphy.com/media/lxcz7ntpCKJfq/giphy.mp4"
      button.setAttribute("hidden", "")
    }).catch(error => {
      console.log(error, "identityCrisis!")
      // User "Deny" action
      title.innerHTML = "Oh so close... maybe next time"
      vid.src = "https://media.giphy.com/media/2sfHfGhM3zKUzZ5xzh/giphy.mp4"
      button.setAttribute("hidden", "")
    })
  }
})
