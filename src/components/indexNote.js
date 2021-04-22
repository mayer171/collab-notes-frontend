import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core'


function NoteCard(props) {
  return (
    <div style={{width: '200px', height: '150px', textAlign: 'left', boxSizing: 'border-box'}}>
      <Paper elevation={1} style={{width: '100%', height: '100%', padding: '1rem', boxSizing: 'border-box', overflow: 'hidden'}}>
        <h3>{props.note.title}</h3>
        {
          props.note.preview ?
           <p>{props.note.preview}</p> :
           <p>A fresh note...</p>
        }
      </Paper>
    </div>

  )
}

export default NoteCard;
