import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductTable } from './components/ProductTable/ProductTable';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(categ => (
    categ.id === product.categoryId))
    || null;
  const user = (usersFromServer.find(u => u.id === category.ownerId)
    || null);

  return {
    ...product,
    category,
    user,
  };
});

function getProductsFiltered(productS, filter, query) {
  let filteredProducts = [...productS];
  const normalizedQuery = query.trim().toLowerCase();

  if (query) {
    filteredProducts = filteredProducts
      .filter(product => product.name.toLowerCase().includes(normalizedQuery));
  }

  if (filter !== 'All') {
    filteredProducts = filteredProducts
      .filter(product => product.user.name === filter);
  }

  return filteredProducts;
}

export const App = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const visibleProducts = getProductsFiltered(
    products,
    filter,
    query,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                className={classNames({ 'is-active': filter === 'All' })}
                data-cy="FilterAllUsers"
                href="#/"
                onClick={() => setFilter('All')}
              >
                All
              </a>

              <a
                className={classNames({ 'is-active': filter === 'Roma' })}
                data-cy="FilterUser"
                href="#/"
                onClick={() => setFilter('Roma')}
              >
                Roma
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={classNames({ 'is-active': filter === 'Anna' })}
                onClick={() => setFilter('Anna')}
              >
                Anna
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={classNames({ 'is-active': filter === 'Max' })}
                onClick={() => setFilter('Max')}
              >
                Max
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={classNames({ 'is-active': filter === 'John' })}
                onClick={() => setFilter('John')}
              >
                John
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    onClick={() => setQuery('')}
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length === 0
            ? (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
            : (<ProductTable visibleProducts={visibleProducts} />)
          }
        </div>
      </div>
    </div>
  );
};
