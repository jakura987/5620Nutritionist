import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Tabs, Tab, Box, Grid, Button, Paper, Divider,
  TextField, Snackbar
} from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArticleIcon from '@mui/icons-material/Article';
import CloudUploadIcon from '@mui/icons-material/CloudUploadOutlined';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import StarIcon from '@mui/icons-material/Star';
import BuildIcon from '@mui/icons-material/Build';
import { PulseLoader } from "react-spinners";
import loadingImage from '../assets/loading-image.jpg'
import basketball from '../assets/basketball.gif'
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc, addDoc, query, where } from "firebase/firestore";



function KnowledgeBasePage() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  
  // const [open, setOpen] = useState(false); 
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  // const [dialogOpen, setDialogOpen] = useState(false);


  // value===4
  const [myReads, setMyReads] = useState([]);
  //value === 4
  const fetchMyReads = async () => {
    try {
      const articlesCollection = collection(db, "articles");
      const guzReadsQuery = query(articlesCollection, where("author", "==", "Guz")); //defalut value is Guz

      const guzReadsSnapshot = await getDocs(guzReadsQuery);
      const guzReadsList = guzReadsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      console.log("Fetched articles for Guz:", guzReadsList);

      setMyReads(guzReadsList);
    } catch (error) {
      console.error("Error fetching Guz's reads: ", error);
    }
  };

  //value === 4
  const renderMyReads = () => {
    if (article) {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', height: '100%', position: 'relative', width: '100%' }}>
          <ArrowBackIosIcon
            style={{ margin: '10px', cursor: 'pointer', zIndex: 1 }}
            onClick={handleBackClick}
          />
          <Paper elevation={3} style={{ padding: '20px', width: '100%', overflowY: 'scroll', minHeight: '400px', maxHeight: '500px' }}>
            <Typography variant="h4" gutterBottom>{article.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Author: {article.author || 'Unknown'}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Published on: {new Date(article.date).getFullYear() || 'Unknown'}
            </Typography>
            <Divider style={{ marginBottom: '20px' }} />
            <Typography variant="body1" paragraph>
              {article.content}
            </Typography>
          </Paper>
        </div>
      );
    }

    return (
      <Grid container spacing={3} style={{ height: '200px' }}>
        {articles.filter(art => art.author === "Guz").slice(0, 6).map((article, index) => (
          <Grid item xs={4} key={index}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src={loadingImage} alt={`Read ${index + 1}`} style={{ width: '25%', marginBottom: '10px' }} />
              <Typography variant="body1" style={{ marginBottom: '10px' }}>{article.title}</Typography>
              <Button variant="contained" color="primary" onClick={() => openRealtedArticleWeb(article.id)}>READ</Button>
            </div>
          </Grid>
        ))}
      </Grid>
    );
  };



  //load articles in firebase
  const fetchArticles = async () => {
    try {
      const articlesCollection = collection(db, "articles");
      const articlesSnapshot = await getDocs(articlesCollection);
      const articlesList = articlesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setArticles(articlesList);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  }

  // get articles in useEffect for the first time
  useEffect(() => {
    fetchArticles();
  }, []);
  //value === 4
  useEffect(() => {
    if (value === 4) {
      fetchMyReads();
    }
  }, [value]);



  //value===2 (upload sharing article page)
  const handleSubmit = () => {
    // open dialoge
    setConfirmOpen(true);
  };


  const handleConfirm = async () => {
    try {
      const currentDate = new Date().toISOString();

      await addDoc(collection(db, "articles"), {
        title: title,
        author: author,
        content: content,
        date: currentDate
      });

      setTitle('');
      setAuthor('');
      setContent('');
      setConfirmOpen(false);
      setSnackbarOpen(true);

      // 这里再次调用fetchArticles来更新文章列表
      fetchArticles();

    } catch (error) {
      console.error("文章保存错误: ", error);
    }
  };


  //value===2 (upload sharing article page)
  const AddArticleContainer = (
    <Box position="relative" height={200} width="100%" bgcolor="white" p={2}>
      <Box position="absolute" bgcolor="white" p={2}>
        <TextField
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Author"
          fullWidth
          value={author}
          onChange={(e)  => setAuthor(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e)  => setContent(e.target.value)}
        />

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            onClick={() => setValue(1)}
            color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Share
          </Button>

        </Box>
      </Box>
    </Box>
  );



  //load animation
  const handleChange = (event, newValue) => {
    setLoading(true);
    setTimeout(() => {
      setValue(newValue);
      setLoading(false);
    }, 1250); // 
  };

  //value===1 Article page ( if content is not null, it would show content)
  const renderTopPicks = () => {
    if (article) {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', height: '100%', position: 'relative', width: '100%' }}>
          <ArrowBackIosIcon
            style={{ margin: '10px', cursor: 'pointer', zIndex: 1 }}
            onClick={handleBackClick}
          />
          <Paper elevation={3} style={{ padding: '20px', width: '100%', overflowY: 'scroll', minHeight: '400px', maxHeight: '500px' }}>
            {/* <Paper elevation={3} style={{ padding: '20px', width: '100%' }}> */}
            <Typography variant="h4" gutterBottom>{article.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Author: {article.author || 'Unknown'}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Published on: {new Date(article.date).getFullYear() || 'Unknown'}
            </Typography>
            <Divider style={{ marginBottom: '20px' }} />
            <Typography variant="body1" paragraph>
              {article.content}
            </Typography>
          </Paper>
        </div>
      );
    }
    //article data in firebase
    return (
      <Grid container spacing={3} style={{ height: '200px' }}>
        {articles.slice(0, 6).map((article, index) => (
          <Grid item xs={4} key={index}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src={loadingImage} alt={`Pick ${index + 1}`} style={{ width: '25%', marginBottom: '10px' }} />{/* 文章封面 */}
              <Typography variant="body1" style={{ marginBottom: '10px' }}>{article.title}</Typography> {/* 显示文章标题 */}
              <Button variant="contained" color="primary" onClick={() => openRealtedArticleWeb(article.id)}>READ</Button>
            </div>
          </Grid>
        ))}
      </Grid>
    );
  };

  //open specific article when clicking Read Button
  const openRealtedArticleWeb = async (articleId) => {
    const docRef = doc(db, "articles", articleId);
    const articleDoc = await getDoc(docRef);
    if (articleDoc.exists()) {
      setArticle(articleDoc.data())
    } else {
      console.log("No such document!");
    }
  };

  // after clicking, set articleContent null
  const handleBackClick = () => {
    setArticle(null);
  };



  return (
    <Container>
      <Typography variant="h4" align="center" marginBottom={3}>
        Knowledge Base
      </Typography>

      <Typography variant="body1" paragraph>
        In today's fast-paced society, people are paying more and more attention to health and nutrition.
        However, due to information overload and many misleading views, many people are confusu can find answers here.
      </Typography>

      {/* confrim dialog about sharing article */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"share article"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Do you confirm to share this article?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Share successfully!"
      />




      <Box display="flex" flexDirection="row" mt={3} flexGrow={1}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs"
          style={{ minWidth: '180px' }}
        >
          <Tab icon={<MenuBookIcon />} label="Guide" style={{ fontSize: '1.2rem', padding: '12px 24px' }} />
          <Tab icon={<ArticleIcon />} label="Articles" style={{ fontSize: '1.2rem', padding: '12px 24px' }} />
          <Tab icon={<CloudUploadIcon />} label="Upload" style={{ fontSize: '1.2rem', padding: '12px 24px' }} />
          <Tab icon={<LibraryBooksIcon />} label="My Reads" style={{ fontSize: '1.2rem', padding: '12px 24px' }} />
          <Tab icon={<PersonalVideoIcon />} label="My Videos" style={{ fontSize: '1.2rem', padding: '12px 24px' }} />
          <Tab icon={<StarIcon />} label="My Picks" style={{ fontSize: '1.2rem', padding: '12px 24px' }} />
        </Tabs>


        <Box p={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow={1} height="200px" >
          {loading ? (
            <>
              {/* <img src={basketball} alt="Loading..." style={{
                marginBottom: '20px', width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden'
              }} />加载坤坤打篮球动画 */}
              <PulseLoader color="#36D7B7" size={10} margin={2} />{/* 加载动画 */}
            </>

          ) : (
            <>
              {value === 0 &&
                <div style={{ padding: '20px', marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Typography variant="h5" style={{ marginBottom: '20px' }}>The Importance of Healthy Eating</Typography>
                  <Typography variant="body1" style={{ marginBottom: '20px' }}>
                    Proper nutrition is the cornerstone of a healthy lifestyle. Eating a balanced diet not only fuels our bodies with essential
                    vitamins and minerals, but it also supports our mental wellbeing. By consuming a variety of fruits, vegetables, lean proteins,
                    and whole grains, we can reduce the risk of chronic diseases, improve digestion, and maintain optimal body weight. In our
                    journey to wellness, making informed food choices is pivotal. Explore more to learn how the right foods can make a world
                    of difference to your health.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    href="https://www.eatwellguide.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore Healthy Eating Guidelines
                  </Button>

                </div>
              }
              {value === 1 && renderTopPicks()}
              {value === 2 && AddArticleContainer}
              {value === 3 && renderMyReads()}
              {value === 4 &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <BuildIcon style={{ fontSize: '3rem', color: '#3f51b5' }} />
                  <Typography>In Construction</Typography>
                </div>
              }
              {value === 5 &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <BuildIcon style={{ fontSize: '3rem', color: '#3f51b5' }} />
                  <Typography>In Construction</Typography>
                </div>
              }
            </>
          )}
        </Box>

      </Box>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage('')}
        message={message}
      />
    </Container>
  );
}

export default KnowledgeBasePage;
