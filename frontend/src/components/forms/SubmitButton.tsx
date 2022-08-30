export const SubmitButton = ({ children }: any) => {
  return (
    <button
      autoFocus
      className="uppercase rounded p-1 px-3 text-[#1976d2] text-[0.875rem]"
      type="submit"
    >
      {children}
    </button>
  );
};
export default SubmitButton;
