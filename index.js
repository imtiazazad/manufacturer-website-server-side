const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3xs4dcj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const productCollection = client.db('best_electric-tools').collection('purchase')

async function run(){
  try{
    await client.connect();
    console.log('connect');

    app.get('/allProducts', async(req,res)=>{
      const products = await productCollection.find({}).toArray()
      res.send(products)
    })

    app.get('/singleProduct', async(req,res)=>{
      const id = req.query.id;
      const filter = {_id: ObjectId(id)}
      const singleProduct =await productCollection.findOne(filter)
      res.send(singleProduct)

    })

  }
  finally{


  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello tools user')
})

app.listen(port, () => {
  console.log(`electric app listening on port ${port}`)
})