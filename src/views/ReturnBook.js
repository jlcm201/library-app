import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import useAppContext from '../context/useAppContext';
import { ComboBox } from '../components/ComboBox';
import CustomModal from '../components/CustomModal';
import { getBooks } from '../api/booksApi';
import { deleteLibraryLoan, GetLibraryLoansByUserId } from '../api/libraryLoanApi';
import { getUsers } from '../api/usersApi';

export const ReturnBook = () => {
  const { globalState, setLstBooks, setLstUsers } = useAppContext();

  const { lstBooks, lstUsers } = globalState;

  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [lstLibraryLoanBookIds, setLstLibraryLoanBookIds] = useState([]);
  const [lstLibraryLoans, setLstLibraryLoans] = useState([]);

  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    (async () => {
      if (lstBooks.length === 0) {
        const _books = (await getBooks()).data;
        setLstBooks(_books);
      }

      if (lstUsers.length === 0) {
        const _users = (await getUsers()).data;
        setLstUsers(_users);
      }
    })();
  }, []);

  useEffect(() => {
    setBookId('');
    (async () => {
      if (userId !== '') {
        const _lstLibraryLoan = (await GetLibraryLoansByUserId(userId)).data;
        setLstLibraryLoans(_lstLibraryLoan);
        let _libraryLoanIds = [];
        if (_lstLibraryLoan.length > 0) _libraryLoanIds = _lstLibraryLoan.map(l => l.bookId);
        setLstLibraryLoanBookIds(_libraryLoanIds);
      }
    })();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idLibraryLoan = lstLibraryLoans.find(l => l.bookId === bookId).id;
    const result = await deleteLibraryLoan(idLibraryLoan);
    if (result.ok) {
      setBookId('');
      setLstLibraryLoans(lstLibraryLoans.filter(l => l.id !== idLibraryLoan));
      setLstLibraryLoanBookIds(lstLibraryLoans.filter(l => l.id !== idLibraryLoan).map(l => l.bookId));
    }
    setSuccess(result.ok);
    setShowMessage(true);
  };

  const cleanForm = (id) => {
    setBookId('');
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Devolver Libro
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ComboBox 
                options={lstUsers.map(c => ({id: c.id, value: c.name}))}
                value={userId}
                onChange={e => setUserId(e.target.value)}
                label="Usuario"
              />
            </Grid>
            <Grid item xs={12}>
              <ComboBox 
                options={lstBooks.filter(b => lstLibraryLoanBookIds.includes(b.id)).map(c => ({id: c.id, value: c.title}))}
                value={bookId}
                onChange={e => setBookId(e.target.value)}
                label="Libro"
              />
            </Grid>
            <Grid container item xs={12} justifyContent="flex-end">
              <Button 
                size='large' 
                variant="contained" 
                color="primary" 
                type="submit"
                disabled={bookId === '' || userId === ''}
              >
                Devolver Libro
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <CustomModal 
        title={success ? 'Mi Biblioteca' : '¡Atención!'}
        open={showMessage}
        onOk={() => {
          setShowMessage(false);
          if (success) cleanForm();
        }}
        message={success ? 
          `Libro "${lstBooks.find(b => b.id === bookId)?.title}", devuelto.` : 
          `No se pudó devolver el libro "${lstBooks.find(b => b.id === bookId)?.title}"`
        }
        icon={success ? DoneOutlineOutlinedIcon : ReportProblemOutlinedIcon}
      />
    </>
  );
}