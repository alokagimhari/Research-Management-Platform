import React, { useState, Fragment } from 'react'
function CreateToDo(props) {
    const { onCreate } = props
    
    const [request, setRequest] = useState({
        company_name:"",
        title: "",
        text: "",
        deadline: "",
        company:"",
    })
    const onChange = (e) => {
        setRequest({
            ...request,
            [e.target.name]: e.target.value
        })
    }
    const saveTodo = (e) => {
        e.preventDefault()
        onCreate(request)
    }
    return (
        <Fragment>
                <form onSubmit={saveTodo}>
                    <h2 className="text-center m-3">Proposal Request</h2>
                    <div className="form-row d-flex justify-content-center">
                    <div className="col-3 d-flex justify-content-center m-1">
                            <input type="text" className="form-control" 
                                name = "company_name" placeholder="CompanyName" required
                                onChange={(e) => onChange(e)}/>
                    </div>
                        <div className="col-3 m-1">
                            <input name = "title" type="text" 
                                className="form-control" placeholder="title" required
                                onChange={(e) => onChange(e)} />
                        </div>
                        <div className="col-3 d-flex justify-content-center m-1">
                            <input type="text" className="form-control" required
                                name = "text" placeholder="Description"
                                onChange={(e) => onChange(e)}/>
                        </div>
                        <div className="col-3 d-flex justify-content-center m-1">
                            <input type="date" className="form-control" 
                                name = "deadline" placeholder="Deadline" required
                                onChange={(e) => onChange(e)}/>
                        </div>
                        
                        <button className='btn btn-success' 
                            type='submit'>Add</button>
                    </div>
                </form>
        </Fragment>
    )
}
export default CreateToDo