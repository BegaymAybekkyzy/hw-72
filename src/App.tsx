import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Dishes from './Containers/Admin/Dishes/Dishes.tsx';
import Orders from './Containers/Admin/Orders/Orders.tsx';
import AddNewDish from './Containers/Admin/AddNewDish/AddNewDish.tsx';
import Home from './Containers/Client/Home/Home.tsx';
import EditDish from './Containers/EditDish/EditDish.tsx';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/admin" element={<Dishes/>}/>
        <Route path="/admin/dishes" element={<Dishes/>}/>
        <Route path="/admin/dishes/add-new-dish" element={<AddNewDish/>}/>
        <Route path="/admin/dishes/edit-dish" element={<EditDish/>}/>
        <Route path="/admin/orders" element={<Orders/>}/>
        <Route path="*" element={<h1 className="text-center">Not found</h1>}/>
      </Routes>
    </Layout>
  );
};

export default App;
