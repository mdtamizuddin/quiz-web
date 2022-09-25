import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
const SortText = ({ refetch }) => {
    const [question, setQuestion] = useState('')
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const onHandleSubmit = (e) => {
        e.preventDefault()
        if (!question) {
            toast.error("Where is Your Question")
        }
        else if (!min) {
            toast.error("Min chars")
        }
        else if (!max) {
            toast.error("Min chars")
        }

        else {
            fetch('https://quiz-server-ouc1-8ryo6cmqm-mdtamiz.vercel.app/sort', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ question, min, max })
            })
                .then(res => {
                    if (res.status === 200) {
                        refetch()
                        setQuestion('')
                        setMin('')
                        setMax('')
                        toast.success("Question Added")
                    }
                    else {
                        console.log(res)
                    }
                })
        }
    }
    return (
        <div>
            <div>
                <input
                    type="text"
                    className='border w-full mt-10 py-1 px-2'
                    placeholder='Your Question' value={question}
                    onChange={(e) => setQuestion(e.target.value)} />
                <div className='flex mt-5'>
                    <h5>Media</h5>
                    <select className='w-36 px-2 ml-5'>
                        <option value="none">None</option>
                        <option value="media">Media</option>
                        <option value="image">image</option>
                    </select>
                </div>

                <form onSubmit={onHandleSubmit} className='mt-3 flex items-center '>
                    <div className='flex'>
                        <h2 className='mr-2'>Min chars</h2>
                        <input
                            value={min}
                            type="number" className='border w-20 px-2 rounded'
                            onChange={(e) => setMin(e.target.value)}
                        />
                    </div>
                    <div className='flex ml-10'>
                        <h2 className='mr-2'>Max chars</h2>
                        <input
                            value={max}
                            type="number" className='border px-2 w-20 rounded' onChange={(e) => setMax(e.target.value)} />
                    </div>
                    <button className='mx-auto block px-3 mt-5 py-2 text-white bg-blue-900 rounded-xl'>Add Question</button>
                </form>
            </div>
        </div>
    )
}

export default SortText