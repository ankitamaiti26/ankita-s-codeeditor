import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalstorage from '../hooks/useLocalstorage'

function App() {
  const [html, setHtml] = useLocalstorage('html', '')
  const [css, setCss] = useLocalstorage('css', '')
  const [js, setJs] = useLocalstorage('js', '')
  const [srcDoc, setSrcDoc] =  useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
        setSrcDoc(`
        <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
      `)
    }, 250)

    return  () => clearTimeout(timeout)
  }, [html, css, js])
      
  return (
    <>
        <div className="pane top-pane">
          <Editor 
              language="xml" 
              displayName="index.html"
              value={html} 
              onChange={setHtml}
          />
          <Editor 
            language="css" 
            displayName="index.css"
            value={css} 
            onChange={setCss}
          />
          <Editor 
            language="javascript" 
            displayName="index.js"
            value={js} 
            onChange={setJs}
          />
        </div>
        <div className="pane">
          <iframe 
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="1"
            width="100%"
            height="100%"
          />
        </div>
    </>
  );
}

export default App;
