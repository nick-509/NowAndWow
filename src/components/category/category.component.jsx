import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import { CategoriesContext } from "../context/categories.context";

import { CategoryContainer } from "./category.styles";

const Category = () => {
  const { category } = useParams();
  const { categories } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <Fragment>
      <h2 className='title'>{category.toUpperCase()}</h2>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
