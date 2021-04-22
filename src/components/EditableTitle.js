function EditableTitle (props) {

  return (
    <input
      type="text"
      value={props.title}
      contentEditable
      onChange={props.handleChange}
      className={props.class}
    />
  )
}

export default EditableTitle;
