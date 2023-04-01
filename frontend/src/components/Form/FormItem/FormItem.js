import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../../../assets/pencil.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete.svg';
import { useAppContext } from '../../../contexts/AppContext';
import ApiService from '../../../api/services/ApiService';
import classes from './FormItem.module.css';

export const FormItem = ({ data, isSingleForm }) => {
  const [selectedRadioValue, setSelectedRadioValue] = useState('');
  const [isRadioTextOpen, setIsRadioTextOpen] = useState(false);
  const { setAllForms, setSingleForm } = useAppContext();
  const customId = useId();
  const navigate = useNavigate();

  const handleRadioChange = (e, option) => {
    setSelectedRadioValue(e.target.id);
    setIsRadioTextOpen(option[e.target.value]);
  };

  const editFormHandler = (form) => {
    navigate(`/edit-form/${form._id}`);
  };

  const deleteFormHandler = (id) => {
    const fetchDelForm = async () => {
      try {
        const formsData = await ApiService.forms.deleteForm(id);
        setAllForms(formsData);
        setSingleForm({});
      } catch (err) {
        console.log(err);
      }
    };

    fetchDelForm();

    setAllForms((prevListOfForms) =>
      prevListOfForms.filter((form) => form._id !== id)
    );

    if (isSingleForm) {
      setSingleForm({});
    }
  };

  return (
    <div className={classes.all_forms}>
      {data?.map((form) => (
        <div key={form._id} className={classes.form_item}>
          <div className={classes.form_item_header}>
            <div>
              <h4>{form.formName} Form:</h4>
            </div>
            <div className={classes.form_item_actionBtns}>
              <button onClick={() => editFormHandler(form)}>
                <EditIcon />
              </button>
              <button onClick={() => deleteFormHandler(form._id)}>
                <DeleteIcon />
              </button>
            </div>
          </div>
          <div className={classes.form_fields}>
            {form.fieldsData.map((field, i) => (
              <div key={field._id || i}>
                {field.type === 'radio' ? (
                  <div>
                    <label>{field.label}</label>
                    {field.options.map((option, i) => (
                      <div key={i}>
                        <input
                          id={`${Object.keys(
                            option
                          ).toString()}-${i}${customId}`}
                          type={field.type}
                          value={Object.keys(option).toString()}
                          checked={
                            selectedRadioValue ===
                            `${Object.keys(option).toString()}-${i}${customId}`
                          }
                          onChange={(e) => handleRadioChange(e, option)}
                        />
                        <label
                          htmlFor={`${Object.keys(
                            option
                          ).toString()}-${i}${customId}`}
                        >
                          {Object.keys(option).toString()}
                        </label>
                        {isRadioTextOpen &&
                          selectedRadioValue ===
                            `${Object.keys(
                              option
                            ).toString()}-${i}${customId}` && (
                            <div>
                              <input type='text' />
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={classes.fields}>
                    <label htmlFor={field.name}>{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea placeholder={field.placeholder} />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
