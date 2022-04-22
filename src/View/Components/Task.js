import axios from "axios";
import { useState } from "react";
import FormEdit from "./FormEdit";

function Task(props) {
    const { data, input,url} = props;
    const [idEdit , setIdEdit]= useState()
    const handleDelete = (id) => {
        props.handleDelete(id)
    }
    const [isOpen, setIsOpen]= useState(false)
    const [valueEdit, setValueEdit] = useState({
        fistName: "",
		lastName: "",
		email: "",
		birthday:"",
		gender: "",
		useName: "",
		password: "",
		repeatpassword:""
    })
    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }
    const handleEdit = (id) => {
        
        setIdEdit(id)
        axios.get(`${url}/${id}`).then(res => {
            console.log(typeof res.data.birthday);
            setValueEdit({
                fistName: res.data.fistName,
                lastName: res.data.lastName,
                email: res.data.email,
                birthday: res.data.birthday,
                gender: res.data.gender,
                useName: res.data.useName,
                password: res.data.password,
                repeatpassword: res.data.password
            })
        })
        setIsOpen(!isOpen)
    }
    const handleSaveEdit = (arr) => {
        axios.patch(`${url}/${idEdit}`,arr)
    }
    return (
        <table className="table">
            <thead>
                <tr style={{textAlign:"center"}}>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th  style={{width:"270px" }}>Email</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Title</th>
                </tr>
            </thead>
            <tbody>
                {data?.filter(
                    e => {
                        return (
                           e.fistName.includes(input) || e.lastName.includes(input)
                        )
                    }
                ).map((e, index) => (
                    <tr key={index} style={{textAlign:"center"}}>
                        <th scope="row">{e.id}</th>
                        <td>{e.fistName + " " + e.lastName}</td>
                        <td>{e.email}</td>
                        <td>{e.birthday}</td>
                        <td>{e.gender}</td>
                        <td>
                            <button type="button" onClick={()=>handleEdit(e.id)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Sửa thông tin 
                            </button>
                            &nbsp;
                            <button type="button" onClick={()=>handleDelete(e.id)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Xóa Nhân viên
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <FormEdit handleSaveEdit={handleSaveEdit} isOpen={isOpen} handleIsOpen={handleIsOpen} handleEdit={handleEdit} valueEdit={valueEdit} />
        </table>
    )
}
export default Task;