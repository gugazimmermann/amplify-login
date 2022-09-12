const ProgressBar = ({ value }) => (
  <div className="relative w-full bg-gray-200 h-10">
    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{`${value}%`}</p>
    <div
      className=" bg-amber-500 h-10 flex justify-center items-center"
      style={{ width: `${value}%` }}
    />
  </div>
);

export default ProgressBar;
