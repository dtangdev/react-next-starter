import Grid        from '@material-ui/core/Grid';
import Paper       from '@material-ui/core/Paper';
import Typography  from '@material-ui/core/Typography';
import React       from 'react';
import Inspector   from 'react-inspector';
import NoSSR       from 'react-no-ssr';
import config      from '../../config';
import routes      from '../../server/routes';
import Layout      from '../components/common/PageLayout';
import pageWrapper from '../lib/pageWrapper';



class _sandbox extends React.Component {

  render() {
    const { theme, pageData } = this.props;
    return (
      <Layout pageData={pageData}>
        <Grid container direction="column" spacing={40}>

          {/** THEME **/}

          <Grid item>
            <Typography variant="h2" color="primary">Theme</Typography>
            <br/><br/>
            <Inspector
              theme="chromeDark"
              data={theme}
              expandLevel={1}
            />
          </Grid>

          {/** TYPOGRAPHY **/}

          <Grid item xs={12}>
            <Typography variant="h2" color="primary" gutterBottom>
              Typography
            </Typography>
            <Typography>
              <b>font family:</b> {theme.typography.fontFamily.split(',')[0]}
            </Typography>
            <Typography>
              <b>font size:</b> {theme.typography.fontSize}
            </Typography>
            <br/><br/>

            <Grid container spacing={32}>
              {
                Object.entries(theme.typography).map(([typoName, typoSettings]) => {
                  if (typeof typoSettings !== 'object' || !typoSettings.newSet) return null;
                  const fontSize = Number(typoSettings.fontSize.replace('rem', ''));
                  return (
                    <Grid item xs={12} key={typoName}>
                      <Typography variant={typoName} component="h1">
                        {typoName} ({fontSize}rem - {fontSize * theme.typography.fontSize}px)
                      </Typography>
                      <br/>
                      <Typography variant={typoName} component="h1">
                        the quick brown fox jumps over the lazy dogs
                      </Typography>
                      <Typography variant={typoName} component="h1" style={{ textTransform: 'uppercase' }} gutterBottom>
                        the quick brown fox jumps over the lazy dogs
                      </Typography>
                      <Inspector
                        theme="chromeDark"
                        data={typoSettings}
                        expandLevel={0}
                      />
                      <br/><br/>
                    </Grid>
                  );
                })
              }
            </Grid>
          </Grid>

          {/** COLORS **/}

          <Grid>
            <Typography variant="h2" color="primary">Colors</Typography>
            <br/><br/>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant="h4" color="primary">Main</Typography>
              </Grid>
              {
                ['primary', 'secondary', 'error'].map(color => (
                  <Grid item md={4} key={color}>
                    <Paper style={{ background: theme.palette[color].main, padding: 10 }}>
                      <Typography variant="h5" style={{ color: theme.palette[color].contrastText }}>
                        {color.toUpperCase()}
                      </Typography>
                      <Typography variant="body1" style={{ color: theme.palette[color].contrastText }}>
                        {theme.palette[color].main}
                      </Typography>
                      <Paper style={{ background: theme.palette[color].light, padding: 10 }}>
                        <Typography style={{ color: theme.palette.getContrastText(theme.palette[color].light) }}>
                          Light: {theme.palette[color].light}
                        </Typography>
                      </Paper>
                      <Paper style={{
                        background: theme.palette[color].dark,
                        padding: 10,
                      }}>
                        <Typography style={{ color: theme.palette.getContrastText(theme.palette[color].dark) }}>
                          Dark: {theme.palette[color].dark}
                        </Typography>
                      </Paper>
                      <Typography style={{
                        background: 'transparent',
                        padding: 10,
                        color: theme.palette[color].contrastText,
                      }}>Contrast text: {theme.palette[color].contrastText}</Typography>
                    </Paper>
                  </Grid>
                ))
              }

              <Grid item xs={12}>
                <Typography variant="h4" color="primary">Backgrounds</Typography>
              </Grid>

              {
                Object.entries(theme.palette.background).map(([colorName, colorHex]) => (
                  <Grid item md={3} key={colorName}>
                    <Paper style={{ background: theme.palette.background[colorName], padding: 10 }}>
                      <Typography variant="h5" style={{ color: theme.palette.getContrastText(theme.palette.background[colorName]) }}>
                        {colorName.toLowerCase()}
                      </Typography>
                      <Typography variant="body1" style={{ color: theme.palette.getContrastText(theme.palette.background[colorName]) }}>
                        {colorHex}
                      </Typography>
                    </Paper>
                  </Grid>
                ))
              }

              <Grid item xs={12}>
                <Typography variant="h4" color="primary">Greys</Typography>
              </Grid>

              {
                Object.entries(theme.palette.grey).map(([colorName, colorHex]) => (
                  <Grid item md={3} key={colorName}>
                    <Paper style={{ background: theme.palette.grey[colorName], padding: 10 }}>
                      <Typography variant="h5" style={{ color: theme.palette.getContrastText(theme.palette.grey[colorName]) }}>
                        {colorName.toLowerCase()}
                      </Typography>
                      <Typography variant="body1" style={{ color: theme.palette.getContrastText(theme.palette.grey[colorName]) }}>
                        {colorHex}
                      </Typography>
                    </Paper>
                  </Grid>
                ))
              }

            </Grid>
          </Grid>

          {/** OTHER **/}
          <br/><br/>
          <Grid item xs={12}>
            <Typography variant="h2" color="primary">Current Redux store</Typography>
            <br/><br/>
            <Inspector
              theme="chromeDark"
              data={this.props.reduxStore}
              expandLevel={0}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h2" color="primary">Current config</Typography>
            <br/><br/>
            <Inspector
              theme="chromeDark"
              data={config}
              expandLevel={0}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h2" color="primary">Current routes</Typography>
            <br/><br/>
            <NoSSR>
              <Inspector
                theme="chromeDark"
                data={routes}
                expandLevel={0}
              />
            </NoSSR>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}



const mapStateToProps = state => ({ reduxStore: state });

export default pageWrapper(_sandbox, {
  name: '_sandbox',
  withTheme: true,
  mapStateToProps,
});
