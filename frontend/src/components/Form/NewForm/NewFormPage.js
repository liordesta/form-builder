import { Header } from '../../ui/Header/Header';
import { SetForm } from './SetForm';

export const NewFormPage = () => {
  return (
    <section>
      <Header
        title={'Create New Form'}
        description={`To get started, simply click the "Add" button to add a new field to
            your form. The new field will appear on the right side of the page, where you
            can customize its properties such as field type, label, and more.
            You can add as many fields as you need to your form.`}
      />

      <SetForm />
    </section>
  );
};
