import AddModal from 'C:/Users/Admin/Desktop/Quan_Li_Chua_Dotnet/intern/src/Components/AddModal.jsx';
import Table from 'C:/Users/Admin/Desktop/Quan_Li_Chua_Dotnet/intern/src/Components/Table';
import LoginModal from 'C:/Users/Admin/Desktop/Quan_Li_Chua_Dotnet/intern/src/Components/LoginModal';
import { useState } from 'react';

export default function DondangkiContent({token}) {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [findinput, setFindInput] = useState('')


    return (
        <div className="content">
            <h1>DondangkiContent</h1>
        </div>
        
    )
}
