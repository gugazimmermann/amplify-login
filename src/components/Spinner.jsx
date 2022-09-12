const Spinner = ({ className, color }) => (
  <p className={className}>
    <i
      className={`bx bx-loader-circle text-5xl font-bold animate-ping ${
        color ? color : "text-indigo-800"
      }`}
    />
  </p>
);

export default Spinner;
