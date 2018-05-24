import React from 'react';

import Link          from '../../components/Link/index';
import Layout        from '../../components/PageLayout';
import { connect }   from 'react-redux';
import { fetchPage } from '../../../store/actions/pages.actions';
import ProductCard   from '../../components/ProductCard';
import withI18next   from '../../lib/withI18next';



class Products extends React.Component {
  static async getInitialProps(props)  {
    const store = props.store;
    const page = await store.dispatch(fetchPage('products', false));
    return { page };
  }

  componentWillMount() {
  //  console.log('WILL MOUNT', this.props.i18n.language);
  }


  render() {
    const page = this.props.page || {};
    return (
      <Layout>
        <div className="products-page">
          <h2>{this.props.t('products:page_title')}</h2>
          <ul>
            {
              page.products !== undefined &&
              page.products.map((product, key) => (
                <li key={key}>
                  <Link to="/product/:id" query={product}>
                    <ProductCard productId={product}/>
                  </Link>
                </li>
              ))
            }

          </ul>
          <Link to="/products/promotions">Promotions</Link>
        </div>
      </Layout>
    );
  }
}


export default withI18next(['products'])(connect()(Products));