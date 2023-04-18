import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { LoadingSpinner } from './components/ui/LoadingSpinner/LoadingSpinner';
import { useAppContext } from './contexts/AppContext';
import ApiService from './api/services/ApiService';

const AllForms = lazy(() => import('./pages/AllFormsPage'));
const CreateForm = lazy(() => import('./pages/CreateFormPage'));
const GetForm = lazy(() => import('./pages/GetFormPage'));
const EditForm = lazy(() => import('./pages/EditFormPage'));

function App() {
  const { setAllForms, setSingleForm } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    const fetchAllForms = async () => {
      const formsData = await ApiService.forms.getAllForms();
      setAllForms(formsData);
      setSingleForm({});
    };

    fetchAllForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
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
