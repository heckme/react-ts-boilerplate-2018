import * as React from 'react';

//the material UI things
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  Theme,
} from '@material-ui/core';

import {
  StyleRules,
  withStyles,
} from '@material-ui/core/styles';

//to use decorators
import { compose }  from 'recompose';

//-----------------------------------------//
//the css as javascripts object is a valid strategy, but one need to use it to style materialUI
const styles = (theme: Theme) :StyleRules => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
//-----------------------------------------//

//-----------------------------------------//
//interfaces for props and state

export interface ISignProps {
  classes? : any;
  AuthStore: AuthStore;
  getAuth? : () => void;
  throwNotificationWithMessage? : (msg: _Notification) => void;
}
export interface ISignState {
  email: string;
  password: string;
}

@(compose(withStyles(styles)) as any)
class SignIn extends React.Component<ISignProps, ISignState> {

  // try to avoid constructor for state, use readonly instead to keep it immutable
  readonly state : ISignState = {
    email: '',
    password: '',
  };
  
  //generic onInputChange
  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) :void => {
    this.setState({
      ...this.state,
      [e.target.name] : e.target.value
    } as ISignState);
  }

  //  beware we are grabing password and fake validating it in frontend. 
  //  consider this a stub and remove it. place your own action that troigges in a duck
  //  after you connected the SigIn in a Container
  private checkCredentialsAndAuth = (e: any) : Promise<void> | void=> {
    
    e.preventDefault();
 
    const email : string = 'peterparker@stark.com';
    const password : string = '42';

    if(this.state.email === email && this.state.password === password) {
     if(typeof this.props.getAuth === 'function') {
        this.props.getAuth();
      }
    } else {
      if(typeof this.props.throwNotificationWithMessage === 'function') {
        this.props.throwNotificationWithMessage({title: 'Wrong Credentials', text: 'Please make sure to pass correct credentials'});
      }
    }
  }

  //render
  render(): JSX.Element {

    const {classes} = this.props;
    
      return (
        <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
              </Avatar>
              <Typography variant="headline">Sign in</Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                    defaultValue={this.state.email}
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.onInputChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    defaultValue={this.state.password}
                    name="password"
                    type="password"
                    id="password"
                    onChange={this.onInputChange}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="raised"
                  color="primary"
                  className={classes.submit}
                  onClick={this.checkCredentialsAndAuth}
                >
                  Sign in
                </Button>
              </form>
            </Paper>
          </main>
        </React.Fragment>
      );
  }
}

export default SignIn;