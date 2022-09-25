import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import React from 'react'
import { useState } from 'react'
import SortText from '../SortText/SortText'

const AddQuiz = () => {
    const [question, setQuestion] = useState('')
    const [qCorrect, setQCorrect] = useState('no')
    const [option1, setoption1] = useState('')
    const [option2, setoption2] = useState('')
    const [option3, setoption3] = useState('')
    const [option4, setoption4] = useState('')
    const [type, setType] = useState('quiz')

    const onHandleSubmit = (e) => {
        e.preventDefault()
        if (!question) {
            toast.error("Insert A Qustion")
        }
        else if (qCorrect === "no") {
            toast.error("Select Correct Ans.")
        }
        else {
            fetch('https://quiz-server-ouc1.vercel.app/quiz', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ type: 'quiz', question: question, options: { option1, option2, option3, option4 }, correct: qCorrect })
            }).then(res => {
                if (res.status === 200) {
                    refetch()
                    setQuestion('')
                    setQCorrect('')
                    setoption1('')
                    setoption2('')
                    setoption3('')
                    setoption4('')
                }
            })
        }
    }
    const { isLoading, data: allQuiz, refetch } = useQuery(['repoData', type], () =>
        fetch(`https://quiz-server-ouc1.vercel.app/${type}`,)
            .then(res => res.json())
    )
    if (isLoading) return 'Loading...'
    return (
        <main className='container mx-auto px-5'>

            <div className='border w-full p-10 mt-20'>
                <div className="flex justify-between w-full">
                    <h3 className='text-xl'>
                        <i className="fa-solid fa-grip mr-2"></i>
                        Quistion {allQuiz.length + 1}
                    </h3>

                    <select className='px-2 font-bold' onChange={(e) => setType(e.target.value)}>
                        <option value="quiz">MCQ</option>
                        <option value="sort">Sort Question</option>
                    </select>

                    <div>
                        <span>Points</span>
                        <input type="text" className='border w-16 ml-2' />
                    </div>
                </div>
                {
                    type === "quiz" | type === ""
                    &&
                    <>
                        <div>
                            <input type="text" className='border w-full mt-10 py-1 px-2' placeholder='Your Question' value={question} onChange={(e) => setQuestion(e.target.value)} />
                            <div className='flex mt-5'>
                                <h5>Media</h5>
                                <select className='w-36 px-2 ml-5'>
                                    <option value="none">None</option>
                                    <option value="media">Media</option>
                                    <option value="image">image</option>
                                </select>
                            </div>

                            <form onSubmit={onHandleSubmit} className='mt-7'>

                                <div className='flex option mt-2 items-center'>
                                    <i className="fa-solid fa-grip mr-2"></i>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={qCorrect === option1}
                                        onChange={() => setQCorrect(option1)} />
                                    <input
                                        type="text"
                                        value={option1}
                                        onChange={(e) => setoption1(e.target.value)}
                                        placeholder={`Option 1`}
                                        className='px-2 w-full border ml-5'
                                        required
                                    />

                                    <i onClick={() => {
                                        setoption1('')
                                    }} className="fa-solid delete text-red-500 text-xl ml-4 fa-xmark"></i>
                                </div>
                                <div className='flex option mt-2 items-center'>
                                    <i className="fa-solid fa-grip mr-2"></i>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        onChange={() => setQCorrect(option2)}
                                        checked={qCorrect === option2}
                                    />
                                    <input
                                        value={option2}
                                        type="text"
                                        onChange={(e) => setoption2(e.target.value)}
                                        placeholder={`Option 2`}
                                        className='px-2 w-full border ml-5'
                                        required
                                    />

                                    <i onClick={() => {
                                        setoption2('')
                                    }} className="fa-solid delete text-red-500 text-xl ml-4 fa-xmark"></i>
                                </div>
                                <div className='flex option mt-2 items-center'>
                                    <i className="fa-solid fa-grip mr-2"></i>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={qCorrect === option3}
                                        onChange={() => setQCorrect(option3)} />
                                    <input
                                        value={option3}
                                        type="text"
                                        onChange={(e) => setoption3(e.target.value)}
                                        placeholder={`Option 3`}
                                        className='px-2 w-full border ml-5'
                                        required
                                    />

                                    <i onClick={() => {
                                        setoption3('')
                                    }} className="fa-solid delete text-red-500 text-xl ml-4 fa-xmark"></i>
                                </div>
                                <div className='flex option mt-2 items-center'>
                                    <i className="fa-solid fa-grip mr-2"></i>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={qCorrect === option4}
                                        onChange={() => setQCorrect(option4)} />
                                    <input
                                        value={option4}
                                        type="text"
                                        onChange={(e) => setoption4(e.target.value)}
                                        placeholder={`Option 4`}
                                        className='px-2 w-full border ml-5'
                                        required
                                    />

                                    <i onClick={() => {
                                        setoption4('')
                                    }} className="fa-solid delete text-red-500 text-xl ml-4 fa-xmark"></i>
                                </div>
                                <button className='mx-auto block px-3 mt-5 py-2 text-white bg-blue-900 rounded-xl'>Add Question</button>
                            </form>
                        </div>
                    </>
                }

                {
                    type === "sort"
                    &&
                    <SortText refetch={refetch} />
                }
            </div>



            {
                type === 'quiz'
                &&
                <div className='mt-10'>
                    {
                        allQuiz.map((q, index) => (
                            <Quiz q={q} key={q._id} index={index} />
                        ))
                    }
                </div>
            }

            {
                type === "sort"
                &&
                <>
                    {
                        allQuiz.map((q, index) => (
                            <SortQuestionCard q={q} key={q._id} index={index} />
                        ))
                    }
                </>
            }
        </main>
    )
}

