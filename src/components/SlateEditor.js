// Editor pieced together from up and running guide on Slate.js docs
// in adition to ideas from Ben Awad's Google Docs Clone project
// • https://github.com/benawad/mini-google-docs-clone/blob/1_syncing_operations

// Import React dependencies.
import React, { useEffect, useMemo, useState, useRef } from 'react';


// Import the Slate editor factory.
import { createEditor, Editor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';

// connect to ws
// TODO this has to connect with a param for the document it wants
const ws = new WebSocket('ws://localhost:3001');
const editorID = Date.now();


const SlateEditor = (props) => {

  const editor = useMemo(() => withReact(createEditor()), []);
  const local = useRef(true);

  // This is the initial value of the Editor -- this can be passed from
  // parent as props
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'TEST...' }],
    },
  ]);


  // This block runs ONE TIME -- to bind functions to the event listeners
  useEffect(() => {

    ws.onopen = () => {
      console.log('web socket connection made')
    }

    ws.onclose = () => {
      console.log('disconnected')
    }

    ws.onmessage = (msg) => {

      const data = JSON.parse(msg.data).data;

      if (editorID !== data.editorID) {
        console.log('GOT OPS')
        Editor.withoutNormalizing(editor, () => {
          data.ops.forEach(op => {
            local.current = false;
            editor.apply(op);
          });
        });
      }
    }
  }, [])

  // Send web sockets
  const sendWs = (msg) => {
    try {
      ws.send(JSON.stringify(msg));
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
    <div style = {{textAlign: "left", height: 300, background: "#eee", padding: "1em"}}>
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
