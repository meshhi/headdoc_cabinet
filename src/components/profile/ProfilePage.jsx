import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React from 'react';
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return(
      <Card sx={{ width: '100%' }}>
      {/* <CardMedia
        sx={{ minHeight: '50vh' }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
      <CardContent>
        <Typography>
          Имя: {this.props.user.userData.firstName}
        </Typography>
        <Typography>
          Отчество: {this.props.user.userData.middleName}
        </Typography>
        <Typography>
          Фамилия: {this.props.user.userData.lastName}
        </Typography>
        <Typography>
          СНИЛС: {this.props.user.userData.snils}
        </Typography>
        <Typography>
          Дата рождения: {this.props.user.userData.birthDate}
        </Typography>
        <Typography>
          Телефон: {this.props.user.userData.phone}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    )
  }
}

const mapStateToProps = state => {
        return {
          user: state.user,
        };
      };
  
export default connect(mapStateToProps)(ProfilePage);