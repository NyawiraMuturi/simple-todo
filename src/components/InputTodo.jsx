
import React, {useState} from 'react'

const InputTodo = (props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    props.addTodoProps(title);
    setTitle("");
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          className="input-text"
          placeholder="Add Todo..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button className="input-submit">Submit</button>
      </form>
    </div>
  )
}

export default InputTodo



