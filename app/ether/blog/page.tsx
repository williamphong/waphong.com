import React from 'react';
import styles from './blogPage.module.css';
import CardList from '@/components/blog/cardList/CardList';
import Menu from '@/components/blog/menu/Menu';
import PropTypes from 'prop-types';

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat} Blog</h1>
      <div className={styles.content}>
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

BlogPage.propTypes = {
  searchParams: PropTypes.shape({
    page: PropTypes.string, // or PropTypes.number depending on the type you expect
    cat: PropTypes.string,
  }).isRequired,
};

export default BlogPage;
