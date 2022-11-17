import { Button, Modal } from '@mantine/core';
import { useState } from 'react';
import CategoryDetailComponent from './CategoryDetailComponent';

const AddCategoryComponent = () => {
  const [inAdd, setInAdd] = useState(false);

  return (
    <>
      <div className='my-5 text-end'>
        <Button onClick={() => setInAdd(true)}>Add category</Button>
      </div>
      {inAdd && (
        <Modal
          opened={inAdd}
          size={'auto'}
          centered
          onClose={() => setInAdd(false)}
          closeOnClickOutside={false}
        >
          <CategoryDetailComponent onEdit={() => setInAdd(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddCategoryComponent;
