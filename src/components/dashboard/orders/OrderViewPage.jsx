import React, {useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import {delete_shop_products, fetch_shop_product} from "../../../../services/shops/products";

const OrderViewPage = (props) => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [hasProductData, setHasProductData] = useState(false)
    const [productData, setProductData] = useState({})
    const [shouldRedirectToIndex, setShouldRedirectToIndex] = useState(false)

    const handleDeleteProduct = () => {
        delete_shop_products([id]).then((res) => {
            setShouldRedirectToIndex(res.status === "ok")
        })
    }

    useEffect(() => {
        if (isLoading) {
            fetch_shop_product(id).then((response) => {
                let productData = response.data ? response.data : {}
                setHasProductData(response.status === "ok")
                setProductData(productData)
                setIsLoading(false)
            })
        }
    }, [])

    if (shouldRedirectToIndex) {
        return <Navigate to={"/admin/products/list"}/>
    }

    let content = ""
    if (isLoading) {
        content = <div>
            <h3>Loading Product Info</h3>
        </div>
    } else if (!hasProductData) {
        content = <div>
            <h3>No Such Product</h3>
        </div>
    } else {
        content = <div>
            <button className={"btn btn-danger"} onClick={handleDeleteProduct}>Delete</button>
            <Link to={"/admin/products/edit/" + id}>
                <button className={"btn btn-info"}>Edit</button>
            </Link>
            <div>
                <div>Product Name</div>
                <div>{productData.name}</div>
            </div>
        </div>
    }

    return <section className={"p-2"}>
        {content}
    </section>
}

export default OrderViewPage;