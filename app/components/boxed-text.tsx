type BoxedTextProps = {
  text: string
}

const BoxedText = ({text}: BoxedTextProps) => {
  return (
    <div 
      className="flex items-center justify-center not-italic font-extralight text-xs rounded-sm px-1 tracking-[-0.06em]"
      style={{
        border: '1px solid var(--border-color)',
        color: 'var(--text-secondary)'
      }}
    >
      {text}
    </div>
  )
}

export default BoxedText
