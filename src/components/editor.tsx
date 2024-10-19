import dynamic from 'next/dynamic'
import { Dispatch, SetStateAction } from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})

type Props = {
  value: string | undefined
  onChange: Dispatch<SetStateAction<string | undefined>>
}

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],

  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ['clean']
]

const modules = {
  toolbar: toolbarOptions
}

const Editor = ({ value, onChange }: Props) => {
  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  )
}

export default Editor
