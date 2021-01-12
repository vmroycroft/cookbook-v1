import Category from '../Category';

function CategoryList({ categories }) {
	return categories.map((catagory, i) => <Category key={i} text={catagory} selected />);
}

export default CategoryList;
