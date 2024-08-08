import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import useAppContext from '../context/useAppContext';
import { ComboBox } from '../components/ComboBox';
import CustomModal from '../components/CustomModal';
import { deleteBook, getBooks } from '../api/booksApi';

export const DeleteBook = () => {
  const { globalState, setLstBooks } = useAppContext();

  const { lstBooks } = globalState;

  const [bookId, setBookId] = useState('');

  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    (async () => {
      if (lstBooks.length === 0) {
        const _books = (await getBooks()).data;
        setLstBooks(_books);
      }
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await deleteBook(bookId);
    setSuccess(result.ok);
    setShowMessage(true);
  };

  const cleanForm = () => {
    setLstBooks(lstBooks.filter(b => b.id !== bookId));
    setBookId('');
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Eliminar Libro
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ComboBox 
                options={lstBooks.map(c => ({id: c.id, value: c.title}))}
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
                disabled={bookId === ''}
              >
                Eliminar
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
          `Libro "${lstBooks.find(b => b.id === bookId)?.title}", eliminado.` : 
          `No se pudó eliminar el libro "${lstBooks.find(b => b.id === bookId)?.title}"`
        }
        icon={success ? DoneOutlineOutlinedIcon : ReportProblemOutlinedIcon}
      />
    </>
  );
}