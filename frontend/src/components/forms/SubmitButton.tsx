export const SubmitButton = ({ children }: any) => {
  return (
    <button
      autoFocus
      className="uppercase rounded border p-1 px-3 border-[#598299] text-[#78ccfa]"
      type="submit"
    >
      {children}
    </button>
  );
};
export default SubmitButton;
