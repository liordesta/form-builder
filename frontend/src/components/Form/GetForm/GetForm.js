import { useState, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { Header } from '../../ui/Header/Header';
import { Button } from '../../ui/Button/Button';
import { Seperator } from '../../ui/Seperator/Seperator';
import { FormItem } from '../FormItem/FormItem';
import { LoadingSpinner } from '../../ui/LoadingSpinner/LoadingSpinner';
import { useAppContext } from '../../../contexts/AppContext';
import ApiService from '../../../api/services/ApiService';
import classes from './GetForm.module.css';

export const GetForm = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { singleForm, setSingleForm } = useAppContext();
  const getFormInput = useRef();
  const queryClient = useQueryClient();

  const getFormById = async () => {
    if (!getFormInput.current.value.trim().length) return false;

    try {
      setIsLoading(true);
      setIsDisabled(true);
      setIsError(false);
      setSingleForm({});

      const formsData = await queryClient.fetchQuery(
        ['form', getFormInput.current.value],
        () => ApiService.forms.getFormById(getFormInput.current.value)
      );

      setSingleForm(formsData);
      setIsLoading(false);
      setIsDisabled(false);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      setIsDisabled(false);
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
          <input id='getFormById' type='text' ref={getFormInput} required />
        </div>
        <Button isDisabled={isDisabled} onClickCb={getFormById}>
          Get Form
        </Button>
      </div>

      <Seperator />

      {isLoading && <LoadingSpinner />}

      {isError && (
        <div className={classes.errorMsg}>
          Form was not found. Please make sure you searched for existing Form
          ID.
        </div>
      )}

      {Object.keys(singleForm).length > 0 && !isError && (
        <FormItem data={[singleForm]} isSingleForm />
      )}
    </section>
  );
};
