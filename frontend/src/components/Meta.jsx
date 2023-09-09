/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-asycn';

const Meta = ({ title, desc, keywords }) => {
  return (
    <Helmet>
      <title>{ title }</title>
      <meta name='description' content={desc} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
};

Meta.defaultProps = {
  title: 'Welcome To LoShop',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electroincs',
}

export default Meta;
