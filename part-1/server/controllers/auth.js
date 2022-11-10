const bcryptjs = require('bcryptjs')
const users = [
  {
    username: "Me",
    email: "emilyruleseverything@fake.com",
    firstName: "actually",
    lastName: "little",
    passwordHash: "$2a$10$rPc3UNWa2GF9xb1vp0dYw.xk2eENXVlISu1n6tO60OobUD0FhrMbm"
  }
]

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const auth = bcryptjs.compareSync(password, users[i].passwordHash)
          if(auth){
            let userCopy = {...users[i]}
            delete userCopy.passwordHash
            res.status(200).send(userCopy)
            return
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        const {username,email,firstName,lastName,password} = req.body
        let salt = bcryptjs.genSaltSync(10)
        let passwordHash = bcryptjs.hashSync(password,salt)
        console.log(passwordHash)
        let newUser = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }
        users.push(newUser)
        let userCopy = {...newUser}
        delete userCopy.passwordHash
        res.status(200).send(userCopy)
    }
}