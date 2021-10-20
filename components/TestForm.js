import { Formik, Form, useField, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/TestForm.module.css';

// Custom validation function ——————————
// const validate = (values) => {
//   const errors = {};

//   if (!values.firstName) {
//     errors.firstName = 'Required';
//   } else if (values.firstName.length > 15) {
//     errors.firstName = 'Must be 15 characters or less';
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Required';
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'Must be 20 characters or less';
//   }

//   if (!values.email) {
//     errors.email = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   return errors;
// };

// Build component without leveraging React Context ——————————
// const TestForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//     },
//     // Custom validation argument ——————————
//     // validate,
//     validationSchema: Yup.object({
//       firstName: Yup.string().required('Required').max(15, 'Must be 15 characters or less'),
//       lastName: Yup.string().required('Required').max(20, 'Must be 20 characters or less'),
//       email: Yup.string().required('Required').email('Invalid email address'),
//     }),
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });

//   return (
//     <div className={styles.container}>
//       <h1>Please complete the form below:</h1>
//       <h2>All fields are required except where indicated.</h2>

//       {/* With explicit input properties —————————— */}
//       {/* <form className={styles.form} onSubmit={formik.handleSubmit}>
//         <label htmlFor="firstName">First Name</label>
//         <input id="firstName" name="firstName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />
//         {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

//         <label htmlFor="lastName">Last Name</label>
//         <input id="lastName" name="lastName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} />
//         {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

//         <label htmlFor="email">Email Address</label>
//         <input id="email" name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
//         {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

//         <button type="submit">Submit</button>
//       </form> */}

//       <form className={styles.form} onSubmit={formik.handleSubmit}>
//         <label htmlFor="firstName">First Name</label>
//         <input id="firstName" type="text" {...formik.getFieldProps('firstName')} />
//         {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

//         <label htmlFor="lastName">Last Name</label>
//         <input id="lastName" type="text" {...formik.getFieldProps('lastName')} />
//         {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

//         <label htmlFor="email">Email Address</label>
//         <input id="email" type="email" {...formik.getFieldProps('email')} />
//         {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// Build component by leveraging React Context ——————————
// const TestForm = () => {
//   return (
//     <div className={styles.container}>
//       <h1>Please complete the form below:</h1>
//       <h2>All fields are required except where indicated.</h2>

//       <Formik
//         initialValues={{
//           firstName: '',
//           lastName: '',
//           email: '',
//           city: '',
//           message: '',
//         }}
//         validationSchema={Yup.object({
//           firstName: Yup.string().required('Required').max(15, 'Must be 15 characters or less'),
//           lastName: Yup.string().required('Required').max(20, 'Must be 20 characters or less'),
//           email: Yup.string().required('Required').email('Invalid email address'),
//           city: Yup.string().required('Required'),
//         })}
//         onSubmit={(values) => {
//           alert(JSON.stringify(values, null, 2));
//         }}
//       >
//         <Form className={styles.form}>
//           <label htmlFor="firstName">First Name</label>
//           <Field name="firstName" type="text" placeholder="First Name" />
//           <ErrorMessage name="firstName" />

//           <label htmlFor="lastName">Last Name</label>
//           <Field name="lastName" type="text" placeholder="Last Name" />
//           <ErrorMessage name="lastName" />

//           <label htmlFor="email">Email Address</label>
//           <Field name="email" type="email" placeholder="Email Address" />
//           <ErrorMessage name="email" />

//           <label htmlFor="city">City</label>
//           <Field name="city" as="select">
//             <option value="" disabled>Select</option>
//             <option value="New York">New York</option>
//             <option value="Los Angelos">Los Angelos</option>
//             <option value="Chicago">Chicago</option>
//           </Field>
//           <ErrorMessage name="city" />

//           <label htmlFor="message">Message</label>
//           <Field name="message" as="textarea" placeholder="Leave a message..." />

//           <button type="submit">Submit</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// Build component by leveraging React Context and React Hooks ——————————
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

const TextAreaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.field}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};

const TestForm = () => {
  return (
    <div className={styles.container}>
      <h1>Please complete the form below:</h1>
      <h2>All fields are required except where indicated.</h2>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          city: '',
          message: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required').max(15, 'Must be 15 characters or less'),
          lastName: Yup.string().required('Required').max(20, 'Must be 20 characters or less'),
          email: Yup.string().required('Required').email('Invalid email address'),
          city: Yup.string().required('Required').oneOf(['New York', 'Chicago'], 'Invalid city'),
        })}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className={styles.form}>
          <InputField label="First Name" name="firstName" type="text" placeholder="First Name" />

          <InputField label="Last Name" name="lastName" type="text" placeholder="Last Name" />

          <InputField label="Email Address" name="email" type="email" placeholder="Email Address" />

          <SelectField label="City" name="city">
            <option value="" disabled>
              Select
            </option>
            <option value="New York">New York</option>
            <option value="Los Angelos">Los Angelos</option>
            <option value="Chicago">Chicago</option>
          </SelectField>

          <TextAreaField label="Message" name="message" placeholder="Leave a message..." />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default TestForm;
