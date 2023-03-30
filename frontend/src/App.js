import { lazy, Suspense, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { useAppContext } from './contexts/AppContext';

const AllForms = lazy(() => import('./pages/AllFormsPage'));
const CreateForm = lazy(() => import('./pages/CreateFormPage'));
const GetForm = lazy(() => import('./pages/GetFormPage'));
const EditForm = lazy(() => import('./pages/EditFormPage'));

function App() {
  const { setAllForms, setSingleForm } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:3001/api/getForms').then((response) => {
      setAllForms(response.data);
    });
    setSingleForm({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path='/' element={<AllForms />} />
          <Route exact path='/create-form' element={<CreateForm />} />
          <Route exact path='/get-form' element={<GetForm />} />
          <Route exact path='/edit-form/:id' element={<EditForm />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
