import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetProductsQuery } from "../../features/api/apiSlice";

import styles from "../../styles/Category.module.css";

import Products from "../Products/Products";

const Category = () => {
  const { _id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  const defaultValues = {
    title: "",
    price_max: "",
    price_min: "",
    sortBy: "",
  };

  const defaultParams = {
    categoryId: _id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  const [isEnd, setEnd] = useState(false);
  const [cat, setCat] = useState(null);
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);

  const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

  useEffect(() => {
    if (!_id) return;

    setValues(defaultValues);
    setItems([]);
    setEnd(false);
    setParams({ ...defaultParams, categoryId: _id });
  }, [_id]);

  useEffect(() => {
    if (isLoading) return;

    if (!data.length) return setEnd(true);

    // Фильтрация только новых элементов
    const newData = data.filter(
      (newItem) => !items.some((item) => item._id === newItem._id)
    );

    setItems((prevItems) => [...prevItems, ...newData]);
  }, [data, isLoading]);

  useEffect(() => {
    if (!_id || !list.length) return;

    const category = list.find((item) => item._id === _id);
    setCat(category);
  }, [list, _id]);

  const handleChange = ({ target: { value, name } }) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setItems([]);
    setEnd(false);
    setParams({ ...defaultParams, ...values });
  };

  const handleReset = () => {
    setValues(defaultValues);
    setParams({ ...defaultParams, categoryId: _id });
    setEnd(false);
  };

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
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            placeholder="Car name"
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            placeholder="0"
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
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
  );
};

export default Category;
