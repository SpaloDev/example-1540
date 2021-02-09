
// spalo maker webhook refer json example

const bcrypt = require('bcryptjs')
const fs = require('fs')

exports.webhook_refer_json = (req, res) => {

  if (req.body.webhookKey) {

    // check by webhookKey
    const webhookKey = '85126C79CBF9FE36BB9D05D0639C70C235C18D37'
    if(req.body.webhookKey === webhookKey){

      let result = []

      const item_name = req.body.item_name

      let filename = "sample.json"

      async function main() {

        const file = fs.readFileSync(filename)
        const list = JSON.parse(file)

        if (item_name === "部署"){

          result = list[item_name]

        } else if (item_name === "担当者"){

          if(req.body.data.length){

            const division = req.body.data.find(item => item.title === '部署')
            
            if(division){

              if(list[item_name][division.value]){
                result = list[item_name][division.value]
              }

            }

          }else{

            result = Object.keys(list[item_name])

          }

        }

        if(Array.isArray(result)){

          res.setHeader("Content-Type", "application/json")
          res.send(result)

        }else{

          res.status(400).send("Could not get data")

        }

      }

      main()

    } else {

      res.status(401).send("Unauthorized")

    }

  } else {

    res.send("OK")

  }

}



