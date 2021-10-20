import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/EntryForm.module.css';

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.field}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};

const SelectField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.field}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};

const CheckboxField = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div className={styles.field}>
      <label>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};

const EntryForm = () => {
  return (
    <div className={styles.container}>
      <h1>Please complete the form below:</h1>
      <h2>All fields are required except where indicated.</h2>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          zip: '',
          email: '',
          dob: '',
          acceptedRules: false,
          acceptedTerms: false,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required').max(50, 'Must be 50 characters or less'),
          lastName: Yup.string().required('Required').max(50, 'Must be 50 characters or less'),
          address1: Yup.string().required('Required').max(50, 'Must be 50 characters or less'),
          address2: Yup.string().max(50, 'Must be 50 characters or less'),
          city: Yup.string().required('Required').max(50, 'Must be 50 characters or less'),
          state: Yup.string().required('Required'),
          zip: Yup.string().required('Required').length(5, 'Must be 5 digits'),
          email: Yup.string().required('Required').email('Invalid email address'),
          dob: Yup.date().required('Required'),
          acceptedRules: Yup.boolean().required('Required').oneOf([true], 'You must accept the rules'),
        })}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className={styles.form}>
          <InputField label="First Name" name="firstName" type="text" placeholder="First Name" />

          <InputField label="Last Name" name="lastName" type="text" placeholder="Last Name" />

          <InputField label="Address 1" name="address1" type="text" placeholder="Address 1" />

          <InputField label="Address 2" name="address2" type="text" placeholder="Address 2" />

          <InputField label="City" name="city" type="text" placeholder="City" />

          <SelectField label="State" name="state">
            <option value="" disabled>
              Select One
            </option>
            <option value="AL">Alabama</option>
            <option value="IL">Illinois</option>
            <option value="OH">Ohio</option>
          </SelectField>

          <InputField label="Zip" name="zip" type="text" placeholder="Zip" />

          <InputField label="Email Address" name="email" type="email" placeholder="Email Address" />

          <InputField label="Date of Birth" name="dob" type="date" placeholder="Date of Birth" />

          <CheckboxField name="acceptedRules">I have read and agree to the Official Rules</CheckboxField>

          <CheckboxField name="acceptedTerms">I have read and agree to Ruffino&rsquo;s privacy policy and terms and conditions, and consent to Ruffino&rsquo;s use of my personal information for marketing and analytics purposes, including receiving marketing and promotional communications. (optional)</CheckboxField>

          <button type="submit">Play Now</button>
        </Form>
      </Formik>
    </div>
  );
};

export default EntryForm;
