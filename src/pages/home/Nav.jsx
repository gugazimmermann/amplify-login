export default function Nav({ handleSignOut }) {
  return (
    <nav className="w-full shadow-md z-30 px-2 py-1.5 bg-white text-slate-500">
      <div className="container mx-auto flex flex-wrap justify-between px-2">
        <p className="text-2xl">{process.env.REACT_APP_TITLE}</p>
        <button type="button" onClick={() => handleSignOut()}>Sign Out</button>
      </div>
    </nav>
  );
}
