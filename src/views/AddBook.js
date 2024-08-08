import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import useAppContext from '../context/useAppContext';
import { ComboBox } from '../components/ComboBox';
import CustomModal from '../components/CustomModal';
import { addBook } from '../api/booksApi';
import { getAuthors } from '../api/authorsApi';
import { getCategories } from '../api/categoriesApi';

export const AddBook = () => {
  const { globalState, setLstAuthors, setLstCategories, setLstBooks } = useAppContext();

  const { lstAuthors, lstCategories, lstBooks } = globalState;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [copies, setCopies] = useState('');

  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    (async () => {
      if (lstAuthors.length === 0) {
        const _authors = (await getAuthors()).data;
        setLstAuthors(_authors);
      }
  
      if (lstCategories.length === 0) {
        const _categories = (await getCategories()).data;
        setLstCategories(_categories);
      }
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const book = { title, description, authorId: authorId, categoryId: categoryId, copies };

    const result = await addBook(book);
    if (result.ok && lstBooks.length > 0) setLstBooks([...lstBooks, result.data]);
    setSuccess(result.ok);
    setShowMessage(true);
  };

  const cleanForm = () => {
    setTitle('');
    setDescription('');
    setAuthorId('');
    setCategoryId('');
    setCopies('');
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Agregar Libro
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Titulo"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <ComboBox 
                options={lstAuthors.map(c => ({id: c.id, value: c.name}))}
                value={authorId}
                onChange={e => setAuthorId(e.target.value)}
                label="Autor"
              />
            </Grid>
            <Grid item xs={12}>
              <ComboBox 
                options={lstCategories.map(c => ({id: c.id, value: c.name}))}
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                label="Categoria"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Copias"
                variant="outlined"
                inputProps={{ min: 0, step: 1, pattern: "\\d*" }}
                fullWidth
                type="number"
                value={copies}
                onChange={(e) => {
                  const newValue = e.target.value;

                  if (newValue === '' || /^[0-9\b]+$/.test(newValue)) {
                    setCopies(newValue);
                  }
                }}
                required
              />
            </Grid>
            <Grid container item xs={12} justifyContent="flex-end">
              <Button 
                size='large' 
                variant="contained" 
                color="primary" 
                type="submit"
                disabled={title === '' || description === '' || authorId === '' || categoryId === '' || copies === ''}
              >
                Guardar
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
        message={success ? `Libro "${title}", guardado.` : `No se pudó guardar el libro "${title}"`}
        icon={success ? DoneOutlineOutlinedIcon : ReportProblemOutlinedIcon}
      />
    </>
  );
}