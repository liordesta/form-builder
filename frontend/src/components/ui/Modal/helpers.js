export const renderField = (
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
) => {
  switch (type) {
    case 'text':
      return (
        <>
          <label htmlFor='text-input-id'>ID/Name:</label>
          <input
            type='text'
            id='text-input-id'
            placeholder='Enter Text ID/Name'
            autoComplete='off'
            required
            value={inputIdValue}
            onChange={handleInputIdChange}
          />
          <label htmlFor='label-text-input'>Label Text:</label>
          <input
            type='text'
            id='label-text-input'
            placeholder='Enter Text Label'
            autoComplete='off'
            required
            value={inputLabelValue}
            onChange={handleInputLabelChange}
          />
          <label htmlFor='placeholder-text-input'>Placeholder:</label>
          <input
            type='text'
            id='placeholder-text-input'
            placeholder='Enter Text Placeholder'
            autoComplete='off'
            required
            value={inputPlaceholderValue}
            onChange={handleInputPlaceholderChange}
          />
        </>
      );
    case 'email':
      return (
        <>
          <label htmlFor='email-input-id'>ID/Name:</label>
          <input
            type='text'
            id='email-input-id'
            placeholder='Enter Email ID/Name'
            autoComplete='off'
            required
            value={inputIdValue}
            onChange={handleInputIdChange}
          />
          <label htmlFor='label-email-input'>Label Text:</label>
          <input
            type='text'
            id='label-email-input'
            placeholder='Enter Email Label'
            autoComplete='off'
            required
            value={inputLabelValue}
            onChange={handleInputLabelChange}
          />
          <label htmlFor='placeholder-email-input'>Placeholder:</label>
          <input
            type='text'
            id='placeholder-email-input'
            placeholder='Enter Email Placeholder'
            autoComplete='off'
            required
            value={inputPlaceholderValue}
            onChange={handleInputPlaceholderChange}
          />
        </>
      );
    case 'password':
      return (
        <>
          <label htmlFor='password-input-id'>ID/Name:</label>
          <input
            type='text'
            id='password-input-id'
            placeholder='Enter Password ID/Name'
            autoComplete='off'
            required
            value={inputIdValue}
            onChange={handleInputIdChange}
          />
          <label htmlFor='label-password-input'>Label Text:</label>
          <input
            type='text'
            id='label-password-input'
            placeholder='Enter Password Label'
            autoComplete='off'
            required
            value={inputLabelValue}
            onChange={handleInputLabelChange}
          />
          <label htmlFor='placeholder-password-input'>Placeholder:</label>
          <input
            type='text'
            id='placeholder-password-input'
            placeholder='Enter Password Placeholder'
            autoComplete='off'
            required
            value={inputPlaceholderValue}
            onChange={handleInputPlaceholderChange}
          />
        </>
      );
    case 'textarea':
      return (
        <>
          <label htmlFor='textarea-id'>ID/Name:</label>
          <input
            type='text'
            id='textarea-id'
            placeholder='Enter Text Area ID/Name'
            autoComplete='off'
            required
            value={inputIdValue}
            onChange={handleInputIdChange}
          />
          <label htmlFor='label-textarea'>Label Text:</label>
          <input
            type='text'
            id='label-textarea'
            placeholder='Enter Text Area Label'
            autoComplete='off'
            required
            value={inputLabelValue}
            onChange={handleInputLabelChange}
          />
          <label htmlFor='placeholder-textarea'>Placeholder:</label>
          <input
            type='text'
            id='placeholder-textarea'
            placeholder='Enter Text Area Placeholder'
            autoComplete='off'
            required
            value={inputPlaceholderValue}
            onChange={handleInputPlaceholderChange}
          />
        </>
      );
    case 'radio':
      return (
        <>
          <div>
            <div className={classes.radio_label}>
              <label htmlFor='radio-label-input'>
                1. Enter Radio Label Text:
              </label>
              <input
                type='text'
                id='radio-label-input'
                placeholder='What is your favorite food?'
                autoComplete='off'
                required
                value={radioLabel}
                onChange={handleRadioLabelChange}
              />
            </div>
            {radioOptions.map((_, i) => (
              <div key={i} className={classes.radio_btns}>
                <label htmlFor={`radio-option-${i}-input`}>
                  - Enter The Radio Option Name:
                </label>
                <input
                  type='text'
                  id={`radio-option-${i}-input`}
                  placeholder={`Option ${i + 1}, for example`}
                  autoComplete='off'
                  required
                  value={radioOptions[i]}
                  onChange={(e) =>
                    setRadioOptions((prevState) => {
                      const newState = [...prevState];
                      newState[i] = e.target.value;
                      return newState;
                    })
                  }
                />
                <div className={classes.radio_btns_checkbox}>
                  <input
                    type='checkbox'
                    id={`checkbox-${i}`}
                    checked={checkedOptions[i]}
                    onChange={(e) =>
                      setCheckedOptions((prevState) => {
                        const newState = [...prevState];
                        newState[i] = e.target.checked;
                        return newState;
                      })
                    }
                  />
                  <label htmlFor={`checkbox-${i}`}>
                    Check to give user free option
                  </label>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    default:
      return null;
  }
};
