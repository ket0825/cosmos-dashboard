/**
 * ProductPage.tsx
 * Stat of the each Product.
 * Query: get product by ...
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { useTheme } from '@mui/material/styles';


const ProductPage: React.FC = () => {    
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const theme = useTheme();
    const appBarHeight = theme.mixins.toolbar.minHeight;

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'        
        });
        console.log(event)
    };



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await axios.get('https://fakestoreapi.com/products')
                /**
                 * 이후 진짜 api와 연동하기
                 */
                setProducts(response.data)
                console.log(response.data.length)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    throw error;
                }

            }
        }
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <>
            <div style={{marginTop: appBarHeight}}/>
            <h3>ProductPage</h3>
            {currentProducts.map((product: ProductType) => {
                return (
                    <div key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <img src={product.image} alt={product.title} />
                    </div>
                );
            })}
            <Pagination 
                count={Math.ceil(products.length / productsPerPage)} 
                page={currentPage} 
                onChange={handlePageChange} 
            />
        </>
    )
}



export default ProductPage;