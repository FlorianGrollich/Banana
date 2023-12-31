import React, { useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import Grid from './../GameGrid/Grid'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/types'

const getAutocompleteSuggestions = (
  model: monaco.editor.ITextModel,
  position: monaco.Position,
) => {
  const word = model.getWordUntilPosition(position)
  new monaco.Range(
    position.lineNumber,
    word.startColumn,
    position.lineNumber,
    word.endColumn,
  )

  // This section makes custom suggestions for the autocomplete.
  const suggestions: monaco.languages.CompletionItem[] = []

  return { suggestions: suggestions, incomplete: false }
}

const CodeEditor: React.FC = () => {
  const navigate = useNavigate()
  let user: User | null = null

  const userString = localStorage.getItem('user')
  if (userString) {
    user = JSON.parse(userString) as User
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])

  useEffect(() => {
    const provider = monaco.languages.registerCompletionItemProvider('python', {
      provideCompletionItems: getAutocompleteSuggestions,
    })

    return () => {
      provider.dispose()
    }
  }, [])

  return (
    <div className="flex justify-center items-stretch h-screen bg-blue-200 space-x-10">
      <div className="flex-1 max-w-[45vw] my-9 p-2 bg-white rounded-lg shadow-xl">
        <Editor
          height="85vh"
          width="100%"
          defaultLanguage="python"
          theme="customTheme"
          options={{
            automaticLayout: true,
            fontSize: 12,
          }}
        />
      </div>
      <div className="flex-1 max-w-[45vw] my-9 bg-indigo-100 rounded-lg shadow-xl overflow-hidden">
        <Grid />
      </div>
    </div>
  )
}

export default CodeEditor
