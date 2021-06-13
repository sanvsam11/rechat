import React, {Component} from 'react'
import {auth, db} from '../services/firebase'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export default class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user: auth().currentUser,
            chats:[],
            content: '',
            readError: null,
            writeError: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async componentDidMount(){
        this.setState({readError: null})
        try{
            db.ref('chats').on("value", snapshot=>{
                const chats = []
                snapshot.forEach((snap)=>{
                    chats.push(snap.val())
                })
                this.setState({chats})
            })
        }catch(error){
            this.setState({readError: error.message})
        }
    }
    handleChange(event){
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault()
        this.setState({writeError: null})
        try{
            db.ref('chats').push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid
            })
        }catch(error){
            this.setState({writeError: error.message})
        }
    }
    render(){
        return(
            <Grid container 
                direction="column"
                justify="flex-start"
                alignItems="flex-start" 
            >
                <Grid item
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                className='scroll  height80'>
                <Paper variant='outlined' elevation={2} className='chats'>
                    {this.state.chats.map(chat=>
                         <Card variant='outlined' key={chat.timestamp} elevation={3}>
                             <CardContent>
                             <Typography color="textSecondary" gutterBottom>
                                 {this.state.user.displayName}
                                 </Typography>
                                 <Typography variant="body2" component="p">
                                 {chat.content}</Typography>
                             </CardContent>
                     </Card>
                    )}
                </Paper>
                </Grid>
               <Grid item>
               <form onSubmit={this.handleSubmit}>
                    <TextField variant='outlined' onChange={this.handleChange} value={this.state.content}></TextField>
                    {this.state.error? <p>{this.state.writeError}</p>:null}
                    <Button type='submit'>Send</Button>
                </form>
                <Paper elevation = {1}>
                    Logged in as: <strong>{this.state.user.email}</strong>
                </Paper>
               </Grid>
            </Grid>
        )
    }
}