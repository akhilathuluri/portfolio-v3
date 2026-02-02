const Contact = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h1 className="font-semibold italic">
          Contact
        </h1>
        <p>
          Interested to talk?{' '}
          <a 
            href="/contact"
            className="underline underline-offset-4 transition-colors"
            style={{ textDecorationColor: 'var(--border-hover)' }}
          >
            get in touch
          </a>
          {' '}or read my{' '}
          <a 
            href="https://qozgofaixbrkkguxvxld.supabase.co/storage/v1/object/public/files/resume/Athuluri_Akhil_Resume_L%20(2).pdf" 
            target="_blank"
            className="underline underline-offset-4 transition-colors"
            style={{ textDecorationColor: 'var(--border-hover)' }}
          >
            resume
          </a>
        </p>
      </div>
    </section>

  )
}

export default Contact
