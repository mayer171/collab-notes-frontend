// Editor pieced together from up and running guide on Slate.js docs
// in adition to ideas from Ben Awad's Google Docs Clone project
// · https://github.com/benawad/mini-google-docs-clone/blob/1_syncing_operations

// Import React dependencies.
import React, { useEffect, useMemo, useState, useRef } from 'react';


// Import the Slate editor factory.
import { createEditor, Editor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';

const defaultContent = [{
    type: 'paragraph',
    children: [{ text: 'A fresh note...' }],
}]

// Make a random ID for each editor instance -- for controlling
// "rooms" on the server side
const editorID = `${Math.trunc(Date.now() * Math.random() * 500)}`.substring(-8);

const documentID = "60778ef8f7c26040fd6de5e1";

const SlateEditor = (props) => {

  const editor = useMemo(() => withReact(createEditor()), []);

  const socket = useRef(null);

  const local = useRef(true);


  // This is the initial value of the Editor -- this can be passed from
  // parent as props
  const [value, setValue] = useState(props.content || defaultContent);

  const connectionString = () => {
    return `${process.env.REACT_APP_WS_CONNECT}/docID=${props.docID}/edID=${editorID}`;
  }


  const wsConnect = () => {
    socket.current = new WebSocket(connectionString());

    socket.current.onopen = () => {
      console.log('web socket connection made');
    }

    socket.current.onclose = () => {
      console.log('disconnected - trying to reconnect');
      setTimeout(() => {
        wsConnect();
      }, 1000)
    }

    socket.current.onmessage = (msg) => {

      const data = JSON.parse(msg.data);

      if (editorID !== data?.editorID) {
        console.log('GOT OPS')
        Editor.withoutNormalizing(editor, () => {
          data?.ops.forEach(op => {
            local.current = false;
            editor.apply(op);
          });
        });
      }
    }
  }


  // This block runs whebn component mounts bind functions to the event listeners
  useEffect(() => {
    wsConnect();
  }, [])

  // Send web sockets
  const sendWs = (msg) => {
    try {
      socket.current.send(JSON.stringify(msg));
    } catch (e) {
      console.log(e);
    }
  }

  // LOCAL changes should update the doc
  // and push to websockets
  // filter the operations
  const handleLocalChange = (newValue) => {
    setValue(newValue);

    const ops = filterOps(editor.operations || []);

    if (ops && ops.length > 0) {
      sendWs({data: {
        editorID: editorID,
        newstate: newValue,
        ops: editor.operations,
      }})
    }
  }

  // REMOTE chnages should not send web sockets
  const handleRemoteChange = (newValue) => {
    local.current = false;
    setValue(newValue);
    local.current = true;
  }

  // Filter out the operations that won't affect change on other editors
  const filterOps = (ops) => {
    return ops.filter(op => {
      if (op) {
          return (  op.type !== "set_selection" &&
                    op.type !== "set_value" );
      }
      return false;
    })
  }

  return (

    <div style = {{
      boxSizing: 'border-box',
      textAlign: "left",
      background: "white",
      padding: "1em",
      width: "100%",
      height: "100%"
    }}>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => {
          local.current ? handleLocalChange(newValue) : handleRemoteChange(newValue);
        }}
      >
        <Editable />
      </Slate>
    </div>
  )
}

export default SlateEditor;
