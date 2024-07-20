import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[500px] bg-gray-900 text-gray-200 rounded-xl p-6 flex flex-col relative shadow-lg'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-gray-400 hover:text-red-500 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-1 bg-gray-700 text-gray-200 rounded-lg'>
          {book.publishYear}
        </h2>
        <h4 className='my-2 text-gray-400'>{book._id}</h4>
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-gray-500 text-2xl' />
          <h2 className='my-1 text-gray-200'>{book.title}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-gray-500 text-2xl' />
          <h2 className='my-1 text-gray-200'>{book.author}</h2>
        </div>
        <p className='mt-4 text-gray-400'>Anything You want to show</p>
        <p className='my-2 text-gray-300'>
          This is a description for this book.
        </p>
      </div>
    </div>
  );
};

export default BookModal;
