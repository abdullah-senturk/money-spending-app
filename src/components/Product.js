import React from "react";
import {moneyFormat} from "../helpers";

function Product({ product, total, money, basket, setBasket }){ // props'lar eklendi.

    const basketItem = basket.find(item => item.id === product.id)

    const addBasket = () => {
        const checkBasket = basket.find(item => item.id === product.id)

        if(checkBasket){  // ürün daha önce eklenmiş demektir.
            checkBasket.amount += 1
            setBasket([...basket.filter(item => item.id !== product.id), checkBasket]) // bu filter sayesinde aynı olmayanlar gösterilir.
        }else{ // ürün daha önce eklenmemiş demektir.
            setBasket([...basket, {
                id: product.id,
                amount: 1
            }])
        }
    }

    const removeBasket = () => {
        const currentBasket = basket.find(item => item.id === product.id)
        const basketWithoutCurrent = basket.filter(item => item.id !== product.id) // aynı ifadenin tekrar tekrar yazılmaması için yazıldı.

        currentBasket.amount -= 1

        if(currentBasket.amount === 0){
            setBasket([...basketWithoutCurrent])
        }else{
            setBasket([...basket.filter(item => item.id !== product.id), currentBasket]) // bu filter sayesinde aynı olmayanlar gösterilir.       
        }
    }

    return(
        <>
            <div className="product">
                <img src={product.image} alt="product image" />
                <h6>{product.title}</h6>
                <div className="price">$ {moneyFormat( product.price )}</div>
                <div className="actions">
                    <button className="sell-button" disabled={!basketItem} onClick={removeBasket}>Sat</button>
                    <span className="amount">{basketItem && basketItem.amount || 0}</span>
                    <button className="buy-button" disabled={total + product.price > money} onClick={addBasket}>Satın Al</button>
                </div>
            </div> 

            <style jsx="true">{`
                .product{
                    padding: 15px;
                    background: #fff;
                    border: 1px solid #ddd;
                    margin-bottom: 20px;
                }
                
                @media only screen and (min-width:1200px){
                    .product{
                        width: 24%; 
                    }
                }
                @media only screen and (min-width:992px) and (max-width:1199px){
                    .product{
                        width: 24%; 
                    }
                }
                @media only screen and (min-width:768px) and (max-width:991px){
                    .product{
                        width: 48%; 
                    }
                }
                @media only screen and (min-width:576px) and (max-width:767px){
                    .product{
                        width: 98%; 
                    }
                }
                @media only screen and (max-width:575px){
                    .product{
                        width: 98%; 
                    }
                }
                
                .product img{
                    /* width: 100%; */ 
                    width: 200px;
                    height: 200px;
                    
                }
                .product h6{
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                .product .price{
                    font-size: 20px;
                    color: #35b602;
                }
                .product .actions{
                    display: flex;
                    align-items: center;
                    margin-top: 15px;
                }
                .actions button{
                    height: 40px;
                    padding: 0 15px;
                    margin: 0 10px;
                    flex: 1;
                    cursor: pointer;
                }
                .actions button[disabled]{
                    opacity: .3;
                    cursor: not-allowed;
                }
                .actions .sell-button{
                    background-color: #ccc;
                    color: #333;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 4px 0 0 4px;
                }
                .actions .buy-button{
                    background-color: #61dafb;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 0 4px 4px 0;
                }
                .actions amount{
                    width: 50px;
                    height: 40px;
                    text-align: center;
                    border: 1px solid #ddd;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 17px;
                    font-weight: bold;
                    color: #555;
                }
            `}</style>
           
        </>
    )
}

export default Product;