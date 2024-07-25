
import { useEffect, useState } from "react";
import "./index.css";

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    //Custom variable to show loader during the product loading
    //Otherwise we can use Suspence/Fallback as well
    const [loader, setLoader] = useState(false);

    const fetchDataFromApi = async () => {
        try{
            setLoader(true);
            const url = "https://dummyjson.com/products";
            const response = await fetch(url);
            const json = await response.json();
            setProducts(json.products);
        }catch{
            console.log("Something went wrong");
        }finally{
            setLoader(false);
        }
    }

    useEffect(()=>{
        //Fetch the data on component mount
        fetchDataFromApi();
    },[])


    return(loader ? <div className="loading-div">Loading...</div> :
    <table width="100%" className="products-table">
        <thead>
            <tr>
                <td>Product Name</td>
                <td>Product description</td>
                <td>Product thumbnail</td>
            </tr>
        </thead>
        <tbody>
        {products?.map((product)=>{
            return(
                <tr>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td><img src={product.thumbnail}></img></td>
                </tr>
            )
        })}
    </tbody>
    </table>)
}
export default ProductsTable;