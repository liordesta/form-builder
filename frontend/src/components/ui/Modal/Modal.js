import { useState, useId } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../Button/Button';
import { useAppContext } from '../../../contexts/AppContext';
import { renderField } from './helpers';
import classes from './Modal.module.css';

export const Modal = ({ isOpen, onClose, type, optionsValue }) => {
  const [inputIdValue, setInputIdValue] = useState('');
  const [inputLabelValue, setInputLabelValue] = useState('');
  const [inputPlaceholderValue, setInputPlaceholderValue] = useState('');
  const [radioLabel, setRadioLabel] = useState('');
  const [checkedOptions, setCheckedOptions] = useState(
    Array(optionsValue).fill(false)
  );
  const [radioOptions, setRadioOptions] = useState(
    Array(optionsValue).fill('')
  );
  const { setFormFields } = useAppContext();
  const customId = useId();

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBtnClose = () => {
    onClose();
  };

  const handleInputIdChange = (e) => {
    setInputIdValue(e.target.value);
  };

  const handleInputLabelChange = (e) => {
    setInputLabelValue(e.target.value);
  };

  const handleInputPlaceholderChange = (e) => {
    setInputPlaceholderValue(e.target.value);
  };

  const handleRadioLabelChange = (e) => {
    setRadioLabel(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let fieldData;

    const filteredRadioOptions = radioOptions.map((option, i) => {
      if (checkedOptions[i]) {
        return { [option]: true };
      } else {
        return { [option]: false };
      }
    });

    if (type === 'radio') {
      fieldData = {
        type: type,
        label: radioLabel,
        options: filteredRadioOptions,
      };
    } else {
      fieldData = {
        type: type,
        name: inputIdValue + customId,
        label: inputLabelValue,
        placeholder: inputPlaceholderValue,
      };
    }

    setFormFields((prevState) => [...prevState, fieldData]);
    onClose();
  };

  const modalContent = (
    <div className={classes.modal_overlay} onClick={handleBackgroundClick}>
      <div className={classes.modal}>
        <div className={classes.modal_header}>
          <h2>Add New {type} Field:</h2>
          <button className={classes.modal_close} onClick={onClose}>
            X
          </button>
        </div>

        <form className={classes.modal_form} onSubmit={submitHandler}>
          {renderField(
            type,
            inputIdValue,
            handleInputIdChange,
            inputLabelValue,
            handleInputLabelChange,
            inputPlaceholderValue,
            handleInputPlaceholderChange,
            classes,
            radioLabel,
            handleRadioLabelChange,
            radioOptions,
            setRadioOptions,
            checkedOptions,
            setCheckedOptions
          )}
          <div className={classes.modal_footer}>
            <Button btnType='submit'>CREATE</Button>
            <Button styleType='secondary' onClickCb={handleBtnClose}>
              CANCEL
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root')
  );
};
