import TestForm from '../components/TestForm';
import EntryForm from '../components/EntryForm';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <main>
      {/* <TestForm /> */}
      <EntryForm />
    </main>
  );
}
