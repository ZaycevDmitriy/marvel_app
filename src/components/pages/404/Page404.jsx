import './page404.scss';

export const Page404 = () => {
  return (
    <section id="error-status" className="error-status" data-state="1">
      <div className="overlay"/>
      <div className="flex-wrapper no-pad">
        <div className="flex-col">
          <div className="error-copy">
            <h1 className="title-error">404 Page Not Found</h1>
            {/*eslint-disable-next-line*/}
            <h4 className="dynamic-msg"/>
            <p>
              Check that you typed the address correctly, go back to your
              previous page or try using our site search to find something
              specific.
            </p>
          </div>
        </div>
        <div className="flex-col toAnimate no-pad"/>
      </div>
    </section>
  )
}
