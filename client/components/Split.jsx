import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// import Split from 'react-split';
import '../styles/Editor.sass';
import TextareaAutosize from '@mui/base/TextareaAutosize';
export default function Split({ currentDoc, value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <section className='split' style={{ marginTop: '2rem' }}>
        <div
          style={{
            width: '50%',
            height: '100vh',
            // overflow: 'scroll',
          }}
        >
          {/* <TextField
            id='outlined-textarea'
            
            placeholder='Placeholder'
            sx={{ width: '100%', maxHeight: '100vh', color: 'orchid' }}
            style={{ width: '100%', maxHeight: '100vh', color: 'orchid' }}
            // maxRows={55}
            value={value}
            onChange={handleChange}
            multiline
          /> */}

          <TextareaAutosize
            // id='outlined-textarea'
            // label='Editor'
            aria-label='markdown editor'
            minRows={3}
            maxRows={8}
            scroll='body'
            placeholder='### Write your markdown here '
            value={value}
            // overflow='inherit !important'
            // overflowy='scroll !important'
            onChange={handleChange}
            style={{
              width: '100%',
              height: '100vh',
              resize: 'none',
              // overflowY: 'scroll',
              fontSize: 'large',
            }}
          />
        </div>
        <div
          style={{
            width: '50%',
            height: '100vh',
            overflowX: 'scroll',
          }}
        >
          <ReactMarkdown
            style={{
              height: '100vh',
              width: '50%',
              maxWidth: '50%',
              maxHeight: '100vh',
            }}
            children={value}
            remarkPlugins={[remarkGfm]}
          />
        </div>
      </section>
    </>
  );
}
