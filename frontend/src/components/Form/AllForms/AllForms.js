import { useEffect } from 'react';
import axios from 'axios';
import { Header } from '../../ui/Header/Header';
import { FormItem } from '../FormItem/FormItem';
import { useAppContext } from '../../../contexts/AppContext';

export const AllForms = () => {
  const { allForms, setAllForms, setSingleForm } = useAppContext();

  useEffect(() => {
    axios.get('http://localhost:3001/api/getForms').then((response) => {
      setAllForms(response.data);
    });
    setSingleForm({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Header
        title={'All Forms Playground'}
        description={`Welcome to the All Forms page, here you can view and manage all the
            forms you have created.From here, you can quickly preview each form,
            edit its settings, and delete it if necessary.`}
      />
      <FormItem data={allForms} />
    </section>
  );
};
