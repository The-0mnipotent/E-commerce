// Functional Component for the Products List
// Imports
import { useState } from "react";
import { useSelector } from "react-redux";
import { productsState } from "../../Redux/Reducers/productReducer";
import Product from "../Product Card/ProductCard";
import styles from "./ProductsList.module.css";

export default function ProductsList() {
  // States
  const { sortPrice, products, sortedProducts } = useSelector(productsState);

  // Pagination current page
  const [currentPage, setCurrentPage] = useState(1);
  // Total items per page
  const itemsPerPage = 4;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  // Total products
  const currentProducts = sortPrice
    ? sortedProducts.slice(firstItemIndex, lastItemIndex)
    : products.slice(firstItemIndex, lastItemIndex);

  // Total pages
  const totalPages = Math.ceil(
    (sortPrice ? sortedProducts.length : products.length) / itemsPerPage
  );

  // Function to change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Returning JSX
  return (
    <>
      {/* Products list container rendring products based on if sorted price true then sorted products passed else normal products passed */}
      <div className={styles.productsListContainer}>
        {/* Pagination buttons */}
        <div className={styles.pagination}>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        {/* Mapping each product to the product card here */}
        {currentProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
