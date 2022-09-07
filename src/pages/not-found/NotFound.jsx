import NotFoundImg from '../../images/not_found.svg';

const NotFound = () => (
  <div className="container bg-white mx-auto">
    <main className="flex flex-col h-screen justify-center items-center">
      <img src={NotFoundImg} alt="not found" className="max-w-xs" />
      <h1 className='mt-4 text-xl'>Sorry, Page Not Found.</h1>
    </main>
  </div>
);

export default NotFound;
