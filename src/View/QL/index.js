
import React, { useState, useEffect } from "react";
import Form from "../Components/Form";
import Task from "../Components/Task";
import useApi from "../../Api/useApi"

function QL() {
    //const url = `http://localhost:8080/api/forms`
    const [data, setData] = useState([])
    useEffect(() => {
        // axios.get(url).then(res => {
        //     setData(res.data)
        // })
        useApi.getAll().then(res => {
            setData(res.data)
        })
    }, [data])
    const initValue = {
        fistName: "",
        lastName: "",
        email: "",
        birthday: "",
        gender: "",
        useName: "",
        password: "",
        repeatpassword: ""
    }
    const [value, setValue] = useState(initValue)
    const [isOpen, setIsOpen] = useState(false)
    const [idEdit, setIdEdit] = useState()
    const handleSignUp = (id) => {
        setIdEdit(id)
        console.log(id);
        if (id > 0) {
            useApi.get(id).then(res => {
                const { fistName, lastName, email, birthday, gender, useName, password, repeatpassword } = res.data;
                setValue({
                    fistName,
                    lastName,
                    email,
                    birthday,
                    gender,
                    useName,
                    password,
                    repeatpassword
                })
            })
        }
        else {
            setValue(initValue)
        }
        setIsOpen(!isOpen)
    }
    const handleSave = (value) => {
        console.log(idEdit);
        if (parseInt(idEdit, 10)) {
            //axios.patch(`${url}/${idEdit}`, value)
            useApi.edit(idEdit, value)
        } else {
            // axios.post(`${url}`, value)
            useApi.add(value)
        }
    }
    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }
    const handleDelete = (id) => {
        //axios.delete(`${url}/${id}`)
        useApi.delete(id)
    }
    const [inputSearch, setInputSearch] = useState({
        name: "",
        gender: ""
    })
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputSearch({
            ...inputSearch,
            [name]: value
        })
    }
    return (
        <div style={{ padding: "10px" }}>
            <p style={{ fontSize: "30px", padding: "5px" }}>Nhân sự</p>
            <hr />
            <form style={{ padding: "5px" }}>
                <div className="row">
                    <div className="col">
                        <input type="text" style={{ marginLeft: "20px" }} onChange={handleInput} value={inputSearch.name} className="form-control" placeholder="Tìm kiếm" name="name" />
                    </div>
                    <div className="col">
                        <select style={{ width: "100px" }} className="form-select" value={inputSearch.gender} name="gender" onChange={handleInput} id="inputGroupSelect01">
                            <option value="">---All---</option>
                            <option value="nam">nam</option>
                            <option value="nữ">nữ</option>
                        </select>
                    </div>
                    <div className="col">
                        <button style={{ margin: "4px", marginLeft: "60%" }} value="0" onClick={(id) => handleSignUp(id.target.value)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Thêm nhân viên
                        </button>
                    </div>
                </div>
            </form>
            <hr />
            <Form idEdit={idEdit} value={value} isOpen={isOpen} handleSave={handleSave} handleIsOpen={handleIsOpen} />
            <Task inputSearch={inputSearch} data={data} handleDelete={handleDelete} handleSignUp={handleSignUp} />
        </div>
    )
}
export default QL;