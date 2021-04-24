function EditableTitle (props) {

  const keyPress = (e) => {
    if (e.keyCode === 13) console.log('ende')
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
    <input
      type="text"
      value={props.title}
      contentEditable
      onChange={props.handleChange}
      className={props.class}
    />
  </form>
  )
}

export default EditableTitle;
