import React, { useEffect, useState } from "react";
import styles from "../../styles/Category.module.css";
import Products from "../Products/Products";
import Footer from "../Footer/Footer";

const ProductForm = () => {
  const defaultValues = {
    title: "",
    price_max: "",
    price_min: "",
    sortBy: "",
  };

  const defaultParams = {
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  const [data, setData] = useState([]);
  const [isEnd, setEnd] = useState(false);
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductData(params);
  }, [params]);

  const fetchProductData = async (params) => {
    setIsLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`http://localhost:5000/api/products?${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const products = await response.json();
      setData(products);
      setIsSuccess(true);
      if (products.length < params.limit) {
        setEnd(true);
      }
    } catch (err) {
      setError(err.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    
    setValues({ ...values, [name]: value });
    if (name === "sortBy") {
      setParams({ ...params, sortBy: value, offset: 0 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([]);
    setEnd(false);
    setParams({ ...defaultParams, ...values, offset: 0 });
  };

  const handleReset = () => {
    setValues(defaultValues);
    setParams(defaultParams);
    setEnd(false);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setItems((prevItems) => [...prevItems, ...data]);
    }
  }, [data]);

  const applyFilters = (items) => {
    let filteredItems = items;

    if (values.title) {
      filteredItems = filteredItems.filter((item) =>
        item.title.toLowerCase().includes(values.title.toLowerCase())
      );
    }

    if (values.price_min) {
      filteredItems = filteredItems.filter(
        (item) => item.price >= parseFloat(values.price_min)
      );
    }

    if (values.price_max) {
      filteredItems = filteredItems.filter(
        (item) => item.price <= parseFloat(values.price_max)
      );
    }

    return filteredItems;
  };

  const sortItems = (items) => {
    if (values.sortBy === "asc") {
      return items.slice().sort((a, b) => a.price - b.price);
    } else if (values.sortBy === "desc") {
      return items.slice().sort((a, b) => b.price - a.price);
    }
    return items;
  };

  const filteredItems = applyFilters(items);
  const sortedItems = sortItems(filteredItems);

  return (
    <>
      <section className={styles.wrapper}>
        <h2 className={styles.title}>All Cars</h2>

        <form className={styles.filters} onSubmit={handleSubmit}>
          <>
            <div className={styles.filter}>
              <input
                type="text"
                name="title"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={handleChange}
                placeholder="Car name"
                value={values.title}
              />
            </div>
            <div className={styles.filter}>
              <input
                type="number"
                name="price_min"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={handleChange}
                placeholder="0"
                value={values.price_min}
              />
              <span>Price from</span>
            </div>
            <div className={styles.filter}>
              <input
                type="number"
                name="price_max"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={handleChange}
                placeholder="0"
                value={values.price_max}
              />
              <span>Price to</span>
            </div>
            <div className={styles.filter}>
              <select name="sortBy" onChange={handleChange} value={values.sortBy}>
                <option value="">Sort by</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </>

          <button type="submit" hidden />
        </form>

        {isLoading ? (
          <div className="preloader">Loading...</div>
        ) : !isSuccess || !sortedItems.length ? (
          <div className={styles.back}>
            <button onClick={handleReset}>Reset</button>
            <span>No results</span>
          </div>
        ) : (
          <Products
            title=""
            products={sortedItems}
            style={{ padding: 0 }}
            amount={sortedItems.length}
          />
        )}

        {!isEnd && (
          <div className={styles.more}>
            <button
              onClick={() =>
                setParams((prevParams) => ({
                  ...prevParams,
                  offset: prevParams.offset + prevParams.limit,
                }))
              }
            >
              See more
            </button>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default ProductForm;
