import { useState } from 'react';
import { Header } from '../../ui/Header/Header';
import { Button } from '../../ui/Button/Button';
import { Seperator } from '../../ui/Seperator/Seperator';
import { FormItem } from '../FormItem/FormItem';
import { useAppContext } from '../../../contexts/AppContext';
import ApiService from '../../../api/services/ApiService';
import classes from './GetForm.module.css';

export const GetForm = () => {
  const [selectedFormId, setSelectedFormId] = useState('');
  const [isError, setIsError] = useState(false);
  const { singleForm, setSingleForm, allForms } = useAppContext();

  const getFormById = () => {
    if (!selectedFormId.length) return false;

    const fetchFormById = async () => {
      try {
        const formsData = await ApiService.forms.getFormById(selectedFormId);
        setSingleForm(formsData);
        setIsError(false);
      } catch (err) {
        setIsError(true);
        console.log('err', err);
      }
    };

    fetchFormById();

    const singleFormData = allForms.find((form) => form._id === selectedFormId);

    if (singleFormData === undefined) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <section>
      <Header
        title={'Get Form By Id'}
        description={`On this page, you can retrieve a specific form from the database by its unique identifier.
        Simply enter the ID in the provided input field and click the "Get Form" button.`}
      />

      <div className={classes.get_form}>
        <div>
          <label htmlFor='getFormById'>Please Enter The Form ID:</label>
          <input
            id='getFormById'
            type='text'
            value={selectedFormId}
            onChange={(e) => setSelectedFormId(e.target.value)}
            required
          />
        </div>
        <Button onClickCb={getFormById}>Get Form</Button>
      </div>

      <Seperator />

      {isError && (
        <div className={classes.errorMsg}>
          Form was not found. Please make sure you searched for existing Form
          ID.
        </div>
      )}

      {Object.keys(singleForm).length > 0 && (
        <FormItem data={[singleForm]} isSingleForm />
      )}
    </section>
  );
};
