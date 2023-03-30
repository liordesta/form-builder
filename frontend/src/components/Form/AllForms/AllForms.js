import { useEffect } from 'react';
import { Header } from '../../ui/Header/Header';
import { FormItem } from '../FormItem/FormItem';
import { useAppContext } from '../../../contexts/AppContext';
import ApiService from '../../../api/services/ApiService';

export const AllForms = () => {
  const { allForms, setAllForms, setSingleForm } = useAppContext();

  useEffect(() => {
    const fetchAllForms = async () => {
      const formsData = await ApiService.forms.getAllForms();
      setAllForms(formsData);
      setSingleForm({});
    };

    fetchAllForms();
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
