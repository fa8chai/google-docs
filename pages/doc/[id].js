import Head from 'next/head';
import TextEditor from '../../components/TextEditor';
import Button from '@material-tailwind/react/Button';
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from 'next/dist/client/router';
import { db } from "../firebase";
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { getSession, signOut, useSession } from 'next-auth/client';
import Login from '../../components/Login';

function Doc() {
    const [session] = useSession();
    if (!session) return <Login />;
    
    const router = useRouter();
    const { id } = router.query;
    const [snapshot, loading] = useDocumentOnce(db.collection('userDocs').doc(session.user.email).collection('docs').doc(id));

    if (!loading && !snapshot?.data()?.fileName) {
        router.replace('/');
    }

    return (
        <div>
            <Head>
                <title>Google Docs Clone</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className='flex justify-between items-center p-3 pb-1'>
                <span onClick={() => router.push('/')} className='cursor-pointer'>
                    <Icon name='description' size='5xl' color='blue' />
                </span>
                <div className='flex-grow px-2'>
                    <h2 className=''>{snapshot?.data()?.filename}</h2>
                    <div>
                        <p>File</p>
                        <p>Edit</p>
                        <p>View</p>
                        <p>Insert</p>
                        <p>Format</p>
                        <p>Tools</p>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Doc;
