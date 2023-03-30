import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../ui/Header/Header';
import { useAppContext } from '../../../contexts/AppContext';
import { SetForm } from '../NewForm/SetForm';

export const EditForm = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { singleForm, setSingleForm, setFormFields } = useAppContext();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3001/api/getForms/${id}`)
      .then((response) => {
        setSingleForm(response.data);
        setIsLoading(false);
        setFormFields(response.data.fieldsData);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
        console.log('err', err);
      });

    if (isError) navigate('/');

    return () => {
      setFormFields([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <Header
        title={`Edit Form ${singleForm.formName}`}
        description={`Welcome to the Edit Form page!
        This page allows you to make changes to an existing form that you have previously created.
        Use the form editor to modify form fields, add or remove fields.
        When you're done editing, be sure to publish your changes to update the form in the database.`}
      />

      <SetForm isEditMode />
    </section>
  );
};
