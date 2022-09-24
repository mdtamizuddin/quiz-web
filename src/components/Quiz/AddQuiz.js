import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const AddQuiz = () => {
    const [option, setOption] = useState(['Option 1', 'Option 2'])
    const [quiz, setQuiz] = useState([])
    const [question, setQuestion] = useState('')
    const [err, setErr] = useState(false)
    const removeItem = (it) => {
        const items = option.filter(x => x !== it)
        setOption(items)
    }
    const { register, reset, handleSubmit, } = useForm();
    const onSubmit = data => {
        if (question) {
            setErr(false)
            setQuiz([...quiz, { question: question, options: data }])
            reset()
            setQuestion('')
        }
        else {
            setErr(true)
        }
    }

    return (
        <main className='container mx-auto'>
            <div className='mt-10'>
                {
                    quiz.map((q, index) => (
                        <div key={index} className="mb-2">
                            <h2
                                className='text-xl'
                            >({index + 1}) : {q.question}</h2>
                            <form className='p-2'>
                                <div className='flex option mt-2 items-center'>
                                    <i className="mr-2">1</i>
                                    <input type="checkbox" className="checkbox" />
                                    <h2 className='ml-3'>{q.options.option1}</h2>

                                </div>
                                <div className='flex option mt-2 items-center'>
                                    <i className="mr-2">2</i>
                                    <input type="checkbox" className="checkbox" />
                                    <h2 className='ml-3'>{q.options.option2}</h2>
                                </div>
                                <div className='flex option mt-2 items-center'>
                                    <i className="mr-2">3</i>
                                    <input type="checkbox" className="checkbox" />
                                    <h2 className='ml-3'>{q.options.option3}</h2>
                                </div>
                                <div className='flex option mt-2 items-center'>
                                    <i className="mr-2">4</i>
                                    <input type="checkbox" className="checkbox" />
                                    <h2 className='ml-3'>{q.options.option4}</h2>
                                </div>

                            </form>

                        </div>
                    ))
                }
            </div>

            <div className='border w-full p-10 mt-20'>
                <div className="flex justify-between w-full">
                    <h3 className='text-xl'>
                        <i className="fa-solid fa-grip mr-2"></i>
                        Quistion {quiz.length + 1}
                    </h3>

                    <select className='px-2 font-bold'>
                        <option value="mcq">MCQ</option>
                        <option value="others">Others</option>
                    </select>

                    <div>
                        <span>Points</span>
                        <input type="text" className='border w-16 ml-2' />
                    </div>
                </div>
                <div>
                    <input type="text" className='border w-full mt-10 py-1 px-2' placeholder='Your Question' value={question} onChange={(e) => setQuestion(e.target.value)} />
                    <p className='py-1 text-red-500'>{err && 'Please Insert A Value'}</p>
                    <div className='flex mt-5'>
                        <h5>Media</h5>
                        <select className='w-36 px-2 ml-5'>
                            <option value="others">Others</option>
                            <option value="media">Media</option>
                            <option value="image">image</option>
                        </select>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='mt-7'>
                        {
                            option.map((o, index) => (
                                <div key={index} className='flex option mt-2 items-center'>
                                    <i className="fa-solid fa-grip mr-2"></i>
                                    <input type="checkbox" className="checkbox" />
                                    <input
                                        {...register(`option${index + 1}`)}
                                        type="text"
                                        placeholder={`Option ${index + 1}`}
                                        className='px-2 w-40 border ml-5'
                                        required
                                    />
                                    {
                                        option.length > 1 &&
                                        <i onClick={() => {
                                            removeItem(o)

                                        }} className="fa-solid delete text-red-500 text-xl ml-4 fa-xmark"></i>
                                    }
                                </div>
                            ))
                        }
                        {
                            option.length <= 3 && <h4
                                onClick={() => {
                                    setOption([...option, `Option ${option.length + 1}`])
                                }}
                                className='mt-5 px-5 font-bold text-xl'>
                                <i className="fa-solid  fa-plus"></i>
                            </h4>
                        }
                        <button className='mx-auto block px-3 mt-5 py-2 text-white bg-blue-900 rounded-xl'>Add Question</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default AddQuiz