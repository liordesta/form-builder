import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Seperator } from '../../ui/Seperator/Seperator';
import { Modal } from '../../ui/Modal/Modal';
import { Button } from '../../ui/Button/Button';
import { useAppContext } from '../../../contexts/AppContext';
import ApiService from '../../../api/services/ApiService';
import classes from './SetForm.module.css';

export const SetForm = ({ isEditMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState(null);
  const [fieldsData, setFieldsData] = useState([]);
  const { formFields, setFormFields, singleForm, setSingleForm } =
    useAppContext();
  const [formErrorMessage, setFormErrorMessage] = useState(false);
  const [formName, setFormName] = useState('');
  const [optionsValue, setOptionsValue] = useState('');
  const navigate = useNavigate();

  const handleOpenModal = (type) => {
    if (type === 'radio' && !optionsValue) return null;
    setIsModalOpen(true);
    setSelectedFieldType(type);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFieldType(null);
    setOptionsValue('');
  };

  const handleFormNameChange = (e) => {
    setFormName(e.target.value);
  };

  const selectOptionsHandler = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    if (inputValue < 2 || inputValue > 10) {
      setOptionsValue('');
    } else {
      setOptionsValue(inputValue);
    }
  };

  useEffect(() => {
    setFieldsData(formFields);
    if (isEditMode) setFormName(singleForm.formName);
  }, [formFields, isEditMode, singleForm]);

  const resetFieldsHandler = () => {
    setFormFields([]);
  };

  const postFormRequest = (e) => {
    e.preventDefault();

    if (!fieldsData.length || fieldsData.length < 4 || !formName)
      return setFormErrorMessage(true);

    const formObj = { formName, fieldsData };

    if (isEditMode) {
      const fetchFormById = async () => {
        await ApiService.forms.updateForm(singleForm._id, formObj);
        setFormFields([]);
        setSingleForm([]);
      };

      fetchFormById();
    } else {
      const fetchFormById = async () => {
        await ApiService.forms.createForm(formObj);
        setFormFields([]);
        setFormName('');
        setFormErrorMessage(false);
        setSingleForm([]);
      };

      fetchFormById();
    }

    navigate('/');
  };

  return (
    <>
      <div className={classes.split_sections}>
        <div className={classes.left_section}>
          <h4>Fields Example:</h4>

          <div className={classes.field_wrapper}>
            <div className={classes.field_type}>
              <p>Text Input</p>
              <input type='text' placeholder='Example' />
            </div>
            <Button onClickCb={() => handleOpenModal('text')}>Add Field</Button>
          </div>
          <div className={classes.field_wrapper}>
            <div className={classes.field_type}>
              <p>Email Input</p>
              <input type='email' placeholder='Example' />
            </div>
            <Button onClickCb={() => handleOpenModal('email')}>
              Add Field
            </Button>
          </div>
          <div className={classes.field_wrapper}>
            <div className={classes.field_type}>
              <p>Password Input</p>
              <input type='password' placeholder='Example' />
            </div>
            <Button onClickCb={() => handleOpenModal('password')}>
              Add Field
            </Button>
          </div>
          <div className={classes.field_wrapper}>
            <div className={classes.field_type}>
              <p>Text Area</p>
              <textarea placeholder='Example' />
            </div>
            <Button onClickCb={() => handleOpenModal('textarea')}>
              Add Field
            </Button>
          </div>
          <div className={classes.field_wrapper}>
            <div className={classes.field_type}>
              <p>Radio Button</p>
              <div className={classes.radio_example}>
                <div>
                  <input
                    id='radio-example1'
                    type='radio'
                    value='option1'
                    checked
                    readOnly
                  />
                  <label htmlFor='radio-example1'>Option 1</label>
                </div>
                <div>
                  <input id='radio-example2' type='radio' value='option2' />
                  <label htmlFor='radio-example2'>Option 2</label>
                </div>
                <div>
                  <input id='radio-example3' type='radio' value='option3' />
                  <label htmlFor='radio-example3'>Option 3</label>
                </div>
              </div>
            </div>
            <div className={classes.radio_field_wrapper}>
              <div className={classes.radio_select_options}>
                <label htmlFor='select-radio'>Enter Radio Options Number</label>
                <input
                  id='select-radio'
                  type='number'
                  min='2'
                  max='10'
                  value={optionsValue}
                  onChange={selectOptionsHandler}
                />
              </div>
              <Button onClickCb={() => handleOpenModal('radio')}>
                Add Field
              </Button>
            </div>
          </div>
        </div>

        <Seperator type='vertical' />

        <div className={classes.right_section}>
          <h4>Form:</h4>

          <form className={classes.form_wrapper}>
            <div className={classes.form_body}>
              <input
                id='new-form-name'
                type='text'
                placeholder='Enter Form Name:'
                autoComplete='off'
                className={classes.form_title}
                required
                value={formName}
                onChange={handleFormNameChange}
              />

              <Seperator />

              <div className={classes.form_fields}>
                {formErrorMessage &&
                  (!fieldsData.length ||
                    fieldsData.length < 4 ||
                    !formName) && (
                    <p className={classes.error_msg}>
                      Please make sure to fill form name and at least 4 fields
                    </p>
                  )}
                {fieldsData?.map((field, i) => (
                  <div key={i}>
                    <>
                      {field.type === 'radio' ? (
                        <div className={classes.field_radio_wrapper}>
                          <label>{field.label}</label>
                          <div>
                            {field.options.map((option, i) => (
                              <div
                                key={i}
                                className={`${classes.field_input_wrapper}`}
                              >
                                <input type={field.type} />
                                <label>{Object.keys(option).toString()}</label>
                              </div>
                            ))}
                          </div>
                          <Seperator />
                        </div>
                      ) : (
                        <div key={field.name}>
                          <div
                            className={`${classes.field_input_wrapper} ${
                              field.type === 'textarea' &&
                              classes.field_textarea
                            }`}
                          >
                            <label htmlFor={field.id}>{field.label}</label>
                            {field.type === 'textarea' ? (
                              <textarea placeholder={field.placeholder} />
                            ) : (
                              <input
                                type={field.type}
                                id={field.id}
                                placeholder={field.placeholder}
                              />
                            )}
                          </div>
                          <Seperator />
                        </div>
                      )}
                    </>
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.btn_wrapper}>
              <Button btnType='submit' onClickCb={postFormRequest}>
                Publish
              </Button>
              <Button styleType='secondary' onClickCb={resetFieldsHandler}>
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          type={selectedFieldType}
          optionsValue={optionsValue}
        />
      )}
    </>
  );
};
