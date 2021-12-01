import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Product from './components/Product';
import products from './products.json';
import Basket from './components/Basket';

function App() {

  const [money, setMoney] = useState(1000);
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);

  const resetBasket = () => {
    setBasket([]);
  }

  useEffect(() => { // basket dizisinin içerisindeki her değişiklikte total'i set eder, yani günceller.
    setTotal(
      basket.reduce((acc, item) => {
        return acc + (item.amount * (products.find(product => product.id === item.id).price)) // find metodu tek bir değer döndürür.
      }, 0) // reduce metodunda acc'nin başlangıç değeri 0'dır. item, basket dizisi içerisinde döner.
    )
  }, [basket]);

  return (
    <>
      <Header total={total} money={money} />
      
      <div className="products">
        {
          products.map(product => (
            <Product key={product.id} total={total} money={money} basket={basket} setBasket={setBasket} product={product} />
          ))
        }
      </div>

      {total > 0 && ( // total 0'dan büyükse Basket component'ini göster.
        <Basket resetBasket={resetBasket} products={products} basket={basket} total={total} />
      )}

    </>
  );
}

export default App;