export default AddQuiz

const SortQuestionCard = ({ q, index }) => {
    return (
        <div className='mt-2'>
            <h2 className='text-xl mb-2'>({index + 1}) {q.question}</h2>
            <h3>Min Chart {q.min}</h3>
            <h3>Max Chart {q.max}</h3>

        </div>
    )
}

const Quiz = ({ q, index }) => {
    const [correct, setCorrect] = useState(false)
    return (
        <div className="mb-2">
            <h2
                className='text-xl'
            >({index + 1}) : {q.question}</h2>
            <div className='p-2'>
                <div className={`flex option mt-2 items-center`}>
                    <i className="mr-2">1</i>
                    <input
                        onChange={() => setCorrect(q.options.option1)}
                        type="checkbox" className="checkbox"
                        checked={q.options.option1 === correct || q.options.option1 === q.correct}
                    />
                    <h2 className='ml-3'>{q.options.option1}</h2>

                </div>
                <div className='flex option mt-2 items-center'>
                    <i className="mr-2">2</i>
                    <input
                        onChange={() => setCorrect(q.options.option2)}
                        type="checkbox" className="checkbox"
                        checked={q.options.option4 === correct || q.options.option2 === q.correct}
                    />
                    <h2 className='ml-3'>{q.options.option2}</h2>
                </div>
                <div className='flex option mt-2 items-center'>
                    <i className="mr-2">3</i>
                    <input
                        onChange={() => setCorrect(q.options.option3)}
                        type="checkbox" className="checkbox"
                        checked={q.options.option4 === correct || q.options.option3 === q.correct}
                    />
                    <h2 className='ml-3'>{q.options.option3}</h2>
                </div>
                <div className='flex option mt-2 items-center'>
                    <i className="mr-2">4</i>
                    <input
                        onChange={() => setCorrect(q.options.option4)}
                        type="checkbox" className="checkbox"
                        checked={q.options.option4 === correct || q.options.option4 === q.correct}
                    />
                    <h2 className='ml-3'>{q.options.option4}</h2>
                </div>
                <h2 className='py-2'>
                    {
                        correct
                            ?
                            correct === q.correct ?
                                <span className='text-green-500'>
                                    Selected Ans. Is Correct
                                </span>
                                :
                                <p className='text-red-500'>
                                    Incorrect Ans.
                                </p>
                            :
                            ""
                    }
                </h2>
            </div>

        </div>
    )
}