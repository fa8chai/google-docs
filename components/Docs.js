import Button from '@material-tailwind/react/Button';
import Icon from "@material-tailwind/react/Icon";
import { useSession } from "next-auth/client";
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { db } from "../firebase";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/dist/client/router';

function Docs() {
    const [session] = useSession();
    const [snapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').orderBy('timestamp', 'desc'));
    const router = useRouter();

    function createData(id, fileName, date) {
        return { id, fileName, date };
    }

    const rows = [
        snapshot?.docs.map(doc => (
            createData(doc.id, doc.data().fileName, doc.data().timestamp)
        ))
      ];
    return (
        <section className='bg-white px-10 md:px-0'>
            <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell><p className='text-gray-700 font-medium'>My Documents</p></TableCell>
                            <TableCell align="right"><p className='text-gray-700 text-sm'>Date Created</p></TableCell>
                            <TableCell align="right"><Icon name='folder' size='3xl' color='gray' /></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows[0]?.map((row) => (
                            <TableRow className='rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer' key={row.id} onClick={() => router.push(`/doc/${row.id}`)}>
                                <TableCell component="th" scope="row">
                                    <div className='flex items-center text-gray-700 text-sm'>
                                        <Icon name='article' size='3xl' color='blue' />
                                        <p className='pl-5'>{row.fileName}</p>
                                    </div>
                            </TableCell>
                            <TableCell align="right"><p className='text-gray-700 text-sm'>{row.date.toDate().toLocaleDateString()}</p></TableCell>
                            <TableCell align="right">
                            <Button
                                color='gray'
                                buttonType='outline'
                                rounded={true}
                                iconOnly={true}
                                ripple='dark'
                                className='border-0'
                            >
                                <Icon name='more_vert' size='3xl' />
                            </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            
        </section>
    )
}

export default Docs
