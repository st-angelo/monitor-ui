import { Category } from '../../models/common';

interface CategoryComponentProps {
  data: Category;
}

const CategoryComponent = ({ data }: CategoryComponentProps) => {
  return <span>{data.name}</span>;
};

export default CategoryComponent;
