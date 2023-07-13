import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = () => {
  const categories = [
    {
      id: 1,
      title: 'hats',
      imageUrl: 'https://media.istockphoto.com/id/858160872/photo/hipster-handsome-male-model-with-beard-wearing-black-blank-baseball-cap-with-space-for-your.jpg?s=170667a&w=0&k=20&c=AusbQO470A6Zx0pNhnaCxIBJsJWMwjs4GL297IIK1Ew=',
    },
    {
      id: 2,
      title: 'jackets',
      imageUrl: 'https://i.insider.com/639cdc7c0675db0018b34754?width=1000&format=jpeg&auto=webp',
    },
    {
      id: 3,
      title: 'sneakers',
      imageUrl: 'https://rukminim1.flixcart.com/image/832/832/kzn17680/shoe/q/w/7/6-sv-045-290-multicolor-6-shoesvilla-multicolor-original-imagbhnb32fzwszz.jpeg?q=70',
    },
    {
      id: 4,
      title: 'womens',
      imageUrl: 'https://img.freepik.com/free-photo/young-woman-with-long-straight-hair-studio-portrait-attractive-brunette-girl-fashion-model-wears-black-shirt-anf-jeans-sexy-female-model_186202-7462.jpg?w=2000',
    },
    {
      id: 5,
      title: 'mens',
      imageUrl: 'https://www.michellehaymanagement.com/wp-content/uploads/2020/10/007-26.jpg',
    },
  ];

  return (
    <div>
      <Directory categories={categories} />
      <Outlet />
    </div>
  );
};

export default Home;
