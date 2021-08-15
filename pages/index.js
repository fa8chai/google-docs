import Head from 'next/head';
import Docs from '../components/Docs';
import Header from '../components/Header';
import NewDoc from '../components/NewDoc';
import { getSession, useSession }  from 'next-auth/client';
import Login from '../components/Login';

export default function Home() {
  const [session] = useSession();
  if(!session) return <Login />
  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <NewDoc />
      <Docs />
      
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}
