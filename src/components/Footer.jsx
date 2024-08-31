export default function Footer() {
  return (
    <div className="flex mt-5 flex-col sm:flex-row justify-evenly footer items-center text-center p-2">
      <p className='m-1'>Ticket Bookng Application</p>
      <p className='m-1'>{`© 2024 . All Rights Reserved`}</p>
      <a rel='noopener noreferrer' className='m-1 underline decoration-slate-50 '>info@ticketbookingapplication.com</a>
      {/* <a href='mailto:info@jticketbookingapplication.com' target='_blank' rel='noopener noreferrer' className='m-1'>info@ticketbookingapplication.com</a> */}
    </div>
  );
}
