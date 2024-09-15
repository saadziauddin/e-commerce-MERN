const { mongoose } = require('mongoose');

// const uri = "mongodb://127.0.0.1/shop";
const uri = "mongodb+srv://saad:sa321@cluster0.qlx9j.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri);

// Schema 
const productSchema = new mongoose.Schema({
    name: String,
    company: String,
    price: Number,
    colors: [String],
    image: String,
    category: String,
    isFeatured: Boolean
})

// Model
const Product = mongoose.model("Product", productSchema); // Make sure ke "Product" --jo ke collection name hoga db mn jaa ke hamesha singular likhna hoga

const document1 = {
    name: "saad's car",
    company: '64c23350e32f4a51b19b923a',
    price: 12345678,
    colors: ['#000000', '#cc6600', '#663300'],
    image: '/images/product-diamond-ring.png',
    category: '64c2342de32f4a51b19b9259',
    isFeatured: false
}

const main = async () => {
    try {
        //Find the document
        // const findData = await Product.find({ price: {$eq: 12345678}});
        // console.log(findData);
        
        // Insert document
        await Product.insertMany(document1);
        const findInsertedData = await Product.find({ price: {$eq: 12345678}});
        console.log(findInsertedData);

        // Update
        // await Product.findOneAndUpdate({name: "saad's car", price: 12345678}, {$set: {price: 5678, name: "My Cars"}});
        // const findData = await Product.find({ price: {$eq: 5678}});
        // console.log(findData);

        // Delete
        // await Product.findOneAndDelete({name: "Diamond Ring", price: {$eq: 1999}});
        // const findData = await Product.find({ price: {$eq: 1999}});
        // console.log(findData);
    } catch (error) {
        console.log("Error: ", error);        
    } finally {
        mongoose.connection.close();
    }
}

main();

