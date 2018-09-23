import Typography  from '@material-ui/core/Typography';
import React       from 'react';
import LazyImage   from '../components/LazyImage';
import Layout      from '../components/PageLayout';
import pageWrapper from '../lib/pageWrapper';


const styles = theme => ({
  title: {
    marginBottom: theme.spacing.unit * 4,
  },
});

const Home = class extends React.Component {
  render() {
    const { pageData, classes } = this.props;

    return (
      <Layout pageData={pageData}>
        <Typography variant="display4" className={classes.title}>{pageData.title}</Typography>
        <Typography variant="display1"><b>Welcome message : </b>{pageData.welcomeMessage}</Typography>
        <LazyImage src="https://cdn-images-1.medium.com/max/2000/1*HSisLuifMO6KbLfPOKtLow.jpeg" useBackgroundImage height={300}/>
      </Layout>
    );
  }
};


export default pageWrapper(Home, {
  name: 'home',
  styles,
});
