const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'public/uploads/' })
const acceptedfiletypes = ['image/jpeg','image/jpg','image/png','image/gif'];

app.engine('.hbs', hbs());
   
app.set('view engine', '.hbs');

app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name} );
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' } );
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res, next) => {
  res.render('history');
});

app.post('/contact', upload.single('projectDesign'), (req, res) => {
  const {author, sender, title, message} = req.body;

  if(author && sender && title && message && req.file){
	if(acceptedfiletypes.includes(req.file.mimetype)){
	  res.render('contact', {isSent: true, filename: req.file.originalname, path: req.file.path} );
	} else res.render('contact', {wrongFileFormat: true} );
  } else {
	res.render('contact', {isError: true} );
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

